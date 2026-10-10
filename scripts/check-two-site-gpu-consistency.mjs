/**
 * 两站显卡数据一致性回归（F4「唯一数据源」）。
 *
 * 两站各有一份显卡数据，谁也不能悄悄改口径：
 *   - 本站（dlss5.app）：`src/data.ts` 的 `gpuData.gpus` + `feature_matrix`，是**对外公开的逐型号版本**。
 *   - 主站（dlss5nvidia.com）：`src/content/dlssChecker.ts` 的 `GPU_ENTRIES` 与 `LOCAL_SOFTWARE`，
 *     是检测器与 `/download` 要求页的口径。
 *
 * 这个脚本把两份数据逐条对齐：同一型号的显存与状态、以及两边公开的 Studio 硬要求，
 * 任何一处不一致就退出码 1，用来当常驻回归。**只读，不改任何文件。**
 *
 * 用法：
 *   node scripts/check-two-site-gpu-consistency.mjs
 *   DLSS5MAIN_PATH=~/code/shou/dlss5main node scripts/check-two-site-gpu-consistency.mjs
 *   node scripts/check-two-site-gpu-consistency.mjs --json
 *
 * 主站仓库不在本机时打印 SKIP 并以 0 退出（本机开发回归，不阻塞构建）。
 */

import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const JSON_ONLY = process.argv.includes('--json');
const MAIN = resolve(
  (process.env.DLSS5MAIN_PATH || join(root, '..', 'dlss5main')).replace(/^~/, homedir()),
);
const mainDataFile = join(MAIN, 'src/content/dlssChecker.ts');
const appDataFile = join(root, 'src/data.ts');
const appStudioFile = join(root, 'src/pages/Studio.tsx');

if (!existsSync(mainDataFile)) {
  console.log(`SKIP: 找不到主站数据文件 ${mainDataFile}（用 DLSS5MAIN_PATH 指定主站仓库路径）`);
  process.exit(0);
}

/** `dlss5_status`（本站）与 `status`（主站）是同一根轴，必须一一对应。 */
const STATUS_MAP = {
  confirmed: 'confirmed',
  unconfirmed: 'unknown',
  no: 'unsupported',
};

const failures = [];
const notes = [];

