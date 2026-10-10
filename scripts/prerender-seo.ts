import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import OpenCC from 'opencc-js';
import { gpuData } from '../src/data';
import { getGpuDetailContent } from '../src/gpuDetailContent';

const root = resolve(new URL('..', import.meta.url).pathname);
const dist = join(root, 'dist');
const baseUrl = 'https://www.dlss5.app';
const defaultOgImage = 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600';
const toTraditionalChinese = OpenCC.Converter({ from: 'cn', to: 'tw' });
const officialDlssSource = 'https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/';
const gpuEntries = gpuData.gpus;
const brandOrganization = {
  '@type': 'Organization',
  '@id': 'https://www.dlss5nvidia.com/#organization',
  name: 'DLSS 5 NVIDIA Independent Showcase',
  url: 'https://www.dlss5nvidia.com/',
  description: 'Independent, non-official AI image upscaling and neural super-resolution showcase.',
  sameAs: ['https://www.dlss5nvidia.com/', 'https://www.dlss5.app/'],
};

type Lang = 'en' | 'zh-CN' | 'zh-TW';

const gpuSeries = [
  ['RTX 50 Series', 'Blackwell', 'Confirmed'],
  ['RTX 40 Series', 'Ada Lovelace', 'Not confirmed by NVIDIA'],
  ['RTX 30 Series', 'Ampere', 'Not supported in the current official list'],
  ['RTX 20 Series', 'Turing', 'Not supported in the current official list'],
] as const;

const articleSlugs = readdirSync(join(root, 'src/content'))
  .filter(file => file.endsWith('.md'))
  .map(file => file.slice(0, -3));

/** 首页开场用的实时计数 —— 数字直接从数据集与路由表算出来，不手写。 */
const statusCounts = {
  confirmed: gpuEntries.filter(gpu => gpu.dlss5_status === 'confirmed').length,
  unconfirmed: gpuEntries.filter(gpu => gpu.dlss5_status === 'unconfirmed').length,
  outOfScope: gpuEntries.filter(gpu => gpu.dlss5_status === 'no').length,
};
const languageCount = 3;
const pageCount = languageCount * (4 + articleSlugs.length + gpuEntries.length);

const copy: Record<Lang, {
  title: string;
  description: string;
  h1: string;
  intro: string;
  checker: string;
  matrix: string;
  faq: string;
  blog: string;
  sourceNote: string;
}> = {
  en: {
    title: 'DLSS 5 GPU Evidence Checker | Sources, VRAM & Studio Readiness',
    description: 'Check 31 NVIDIA GeForce RTX models with source-linked DLSS 5 status, VRAM notes and a separate DLSS 5 Studio readiness guide.',
    h1: 'DLSS 5 GPU evidence checker — every model linked to a source',
    intro: `DLSS 5 is NVIDIA’s neural-rendering path: instead of computing every pixel with traditional lighting maths, it reconstructs lighting, materials and fine detail with a model trained on paired game-engine and photoreal reference images. This checker maps ${gpuEntries.length} GeForce RTX models to the NVIDIA source behind each status — ${statusCounts.confirmed} RTX 50-series Blackwell cards confirmed, ${statusCounts.unconfirmed} RTX 40-series Ada cards unconfirmed, and ${statusCounts.outOfScope} RTX 30/20-series Ampere and Turing cards outside the published scope. Every status is linked to the public evidence used for it, and none of it comes from community claims.`,
    checker: 'DLSS 5 supported cards by GPU series',
    matrix: 'DLSS 5, DLSS 4 and FSR 4 explained',
    faq: 'Frequently asked questions',
    blog: 'DLSS 5 technical guides and news',
    sourceNote: 'Independent reference. Hardware status is updated when NVIDIA publishes verifiable information; this site is not affiliated with NVIDIA.',
  },
  'zh-CN': {
    title: 'DLSS 5 显卡证据检测器｜来源、显存与 Studio 运行条件',
    description: '查询 31 款 NVIDIA GeForce RTX 显卡的 DLSS 5 状态、显存说明、来源链接，以及 DLSS 5 Studio 运行条件。',
    h1: 'DLSS 5 显卡证据检测器：每个型号都有来源',
    intro: `DLSS 5 是 NVIDIA 的神经渲染路径：它不再用传统光照数学逐像素计算，而是用模型重建光照、材质与细节，模型由游戏引擎画面与真实照片配对训练。本站把 ${gpuEntries.length} 款 GeForce RTX 型号逐一对应到 NVIDIA 公开来源——${statusCounts.confirmed} 款 RTX 50 系列 Blackwell 已确认，${statusCounts.unconfirmed} 款 RTX 40 系列 Ada 未确认，${statusCounts.outOfScope} 款 RTX 30/20 系列 Ampere 与 Turing 落在已公布范围之外。每条状态都挂上它依据的公开证据，没有一条来自社区说法。`,
    checker: '按 GPU 系列查看 DLSS 5 支持情况',
    matrix: 'DLSS 5、DLSS 4 与 FSR 4 说明',
    faq: '常见问题',
    blog: 'DLSS 5 技术指南与新闻',
    sourceNote: '独立资料页。NVIDIA 发布可核实信息后我们会更新硬件状态；本站与 NVIDIA 没有隶属关系。',
  },
  'zh-TW': {
    title: 'DLSS 5 顯示卡證據檢查器｜來源、顯存與 Studio 執行條件',
    description: '查詢 31 款 NVIDIA GeForce RTX 顯示卡的 DLSS 5 狀態、顯存說明、來源連結，以及 DLSS 5 Studio 執行條件。',
    h1: 'DLSS 5 顯示卡證據檢查器：每個型號都有來源',
    intro: `DLSS 5 是 NVIDIA 的神經渲染路徑：它不再用傳統光照數學逐像素計算，而是用模型重建光照、材質與細節，模型由遊戲引擎畫面與真實照片配對訓練。本站把 ${gpuEntries.length} 款 GeForce RTX 型號逐一對應到 NVIDIA 公開來源——${statusCounts.confirmed} 款 RTX 50 系列 Blackwell 已確認，${statusCounts.unconfirmed} 款 RTX 40 系列 Ada 尚未確認，${statusCounts.outOfScope} 款 RTX 30/20 系列 Ampere 與 Turing 落在已公佈範圍之外。每條狀態都掛上它依據的公開證據，沒有一條來自社群說法。`,
    checker: '按 GPU 系列查看 DLSS 5 支援情況',
    matrix: 'DLSS 5、DLSS 4 與 FSR 4 說明',
    faq: '常見問題',
    blog: 'DLSS 5 技術指南與新聞',
    sourceNote: '獨立資料頁。NVIDIA 發布可核實資訊後我們會更新硬體狀態；本站與 NVIDIA 沒有隸屬關係。',
  },
};

