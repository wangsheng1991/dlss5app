export type GpuDetailLanguage = 'en' | 'zh-CN' | 'zh-TW';

type GpuRecord = {
  id?: string;
  series?: string;
  name: string;
  vram_gb: number;
  dlss5_status: string;
  note: string;
};

type SeriesRecord = {
  architecture: string;
  name?: string;
};

/** 同页要展示的近邻型号。 */
export type GpuPeer = { id: string; name?: string; vram_gb: number; status: string };

export type GpuCheckVerdict = 'met' | 'below' | 'info';

export type GpuDetailContent = {
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  statusHeading: string;
  statusExplanation: string;
  modelNoteLabel: string;
  sourceLabel: string;
  disclaimer: string;
  factsHeading: string;
  facts: Array<{ label: string; value: string }>;
  evidenceHeading: string;
  evidenceParagraphs: string[];
  studioHeading: string;
  studioVerdict: string;
  studioVerdictTone: GpuCheckVerdict;
  studioChecks: Array<{ label: string; value: string; verdict: GpuCheckVerdict }>;
  studioParagraphs: string[];
  featuresHeading: string;
  featureRows: Array<{ label: string; value: string }>;
  featureParagraphs: string[];
  peersHeading: string;
  peers: GpuPeer[];
  peersParagraphs: string[];
  nextHeading: string;
  nextSteps: string[];
  faqHeading: string;
  faq: Array<{ question: string; answer: string }>;
  back: string;
  studioLink: string;
  guidesLink: string;
};

/** 我们已公开的 Studio 硬要求 —— 与主站 /download、本站 /studio 保持同一口径。 */
export const STUDIO_MIN_VRAM_GB = 8;
export const STUDIO_RECOMMENDED_VRAM_GB = 16;
export const STUDIO_MEASURED = {
  model: 'RTX 4090',
  machine: 'Windows 11 Pro, RTX 4090 24 GB, driver 591.86',
  result: '720p → 2560×1440 H.264 in 87.4 s (2.43 s/frame)',
  resultCn: '720p → 2560×1440 H.264 用时 87.4 秒（2.43 秒/帧）',
  resultTw: '720p → 2560×1440 H.264 用時 87.4 秒（2.43 秒／幀）',
};

/** 特性矩陣的取值是資料集裡的英文 token，中文頁要照自己的語言呈現。 */
function localizeFeatureValue(value: string, traditional: boolean): string {
  const map: Record<string, [string, string]> = {
    confirmed: ['已确认', '已確認'],
    unconfirmed: ['尚未确认', '尚未獲 NVIDIA 確認'],
    no: ['不支持', '不支援'],
    yes: ['支持', '支援'],
  };
  const hit = map[value];
  if (hit) return traditional ? hit[1] : hit[0];
  return value;
}

/** 该代在 data.ts 特性矩阵里的取值为空时，如实说明没有公开结论。 */
const NOT_IN_MATRIX = {
  en: 'Our published matrix covers the RTX 30 series and newer, so this generation has no per-feature row in this data set.',
  'zh-CN': '本站已公佈的特性矩陣涵蓋 RTX 30 系列及更新世代，這一代在本資料集中沒有逐項結論。',
  'zh-TW': '本站已公佈的特性矩陣涵蓋 RTX 30 系列及更新世代，這一代在本資料集中沒有逐項結論。',
};