// ---------- 本站 ----------
const appSource = readFileSync(appDataFile, 'utf8');
const appGpus = [...appSource.matchAll(/\{\s*"id":\s*"([^"]+)",\s*"series":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"vram_gb":\s*(\d+),\s*"dlss5":\s*(true|false),\s*"dlss5_status":\s*"([^"]+)"/g)]
  .map((m) => ({ id: m[1], series: m[2], name: m[3], vram: Number(m[4]), status: m[6] }));
if (!appGpus.length) failures.push('本站 src/data.ts 解析出 0 个型号 —— 解析规则与文件结构已脱节，请修脚本');

// ---------- 主站 ----------
const mainSource = readFileSync(mainDataFile, 'utf8');
const mainGpus = [...mainSource.matchAll(/slug:\s*'([^']+)',[\s\S]*?name:\s*'([^']+)',[\s\S]*?vramGb:\s*(\d+),[\s\S]*?status:\s*'([^']+)'/g)]
  .map((m) => ({ slug: m[1], name: m[2], vram: Number(m[3]), status: m[4] }));
if (!mainGpus.length) failures.push('主站 dlssChecker.ts 解析出 0 个型号 —— 解析规则与文件结构已脱节，请修脚本');

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const appByKey = new Map(appGpus.map((g) => [norm(g.name.replace(/^geforce\s+/i, '')), g]));

// ---------- 逐型号比对 ----------
const compared = [];
for (const main of mainGpus) {
  const key = norm(main.name.replace(/^geforce\s+/i, ''));
  const app = appByKey.get(key);
  const expected = STATUS_MAP[app?.status] ?? '(本站没有此型号)';
  if (!app) {
    notes.push(`主站独有：${main.name}（${main.slug}）—— 本站 data.ts 没有这条，暂不比对`);
  } else if (app.vram !== main.vram) {
    failures.push(`显存不一致 ${main.name}：本站 ${app.vram} GB vs 主站 ${main.vram} GB`);
  } else if (expected !== main.status) {
    failures.push(`状态不一致 ${main.name}：本站 ${app.status}（=主站轴 ${expected}）vs 主站 ${main.status}`);
  } else {
    compared.push(main.name);
  }
}
notes.push(`共同型号比对通过：${compared.length} 条（${compared.join('、')}）`);
notes.push(`本站型号数 ${appGpus.length}，主站型号数 ${mainGpus.length}`);

// ---------- 两站公开的 Studio 硬要求 ----------
function numbersIn(text) {
  return [...text.matchAll(/\d+(?:\.\d+)?/g)].map((m) => m[0]);
}
function requireAll(label, mainText, appText, requiredNumbers) {
  for (const n of requiredNumbers) {
    const inMain = mainText.includes(n);
    const inApp = appText.includes(n);
    if (!inMain || !inApp) {
      failures.push(`${label}：数字「${n}」在${inMain ? '主站' : '本站'}缺失（主站："${mainText.trim()}" / 本站："${appText.trim()}"）`);
    }
  }
}

const localSoftware = mainSource.match(/export const LOCAL_SOFTWARE = \{([\s\S]*?)\n\} as const;/)?.[1] ?? '';
if (!localSoftware) failures.push('主站 dlssChecker.ts 里没解析到 LOCAL_SOFTWARE');
const field = (name) => localSoftware.match(new RegExp(`${name}:\\s*'([^']*)'`))?.[1] ?? '';
const measuredBlock = localSoftware.match(/measured:\s*\{([\s\S]*?)\},/)?.[1] ?? '';

const appStudio = existsSync(appStudioFile) ? readFileSync(appStudioFile, 'utf8') : '';
if (!appStudio) failures.push(`本站的 Studio 要求页缺失：${appStudioFile}`);
const appStudioFlat = appStudio.replace(/\\n/g, ' ');

requireAll('Studio 系统要求', field('os'), appStudioFlat, ['1909', '11']);
requireAll('Studio GPU 要求', field('gpu'), appStudioFlat, ['20']);
requireAll('Studio 内存要求', field('memory'), appStudioFlat, ['8', '16']);
requireAll('Studio 磁盘要求', field('disk'), appStudioFlat, ['3']);
requireAll('Studio 驱动要求', field('driver'), appStudioFlat, ['610']);
requireAll('Studio 实测数字', measuredBlock, appStudioFlat, ['4090', '591.86', '87.4', '2.43']);

// 实测数字只应出现在 RTX 4090 的型号页上，别被复制到别的型号。
const appGpuContent = readFileSync(join(root, 'src/gpuDetailContent.ts'), 'utf8');
const measuredGuard = appGpuContent.includes("gpu.name === STUDIO_MEASURED.model");
if (!measuredGuard) failures.push('型号页没有把实测数字限制在 STUDIO_MEASURED.model（RTX 4090）上');

const result = {
  appModels: appGpus.length,
  mainModels: mainGpus.length,
  compared: compared.length,
  studioNumbersChecked: [...new Set([...numbersIn(field('os')), ...numbersIn(field('memory')), ...numbersIn(field('disk')), ...numbersIn(field('driver')), ...numbersIn(measuredBlock)])],
  failures,
  notes,
};

if (JSON_ONLY) {
  console.log(JSON.stringify(result, null, 2));
} else {
  for (const note of notes) console.log(`· ${note}`);
  for (const failure of failures) console.log(`✗ ${failure}`);
  console.log(
    `GPU-CONSISTENCY: app=${appGpus.length} main=${mainGpus.length} compared=${compared.length} mismatches=${failures.length} verdict=${failures.length ? 'MISMATCH' : 'OK'}`,
  );
}
process.exit(failures.length ? 1 : 0);