const faq: Record<Lang, Array<[string, string]>> = {
  en: [
    ['Does DLSS 5 require a new GPU?', 'NVIDIA has confirmed DLSS 5 Neural Rendering for RTX 50 series Blackwell hardware. RTX 40 support remains unconfirmed until NVIDIA publishes a compatible list.'],
    ['Can an RTX 4090 use DLSS 5?', 'The current official announcements do not confirm RTX 40 support. Check the card result and the linked NVIDIA source before making an upgrade decision.'],
    ['What is the difference between DLSS 5 and DLSS 4?', 'DLSS 4 focuses on reconstruction and frame generation. DLSS 5 adds a neural rendering path focused on lighting, materials and visual fidelity.'],
    ['When will DLSS 5 launch?', 'NVIDIA has announced a 2026 release window. A specific public launch date should be treated as unconfirmed until NVIDIA publishes one.'],
  ],
  'zh-CN': [
    ['DLSS 5 需要新的显卡吗？', 'NVIDIA 已确认 RTX 50 系列 Blackwell 支持 DLSS 5 神经渲染。RTX 40 系列要等 NVIDIA 发布兼容列表后才能下结论。'],
    ['RTX 4090 可以使用 DLSS 5 吗？', '目前官方公告没有确认 RTX 40 系列支持。升级前请查看显卡结果和对应的 NVIDIA 来源。'],
    ['DLSS 5 和 DLSS 4 有什么区别？', 'DLSS 4 侧重超分辨率与帧生成；DLSS 5 增加面向光照、材质和视觉保真的神经渲染路径。'],
    ['DLSS 5 什么时候发布？', 'NVIDIA 已公布 2026 年发布窗口。具体日期在官方发布前都应视为未确认。'],
  ],
  'zh-TW': [
    ['DLSS 5 需要新的顯示卡嗎？', 'NVIDIA 已確認 RTX 50 系列 Blackwell 支援 DLSS 5 神經渲染。RTX 40 系列需等 NVIDIA 發布相容清單後才能下結論。'],
    ['RTX 4090 可以使用 DLSS 5 嗎？', '目前官方公告沒有確認 RTX 40 系列支援。升級前請查看顯示卡結果和對應的 NVIDIA 來源。'],
    ['DLSS 5 和 DLSS 4 有什麼不同？', 'DLSS 4 側重超解析度與影格生成；DLSS 5 增加面向光照、材質和視覺保真的神經渲染路徑。'],
    ['DLSS 5 何時發布？', 'NVIDIA 已公布 2026 年發布窗口。具體日期在官方發布前都應視為未確認。'],
  ],
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char));
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    let value = line.slice(separator + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    meta[line.slice(0, separator).trim()] = value;
  }
  return { meta, body: match[2] };
}

function languageBody(body: string, lang: Lang): string {
  const english = '<!-- ============================================================\n     ENGLISH VERSION\n     ============================================================ -->';
  const chinese = '<!-- ============================================================\n     CHINESE VERSION (中文版)\n     ============================================================ -->';
  if (!body.includes(chinese)) return body.replace(english, '');
  const parts = body.split(chinese);
  return lang === 'en' ? parts[0].replace(english, '') : (parts[1] || parts[0]);
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const html: string[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length) {
      const text = paragraph.join(' ').trim();
      if (text) html.push(`<p>${inline(text)}</p>`);
      paragraph = [];
    }
  };
  const inline = (text: string) => escapeHtml(text)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '---') { flush(); continue; }
    if (trimmed.startsWith('# ')) { flush(); html.push(`<h2>${inline(trimmed.slice(2))}</h2>`); continue; }
    if (trimmed.startsWith('## ')) { flush(); html.push(`<h2>${inline(trimmed.slice(3))}</h2>`); continue; }
    if (trimmed.startsWith('### ')) { flush(); html.push(`<h3>${inline(trimmed.slice(4))}</h3>`); continue; }
    if (trimmed.startsWith('> ')) { flush(); html.push(`<blockquote>${inline(trimmed.slice(2))}</blockquote>`); continue; }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) { flush(); html.push(`<p>• ${inline(trimmed.slice(2))}</p>`); continue; }
    paragraph.push(trimmed);
  }
  flush();
  return html.join('\n');
}

function localizedStatus(lang: Lang, status: string): string {
  if (lang === 'en') return status;
  if (status === 'confirmed') return lang === 'zh-TW' ? '已確認' : '已确认';
  if (status === 'unconfirmed') return lang === 'zh-TW' ? '尚未獲 NVIDIA 確認' : 'NVIDIA 尚未确认';
  return lang === 'zh-TW' ? '目前官方清單不支援' : '当前官方列表不支持';
}

function gpuRows(lang: Lang): string {
  return gpuEntries.map(gpu => `<tr><th scope="row"><a href="/${lang}/gpu/${gpu.id}">${escapeHtml(gpu.name)}</a></th><td>${escapeHtml(String(gpu.vram_gb))} GB</td><td>${escapeHtml(gpuData.gpu_series.find(series => series.id === gpu.series)?.architecture || '')}</td><td>${escapeHtml(localizedStatus(lang, gpu.dlss5_status))}</td><td>${escapeHtml(gpu.note)}</td><td><a href="${officialDlssSource}">${lang === 'en' ? 'NVIDIA source' : lang === 'zh-TW' ? 'NVIDIA 來源' : 'NVIDIA 来源'}</a></td></tr>`).join('');
}