function memoryVerdictEn(vram: number): { tone: GpuCheckVerdict; verdict: string; checks: Array<{ label: string; value: string; verdict: GpuCheckVerdict }> } {
  if (vram >= STUDIO_RECOMMENDED_VRAM_GB) {
    return {
      tone: 'met',
      verdict: `This card carries ${vram} GB, which clears the published 16 GB recommendation, so both the 1080p and the 4K video lanes are inside the published scope.`,
      checks: [
        { label: `${STUDIO_MIN_VRAM_GB} GB minimum memory`, value: `met — ${vram} GB installed`, verdict: 'met' },
        { label: `${STUDIO_RECOMMENDED_VRAM_GB} GB recommended memory`, value: `met — ${vram} GB installed`, verdict: 'met' },
      ],
    };
  }
  if (vram >= STUDIO_MIN_VRAM_GB) {
    return {
      tone: 'info',
      verdict: `This card carries ${vram} GB: above the 8 GB minimum, ${STUDIO_RECOMMENDED_VRAM_GB - vram} GB short of the 16 GB recommendation for 1080p and 4K video.`,
      checks: [
        { label: `${STUDIO_MIN_VRAM_GB} GB minimum memory`, value: `met — ${vram} GB installed`, verdict: 'met' },
        { label: `${STUDIO_RECOMMENDED_VRAM_GB} GB recommended memory`, value: `not met — ${STUDIO_RECOMMENDED_VRAM_GB - vram} GB short`, verdict: 'info' },
      ],
    };
  }
  return {
    tone: 'below',
    verdict: `This card carries ${vram} GB, below the published ${STUDIO_MIN_VRAM_GB} GB minimum. The local Studio lane is not published as supported here; the online converter runs the same pipeline in the browser instead.`,
    checks: [
      { label: `${STUDIO_MIN_VRAM_GB} GB minimum memory`, value: `not met — ${vram} GB installed`, verdict: 'below' },
      { label: `${STUDIO_RECOMMENDED_VRAM_GB} GB recommended memory`, value: `not met — ${vram} GB installed`, verdict: 'below' },
    ],
  };
}

function memoryVerdictCn(vram: number, traditional: boolean): { tone: GpuCheckVerdict; verdict: string; checks: Array<{ label: string; value: string; verdict: GpuCheckVerdict }> } {
  const min = `${STUDIO_MIN_VRAM_GB} GB`;
  const rec = `${STUDIO_RECOMMENDED_VRAM_GB} GB`;
  const checkMin = traditional ? `${min} 最低記憶體` : `${min} 最低内存`;
  const checkRec = traditional ? `${rec} 建議記憶體` : `${rec} 建议内存`;
  const installed = traditional ? `已安裝 ${vram} GB` : `已安装 ${vram} GB`;
  const met = traditional ? '符合' : '符合';
  const notMet = traditional ? '不符合' : '不符合';
  const short = traditional ? `還差 ${STUDIO_RECOMMENDED_VRAM_GB - vram} GB` : `还差 ${STUDIO_RECOMMENDED_VRAM_GB - vram} GB`;
  if (vram >= STUDIO_RECOMMENDED_VRAM_GB) {
    return {
      tone: 'met',
      verdict: traditional
        ? `這張卡有 ${vram} GB 顯存，達到已公佈的 ${rec} 建議值，1080p 與 4K 影片兩條路線都在已公佈範圍內。`
        : `这张卡有 ${vram} GB 显存，达到已公布的 ${rec} 建议值，1080p 与 4K 视频两条路线都在已公布范围内。`,
      checks: [
        { label: checkMin, value: `${met}——${installed}`, verdict: 'met' },
        { label: checkRec, value: `${met}——${installed}`, verdict: 'met' },
      ],
    };
  }
  if (vram >= STUDIO_MIN_VRAM_GB) {
    return {
      tone: 'info',
      verdict: traditional
        ? `這張卡有 ${vram} GB：高於 ${min} 最低值，但比 ${rec} 建議值（1080p 與 4K 影片）${short}。`
        : `这张卡有 ${vram} GB：高于 ${min} 最低值，但比 ${rec} 建议值（1080p 与 4K 视频）${short}。`,
      checks: [
        { label: checkMin, value: `${met}——${installed}`, verdict: 'met' },
        { label: checkRec, value: `${notMet}——${short}`, verdict: 'info' },
      ],
    };
  }
  return {
    tone: 'below',
    verdict: traditional
      ? `這張卡有 ${vram} GB，低於已公佈的 ${min} 最低值。本機 Studio 路線在這裡不算已公佈支援；改用線上轉換器，同一條流程在瀏覽器裡執行。`
      : `这张卡有 ${vram} GB，低于已公布的 ${min} 最低值。本地 Studio 路线在这里不算已公布支持；改用在线转换器，同一条流程在浏览器里运行。`,
    checks: [
      { label: checkMin, value: `${notMet}——${installed}`, verdict: 'below' },
      { label: checkRec, value: `${notMet}——${installed}`, verdict: 'below' },
    ],
  };
}

