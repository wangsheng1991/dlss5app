export type GpuDetailLanguage = 'en' | 'zh-CN' | 'zh-TW';

type GpuRecord = {
  name: string;
  vram_gb: number;
  dlss5_status: string;
  note: string;
};

type SeriesRecord = {
  architecture: string;
};

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
  evidenceHeading: string;
  evidenceParagraphs: string[];
  hardwareHeading: string;
  hardwareParagraphs: string[];
  studioHeading: string;
  studioParagraphs: string[];
  nextHeading: string;
  nextSteps: string[];
  faqHeading: string;
  faq: Array<{ question: string; answer: string }>;
  back: string;
  studioLink: string;
  guidesLink: string;
};

export function getGpuDetailContent(lang: GpuDetailLanguage, gpu: GpuRecord, series?: SeriesRecord): GpuDetailContent {
  const architecture = series?.architecture || 'NVIDIA architecture';
  const isTraditional = lang === 'zh-TW';
  const isChinese = lang !== 'en';
  const confirmed = gpu.dlss5_status === 'confirmed';
  const unsupported = gpu.dlss5_status === 'no';

  if (lang === 'en') {
    const status = confirmed ? 'Confirmed' : unsupported ? 'Not supported in current official scope' : 'Unconfirmed by NVIDIA';
    return {
      eyebrow: 'GPU EVIDENCE DETAIL',
      title: `${gpu.name} DLSS 5 support and VRAM evidence`,
      description: `${gpu.name}: ${status}, ${gpu.vram_gb} GB VRAM, ${architecture} architecture and source-linked evidence.`,
      status,
      statusHeading: 'Current DLSS 5 status',
      statusExplanation: confirmed
        ? 'The current record treats this model as confirmed because the published evidence set places it inside the RTX 50 / Blackwell scope. That is a documented hardware conclusion, not a promise that every game has already enabled DLSS 5.'
        : unsupported
          ? 'The current record keeps this model outside the official DLSS 5 scope. The label reflects the evidence boundary in the data set and should not be confused with the separate ability to use older DLSS features.'
          : 'The current record is deliberately unconfirmed. NVIDIA has not published a model-specific compatibility statement that lets this page turn a community claim into a support guarantee.',
      modelNoteLabel: 'Model note',
      sourceLabel: 'Evidence source',
      disclaimer: 'Independent evidence page; this is not an NVIDIA compatibility guarantee.',
      evidenceHeading: 'What the source does and does not prove',
      evidenceParagraphs: [
        `The model record for ${gpu.name} is linked to NVIDIA’s DLSS 5 announcement so that the conclusion can be checked against the original wording. The source is used to define the evidence boundary; it is not a substitute for a game-specific support list or a driver release note.`,
        'A confirmed hardware scope still requires a compatible game, driver and shipping implementation. An unconfirmed result means “wait for an official statement”, rather than “buy a new card immediately”. We keep those states separate so the checker does not overstate what the public announcement says.',
      ],
      hardwareHeading: 'VRAM and architecture context',
      hardwareParagraphs: [
        `${gpu.name} is listed with ${gpu.vram_gb} GB of VRAM on the ${architecture} architecture. VRAM is a physical specification that helps describe headroom for a workload; it does not by itself prove DLSS 5 compatibility. The architecture and the published software path must be considered together.`,
        'Use the model note below as a quick context line, then follow the NVIDIA source and the relevant game documentation before making a purchase or upgrade decision. This page intentionally exposes the model-level facts instead of hiding them behind a generic series label.',
      ],
      studioHeading: 'Game support and local Studio are separate',
      studioParagraphs: [
        'This page answers the game-internal DLSS 5 question. Our separate local DLSS 5 Studio workflow is a different path: the published requirements currently cover Windows 10 1909+ or Windows 11 and RTX 20-series or newer, with hardware NVENC encoding requiring driver 610+.',
        'A card can therefore be useful for local image or video conversion even when its game-internal DLSS 5 state is unconfirmed or outside the current official scope. See the Studio page for the measured RTX 4090 run and the limits of that single-machine benchmark.',
      ],
      nextHeading: 'Before you buy or upgrade',
      nextSteps: [
        'Confirm the exact model and VRAM capacity, including any laptop or vendor-specific variant.',
        'Open the linked NVIDIA source and check whether your target game and driver publish a compatible path.',
        'Treat “unconfirmed” as a prompt to wait for evidence; do not infer support from a similar model.',
        'If your goal is local conversion, compare the Studio requirements and measured results separately from game support.',
      ],
      faqHeading: 'GPU detail FAQ',
      faq: [
        { question: `Is ${gpu.name} confirmed for DLSS 5?`, answer: `${gpu.name} is currently marked “${status}” in this evidence set. The linked source and the status above are the authoritative context for this page.` },
        { question: 'Does VRAM alone decide DLSS 5 support?', answer: 'No. VRAM is one hardware fact. Architecture, driver, game integration and NVIDIA’s published compatibility scope all matter.' },
        { question: 'Can I still use this card with DLSS 5 Studio?', answer: 'Check the separate Studio requirements page. Local software readiness and game-internal DLSS 5 support are intentionally reported as different questions.' },
      ],
      back: 'Back to all GPU models',
      studioLink: 'DLSS 5 Studio requirements',
      guidesLink: 'Technical guides',
    };
  }

  const status = confirmed ? (isTraditional ? '已確認' : '已确认') : unsupported ? (isTraditional ? '目前官方清單不支援' : '当前官方列表不支持') : (isTraditional ? '尚未獲 NVIDIA 確認' : 'NVIDIA 尚未确认');
  const langCopy = isTraditional ? {
    eyebrow: 'GPU 證據詳情',
    title: `${gpu.name} DLSS 5 支援與顯存證據`,
    description: `${gpu.name} 的 DLSS 5 狀態、${gpu.vram_gb} GB 顯存、${architecture} 架構與 NVIDIA 來源證據。`,
    statusHeading: '目前 DLSS 5 狀態',
    statusExplanation: confirmed ? '目前資料將此型號標記為已確認，因為公開證據將它放在 RTX 50／Blackwell 範圍內。這是有來源的硬體結論，不代表每款遊戲都已經啟用 DLSS 5。' : unsupported ? '目前資料將此型號保留在官方 DLSS 5 範圍之外。這個標記反映資料集的證據邊界，不能與舊版 DLSS 功能的可用性混為一談。' : '目前資料刻意標記為尚未確認。NVIDIA 尚未發布針對此型號的相容性聲明，因此本站不會把社群說法寫成支援保證。',
    modelNoteLabel: '型號備註', sourceLabel: '證據來源', disclaimer: '這是獨立證據頁，不是 NVIDIA 的相容性保證。', evidenceHeading: '來源能證明什麼、不能證明什麼',
    evidenceParagraphs: [`${gpu.name} 的型號資料連結到 NVIDIA DLSS 5 公告，方便你回到原文核對。來源用來界定證據範圍，不能取代特定遊戲的支援清單或驅動程式發布說明。`, '即使硬體範圍已確認，仍需要相容遊戲、驅動程式與正式軟體實作。尚未確認代表「等待官方聲明」，而不是「立刻購買新卡」。我們分開呈現這些狀態，避免把公告內容說得過頭。'],
    hardwareHeading: '顯存與架構背景', hardwareParagraphs: [`${gpu.name} 的資料列出 ${gpu.vram_gb} GB 顯存與 ${architecture} 架構。顯存是描述工作負載餘裕的硬體規格，但不能單獨證明 DLSS 5 相容性；必須同時查看架構與公開軟體路徑。`, '請先把型號備註當作快速背景，再在購買或升級前閱讀 NVIDIA 來源與相關遊戲文件。本頁直接展示型號級資料，不把它壓縮成一個籠統的系列結論。'],
    studioHeading: '遊戲支援與本機 Studio 是兩條路線', studioParagraphs: ['本頁回答遊戲內 DLSS 5 的問題。本機 DLSS 5 Studio 是另一條路線：目前公開要求為 Windows 10 1909+ 或 Windows 11、RTX 20 系列以上；硬體 NVENC 編碼需要 610+ 驅動程式。', '因此，一張卡即使遊戲內 DLSS 5 尚未確認或不在目前官方範圍內，仍可能適合本機圖片或影片轉換。請到 Studio 頁查看 RTX 4090 實測與單機測試的限制。'],
    nextHeading: '購買或升級前', nextSteps: ['確認完整型號與顯存容量，包括筆電或廠商特別版本。', '打開 NVIDIA 來源，並確認目標遊戲與驅動程式是否公布相容路徑。', '把「尚未確認」視為等待證據的提示，不要從相近型號推導支援。', '如果目標是本機轉換，請把 Studio 要求與實測結果獨立於遊戲支援來比較。'],
    faqHeading: 'GPU 詳情常見問題', back: '返回全部顯示卡型號', studioLink: 'DLSS 5 Studio 要求', guidesLink: '技術指南',
  } : {
    eyebrow: 'GPU 证据详情',
    title: `${gpu.name} DLSS 5 支持与显存证据`,
    description: `${gpu.name} 的 DLSS 5 状态、${gpu.vram_gb} GB 显存、${architecture} 架构与 NVIDIA 来源证据。`,
    statusHeading: '当前 DLSS 5 状态',
    statusExplanation: confirmed ? '当前数据将此型号标记为已确认，因为公开证据将它放在 RTX 50／Blackwell 范围内。这是有来源的硬件结论，不代表每款游戏都已经启用 DLSS 5。' : unsupported ? '当前数据将此型号保留在官方 DLSS 5 范围之外。这个标记反映资料集的证据边界，不能与旧版 DLSS 功能的可用性混为一谈。' : '当前数据刻意标记为尚未确认。NVIDIA 尚未发布针对该型号的兼容性声明，因此本站不会把社区说法写成支持保证。',
    modelNoteLabel: '型号备注', sourceLabel: '证据来源', disclaimer: '这是独立证据页，不是 NVIDIA 的兼容性保证。', evidenceHeading: '来源能证明什么、不能证明什么',
    evidenceParagraphs: [`${gpu.name} 的型号数据链接到 NVIDIA DLSS 5 公告，方便你回到原文核对。来源用来界定证据范围，不能取代特定游戏的支持列表或驱动发布说明。`, '即使硬件范围已确认，仍需要兼容游戏、驱动和正式软件实现。尚未确认代表“等待官方声明”，而不是“立刻购买新卡”。我们分开呈现这些状态，避免把公告内容说得过头。'],
    hardwareHeading: '显存与架构背景', hardwareParagraphs: [`${gpu.name} 的数据列出 ${gpu.vram_gb} GB 显存与 ${architecture} 架构。显存是描述工作负载余量的硬件规格，但不能单独证明 DLSS 5 兼容性；必须同时查看架构与公开软件路径。`, '请先把型号备注当作快速背景，再在购买或升级前阅读 NVIDIA 来源与相关游戏文档。本页直接展示型号级数据，不把它压缩成一个笼统的系列结论。'],
    studioHeading: '游戏支持与本地 Studio 是两条路线', studioParagraphs: ['本页回答游戏内 DLSS 5 的问题。本地 DLSS 5 Studio 是另一条路线：目前公开要求为 Windows 10 1909+ 或 Windows 11、RTX 20 系列以上；硬件 NVENC 编码需要 610+ 驱动。', '因此，一张卡即使游戏内 DLSS 5 尚未确认或不在当前官方范围内，仍可能适合本地图片或视频转换。请到 Studio 页面查看 RTX 4090 实测与单机测试的限制。'],
    nextHeading: '购买或升级前', nextSteps: ['确认完整型号与显存容量，包括笔记本或厂商特别版本。', '打开 NVIDIA 来源，并确认目标游戏与驱动是否公布兼容路径。', '把“尚未确认”视为等待证据的提示，不要从相近型号推导支持。', '如果目标是本地转换，请把 Studio 要求与实测结果独立于游戏支持来比较。'],
    faqHeading: 'GPU 详情常见问题', back: '返回全部显卡型号', studioLink: 'DLSS 5 Studio 要求', guidesLink: '技术指南',
  };
  return {
    ...langCopy,
    status,
    faq: [
      { question: `${gpu.name}${isTraditional ? '已確認支援 DLSS 5 嗎？' : '已确认支持 DLSS 5 吗？'}`, answer: `${gpu.name}${isTraditional ? ` 目前在這份證據集中標記為「${status}」。上方狀態與連結來源是本頁的判定依據。` : ` 当前在这份证据集中标记为“${status}”。上方状态与链接来源是本页的判定依据。`}` },
      { question: isTraditional ? '顯存本身能決定 DLSS 5 支援嗎？' : '显存本身能决定 DLSS 5 支持吗？', answer: isTraditional ? '不能。顯存只是硬體事實，還需要同時考慮架構、驅動程式、遊戲整合與 NVIDIA 公開的相容性範圍。' : '不能。显存只是硬件事实，还需要同时考虑架构、驱动、游戏集成与 NVIDIA 公开的兼容性范围。' },
      { question: isTraditional ? '這張卡仍能搭配 DLSS 5 Studio 嗎？' : '这张卡仍能搭配 DLSS 5 Studio 吗？', answer: isTraditional ? '請查看獨立的 Studio 要求頁。本機軟體可用性與遊戲內 DLSS 5 支援刻意分成兩個問題。' : '请查看独立的 Studio 要求页。本地软件可用性与游戏内 DLSS 5 支持刻意分成两个问题。' },
    ],
  };
}