function homeBody(lang: Lang): string {
  const c = copy[lang];
  const questions = faq[lang];
  const questionsHtml = questions.map(([q, a]) => `<section><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></section>`).join('');
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  const tableTitle = isEnglish ? `${gpuEntries.length} GeForce RTX models with source-linked status` : isTraditional ? `${gpuEntries.length} 款 GeForce RTX 型號與來源狀態` : `${gpuEntries.length} 款 GeForce RTX 型号与来源状态`;
  const tableIntro = isEnglish ? 'The model-level data is intentionally visible in the HTML: VRAM, architecture, status, notes and the NVIDIA source used for our evidence boundary.' : isTraditional ? '型號級資料直接呈現在頁面中：顯存、架構、狀態、備註，以及我們用來劃定證據範圍的 NVIDIA 來源。' : '型号级数据直接呈现在页面中：显存、架构、状态、备注，以及我们用来划定证据范围的 NVIDIA 来源。';
  const headers = isEnglish ? ['GPU model', 'VRAM', 'Architecture', 'DLSS 5 status', 'Note', 'Evidence'] : isTraditional ? ['顯示卡型號', '顯存', '架構', 'DLSS 5 狀態', '備註', '證據'] : ['显卡型号', '显存', '架构', 'DLSS 5 状态', '备注', '证据'];
  const seriesLinks = gpuData.gpu_series.map(series => `<a href="/${lang}/supported-cards#${series.id}">${escapeHtml(series.name)}</a>`).join(' · ');
  const studioTitle = isEnglish ? 'DLSS 5 Studio: the local software track' : isTraditional ? 'DLSS 5 Studio：本機軟體路線' : 'DLSS 5 Studio：本地软件路线';
  const studioCopy = isEnglish ? 'Game-internal DLSS 5 support and our local Studio software are separate questions. Studio is designed for Windows 10 1909+/Windows 11 with RTX 20-series or newer; NVENC hardware encoding requires driver 610+, and the published 4090 measurement is 720p to 2560×1440 H.264 in 87.4 seconds (2.43 s/frame).' : isTraditional ? '遊戲內 DLSS 5 支援與本機 Studio 軟體是兩條獨立判定軸。Studio 針對 Windows 10 1909+/Windows 11 與 RTX 20 系列以上設計；NVENC 硬體編碼需要 610+ 驅動程式，已公開的 4090 實測為 720p 轉 2560×1440 H.264，用時 87.4 秒（2.43 秒/幀）。' : '游戏内 DLSS 5 支持与本地 Studio 软件是两条独立判断轴。Studio 面向 Windows 10 1909+/Windows 11 与 RTX 20 系列以上设计；NVENC 硬件编码需要 610+ 驱动，已公开的 4090 实测为 720p 转 2560×1440 H.264，用时 87.4 秒（2.43 秒/帧）。';
  const methodTitle = isEnglish ? 'How to read this checker' : isTraditional ? '如何閱讀這份檢查器' : '如何阅读这份检测器';
  const methodCopy = isEnglish ? 'Official means NVIDIA has published the scope. Unconfirmed means we found no official model statement. The table does not turn community claims into a support guarantee; recheck the linked source before buying or upgrading.' : isTraditional ? '「官方確認」代表 NVIDIA 已公開支援範圍；「尚未確認」代表我們沒有找到官方型號聲明。表格不會把社群說法變成支援保證；購買或升級前請重新核對連結來源。' : '“官方确认”代表 NVIDIA 已公开支持范围；“尚未确认”代表我们没有找到官方型号声明。表格不会把社区说法变成支持保证；购买或升级前请重新核对链接来源。';
  // 自足段：把「这是什么站」一段话讲清，AI 不必拼 H1 和表格才能引用。
  const keyFacts = isEnglish
    ? `Neural Architect is an independent, free DLSS 5 GPU compatibility checker at https://www.dlss5.app, published in English, Simplified Chinese and Traditional Chinese across ${pageCount} pages. It is not affiliated with NVIDIA, and it publishes no compatibility claim that is not backed by an official NVIDIA source.`
    : isTraditional
      ? `Neural Architect 是獨立的免費 DLSS 5 顯示卡相容性檢查器，網站在 https://www.dlss5.app，以英文、簡體中文、繁體中文三種語言共 ${pageCount} 個頁面發佈。本站與 NVIDIA 沒有隸屬關係，凡是官方來源支持不了的相容性結論，我們都不寫。`
      : `Neural Architect 是独立的免费 DLSS 5 显卡兼容性检测器，站点在 https://www.dlss5.app，以英文、简体中文、繁体中文三种语言共 ${pageCount} 个页面发布。本站与 NVIDIA 没有隶属关系，凡是官方来源支持不了的兼容性结论，我们都不写。`;
  const statusTable = isEnglish
    ? {
      title: 'What each status means',
      head: ['Status', 'What it means', 'Evidence required'],
      rows: [
        ['confirmed', 'NVIDIA has published a scope covering this model', 'Official NVIDIA statement or gameplay list'],
        ['unconfirmed', 'No official model-level statement exists yet', 'NVIDIA source linked; community claims excluded'],
        ['no', 'Outside the published compatibility scope', 'Architecture plus official compatibility information'],
      ],
    }
    : isTraditional
      ? {
        title: '三種狀態分別代表什麼',
        head: ['狀態', '含義', '需要的證據'],
        rows: [
          ['已確認', 'NVIDIA 已公佈涵蓋該型號的適用範圍', 'NVIDIA 官方聲明或遊戲名單'],
          ['尚未確認', '目前沒有官方型號級聲明', '掛上 NVIDIA 來源；不採信社群說法'],
          ['不支援', '落在已公佈的相容範圍之外', '架構資訊與官方相容說明'],
        ],
      }
      : {
        title: '三种状态分别代表什么',
        head: ['状态', '含义', '需要的证据'],
        rows: [
          ['已确认', 'NVIDIA 已公布覆盖该型号的适用范围', 'NVIDIA 官方声明或游戏名单'],
          ['未确认', '目前没有官方型号级声明', '挂上 NVIDIA 来源；不采信社区说法'],
          ['不支持', '落在已公布的兼容范围之外', '架构信息与官方兼容说明'],
        ],
      };
  const statusTableHtml = `<table><caption>${escapeHtml(statusTable.title)}</caption><thead><tr>${statusTable.head.map(cell => `<th>${escapeHtml(cell)}</th>`).join('')}</tr></thead><tbody>${statusTable.rows.map(row => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  return `<main class="seo-shell"><header><p class="eyebrow">${isEnglish ? 'EVIDENCE-FIRST GPU CHECKER' : isTraditional ? '以證據為先的 GPU 檢查器' : '以证据为先的 GPU 检测器'}</p><h1>${escapeHtml(c.h1)}</h1><p class="lede">${escapeHtml(c.intro)}</p><p class="key-facts">${escapeHtml(keyFacts)}</p><form action="/${lang}" method="get"><label for="gpu-query">${isEnglish ? 'GPU model' : isTraditional ? '顯示卡型號' : '显卡型号'}</label><input id="gpu-query" name="gpu" placeholder="RTX 5090" /><button type="submit">${isEnglish ? 'Check compatibility' : isTraditional ? '檢查相容性' : '检查兼容性'}</button></form></header><section><h2>${escapeHtml(tableTitle)}</h2><p>${tableIntro}</p><table><thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${gpuRows(lang)}</tbody></table><p class="source-note">${escapeHtml(c.sourceNote)} <a href="/${lang}/supported-cards">${isEnglish ? 'Open the methodology and FAQ →' : isTraditional ? '查看方法與常見問題 →' : '查看方法与常见问题 →'}</a></p><p>${seriesLinks}</p></section><section><h2>${studioTitle}</h2><p>${studioCopy}</p><p><a href="/${lang}/studio">${isEnglish ? 'See DLSS 5 Studio requirements and measurements →' : isTraditional ? '查看 DLSS 5 Studio 要求與實測 →' : '查看 DLSS 5 Studio 要求与实测 →'}</a> · <a href="https://www.dlss5nvidia.com/download">${isEnglish ? 'Open the download page' : isTraditional ? '前往下載頁' : '前往下载页'}</a></p></section><section><h2>${methodTitle}</h2><p>${methodCopy}</p>${statusTableHtml}<p><a href="${officialDlssSource}">${isEnglish ? 'Read NVIDIA’s official DLSS 5 announcement' : isTraditional ? '閱讀 NVIDIA 官方 DLSS 5 公告' : '阅读 NVIDIA 官方 DLSS 5 公告'}</a> · <a href="/${lang}/blog">${isEnglish ? 'Browse technical guides →' : isTraditional ? '瀏覽技術指南 →' : '浏览技术指南 →'}</a></p></section><section><h2>${escapeHtml(c.faq)}</h2>${questionsHtml}</section><section><h2>${escapeHtml(c.blog)}</h2><p><a href="/${lang}/blog">${isEnglish ? 'Browse all technical guides and comparisons →' : isTraditional ? '瀏覽全部技術指南與比較文章 →' : '浏览全部技术指南与对比文章 →'}</a></p></section></main>`;
}

function gpuDetailBody(lang: Lang, id: string): string {
  const gpu = gpuEntries.find(entry => entry.id === id);
  if (!gpu) return `<main class="seo-shell"><h1>Not found</h1><p><a href="/${lang}">Back to the checker</a></p></main>`;
  const series = gpuData.gpu_series.find(entry => entry.id === gpu.series);
  const copy = getGpuDetailContent(lang, gpu, series, gpuData.feature_matrix, gpuEntries, gpuData.spec_sources);
  const paragraphs = (values: string[]) => values.map(value => `<p>${escapeHtml(value)}</p>`).join('');
  const steps = copy.nextSteps.map(step => `<li>${escapeHtml(step)}</li>`).join('');
  const faq = copy.faq.map(item => `<div><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></div>`).join('');
  const rows = (values: Array<{ label: string; value: string }>) => values.map(row => `<tr><th scope="row">${escapeHtml(row.label)}</th><td>${escapeHtml(row.value)}</td></tr>`).join('');
  const verdictClass: Record<string, string> = { met: 'verdict-met', below: 'verdict-below', info: 'verdict-info' };
  const studioRows = copy.studioChecks.map(check => `<tr><th scope="row">${escapeHtml(check.label)}</th><td class="${verdictClass[check.verdict] || ''}">${escapeHtml(check.value)}</td></tr>`).join('');
  const peerItems = copy.peers.map(peer => `<li><a href="/${lang}/gpu/${peer.id}">${escapeHtml(peer.name || peer.id)}</a> · ${escapeHtml(String(peer.vram_gb))} GB${peer.spec ? ` · ${peer.spec.cores.toLocaleString('en-US')} CUDA cores` : ''}</li>`).join('');
  const isTraditional = lang === 'zh-TW';
  const isChinese = lang !== 'en';
  const specSource = copy.specSourceUrl
    ? `<p class="source-note">${escapeHtml(copy.specSourceLabel)}：<a href="${escapeHtml(copy.specSourceUrl)}">${escapeHtml(copy.specSourceUrl)}</a> — ${escapeHtml(copy.specSourceNote)}</p>`
    : '';
  const specSection = `<section><h2>${escapeHtml(copy.specHeading)}</h2>${copy.specRows.length ? `<table><tbody>${rows(copy.specRows)}</tbody></table>` : ''}${paragraphs(copy.specParagraphs)}${specSource}</section>`;
  const toolHref = gpu.series === 'rtx50' ? '/game-character-style' : gpu.series === 'rtx40' ? '/video-upscaler' : '/image-quality-enhancer';
  const toolLabel = gpu.series === 'rtx50'
    ? (isChinese ? (isTraditional ? '在 DLSS5NVIDIA 試用人物風格轉換 →' : '在 DLSS5NVIDIA 试用人物风格转换 →') : 'Try character style conversion on DLSS5NVIDIA →')
    : gpu.series === 'rtx40'
      ? (isChinese ? (isTraditional ? '在 DLSS5NVIDIA 查看影片增強工作流程 →' : '在 DLSS5NVIDIA 查看视频增强工作流 →') : 'Open the video enhancement workflow on DLSS5NVIDIA →')
      : (isChinese ? (isTraditional ? '在 DLSS5NVIDIA 開啟影像品質增強器 →' : '在 DLSS5NVIDIA 打开图像质量增强器 →') : 'Open the image quality enhancer on DLSS5NVIDIA →');
  return `<main class="seo-shell"><header><p class="eyebrow">${escapeHtml(copy.eyebrow)}</p><h1>${escapeHtml(copy.title)}</h1><p class="lede">${escapeHtml(gpu.name)} · ${escapeHtml(series?.architecture || '')} · ${escapeHtml(String(gpu.vram_gb))} GB VRAM</p></header><section><h2>${escapeHtml(copy.statusHeading)}</h2><p>${escapeHtml(copy.statusExplanation)}</p><p><strong>${escapeHtml(copy.status)}</strong></p><p>${escapeHtml(copy.modelNoteLabel)}：${escapeHtml(gpu.note)}</p><p>${escapeHtml(copy.sourceLabel)}：<a href="${officialDlssSource}">${officialDlssSource}</a></p><p class="source-note">${escapeHtml(copy.disclaimer)}</p></section><section><h2>${escapeHtml(copy.factsHeading)}</h2><table><tbody>${rows(copy.facts)}</tbody></table><h3>${escapeHtml(copy.evidenceHeading)}</h3>${paragraphs(copy.evidenceParagraphs)}</section>${specSection}<section><h2>${escapeHtml(copy.studioHeading)}</h2><p class="${verdictClass[copy.studioVerdictTone] || ''}">${escapeHtml(copy.studioVerdict)}</p><table><tbody>${studioRows}</tbody></table>${paragraphs(copy.studioParagraphs)}</section><section><h2>${escapeHtml(copy.featuresHeading)}</h2><table><tbody>${rows(copy.featureRows)}</tbody></table>${paragraphs(copy.featureParagraphs)}</section><section><h2>${escapeHtml(copy.peersHeading)}</h2><ul>${peerItems}</ul>${paragraphs(copy.peersParagraphs)}</section><section><h2>${escapeHtml(copy.nextHeading)}</h2><ol>${steps}</ol></section><section><h2>${escapeHtml(copy.faqHeading)}</h2>${faq}</section><p><a href="/${lang}">← ${escapeHtml(copy.back)}</a> · <a href="/${lang}/studio">${escapeHtml(copy.studioLink)}</a> · <a href="/${lang}/blog">${escapeHtml(copy.guidesLink)}</a> · <a href="https://www.dlss5nvidia.com${toolHref}">${escapeHtml(toolLabel)}</a></p></main>`;
}

function studioBody(lang: Lang): string {
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  const title = isEnglish ? 'DLSS 5 Studio local software requirements and measured performance' : isTraditional ? 'DLSS 5 Studio 本機軟體要求與實測效能' : 'DLSS 5 Studio 本地软件要求与实测性能';
  const intro = isEnglish ? 'A separate local-software reference for the DLSS 5 Studio / Visual Enhancer workflow. It is not the same as game-internal DLSS 5 support.' : isTraditional ? '這是 DLSS 5 Studio／Visual Enhancer 工作流程的獨立本機軟體資料頁，與遊戲內 DLSS 5 支援是不同判定。' : '这是 DLSS 5 Studio／Visual Enhancer 工作流的独立本地软件资料页，与游戏内 DLSS 5 支持是不同判断。';
  const rows = isEnglish ? [['OS', 'Windows 10 1909+ or Windows 11'], ['GPU', 'RTX 20 series or newer for the published Studio path'], ['Memory / disk', '8–16 GB RAM and about 3 GB free disk space'], ['NVENC', 'Hardware video encoding requires driver 610+; older drivers can fall back to software encoding'], ['Measured run', 'RTX 4090 24 GB · driver 591.86 · 720p → 2560×1440 H.264 · 87.4 s (2.43 s/frame)']] : isTraditional ? [['作業系統', 'Windows 10 1909+ 或 Windows 11'], ['GPU', '已公開的 Studio 路徑支援 RTX 20 系列以上'], ['記憶體／磁碟', '8–16 GB 記憶體，約 3 GB 可用磁碟空間'], ['NVENC', '硬體影片編碼需要 610+ 驅動程式；較舊驅動可退回軟體編碼'], ['實測', 'RTX 4090 24 GB · 驅動程式 591.86 · 720p → 2560×1440 H.264 · 87.4 秒（2.43 秒／幀）']] : [['操作系统', 'Windows 10 1909+ 或 Windows 11'], ['GPU', '已公开的 Studio 路径支持 RTX 20 系列以上'], ['内存／磁盘', '8–16 GB 内存，约 3 GB 可用磁盘空间'], ['NVENC', '硬件视频编码需要 610+ 驱动；较旧驱动可回退软件编码'], ['实测', 'RTX 4090 24 GB · 驱动 591.86 · 720p → 2560×1440 H.264 · 87.4 秒（2.43 秒/帧）']];
  const method = isEnglish ? 'The 87.4-second result is one measured machine/configuration, not a real-time guarantee. Add a second 12 GB card benchmark before making broader performance claims.' : isTraditional ? '87.4 秒是單一機器與設定的實測，不代表即時處理保證。在擴大效能口徑前，還需要補一張 12 GB 顯示卡的實測。' : '87.4 秒是单一机器与设置的实测，不代表实时处理保证。在扩大性能口径前，还需要补一张 12 GB 显卡的实测。';
  const back = isEnglish ? 'Back to the GPU evidence checker' : isTraditional ? '返回 GPU 證據檢查器' : '返回 GPU 证据检测器';
  return `<main class="seo-shell"><header><p class="eyebrow">DLSS 5 STUDIO · LOCAL SOFTWARE</p><h1>${title}</h1><p class="lede">${intro}</p></header><section><h2>${isEnglish ? 'Requirements and measured result' : isTraditional ? '要求與實測結果' : '要求与实测结果'}</h2><table><thead><tr><th>${isEnglish ? 'Item' : isTraditional ? '項目' : '项目'}</th><th>${isEnglish ? 'Published or measured detail' : isTraditional ? '公開或實測內容' : '公开或实测内容'}</th></tr></thead><tbody>${rows.map(([name, value]) => `<tr><th scope="row">${name}</th><td>${value}</td></tr>`).join('')}</tbody></table><p class="source-note">${method}</p></section><section><h2>${isEnglish ? 'Keep the two support questions separate' : isTraditional ? '請分開兩條支援判定' : '请分开两条支持判断'}</h2><p>${isEnglish ? 'The GPU table answers whether NVIDIA has published game-internal DLSS 5 scope. This page answers whether the local Studio workflow can be installed and measured on your machine. One does not prove the other.' : isTraditional ? 'GPU 表格回答 NVIDIA 是否公開遊戲內 DLSS 5 範圍；本頁回答本機 Studio 工作流程能否在你的電腦安裝並實測。兩者不能互相推導。' : 'GPU 表格回答 NVIDIA 是否公开游戏内 DLSS 5 范围；本页回答本地 Studio 工作流能否在你的电脑安装并实测。两者不能互相推导。'}</p></section><p><a href="/${lang}">← ${back}</a> · <a href="https://www.dlss5nvidia.com/download">${isEnglish ? 'Open the Studio download page' : isTraditional ? '前往 Studio 下載頁' : '前往 Studio 下载页'}</a></p></main>`;
}

function supportedCardsBody(lang: Lang): string {
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  const questions = isEnglish
    ? [
        ['Which GPUs support DLSS 5?', 'NVIDIA has confirmed DLSS 5 for GeForce RTX 50 Series Blackwell hardware. RTX 40 support remains unconfirmed until NVIDIA publishes a compatibility statement.'],
        ['Can an RTX 4090 run DLSS 5?', 'No official NVIDIA confirmation is available yet. Treat the RTX 4090 as unconfirmed rather than assuming support or rejection.'],
        ['Is this an official NVIDIA checker?', 'No. This is an independent reference that links each status to public NVIDIA information and does not scan your computer.'],
        ['How often is the matrix updated?', 'We update entries when NVIDIA publishes verifiable driver, game or hardware information. Recheck the linked source before making an upgrade decision.'],
      ]
    : [
        [isTraditional ? '哪些顯示卡支援 DLSS 5？' : '哪些显卡支持 DLSS 5？', isTraditional ? '目前 NVIDIA 已確認 RTX 50 系列 Blackwell 支援 DLSS 5；RTX 40 系列需等待 NVIDIA 的相容性公告。' : '目前 NVIDIA 已确认 RTX 50 系列 Blackwell 支持 DLSS 5；RTX 40 系列需等待 NVIDIA 的兼容性公告。'],
        [isTraditional ? 'RTX 4090 能執行 DLSS 5 嗎？' : 'RTX 4090 能运行 DLSS 5 吗？', isTraditional ? '目前沒有 NVIDIA 官方確認。請把 RTX 4090 視為未確認，而不是已支援或已不支援。' : '目前没有 NVIDIA 官方确认。请把 RTX 4090 视为未确认，而不是已支持或已不支持。'],
        [isTraditional ? '這個檢查器是 NVIDIA 官方工具嗎？' : '这个检测器是 NVIDIA 官方工具吗？', isTraditional ? '不是。這是獨立資料頁，整理公開的 NVIDIA 公告並標註核對日期，不會掃描你的電腦。' : '不是。它是独立资料页，整理公开的 NVIDIA 公告并标注核对日期，不会扫描你的电脑。'],
        [isTraditional ? '顯示卡狀態多久更新一次？' : '显卡状态多久更新一次？', isTraditional ? '當 NVIDIA 發布可核實的驅動程式、遊戲或硬體資訊時更新；每條結論都應回到來源核對。' : '当 NVIDIA 发布可核实的驱动、游戏或硬件信息时更新；每条结论都应回到来源核对。'],
      ];
  const rows = gpuSeries.map(([series, architecture, status]) => {
    const translatedStatus = isEnglish
      ? status
      : status === 'Confirmed'
        ? (isTraditional ? '已確認' : '已确认')
        : status === 'Not confirmed by NVIDIA'
          ? (isTraditional ? 'NVIDIA 尚未確認' : 'NVIDIA 尚未确认')
          : (isTraditional ? '目前官方清單不支援' : '当前官方列表不支持');
    return `<tr><th scope="row">${escapeHtml(isEnglish ? series : series.replace('RTX ', 'GeForce RTX '))}</th><td>${escapeHtml(architecture)}</td><td>${escapeHtml(translatedStatus)}</td></tr>`;
  }).join('');
  const questionsHtml = questions.map(([q, a]) => `<section><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></section>`).join('');
  const title = isEnglish ? 'DLSS 5 Supported Cards & GPU Compatibility Checker' : isTraditional ? 'DLSS 5 支援顯示卡與 GPU 相容性檢查器' : 'DLSS 5 支持的显卡与 GPU 兼容性检测器';
  const guide = isEnglish ? 'EVIDENCE-BASED GPU GUIDE' : isTraditional ? '基於證據的 GPU 指南' : '基于证据的 GPU 指南';
  const intro = isEnglish ? 'Check DLSS 5 support by GPU family, architecture and official evidence. Unknown stays unknown until NVIDIA publishes a verifiable statement.' : isTraditional ? '按 GPU 系列、架構和官方證據查看 DLSS 5 支援狀態；沒有原文依據的型號會保留為未確認。' : '按 GPU 系列、架构和官方证据查看 DLSS 5 支持状态；没有原文依据的型号会保留为未确认。';
  const matrix = isEnglish ? 'DLSS 5 GPU support matrix' : isTraditional ? 'DLSS 5 GPU 支援矩陣' : 'DLSS 5 GPU 支持矩阵';
  const source = isEnglish ? 'Source: ' : isTraditional ? '資料來源：' : '资料来源：';
  const disclaimer = isEnglish ? 'Independent reference; not affiliated with NVIDIA.' : isTraditional ? '本站與 NVIDIA 沒有隸屬關係。' : '本站与 NVIDIA 没有隶属关系。';
  const faqTitle = isEnglish ? 'Compatibility FAQ' : isTraditional ? '相容性常見問題' : '兼容性常见问题';
  const back = isEnglish ? '← Back to the GPU checker' : isTraditional ? '← 返回 GPU 檢查器首頁' : '← 返回 GPU 检测器首页';
  const converter = isEnglish ? 'Try the free visual converter' : isTraditional ? '試用免費的視覺轉換器' : '试用免费的视觉转换器';
  return `<main class="seo-shell"><header><p class="eyebrow">${guide}</p><h1>${title}</h1><p class="lede">${intro}</p></header><section><h2>${matrix}</h2><table><thead><tr><th>GPU series</th><th>Architecture</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table><p class="source-note">${source}<a href="https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/">NVIDIA DLSS 5 launch article</a>. ${disclaimer}</p></section><section><h2>${faqTitle}</h2>${questionsHtml}</section><p><a href="/${lang}">${back}</a> · <a href="https://www.dlss5nvidia.com/download">${converter}</a> · <a href="https://www.dlss5nvidia.com/models">${isEnglish ? 'Browse model workflows' : isTraditional ? '瀏覽模型工作流程' : '浏览模型工作流'}</a> · <a href="https://www.dlss5nvidia.com/comparisons">${isEnglish ? 'Compare visual workflows' : isTraditional ? '比較視覺工作流程' : '比较视觉工作流'}</a></p></main>`;
}

function blogBody(lang: Lang): string {
  const isEnglish = lang === 'en';
  const items = articleSlugs.map(slug => {
    const { meta } = parseFrontmatter(readFileSync(join(root, 'src/content', `${slug}.md`), 'utf8'));
    const title = localizedArticleMeta(meta, lang).title;
    const description = localizedArticleMeta(meta, lang).description;
    return `<article><h2><a href="/${lang}/blog/${slug}">${escapeHtml(title)}</a></h2><p>${escapeHtml(description)}</p><time datetime="${escapeHtml(meta.date || '')}">${escapeHtml(meta.date || '')}</time></article>`;
  }).join('');
  const c = copy[lang];
  const intro = isEnglish
    ? 'Independent explainers on DLSS 5 hardware, neural rendering, game settings and AI image tools.'
    : lang === 'zh-TW'
      ? '獨立整理 DLSS 5 硬體、神經渲染、遊戲設定與 AI 圖像工具的技術解讀。'
      : '关于 DLSS 5 硬件、神经渲染、游戏设置和 AI 图片工具的独立解读。';
  const workflow = isEnglish
    ? 'Looking for the workflow side of these conclusions? <a href="https://www.dlss5nvidia.com/blog">Open the DLSS5NVIDIA workflow guides →</a>'
    : lang === 'zh-TW'
      ? '想知道怎麼把這些結論用在圖片與影片上？<a href="https://www.dlss5nvidia.com/blog">前往 DLSS5NVIDIA 工作流程指南 →</a>'
      : '想知道怎么把这些结论用在图片和视频上？<a href="https://www.dlss5nvidia.com/blog">前往 DLSS5NVIDIA 工作流指南 →</a>';
  return `<main class="seo-shell"><header><p class="eyebrow">${isEnglish ? 'NEURAL ARCHITECT' : 'NEURAL ARCHITECT'}</p><h1>${escapeHtml(c.blog)}</h1><p class="lede">${intro}</p><p>${workflow}</p></header><section class="article-list">${items}</section></main>`;
}

function localizedArticleMeta(meta: Record<string, string>, lang: Lang): { title: string; description: string } {
  if (lang === 'en') return { title: meta.title, description: meta.description };
  const title = meta.title_cn || meta.title;
  const description = meta.description_cn || meta.description;
  return lang === 'zh-TW'
    ? { title: toTraditionalChinese(title), description: toTraditionalChinese(description) }
    : { title, description };
}

function articleBody(lang: Lang, slug: string): { body: string; meta: Record<string, string> } {
  const parsed = parseFrontmatter(readFileSync(join(root, 'src/content', `${slug}.md`), 'utf8'));
  const { title, description } = localizedArticleMeta(parsed.meta, lang);
  const localizedBody = lang === 'zh-TW' ? toTraditionalChinese(languageBody(parsed.body, lang)) : languageBody(parsed.body, lang);
  const body = markdownToHtml(localizedBody.replace(/\]\(\/(?:tool|__studio__)\)/g, `](/${lang}/studio)`));
  const eyebrow = lang === 'en' ? 'DLSS 5 TECHNICAL GUIDE' : lang === 'zh-TW' ? 'DLSS 5 技術指南' : 'DLSS 5 技术指南';
  const back = lang === 'en' ? 'Back to all guides' : lang === 'zh-TW' ? '返回全部指南' : '返回全部指南';
  const converter = lang === 'en' ? 'Try the free DLSS 5 visual converter' : lang === 'zh-TW' ? '試用免費的 DLSS 5 視覺轉換工具' : '试用免费的 DLSS 5 视觉转换工具';
  // 同主题的姊妹篇在主站（角度不同：那边讲流程与工具，这边讲硬件与证据）。frontmatter 的
  // counterpart 是这条关系的唯一登记处，没有登记就不渲染这一行。
  const counterpart = parsed.meta.counterpart
    ? `<p class="source-note">${lang === 'en' ? 'This topic is covered from the workflow side on DLSS5NVIDIA' : lang === 'zh-TW' ? '同一主題在 DLSS5NVIDIA 有工作流程角度的版本' : '同一主题在 DLSS5NVIDIA 有工作流角度的版本'}：<a href="${escapeHtml(parsed.meta.counterpart)}">${escapeHtml(parsed.meta.counterpart)}</a></p>`
    : '';
  const reviewed = parsed.meta.reviewed || parsed.meta.date || '';
  const reviewedLabel = lang === 'en' ? 'Last reviewed' : lang === 'zh-TW' ? '內容複審' : '内容复审';
  const reviewedHtml = reviewed
    ? `<p class="article-meta"><time datetime="${escapeHtml(parsed.meta.date || '')}">${escapeHtml(parsed.meta.date || '')}</time><span class="reviewed">${reviewedLabel} <time datetime="${escapeHtml(reviewed)}">${escapeHtml(reviewed)}</time></span></p>`
    : '';
  return { meta: { ...parsed.meta, title, description }, body: `<main class="seo-shell article-shell"><article><p class="eyebrow">${eyebrow}</p><h1>${escapeHtml(title)}</h1><p class="lede">${escapeHtml(description)}</p>${reviewedHtml}<div class="article-content">${body}</div>${counterpart}<p><a href="/${lang}/blog">← ${back}</a> · <a href="https://www.dlss5nvidia.com/download">${converter}</a></p></article></main>` };
}

function documentFor(route: string, lang: Lang, title: string, description: string, body: string, type: 'website' | 'article', jsonLd: unknown, robots = 'index,follow', image = defaultOgImage): string {
  const template = readFileSync(join(dist, 'index.html'), 'utf8');
  const canonical = `${baseUrl}${route === '/' ? `/${lang}` : route}`;
  const suffix = route === '/' ? '' : route.slice(`/${lang}`.length);
  const alternates = route === '/'
    ? ''
    : [
      ['en', `${baseUrl}/en${suffix}`],
      ['zh-CN', `${baseUrl}/zh-CN${suffix}`],
      ['zh-TW', `${baseUrl}/zh-TW${suffix}`],
      ['x-default', `${baseUrl}/en${suffix}`],
    ].map(([hreflang, href]) => `<link rel="alternate" hreflang="${hreflang}" href="${href}"/>`).join('');
  const graph = jsonLd && typeof jsonLd === 'object' && Array.isArray((jsonLd as { '@graph'?: unknown[] })['@graph'])
    ? (jsonLd as { '@graph': unknown[] })['@graph']
    : [jsonLd];
  const normalizedJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [brandOrganization, ...graph.filter((node) => Boolean(node) && (node as { '@type'?: string })['@type'] !== 'Organization')],
  };
  const head = `<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"/><meta name="robots" content="${robots}"/><link rel="canonical" href="${canonical}"/>${alternates}<meta property="og:title" content="${escapeHtml(title)}"/><meta property="og:description" content="${escapeHtml(description)}"/><meta property="og:type" content="${type}"/><meta property="og:url" content="${canonical}"/><meta property="og:image" content="${escapeHtml(image)}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:image" content="${escapeHtml(image)}"/><script type="application/ld+json">${JSON.stringify(normalizedJsonLd)}</script>`;
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="description"[^>]*\/>/g, '')
    .replace(/\s*<meta name="robots"[^>]*\/>/g, '')
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function writeRoute(route: string, html: string): void {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function writeNotFoundPage(): void {
  const template = readFileSync(join(dist, 'index.html'), 'utf8');
  const title = 'Page not found | Neural Architect';
  const description = 'The requested Neural Architect page could not be found.';
  const body = '<main class="seo-shell"><header><p class="eyebrow">NEURAL ARCHITECT</p><h1>Page not found</h1><p class="lede">The page you requested does not exist or may have moved.</p></header><p><a href="/en">Go to the home page</a> · <a href="/zh-CN">返回中文首页</a></p></main>';
  const head = `<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"/><meta name="robots" content="noindex,follow"/>`;
  const html = template
    .replace(/<html lang="[^"]*"/, '<html lang="en"')
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="description"[^>]*\/>/g, '')
    .replace(/\s*<meta name="robots"[^>]*\/>/g, '')
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  writeFileSync(join(dist, '404.html'), html);
}