export function getGpuDetailContent(
  lang: GpuDetailLanguage,
  gpu: GpuRecord,
  series?: SeriesRecord,
  featureMatrix?: Array<Record<string, string>>,
  all?: GpuRecord[],
): GpuDetailContent {
  const architecture = series?.architecture || 'NVIDIA architecture';
  const seriesName = series?.name || architecture;
  const matrix = featureMatrix || [];
  // 这代在特性矩阵里有没有取值？没有就只写一行「未收录」，不要刷七行「not covered」。
  const seriesKey = gpu.series || '';
  const covered = matrix.some((row) => Boolean(row[seriesKey]));
  const isTraditional = lang === 'zh-TW';
  const isChinese = lang !== 'en';
  const statusEn = gpu.dlss5_status === 'confirmed' ? 'Confirmed' : gpu.dlss5_status === 'no' ? 'Not supported in the current official scope' : 'Unconfirmed by NVIDIA';
  const statusCn = gpu.dlss5_status === 'confirmed' ? (isTraditional ? '已確認' : '已确认') : gpu.dlss5_status === 'no' ? (isTraditional ? '目前官方清單不支援' : '当前官方列表不支持') : (isTraditional ? '尚未獲 NVIDIA 確認' : 'NVIDIA 尚未确认');
  const status = isChinese ? statusCn : statusEn;

  // 同系列近鄰：先按顯存接近度排，取最多 4 個。
  const siblings = (all || [])
    .filter((entry) => entry.id !== gpu.id && entry.series === gpu.series)
    .sort((a, b) => Math.abs(a.vram_gb - gpu.vram_gb) - Math.abs(b.vram_gb - gpu.vram_gb) || b.vram_gb - a.vram_gb)
    .slice(0, 4)
    .map((entry) => ({ id: entry.id as string, name: entry.name, vram_gb: entry.vram_gb, status: entry.dlss5_status }));
  const nearest = siblings[0];

  if (!isChinese) {
    const memory = memoryVerdictEn(gpu.vram_gb);
    const featureRows = covered
      ? matrix.map((row) => ({ label: row.label, value: row[seriesKey] || 'not covered by this data set' }))
      : [{ label: 'Feature matrix', value: NOT_IN_MATRIX.en }];
    return {
      eyebrow: 'GPU EVIDENCE DETAIL',
      title: `${gpu.name} DLSS 5 support and VRAM evidence`,
      description: `${gpu.name}: ${status}, ${gpu.vram_gb} GB VRAM, ${architecture} architecture, local Studio readiness and source-linked evidence.`,
      status,
      statusHeading: 'Current DLSS 5 status',
      statusExplanation: gpu.dlss5_status === 'confirmed'
        ? `NVIDIA’s published DLSS 5 scope covers the RTX 50 series, which is why ${gpu.name} is recorded as confirmed. That is a hardware-scope statement, not a promise that every game already ships DLSS 5.`
        : gpu.dlss5_status === 'no'
          ? `${gpu.name} sits outside the DLSS 5 hardware scope NVIDIA has published so far. Older DLSS features on this card are a separate question and are not changed by this record.`
          : `No NVIDIA statement covers ${gpu.name} specifically, so this record stays unconfirmed. We do not turn a plausible claim into a support guarantee.`,
      modelNoteLabel: 'Model note',
      sourceLabel: 'Evidence source',
      disclaimer: 'Independent evidence page; this is not an NVIDIA compatibility guarantee.',
      factsHeading: 'Model record',
      facts: [
        { label: 'Model', value: gpu.name },
        { label: 'Series', value: seriesName },
        { label: 'Architecture', value: architecture },
        { label: 'VRAM', value: `${gpu.vram_gb} GB` },
        { label: 'DLSS 5 status', value: status },
        { label: 'Evidence', value: 'NVIDIA DLSS 5 launch article' },
        { label: 'Last verified', value: '2026-10-10' },
      ],
      evidenceHeading: 'What the source does and does not prove',
      evidenceParagraphs: [
        gpu.dlss5_status === 'confirmed'
          ? 'The linked announcement is the reason this model sits inside the confirmed scope. It does not list compatible games, drivers or shipping builds, so check the game and driver notes before you buy.'
          : gpu.dlss5_status === 'no'
            ? 'The linked source is what places this model outside the announced scope. It does not claim the card is broken or obsolete — it only records that the published DLSS 5 hardware list does not include it.'
            : 'The linked source does not resolve this model either way, and that is exactly what the record says. “Unconfirmed” is a prompt to wait for an official statement, not a soft rejection.',
      ],
      studioHeading: `Local DLSS5 Studio on ${gpu.name}`,
      studioVerdict: memory.verdict,
      studioVerdictTone: memory.tone,
      studioChecks: [
        { label: 'RTX 20 series or newer', value: 'met — this card is an RTX 20-series or newer part', verdict: 'met' },
        ...memory.checks,
        { label: 'About 3 GB free disk space', value: 'met — a platform requirement, not a GPU one', verdict: 'met' },
        { label: 'Driver 610 or newer for hardware NVENC', value: 'not verifiable from the card alone — on an older driver the encoder falls back to software and says so in the job message', verdict: 'info' },
      ],
      studioParagraphs: [
        gpu.name === STUDIO_MEASURED.model
          ? `This is the one card we have measured ourselves: ${STUDIO_MEASURED.machine} produced ${STUDIO_MEASURED.result}. It is a single-machine result, not a real-time guarantee.`
          : `We publish no measured run for ${gpu.name}; our only measurement so far is the ${STUDIO_MEASURED.model} (${STUDIO_MEASURED.result}). We do not extrapolate it to other cards, and this page does not claim one.`,
      ],
      featuresHeading: `Feature scope for ${seriesName}`,
      featureRows,
      featureParagraphs: [
        covered
          ? 'These rows come from the same data set as the model table. A “yes” describes the published generation-level capability, not a guarantee that a given game enables it on this card.'
          : 'The feature matrix in this data set starts at the RTX 30 series, so this page publishes no per-feature claim for this generation rather than guessing one.',
      ],
      peersHeading: `Nearest models in the same series`,
      peers: siblings,
      peersParagraphs: [
        nearest
          ? `The closest record in this series is ${nearest.name} (${nearest.vram_gb} GB). ${nearest.vram_gb === gpu.vram_gb ? `It carries the same ${gpu.vram_gb} GB of VRAM as ${gpu.name}` : `That is ${Math.abs(nearest.vram_gb - gpu.vram_gb)} GB ${nearest.vram_gb > gpu.vram_gb ? 'above' : 'below'} ${gpu.name}`}, and both share the same DLSS 5 status in this data set. We publish no performance ranking between them.`
          : 'This is the only model of its series in this data set.',
      ],
      nextHeading: 'Before you buy or upgrade',
      nextSteps: [
        `Confirm the exact ${gpu.name} variant and its VRAM capacity — vendor and laptop versions differ.`,
        'Open the linked source and check whether your target game and driver publish a compatible path.',
        'Treat “unconfirmed” as a prompt to wait for evidence; never infer support from a similar model.',
      ],
      faqHeading: 'GPU detail FAQ',
      faq: [
        { question: `Is ${gpu.name} confirmed for DLSS 5?`, answer: `${gpu.name} is recorded as “${status}” in this evidence set. The linked source and the status above are the basis for this page.` },
        { question: `Can ${gpu.name} run the local DLSS5 Studio workflow?`, answer: memory.tone === 'below' ? `No — ${gpu.vram_gb} GB is below our published 8 GB minimum. The online converter runs the same pipeline in the browser.` : `Yes for the published requirements: RTX 20 series or newer with ${gpu.vram_gb} GB of VRAM.${memory.tone === 'info' ? ` ${STUDIO_RECOMMENDED_VRAM_GB} GB is recommended for 1080p and 4K video.` : ''}` },
        { question: 'Does VRAM alone decide DLSS 5 support?', answer: 'No. VRAM is one hardware fact. Architecture, driver, game integration and NVIDIA’s published compatibility scope all matter.' },
      ],
      back: 'Back to all GPU models',
      studioLink: 'DLSS 5 Studio requirements',
      guidesLink: 'Technical guides',
    };
  }

  const traditional = isTraditional;
  const memory = memoryVerdictCn(gpu.vram_gb, traditional);
  const featureRows = covered
    ? matrix.map((row) => ({ label: row.label, value: row[seriesKey] ? localizeFeatureValue(row[seriesKey], traditional) : (traditional ? '本資料集未收錄' : '本资料集未收录') }))
    : [{ label: traditional ? '特性矩陣' : '特性矩阵', value: traditional ? NOT_IN_MATRIX['zh-TW'] : NOT_IN_MATRIX['zh-CN'] }];
  return {
    eyebrow: traditional ? 'GPU 證據詳情' : 'GPU 证据详情',
    title: traditional ? `${gpu.name} DLSS 5 支援與顯存證據` : `${gpu.name} DLSS 5 支持与显存证据`,
    description: traditional
      ? `${gpu.name}：${status}、${gpu.vram_gb} GB 顯存、${architecture} 架構，以及本機 Studio 適配結論與來源證據。`
      : `${gpu.name}：${status}、${gpu.vram_gb} GB 显存、${architecture} 架构，以及本地 Studio 适配结论与来源证据。`,
    status,
    statusHeading: traditional ? '目前 DLSS 5 狀態' : '当前 DLSS 5 状态',
    statusExplanation: gpu.dlss5_status === 'confirmed'
      ? (traditional ? `NVIDIA 已公佈的 DLSS 5 範圍涵蓋 RTX 50 系列，因此 ${gpu.name} 記為已確認。這是硬體範圍的結論，不代表每款遊戲都已推出 DLSS 5。` : `NVIDIA 已公布的 DLSS 5 范围涵盖 RTX 50 系列，因此 ${gpu.name} 记为已确认。这是硬件范围的结论，不代表每款游戏都已推出 DLSS 5。`)
      : gpu.dlss5_status === 'no'
        ? (traditional ? `${gpu.name} 落在 NVIDIA 目前已公佈的 DLSS 5 硬體範圍之外。這張卡上的舊版 DLSS 功能是另一個問題，不受本筆紀錄影響。` : `${gpu.name} 落在 NVIDIA 目前已公布的 DLSS 5 硬件范围之外。这张卡上的旧版 DLSS 功能是另一个问题，不受本条记录影响。`)
        : (traditional ? `沒有針對 ${gpu.name} 的 NVIDIA 聲明，因此本筆紀錄維持尚未確認。我們不會把看似合理的說法寫成支援保證。` : `没有针对 ${gpu.name} 的 NVIDIA 声明，因此本条记录维持尚未确认。我们不会把看似合理的说法写成支持保证。`),
    modelNoteLabel: traditional ? '型號備註' : '型号备注',
    sourceLabel: traditional ? '證據來源' : '证据来源',
    disclaimer: traditional ? '這是獨立證據頁，不是 NVIDIA 的相容性保證。' : '这是独立证据页，不是 NVIDIA 的兼容性保证。',
    factsHeading: traditional ? '型號檔案' : '型号档案',
    facts: [
      { label: traditional ? '型號' : '型号', value: gpu.name },
      { label: traditional ? '系列' : '系列', value: seriesName },
      { label: traditional ? '架構' : '架构', value: architecture },
      { label: 'VRAM', value: `${gpu.vram_gb} GB` },
      { label: 'DLSS 5', value: status },
      { label: traditional ? '證據' : '证据', value: 'NVIDIA DLSS 5 公告' },
      { label: traditional ? '核對日期' : '核对日期', value: '2026-10-10' },
    ],
    evidenceHeading: traditional ? '來源能證明什麼、不能證明什麼' : '来源能证明什么、不能证明什么',
    evidenceParagraphs: [
      gpu.dlss5_status === 'confirmed'
        ? (traditional ? '連結的公告就是此型號落在已確認範圍的原因。它沒有列出相容遊戲、驅動程式或正式版本，購買前請自行核對遊戲與驅動說明。' : '链接的公告就是此型号落在已确认范围的原因。它没有列出兼容游戏、驱动或正式版本，购买前请自行核对游戏与驱动说明。')
        : gpu.dlss5_status === 'no'
          ? (traditional ? '連結來源就是把此型號排除在已公佈範圍之外的依據。它並不表示這張卡壞了或過時，只表示已公佈的 DLSS 5 硬體清單不含它。' : '链接来源就是把此型号排除在已公布范围之外的依据。它并不表示这张卡坏了或过时，只表示已公布的 DLSS 5 硬件清单不含它。')
          : (traditional ? '連結來源沒有對此型號給出任何一方的結論，本筆紀錄就照實寫。尚未確認是「等官方聲明」，不是委婉的否定。' : '链接来源没有对此型号给出任何一方的结论，本条记录就照实写。尚未确认是「等官方声明」，不是委婉的否定。'),
    ],
    studioHeading: traditional ? `${gpu.name} 上的本機 DLSS5 Studio` : `${gpu.name} 上的本地 DLSS5 Studio`,
    studioVerdict: memory.verdict,
    studioVerdictTone: memory.tone,
    studioChecks: [
      { label: traditional ? 'RTX 20 系列以上' : 'RTX 20 系列以上', value: traditional ? '符合——此型號屬 RTX 20 系列或更新世代' : '符合——此型号属 RTX 20 系列或更新世代', verdict: 'met' },
      ...memory.checks,
      { label: traditional ? '約 3 GB 可用磁碟空間' : '约 3 GB 可用磁盘空间', value: traditional ? '符合——這是平台要求，不是顯示卡要求' : '符合——这是平台要求，不是显卡要求', verdict: 'met' },
      { label: traditional ? '610+ 驅動程式（硬體 NVENC）' : '610+ 驱动（硬件 NVENC）', value: traditional ? '無法只看顯示卡判斷——較舊驅動會自動退回軟體編碼，並在任務訊息中說明' : '无法只看显卡判断——较旧驱动会自动回退软件编码，并在任务消息中说明', verdict: 'info' },
    ],
    studioParagraphs: [
      gpu.name === STUDIO_MEASURED.model
        ? (traditional ? `這是我們唯一實測過的顯示卡：${STUDIO_MEASURED.machine} 得到 ${STUDIO_MEASURED.resultTw}。單機結果，不代表即時處理保證。` : `这是我们唯一实测过的显卡：${STUDIO_MEASURED.machine} 得到 ${STUDIO_MEASURED.resultCn}。单机结果，不代表实时处理保证。`)
        : (traditional ? `我們沒有 ${gpu.name} 的實測數字；目前唯一的實測是 ${STUDIO_MEASURED.model}（${STUDIO_MEASURED.resultTw}）。本頁不會把它外推到其他顯示卡。` : `我们没有 ${gpu.name} 的实测数字；目前唯一的实测是 ${STUDIO_MEASURED.model}（${STUDIO_MEASURED.resultCn}）。本页不会把它外推到其他显卡。`),
    ],
    featuresHeading: traditional ? `${seriesName} 的特性範圍` : `${seriesName} 的特性范围`,
    featureRows,
    featureParagraphs: [
      covered
        ? (traditional ? '這些列與型號表來自同一份資料集。「是」描述的是已公佈的世代能力，不保證某款遊戲會在這張卡上啟用它。' : '这些行与型号表来自同一份资料集。「是」描述的是已公布的世代能力，不保证某款游戏会在这张卡上启用它。')
        : (traditional ? '本資料集的特性矩陣從 RTX 30 系列起收錄，因此本頁不對這一代發布逐項能力結論，而不是先猜一個。' : '本资料集的特性矩阵从 RTX 30 系列起收录，因此本页不对这一代发布逐项能力结论，而不是先猜一个。'),
    ],
    peersHeading: traditional ? '同系列最接近的型號' : '同系列最接近的型号',
    peers: siblings,
    peersParagraphs: [
      nearest
        ? (traditional
          ? `本系列最接近的紀錄是 ${nearest.name}（${nearest.vram_gb} GB）。${nearest.vram_gb === gpu.vram_gb ? `它的顯存與 ${gpu.name} 同為 ${gpu.vram_gb} GB` : `比 ${gpu.name} ${nearest.vram_gb > gpu.vram_gb ? '多' : '少'} ${Math.abs(nearest.vram_gb - gpu.vram_gb)} GB`}，兩者在本地資料集中 DLSS 5 狀態相同。我們不公佈兩者之間的效能排名。`
          : `本系列最接近的记录是 ${nearest.name}（${nearest.vram_gb} GB）。${nearest.vram_gb === gpu.vram_gb ? `它的显存与 ${gpu.name} 同为 ${gpu.vram_gb} GB` : `比 ${gpu.name} ${nearest.vram_gb > gpu.vram_gb ? '多' : '少'} ${Math.abs(nearest.vram_gb - gpu.vram_gb)} GB`}，两者在本地资料集中 DLSS 5 状态相同。我们不公布两者之间的性能排名。`)
        : (traditional ? '這是本資料集中該系列唯一的型號。' : '这是本资料集中该系列唯一的型号。'),
    ],
    nextHeading: traditional ? '購買或升級前' : '购买或升级前',
    nextSteps: [
      traditional ? `確認 ${gpu.name} 的完整型號與顯存容量——廠商版與筆電版可能不同。` : `确认 ${gpu.name} 的完整型号与显存容量——厂商版与笔记本版可能不同。`,
      traditional ? '打開連結來源，確認目標遊戲與驅動程式是否公佈相容路徑。' : '打开链接来源，确认目标游戏与驱动是否公布兼容路径。',
      traditional ? '把「尚未確認」當作等待證據的提示，不要從相近型號推導支援。' : '把“尚未确认”当作等待证据的提示，不要从相近型号推导支持。',
    ],
    faqHeading: traditional ? 'GPU 詳情常見問題' : 'GPU 详情常见问题',
    faq: [
      { question: `${gpu.name}${traditional ? '已確認支援 DLSS 5 嗎？' : '已确认支持 DLSS 5 吗？'}`, answer: traditional ? `${gpu.name} 在這份證據集中記為「${status}」。上方狀態與連結來源是本頁的判定依據。` : `${gpu.name} 在这份证据集中记为“${status}”。上方状态与链接来源是本页的判定依据。` },
      {
        question: `${gpu.name}${traditional ? '能跑本機 DLSS5 Studio 嗎？' : '能跑本地 DLSS5 Studio 吗？'}`,
        answer: memory.tone === 'below'
          ? (traditional ? `不行——${gpu.vram_gb} GB 低於已公佈的 8 GB 最低值。線上轉換器在瀏覽器裡跑同一條流程。` : `不行——${gpu.vram_gb} GB 低于已公布的 8 GB 最低值。在线转换器在浏览器里跑同一条流程。`)
          : (traditional ? `就已公佈的要求而言可以：RTX 20 系列以上、${gpu.vram_gb} GB 顯存。${memory.tone === 'info' ? '1080p 與 4K 影片建議 16 GB。' : ''}` : `就已公布的要求而言可以：RTX 20 系列以上、${gpu.vram_gb} GB 显存。${memory.tone === 'info' ? '1080p 与 4K 视频建议 16 GB。' : ''}`),
      },
      { question: traditional ? '顯存本身能決定 DLSS 5 支援嗎？' : '显存本身能决定 DLSS 5 支持吗？', answer: traditional ? '不能。顯存只是硬體事實，還需要同時考慮架構、驅動程式、遊戲整合與 NVIDIA 公開的相容性範圍。' : '不能。显存只是硬件事实，还需要同时考虑架构、驱动、游戏集成与 NVIDIA 公开的兼容性范围。' },
    ],
    back: traditional ? '返回全部顯示卡型號' : '返回全部显卡型号',
    studioLink: traditional ? 'DLSS 5 Studio 要求' : 'DLSS 5 Studio 要求',
    guidesLink: traditional ? '技術指南' : '技术指南',
  };
}