// Generate this before route snapshots overwrite dist/index.html, so the 404
// page is based on the original Vite shell rather than the English home page.
writeNotFoundPage();

for (const lang of Object.keys(copy) as Lang[]) {
  const c = copy[lang];
  const homeRoute = `/${lang}`;
  const homeJsonLd = {
    '@context': 'https://schema.org',
      '@graph': [
      { '@type': 'WebSite', '@id': `${baseUrl}/#website`, name: 'Neural Architect', url: baseUrl, inLanguage: lang, publisher: { '@id': brandOrganization['@id'] } },
      { '@type': 'WebApplication', '@id': `${baseUrl}/#application`, name: c.title, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', isAccessibleForFree: true, url: `${baseUrl}${homeRoute}`, publisher: { '@id': brandOrganization['@id'] } },
      { '@type': 'FAQPage', mainEntity: faq[lang].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
    ],
  };
  writeRoute(homeRoute, documentFor(homeRoute, lang, c.title, c.description, homeBody(lang), 'website', homeJsonLd));
  const studioRoute = `${homeRoute}/studio`;
  const studioTitle = lang === 'en' ? 'DLSS 5 Studio local software requirements and measured performance | Neural Architect' : lang === 'zh-TW' ? 'DLSS 5 Studio 本機軟體要求與實測效能 | Neural Architect' : 'DLSS 5 Studio 本地软件要求与实测性能 | Neural Architect';
  const studioDescription = lang === 'en' ? 'DLSS 5 Studio local software requirements, RTX and Windows compatibility, NVENC driver notes and a measured RTX 4090 workflow.' : lang === 'zh-TW' ? 'DLSS 5 Studio 本機軟體要求、RTX 與 Windows 相容性、NVENC 驅動程式說明，以及 RTX 4090 實測工作流程。' : 'DLSS 5 Studio 本地软件要求、RTX 与 Windows 兼容性、NVENC 驱动说明，以及 RTX 4090 实测工作流。';
  writeRoute(studioRoute, documentFor(studioRoute, lang, studioTitle, studioDescription, studioBody(lang), 'website', { '@context': 'https://schema.org', '@type': 'WebPage', name: studioTitle, description: studioDescription, url: `${baseUrl}${studioRoute}` }));
  for (const gpu of gpuEntries) {
    const gpuRoute = `${homeRoute}/gpu/${gpu.id}`;
    const gpuTitle = lang === 'en' ? `${gpu.name} DLSS 5 support and VRAM evidence | Neural Architect` : lang === 'zh-TW' ? `${gpu.name} DLSS 5 支援與顯存證據 | Neural Architect` : `${gpu.name} DLSS 5 支持与显存证据 | Neural Architect`;
    const gpuDescription = lang === 'en' ? `${gpu.name}: ${localizedStatus(lang, gpu.dlss5_status)}, ${gpu.vram_gb} GB VRAM, architecture and source-linked evidence.` : lang === 'zh-TW' ? `${gpu.name}：${localizedStatus(lang, gpu.dlss5_status)}、${gpu.vram_gb} GB 顯存、架構與來源證據。` : `${gpu.name}：${localizedStatus(lang, gpu.dlss5_status)}、${gpu.vram_gb} GB 显存、架构与来源证据。`;
    const gpuContent = getGpuDetailContent(lang, gpu, gpuData.gpu_series.find(series => series.id === gpu.series));
    const gpuSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'TechArticle', headline: gpuTitle, description: gpuDescription, author: { '@type': 'Organization', name: 'Neural Architect', url: baseUrl }, publisher: { '@id': 'https://www.dlss5nvidia.com/#organization' }, datePublished: '2026-10-10', dateModified: '2026-10-10', citation: officialDlssSource, mainEntityOfPage: `${baseUrl}${gpuRoute}` },
        { '@type': 'FAQPage', mainEntity: gpuContent.faq.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
      ],
    };
    writeRoute(gpuRoute, documentFor(gpuRoute, lang, gpuTitle, gpuDescription, gpuDetailBody(lang, gpu.id), 'article', gpuSchema));
  }
  const supportedCardsRoute = `${homeRoute}/supported-cards`;
  const supportedCardsDescription = lang === 'en'
    ? 'Evidence-based DLSS 5 GPU compatibility matrix by series, architecture and official NVIDIA sources, with an FAQ for upgrade decisions.'
    : lang === 'zh-TW'
      ? '按系列、架構與 NVIDIA 官方來源整理的 DLSS 5 顯示卡相容性矩陣，並提供升級決策常見問題。'
      : '按系列、架构与 NVIDIA 官方来源整理的 DLSS 5 显卡兼容性矩阵，并提供升级决策常见问题。';
  writeRoute(supportedCardsRoute, documentFor(supportedCardsRoute, lang, `${c.title} | Neural Architect`, supportedCardsDescription, supportedCardsBody(lang), 'website', { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq[lang].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }));
  const blogRoute = `${homeRoute}/blog`;
  const blogDescription = lang === 'en'
    ? 'Independent DLSS 5 explainers covering neural rendering, supported hardware, game settings and AI image tools.'
    : lang === 'zh-TW'
      ? '獨立整理 DLSS 5 神經渲染、支援硬體、遊戲設定與 AI 圖像工具的技術指南。'
      : '独立整理 DLSS 5 神经渲染、支持硬件、游戏设置与 AI 图片工具的技术指南。';
  writeRoute(blogRoute, documentFor(blogRoute, lang, `${c.blog} | Neural Architect`, blogDescription, blogBody(lang), 'website', { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.blog, url: `${baseUrl}${blogRoute}` }));
  for (const slug of articleSlugs) {
    const route = `${blogRoute}/${slug}`;
    const article = articleBody(lang, slug);
    writeRoute(route, documentFor(route, lang, `${article.meta.title} | Neural Architect`, article.meta.description, article.body, 'article', { '@context': 'https://schema.org', '@type': 'Article', headline: article.meta.title, description: article.meta.description, image: article.meta.og_image ? [article.meta.og_image] : [defaultOgImage], datePublished: article.meta.date, dateModified: article.meta.reviewed || article.meta.date, author: { '@type': 'Organization', name: 'Neural Architect', url: baseUrl }, publisher: { '@id': 'https://www.dlss5nvidia.com/#organization' }, mainEntityOfPage: `${baseUrl}${route}` }, 'index,follow', article.meta.og_image || defaultOgImage));
  }
}

// Keep the root response useful for crawlers that discover the bare domain first.
const rootCopy = copy.en;
writeRoute('/', documentFor('/', 'en', rootCopy.title, rootCopy.description, homeBody('en'), 'website', { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Neural Architect', url: baseUrl }, 'noindex,follow'));

function sitemapXml(): string {
  const date = '2026-10-10';
  const suffixes = ['', '/studio', '/supported-cards', '/blog', ...articleSlugs.map(slug => `/blog/${slug}`), ...gpuEntries.map(gpu => `/gpu/${gpu.id}`)];
  // 文章用自己 frontmatter 的复审日期，别和页面里的 dateModified 打架。
  const articleReviewed = new Map(articleSlugs.map(slug => [`/blog/${slug}`, parseFrontmatter(readFileSync(join(root, 'src/content', `${slug}.md`), 'utf8')).meta.reviewed || date]));
  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const urls: string[] = [];
  for (const suffix of suffixes) {
    for (const lang of Object.keys(copy) as Lang[]) {
      const path = `/${lang}${suffix}`;
      const lastmod = articleReviewed.get(suffix) || date;
      const alternates = (Object.keys(copy) as Lang[]).map(code => `    <xhtml:link rel="alternate" hreflang="${code}" href="${baseUrl}/${code}${suffix}" />`).join('\n');
      urls.push(`  <url>\n    <loc>${escapeXml(`${baseUrl}${path}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${suffix.startsWith('/blog/') ? 'weekly' : 'daily'}</changefreq>\n    <priority>${suffix === '' ? '1.0' : suffix === '/supported-cards' ? '0.9' : '0.8'}</priority>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${suffix}" />\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

writeFileSync(join(root, 'public/sitemap.xml'), sitemapXml());

console.log(`Pre-rendered ${Object.keys(copy).length} languages, ${articleSlugs.length} articles, supported-cards landing pages and static FAQ/checker content.`);
