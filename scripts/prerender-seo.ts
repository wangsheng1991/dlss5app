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
/** 站点信息页（E-E-A-T 门槛那一组）：谁做的、按什么规矩写、怎么联系、怎么处理数据。 */
const TRUST_PAGE_SLUGS = ['about', 'editorial-policy', 'contact', 'privacy'] as const;
/** 两站共用的公开联系邮箱 —— 主站 /download 与法务页用的也是这个地址。 */
const supportEmail = 'support@dlss5nvidia.com';
/** 本轮复核日期：型号页状态段、文章页 reviewed、sitemap 都从这里取。 */
const reviewedDate = '2026-10-10';
const brandOrganization = {
  '@type': 'Organization',
  '@id': 'https://www.dlss5nvidia.com/#organization',
  name: 'DLSS 5 NVIDIA Independent Showcase',
  url: 'https://www.dlss5nvidia.com/',
  description: 'Independent, non-official AI image upscaling and neural super-resolution showcase.',
  sameAs: ['https://www.dlss5nvidia.com/', 'https://www.dlss5.app/'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: supportEmail,
    url: `mailto:${supportEmail}`,
  },
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
/** 每种语言下的路由数：首页 + studio + supported-cards + blog 索引 + updates + 文章 + 型号页 + 4 个站点信息页。 */
const routesPerLanguage = 5 + articleSlugs.length + gpuEntries.length + TRUST_PAGE_SLUGS.length;
const pageCount = languageCount * routesPerLanguage;

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

/** 三种状态分别需要什么证据 —— 首页与编辑政策页共用同一张表，口径不许分叉。 */
function renderStatusTable(lang: Lang): string {
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  const table = isEnglish
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
  return `<table><caption>${escapeHtml(table.title)}</caption><thead><tr>${table.head.map(cell => `<th>${escapeHtml(cell)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

/** 面包屑结构化数据（竞品每个内页都有，我们原来一条没有）。 */
function breadcrumbNode(lang: Lang, trail: Array<[string, string]>): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: `${baseUrl}/${lang}${path}`,
    })),
  };
}

/** 面包屑里的页面名 —— 口径跟各页标题一致，别在循环里各写一套。 */
function crumbLabel(lang: Lang, key: 'home' | 'studio' | 'supportedCards' | 'blog'): string {
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  const table = {
    home: isEnglish ? 'Home' : isTraditional ? '首頁' : '首页',
    studio: 'DLSS 5 Studio',
    supportedCards: isEnglish ? 'DLSS 5 supported cards' : isTraditional ? 'DLSS 5 支援顯示卡' : 'DLSS 5 支持显卡',
    blog: isEnglish ? 'Technical guides' : isTraditional ? '技術指南' : '技术指南',
  };
  return table[key];
}

/** 每一页都带站点信息页的出口 —— 这些页要能被爬虫发现，不能只躺在 sitemap 里。 */
function trustNav(lang: string): string {
  // The ja/ko sample pages are intentionally limited to two landing pages for now.
  // Keep their trust links crawlable by pointing at the published English pages
  // instead of emitting links to routes that do not exist yet.
  const linkLang = lang === 'ja' || lang === 'ko' ? 'en' : lang;
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  const labels = lang === 'ja'
    ? ['概要', '編集方針', 'お問い合わせ', 'プライバシー']
    : lang === 'ko'
      ? ['소개', '편집 정책', '문의', '개인정보 보호']
      : isEnglish
    ? ['About', 'Editorial policy', 'Contact', 'Privacy']
    : isTraditional
      ? ['關於本站', '編輯政策', '聯絡我們', '隱私']
      : ['关于本站', '编辑政策', '联系我们', '隐私'];
  const links = TRUST_PAGE_SLUGS.map((slug, index) => `<a href="/${linkLang}/${slug}">${escapeHtml(labels[index])}</a>`).join(' · ');
  const llms = lang === 'ja' ? '機械可読サマリー' : lang === 'ko' ? '기계 판독 요약' : isEnglish ? 'Machine-readable summary' : isTraditional ? '給機器讀的摘要' : '给机器读的摘要';
  const aria = lang === 'ja' ? 'サイト情報' : lang === 'ko' ? '사이트 정보' : isEnglish ? 'Site information' : isTraditional ? '站點資訊' : '站点信息';
  return `<nav class="site-info" aria-label="${aria}">${links} · <a href="/llms.txt">${escapeHtml(llms)}</a></nav>`;
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
  const statusTableHtml = renderStatusTable(lang);
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
  const isChinese = !isEnglish;
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
  const questionsHtml = questions.map(([q, a]) => `<section><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></section>`).join('');
  const title = isEnglish ? 'DLSS 5 Supported Cards & GPU Compatibility Checker' : isTraditional ? 'DLSS 5 支援顯示卡與 GPU 相容性檢查器' : 'DLSS 5 支持的显卡与 GPU 兼容性检测器';
  const guide = isEnglish ? 'EVIDENCE-BASED GPU GUIDE' : isTraditional ? '基於證據的 GPU 指南' : '基于证据的 GPU 指南';
  const back = isEnglish ? '← Back to the GPU checker' : isTraditional ? '← 返回 GPU 檢查器首頁' : '← 返回 GPU 检测器首页';
  const converter = isEnglish ? 'Try the free visual converter' : isTraditional ? '試用免費的視覺轉換器' : '试用免费的视觉转换器';
  const summary = isEnglish
    ? `All ${gpuEntries.length} GeForce RTX models in this data set are listed below with VRAM, architecture, status and a link to the evidence page for each card: ${statusCounts.confirmed} RTX 50-series cards confirmed, ${statusCounts.unconfirmed} RTX 40-series cards unconfirmed, ${statusCounts.outOfScope} RTX 30/20-series cards outside the published scope.`
    : isTraditional
      ? `本資料集收錄的 ${gpuEntries.length} 款 GeForce RTX 型號全部列在下面，每款都標明顯存、架構、狀態，並連到該型號自己的證據頁：${statusCounts.confirmed} 款 RTX 50 系列已確認、${statusCounts.unconfirmed} 款 RTX 40 系列尚未確認、${statusCounts.outOfScope} 款 RTX 30/20 系列落在已公佈範圍之外。`
      : `本资料集收录的 ${gpuEntries.length} 款 GeForce RTX 型号全部列在下面，每款都标明显存、架构、状态，并连到该型号自己的证据页：${statusCounts.confirmed} 款 RTX 50 系列已确认、${statusCounts.unconfirmed} 款 RTX 40 系列未确认、${statusCounts.outOfScope} 款 RTX 30/20 系列落在已公布范围之外。`;
  const matrixTitle = isEnglish ? `DLSS 5 support by model (${gpuEntries.length} cards)` : isTraditional ? `逐型號 DLSS 5 支援情況（${gpuEntries.length} 款）` : `逐型号 DLSS 5 支持情况（${gpuEntries.length} 款）`;
  const headers = isEnglish
    ? ['GPU model', 'Architecture', 'VRAM', 'DLSS 5 status', 'Evidence page']
    : isTraditional
      ? ['顯示卡型號', '架構', '顯存', 'DLSS 5 狀態', '證據頁']
      : ['显卡型号', '架构', '显存', 'DLSS 5 状态', '证据页'];
  const rows = gpuEntries.map(gpu => {
    const architecture = gpuData.gpu_series.find(series => series.id === gpu.series)?.architecture || '';
    const detail = isEnglish ? `RTX ${gpu.name.replace(/^RTX /, '')} record` : isTraditional ? `${gpu.name} 紀錄` : `${gpu.name} 记录`;
    return `<tr><th scope="row"><a href="/${lang}/gpu/${gpu.id}">${escapeHtml(gpu.name)}</a></th><td>${escapeHtml(architecture)}</td><td>${gpu.vram_gb} GB</td><td>${escapeHtml(localizedStatus(lang, gpu.dlss5_status))}</td><td><a href="/${lang}/gpu/${gpu.id}">${escapeHtml(detail)} →</a></td></tr>`;
  }).join('');
  const seriesIntro = (seriesId: string): string => {
    const series = gpuData.gpu_series.find(item => item.id === seriesId);
    const members = gpuEntries.filter(gpu => gpu.series === seriesId);
    const names = members.map(gpu => gpu.name).join(isChinese ? '、' : ', ');
    const count = members.length;
    const architecture = series?.architecture || '';
    const name = series?.name || seriesId;
    if (seriesId === 'rtx50') {
      return isEnglish
        ? `NVIDIA's published DLSS 5 scope names this generation. All ${count} models below are recorded as confirmed — ${names}. Confirmed is a hardware-scope statement: each game still has to ship the feature, so check the title you care about before buying a card for it.`
        : isTraditional
          ? `NVIDIA 已公佈的 DLSS 5 範圍點名的就是這一代（${architecture}）。下面 ${count} 款全部記為已確認——${names}。已確認是硬體範圍結論：單款遊戲仍要自己上線這個功能，為某款遊戲買卡前請先確認那款遊戲。`
          : `NVIDIA 已公布的 DLSS 5 范围点名的就是这一代（${architecture}）。下面 ${count} 款全部记为已确认——${names}。已确认是硬件范围结论：单款游戏仍要自己上线这个功能，为某款游戏买卡前请先确认那款游戏。`;
    }
    if (seriesId === 'rtx40') {
      return isEnglish
        ? `No NVIDIA statement covers ${architecture} at model level, so all ${count} cards below stay unconfirmed — ${names}. Unconfirmed is not a rejection: it means the source needed to say "supported" has not been published.`
        : isTraditional
          ? `NVIDIA 沒有針對 ${architecture} 的型號級聲明，因此下面 ${count} 款全部維持尚未確認——${names}。尚未確認不等於被否定：它表示「支援」這句話所需的來源還沒公佈。`
          : `NVIDIA 没有针对 ${architecture} 的型号级声明，因此下面 ${count} 款全部维持未确认——${names}。未确认不等于被否定：它表示「支持」这句话所需的来源还没公布。`;
    }
    return isEnglish
      ? `${architecture} sits outside the DLSS 5 scope NVIDIA has published, so all ${count} cards below read "not supported in the current official list" — ${names}. Older DLSS features on these cards are separate and unchanged by this record.`
      : isTraditional
        ? `${architecture} 落在 NVIDIA 已公佈的 DLSS 5 範圍之外，因此下面 ${count} 款全部記為「目前官方清單不支援」——${names}。這些卡上的舊版 DLSS 功能是另一回事，不受本紀錄影響。`
        : `${architecture} 落在 NVIDIA 已公布的 DLSS 5 范围之外，因此下面 ${count} 款全部记为「当前官方列表不支持」——${names}。这些卡上的旧版 DLSS 功能是另一回事，不受本条记录影响。`;
  };
  const seriesSections = gpuData.gpu_series.map(series => {
    const heading = isEnglish
      ? `${series.name} (${series.architecture})`
      : isTraditional
        ? `${series.name}（${series.architecture}）`
        : `${series.name}（${series.architecture}）`;
    return `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(seriesIntro(series.id))}</p></section>`;
  }).join('');
  const sourceNote = isEnglish
    ? `Source for every status on this page: <a href="${officialDlssSource}">NVIDIA's DLSS 5 announcement</a>. Hardware specification values on the individual model pages come from the published GeForce RTX series specification tables, which cite NVIDIA's own product pages and architecture whitepapers. Independent reference; not affiliated with NVIDIA.`
    : isTraditional
      ? `本頁每一條狀態的來源：<a href="${officialDlssSource}">NVIDIA DLSS 5 公告</a>。逐型號頁面上的硬體規格取自公開的 GeForce RTX 系列規格表，該表引用 NVIDIA 自己的產品頁與架構白皮書。本站為獨立資料頁，與 NVIDIA 沒有隸屬關係。`
      : `本页每一条状态的来源：<a href="${officialDlssSource}">NVIDIA DLSS 5 公告</a>。逐型号页面上的硬件规格取自公开的 GeForce RTX 系列规格表，该表引用 NVIDIA 自己的产品页与架构白皮书。本站为独立资料页，与 NVIDIA 没有隶属关系。`;
  const reviewedLine = isEnglish ? `Last reviewed ${reviewedDate}` : isTraditional ? `內容複審 ${reviewedDate}` : `内容复审 ${reviewedDate}`;
  const methodHeading = isEnglish ? 'How each status is decided' : isTraditional ? '每種狀態怎麼得出' : '每种状态怎么得出';
  return `<main class="seo-shell"><header><p class="eyebrow">${guide}</p><h1>${title}</h1><p class="lede">${escapeHtml(summary)}</p><p class="article-meta"><span class="reviewed">${reviewedLine}</span></p><p><a href="/${lang}">${back}</a> · <a href="https://www.dlss5nvidia.com/download">${converter}</a></p></header><section><h2>${escapeHtml(matrixTitle)}</h2><table><thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table><p class="source-note">${sourceNote}</p></section><section><h2>${methodHeading}</h2>${renderStatusTable(lang)}</section>${seriesSections}<section><h2>${isEnglish ? 'Compatibility FAQ' : isTraditional ? '相容性常見問題' : '兼容性常见问题'}</h2>${questionsHtml}</section><p><a href="/${lang}">${back}</a> · <a href="/${lang}/studio">${isEnglish ? 'Studio requirements and measurements' : isTraditional ? 'Studio 要求與實測' : 'Studio 要求与实测'}</a> · <a href="/${lang}/blog">${isEnglish ? 'Technical guides' : isTraditional ? '技術指南' : '技术指南'}</a> · <a href="/${lang}/editorial-policy">${isEnglish ? 'Editorial policy' : isTraditional ? '編輯政策' : '编辑政策'}</a></p></main>`;
}

type TrustPage = { title: string; description: string; heading: string; body: string; schemaType: string };

/**
 * 四个站点信息页：谁做的（about）、按什么规矩写（editorial-policy）、怎么联系（contact）、怎么处理数据（privacy）。
 * 内容全部是本站已经成立的事实，不写承诺、不写没有来源的表述。
 */
function trustPage(slug: typeof TRUST_PAGE_SLUGS[number], lang: Lang): TrustPage {
  const isEnglish = lang === 'en';
  const isTraditional = lang === 'zh-TW';
  const mail = `<a href="mailto:${supportEmail}">${supportEmail}</a>`;
  const links = (items: Array<[string, string]>) => `<nav class="site-info">${items.map(([label, href]) => `<a href="${href}">${escapeHtml(label)}</a>`).join(' · ')}</nav>`;

  if (slug === 'about') {
    const title = isEnglish
      ? 'About the DLSS 5 GPU evidence checker'
      : isTraditional
        ? '關於本站：DLSS 5 顯示卡證據檢查器'
        : '关于本站：DLSS 5 显卡证据检测器';
    const description = isEnglish
      ? `Who publishes the DLSS 5 GPU evidence checker at dlss5.app, what it does and does not claim, and how it relates to dlss5nvidia.com. Reviewed ${reviewedDate}.`
      : isTraditional
        ? `dlss5.app 的 DLSS 5 顯示卡證據檢查器由誰發布、聲明什麼與不聲明什麼、與 dlss5nvidia.com 是什麼關係。複審日期 ${reviewedDate}。`
        : `dlss5.app 的 DLSS 5 显卡证据检测器由谁发布、声明什么与不声明什么、与 dlss5nvidia.com 是什么关系。复审日期 ${reviewedDate}。`;
    const body = isEnglish
      ? `<section><h2>What this site is</h2><p>Neural Architect is an independent, free DLSS 5 GPU compatibility checker published at https://www.dlss5.app. It maps ${gpuEntries.length} GeForce RTX models to the public NVIDIA source behind each status, in English, Simplified Chinese and Traditional Chinese — ${pageCount} pages in total. Every model has its own page carrying the card's hardware record, its DLSS 5 status and the source for both.</p><p>The site answers one question: can this card run DLSS 5, and what is the evidence? It does not sell anything, does not require an account and does not scan your computer.</p></section><section><h2>How it relates to dlss5nvidia.com</h2><p>Both sites are published by the same team and are meant to be read together. <a href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a> is the product and workflow site — the local DLSS 5 Studio software, the visual converter, model workflows and the download page. This site is the evidence desk: compatibility, per-card records and the sources behind them. The division is deliberate, so a "can my card run it" question and a "how do I use it" question do not get answered with the same page.</p></section><section><h2>What this site does not claim</h2><p>It is not affiliated with, endorsed by or connected to NVIDIA. It publishes no compatibility claim that is not backed by an official NVIDIA source or a published specification table. It does not turn community reports, leaks or predictions into a status, and it publishes no benchmark ranking between models.</p><p>Where the evidence is missing, the record says so: "unconfirmed" means we found no official model-level statement, not that the card has been rejected.</p></section><section><h2>How the data is maintained</h2><p>Statuses and hardware records are updated when NVIDIA publishes verifiable information; each affected page carries its own review date. The rules we hold ourselves to are written out on the <a href="/${lang}/editorial-policy">editorial policy</a> page.</p></section><section><h2>Contact</h2><p>Corrections, source suggestions and questions: ${mail}. How to reach us, and what we can and cannot answer, is on the <a href="/${lang}/contact">contact page</a>.</p></section>`
      : isTraditional
        ? `<section><h2>這是什麼站</h2><p>Neural Architect 是獨立的免費 DLSS 5 顯示卡相容性檢查器，發佈在 https://www.dlss5.app。本站把 ${gpuEntries.length} 款 GeForce RTX 型號逐一對應到每條狀態背後的 NVIDIA 公開來源，以英文、簡體中文、繁體中文三種語言發佈，共 ${pageCount} 個頁面。每款型號都有自己的頁面，上面有這張卡的硬體紀錄、DLSS 5 狀態，以及兩者各自的來源。</p><p>本站只回答一個問題：這張卡能不能執行 DLSS 5，憑什麼這麼說。這裡不賣東西、不要求註冊，也不會掃描你的電腦。</p></section><section><h2>與 dlss5nvidia.com 的關係</h2><p>兩個站由同一個團隊維護，是要一起看的。<a href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a> 是產品與工作流程站——本機 DLSS 5 Studio 軟體、視覺轉換器、模型工作流程與下載頁；本站是證據台：相容性、逐卡紀錄與它們的來源。這樣分開是刻意的，「我的卡能不能跑」和「我要怎麼用」不該用同一頁回答。</p></section><section><h2>本站不聲明什麼</h2><p>本站與 NVIDIA 沒有隸屬、背書或合作關係。凡是官方聲明或公開規格表支持不了的相容性結論，我們都不寫；也不把社群說法、洩露或預測寫成狀態，不發布型號之間的效能排名。</p><p>證據不足時，紀錄就照實寫：「尚未確認」代表我們沒有找到官方型號級聲明，不代表這張卡被否定。</p></section><section><h2>資料怎麼維護</h2><p>NVIDIA 發布可核實資訊時更新狀態與硬體紀錄；受影響的頁面各自標註複審日期。我們給自己定的規矩寫在<a href="/${lang}/editorial-policy">編輯政策</a>頁。</p></section><section><h2>聯絡</h2><p>更正、補充來源或提問：${mail}。怎麼找我們、我們能答什麼與不能答什麼，寫在<a href="/${lang}/contact">聯絡頁</a>。</p></section>`
        : `<section><h2>这是什么站</h2><p>Neural Architect 是独立的免费 DLSS 5 显卡兼容性检测器，发布在 https://www.dlss5.app。本站把 ${gpuEntries.length} 款 GeForce RTX 型号逐一对应到每条状态背后的 NVIDIA 公开来源，以英文、简体中文、繁体中文三种语言发布，共 ${pageCount} 个页面。每款型号都有自己的页面，上面有这张卡的硬件记录、DLSS 5 状态，以及两者各自的来源。</p><p>本站只回答一个问题：这张卡能不能运行 DLSS 5，凭什么这么说。这里不卖东西、不要求注册，也不会扫描你的电脑。</p></section><section><h2>与 dlss5nvidia.com 的关系</h2><p>两个站由同一个团队维护，是要一起看的。<a href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a> 是产品与工作流站——本地 DLSS 5 Studio 软件、视觉转换器、模型工作流与下载页；本站是证据台：兼容性、逐卡记录与它们的来源。这样分开是刻意的，「我的卡能不能跑」和「我要怎么用」不该用同一页回答。</p></section><section><h2>本站不声明什么</h2><p>本站与 NVIDIA 没有隶属、背书或合作关系。凡是官方声明或公开规格表支持不了的兼容性结论，我们都不写；也不把社区说法、泄露或预测写成状态，不发布型号之间的性能排名。</p><p>证据不足时，记录就照实写：「未确认」代表我们没有找到官方型号级声明，不代表这张卡被否定。</p></section><section><h2>数据怎么维护</h2><p>NVIDIA 发布可核实信息时更新状态与硬件记录；受影响的页面各自标注复审日期。我们给自己定的规矩写在<a href="/${lang}/editorial-policy">编辑政策</a>页。</p></section><section><h2>联系</h2><p>更正、补充来源或提问：${mail}。怎么找我们、我们能答什么与不能答什么，写在<a href="/${lang}/contact">联系页</a>。</p></section>`;
    return { title, description, heading: isEnglish ? 'About this site' : isTraditional ? '關於本站' : '关于本站', body, schemaType: 'AboutPage' };
  }

  if (slug === 'editorial-policy') {
    const title = isEnglish
      ? 'DLSS 5 editorial policy and review dates'
      : isTraditional
        ? '編輯政策：DLSS 5 狀態與硬體紀錄的來源規矩'
        : '编辑政策：DLSS 5 状态与硬件记录的来源规矩';
    const description = isEnglish
      ? `The rules behind every DLSS 5 status on dlss5.app — what counts as evidence, what we refuse to publish, how review dates work. Reviewed ${reviewedDate}.`
      : isTraditional
        ? `dlss5.app 上每條 DLSS 5 狀態背後的規矩：什麼算證據、我們拒寫什麼、複審日期怎麼運作。複審日期 ${reviewedDate}。`
        : `dlss5.app 上每条 DLSS 5 状态背后的规矩：什么算证据、我们拒写什么、复审日期怎么运作。复审日期 ${reviewedDate}。`;
    const body = isEnglish
      ? `<section><h2>One status, one source</h2><p>Every card carries one of three statuses, and each one has a specific evidence requirement. Nothing is written into a status field on the strength of a plausible argument.</p>${renderStatusTable(lang)}</section><section><h2>What counts as a source</h2><p>Official NVIDIA announcements, product pages, driver release notes and published specification tables. For the per-card hardware record — launch date, die, CUDA cores, memory bus, board power — we use the published GeForce RTX series specification tables, which cite NVIDIA's own product pages and architecture whitepapers; each model page prints the source link and the date it our side read it (${reviewedDate}).</p><p>Where a card exists in more than one memory configuration, the record is matched to the configuration this site lists, so the spec row and the VRAM column can never disagree.</p></section><section><h2>What we refuse to publish</h2><p>Community reports, mod results, leaks and launch-date guesses are not evidence and are never turned into a status. We publish no ranking between models and no performance percentage unless we measured it ourselves. Where our own measurement exists it is labelled as a single-machine result with the machine, the driver and the input given — the RTX 4090 video run on this site is exactly that: one configuration, not a promise about yours.</p></section><section><h2>Freshness</h2><p>Model pages and articles carry a review date, and the sitemap's lastmod value is taken from the same field, so the page and the sitemap can never disagree about how current a claim is. A page is only given a new review date when its claims were actually re-checked against their sources.</p></section><section><h2>Corrections</h2><p>When a claim turns out to be wrong or the source has changed, we change the page and update its review date. If you find an error, write to ${mail} with the URL and the source you are comparing against.</p></section>${links([[isEnglish ? 'About this site' : isTraditional ? '關於本站' : '关于本站', `/${lang}/about`], [isEnglish ? 'Contact' : isTraditional ? '聯絡我們' : '联系我们', `/${lang}/contact`], [isEnglish ? 'DLSS 5 Studio on dlss5nvidia.com' : isTraditional ? 'DLSS 5 Studio（dlss5nvidia.com）' : 'DLSS 5 Studio（dlss5nvidia.com）', 'https://www.dlss5nvidia.com/download']])}`
      : isTraditional
        ? `<section><h2>一條狀態，一個來源</h2><p>每張卡只會落在三種狀態之一，每種狀態都有明確的證據要求。不會因為「說得通」就往狀態欄裡寫東西。</p>${renderStatusTable(lang)}</section><section><h2>什麼算來源</h2><p>NVIDIA 官方公告、產品頁、驅動程式發行說明，以及公開的規格表。逐卡的硬體紀錄——發佈時間、核心代號、CUDA 核心數、顯存位寬、整卡功耗——取自公開的 GeForce RTX 系列規格表，該表引用 NVIDIA 自己的產品頁與架構白皮書；每個型號頁都印出來源連結與我們讀取的日期（${reviewedDate}）。</p><p>同一款卡存在多種顯存配置時，紀錄對齊本站列出的那一種，因此規格列與顯存欄不會互相矛盾。</p></section><section><h2>我們拒寫什麼</h2><p>社群說法、改機結果、洩露與發布日期猜測都不算證據，也不會被寫成狀態。我們不發布型號之間的排名；沒有自己測過的效能百分比也不寫。確實有自己實測的地方，會標明是單機單配置的結果並附上機器、驅動與輸入——本站 RTX 4090 的那組影片數據就是如此：一個配置的結果，不是對你那台的承諾。</p></section><section><h2>新鮮度</h2><p>型號頁與文章都標註複審日期，sitemap 的 lastmod 取同一個值，所以頁面與 sitemap 不會對「這條結論有多新」各說各話。只有在真的回到來源核對過之後，頁面才會更新複審日期。</p></section><section><h2>更正</h2><p>如果某條結論是錯的，或來源變了，我們改頁面並更新複審日期。發現錯誤時，請把網址與你對照的來源寄到 ${mail}。</p></section>${links([['關於本站', `/${lang}/about`], ['聯絡我們', `/${lang}/contact`], ['DLSS 5 Studio（dlss5nvidia.com）', 'https://www.dlss5nvidia.com/download']])}`
        : `<section><h2>一条状态，一个来源</h2><p>每张卡只会落在三种状态之一，每种状态都有明确的证据要求。不会因为「说得通」就往状态栏里写东西。</p>${renderStatusTable(lang)}</section><section><h2>什么算来源</h2><p>NVIDIA 官方公告、产品页、驱动发行说明，以及公开的规格表。逐卡的硬件记录——发布时间、核心代号、CUDA 核心数、显存位宽、整卡功耗——取自公开的 GeForce RTX 系列规格表，该表引用 NVIDIA 自己的产品页与架构白皮书；每个型号页都印出来源链接与我们读取的日期（${reviewedDate}）。</p><p>同一款卡存在多种显存配置时，记录对齐本站列出的那一种，因此规格列与显存栏不会互相矛盾。</p></section><section><h2>我们拒写什么</h2><p>社区说法、改机结果、泄露与发布日期猜测都不算证据，也不会被写成状态。我们不发布型号之间的排名；没有自己测过的性能百分比也不写。确实有自己实测的地方，会标明是单机单配置的结果并附上机器、驱动与输入——本站 RTX 4090 的那组视频数据就是如此：一个配置的结果，不是对你那台的承诺。</p></section><section><h2>新鲜度</h2><p>型号页与文章都标注复审日期，sitemap 的 lastmod 取同一个值，所以页面与 sitemap 不会对「这条结论有多新」各说各话。只有在真的回到来源核对过之后，页面才会更新复审日期。</p></section><section><h2>更正</h2><p>如果某条结论是错的，或来源变了，我们改页面并更新复审日期。发现错误时，请把网址与你对照的来源寄到 ${mail}。</p></section>${links([['关于本站', `/${lang}/about`], ['联系我们', `/${lang}/contact`], ['DLSS 5 Studio（dlss5nvidia.com）', 'https://www.dlss5nvidia.com/download']])}`;
    return { title, description, heading: isEnglish ? 'Editorial policy' : isTraditional ? '編輯政策' : '编辑政策', body, schemaType: 'WebPage' };
  }

  if (slug === 'contact') {
    const title = isEnglish
      ? 'Contact the DLSS 5 evidence checker'
      : isTraditional
        ? '聯絡 DLSS 5 顯示卡證據檢查器'
        : '联系 DLSS 5 显卡证据检测器';
    const description = isEnglish
      ? `How to reach Neural Architect about a DLSS 5 status, a source or a correction — and what this site cannot answer. Reviewed ${reviewedDate}.`
      : isTraditional
        ? `如何就 DLSS 5 狀態、來源或更正與 Neural Architect 聯絡，以及本站不能回答什麼。複審日期 ${reviewedDate}。`
        : `如何就 DLSS 5 状态、来源或更正与 Neural Architect 联系，以及本站不能回答什么。复审日期 ${reviewedDate}。`;
    const body = isEnglish
      ? `<section><h2>Email</h2><p>${mail} — the same mailbox the software and billing pages use. Both sites are read by the same team.</p></section><section><h2>What we can help with</h2><p>A status that looks wrong, a source we have missed for a specific card, a hardware value that does not match the specification table, a broken link, or a page that needs re-review. Include the URL and, where you have one, the source you are comparing against — that is usually enough to act on.</p></section><section><h2>What we cannot answer</h2><p>We cannot say when NVIDIA will publish support for a given generation, whether a specific unreleased game will ship DLSS 5, or what performance your machine will produce. Those are not things this site measures, and inventing an answer would contradict the <a href="/${lang}/editorial-policy">editorial policy</a> it publishes.</p></section><section><h2>Looking for the software instead?</h2><p>The local DLSS 5 Studio build, its requirements and its measured results are on <a href="https://www.dlss5nvidia.com/download">dlss5nvidia.com/download</a>; subscription questions go to the same address. This site only covers whether a card is in scope and on what evidence.</p></section><section><h2>Security note</h2><p>We never ask for passwords, payment details or remote access by email. Anything requesting those is not from us.</p></section>`
      : isTraditional
        ? `<section><h2>電子郵件</h2><p>${mail}——與軟體、付款頁面用的是同一個信箱。兩個站由同一批人讀。</p></section><section><h2>我們能幫什麼</h2><p>某條狀態看起來不對、某款卡我們漏了來源、某個硬體數值與規格表不符、連結失效，或某頁需要重新複審。請附上網址；如果你有對照的來源也一併附上——通常這樣就足以處理。</p></section><section><h2>我們不能答什麼</h2><p>我們不能說 NVIDIA 什麼時候會為某代顯示卡發布支援、某款未上市遊戲會不會支援 DLSS 5，也無法預測你那台機器的效能。這些不是本站測得到的事，硬編一個答案會違背本站公開的<a href="/${lang}/editorial-policy">編輯政策</a>。</p></section><section><h2>你要找的是軟體？</h2><p>本機 DLSS 5 Studio 版本、執行要求與實測結果在 <a href="https://www.dlss5nvidia.com/download">dlss5nvidia.com/download</a>；訂閱相關問題寄同一個信箱。本站只負責這張卡在不在範圍內、憑什麼。</p></section><section><h2>安全提醒</h2><p>我們不會用郵件索取密碼、付款資訊或遠端存取權限。任何索取這些的郵件都不是我們發的。</p></section>`
        : `<section><h2>电子邮件</h2><p>${mail}——与软件、付款页面用的是同一个邮箱。两个站由同一批人读。</p></section><section><h2>我们能帮什么</h2><p>某条状态看起来不对、某款卡我们漏了来源、某个硬件数值与规格表不符、链接失效，或某页需要重新复审。请附上网址；如果你有对照的来源也一并附上——通常这样就足以处理。</p></section><section><h2>我们不能答什么</h2><p>我们不能说 NVIDIA 什么时候会为某代显卡发布支持、某款未上市游戏会不会支持 DLSS 5，也无法预测你那台机器的性能。这些不是本站测得到的事，硬编一个答案会违背本站公开的<a href="/${lang}/editorial-policy">编辑政策</a>。</p></section><section><h2>你要找的是软件？</h2><p>本地 DLSS 5 Studio 版本、运行要求与实测结果在 <a href="https://www.dlss5nvidia.com/download">dlss5nvidia.com/download</a>；订阅相关问题寄同一个邮箱。本站只负责这张卡在不在范围内、凭什么。</p></section><section><h2>安全提醒</h2><p>我们不会用邮件索取密码、付款信息或远程访问权限。任何索取这些的邮件都不是我们发的。</p></section>`;
    return { title, description, heading: isEnglish ? 'Contact' : isTraditional ? '聯絡我們' : '联系我们', body, schemaType: 'ContactPage' };
  }

  const title = isEnglish
    ? 'Privacy: what dlss5.app collects'
    : isTraditional
      ? '隱私：dlss5.app 收集什麼、不收集什麼'
      : '隐私：dlss5.app 收集什么、不收集什么';
  const description = isEnglish
    ? `No accounts, no uploads, no scanning script, and no advertising. Google Analytics 4 measures aggregated route traffic and events. The external services this site relies on, and what they see. Reviewed ${reviewedDate}.`
    : isTraditional
      ? `不要求註冊、不收上傳、不跑掃描腳本，也沒有廣告。Google Analytics 4 只量測彙總的路由流量與事件。本站依賴的外部服務，以及它們能看到什麼。複審日期 ${reviewedDate}。`
      : `不要求注册、不收上传、不跑扫描脚本，也没有广告。Google Analytics 4 只量测汇总的路由流量与事件。本站依赖的外部服务，以及它们能看到什么。复审日期 ${reviewedDate}。`;
  const body = isEnglish
    ? `<section><h2>What this site does not do</h2><p>No account is required and none can be created. No file can be uploaded here. No script on this site reads your hardware: the checker is a published data set, not a scan of your computer. There is no newsletter and no advertising.</p><p>Queries you type into the checker are handled in your browser; the URL of a model page is a plain path, so nothing about your machine is sent to us when you open it.</p></section><section><h2>The two external services this site uses</h2><p><strong>Google Fonts</strong> — the page loads its typefaces from fonts.googleapis.com and fonts.gstatic.com. Your IP address and browser user agent are sent to Google as part of that request; that is a Google service, governed by Google's own privacy terms.</p><p><strong>Vercel hosting</strong> — the site is served by Vercel, which keeps standard request logs (IP address, user agent, timestamp, requested path) as any web host does.</p><p>Article pages with a share image load that image from the Unsplash CDN (images.unsplash.com).</p></section><section><h2>Third-party analytics and ads</h2><p>Google Analytics 4 is loaded after the page load event to measure aggregated route traffic and product events. We send the page path, language and event name; we do not send GPU queries, files, account details or advertising identifiers. This site runs no advertising script.</p></section><section><h2>Payments</h2><p>Nothing is sold on this site and no payment details are collected here. The paid product lives on <a href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a>, and its own privacy, refund and terms pages govern that transaction.</p></section><section><h2>Outbound links</h2><p>Pages here link to NVIDIA's own announcements and to dlss5nvidia.com. Once you follow an outbound link, the destination site's own privacy policy applies.</p></section><section><h2>Questions</h2><p>Write to ${mail} with the URL you are asking about.</p></section>`
    : isTraditional
      ? `<section><h2>本站不做什麼</h2><p>不需要註冊，也沒有註冊功能。本站不接受任何檔案上傳。本站沒有腳本會去讀你的硬體：檢查器是一份公開資料集，不是對你電腦的掃描。沒有電子報，也沒有廣告。</p><p>你在檢查器裡輸入的查詢在瀏覽器內處理；型號頁的網址就是一條普通路徑，開啟它不會送出任何關於你機器的資訊。</p></section><section><h2>本站用到的兩個外部服務</h2><p><strong>Google Fonts</strong>——頁面從 fonts.googleapis.com 與 fonts.gstatic.com 載入字型。這個請求會把你的 IP 位址與瀏覽器 UA 送給 Google；那是 Google 的服務，適用 Google 自己的隱私條款。</p><p><strong>Vercel 託管</strong>——本站由 Vercel 提供服務，跟任何網站主機一樣會保留標準請求日誌（IP 位址、UA、時間、請求路徑）。</p><p>帶分享圖的文章頁，該圖片從 Unsplash 的 CDN（images.unsplash.com）載入。</p></section><section><h2>第三方分析與廣告</h2><p>Google Analytics 4 會在頁面載入後載入，用來量測彙總的路由流量與產品事件。我們只送出頁面路徑、語言與事件名稱，不送出 GPU 查詢、檔案、帳號資料或廣告識別碼。本站不執行廣告腳本。</p></section><section><h2>付款</h2><p>本站不販售任何東西，也不在此收集付款資訊。付費產品在 <a href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a>，該筆交易適用它自己的隱私、退款與條款頁。</p></section><section><h2>對外連結</h2><p>本站頁面會連結到 NVIDIA 自己的公告與 dlss5nvidia.com。一旦你離開本站，目的地網站的隱私政策適用於那裡。</p></section><section><h2>問題</h2><p>請把你要問的網址附上，寄到 ${mail}。</p></section>`
      : `<section><h2>本站不做什么</h2><p>不需要注册，也没有注册功能。本站不接受任何文件上传。本站没有脚本会去读你的硬件：检测器是一份公开数据集，不是对你电脑的扫描。没有订阅邮件，也没有广告。</p><p>你在检测器里输入的查询在浏览器内处理；型号页的网址就是一条普通路径，打开它不会送出任何关于你机器的信息。</p></section><section><h2>本站用到的两个外部服务</h2><p><strong>Google Fonts</strong>——页面从 fonts.googleapis.com 与 fonts.gstatic.com 加载字体。这个请求会把你的 IP 地址与浏览器 UA 送给 Google；那是 Google 的服务，适用 Google 自己的隐私条款。</p><p><strong>Vercel 托管</strong>——本站由 Vercel 提供服务，跟任何网站主机一样会保留标准请求日志（IP 地址、UA、时间、请求路径）。</p><p>带分享图的文章页，该图片从 Unsplash 的 CDN（images.unsplash.com）加载。</p></section><section><h2>第三方分析与广告</h2><p>Google Analytics 4 会在页面加载后加载，用来量测汇总的路由流量与产品事件。我们只送出页面路径、语言与事件名称，不送出 GPU 查询、文件、账号资料或广告识别码。本站不执行广告脚本。</p></section><section><h2>付款</h2><p>本站不销售任何东西，也不在此收集付款信息。付费产品在 <a href="https://www.dlss5nvidia.com/">dlss5nvidia.com</a>，该笔交易适用它自己的隐私、退款与条款页。</p></section><section><h2>对外链接</h2><p>本站页面会链接到 NVIDIA 自己的公告与 dlss5nvidia.com。一旦你离开本站，目的地网站的隐私政策适用于那里。</p></section><section><h2>问题</h2><p>请把你要问的网址附上，寄到 ${mail}。</p></section>`;
  return { title, description, heading: isEnglish ? 'Privacy' : isTraditional ? '隱私' : '隐私', body, schemaType: 'WebPage' };
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

type SampleLang = 'ja' | 'ko';

const updatesCopy: Record<Lang, { title: string; description: string; heading: string; intro: string; items: Array<[string, string, string, string]> }> = {
  en: {
    title: 'DLSS 5 checker updates | Neural Architect',
    description: 'A dated record of substantive changes to the DLSS 5 evidence checker and its source-linked pages.',
    heading: 'Updates',
    intro: 'This page records substantive changes when they are made. It is not a promise of daily updates.',
    items: [
      ['2026-10-10', 'GPU evidence pages now expose model-level launch, CUDA, bus-width and board-power facts with source links.', '/en/supported-cards', 'Open supported cards'],
      ['2026-10-10', 'The supported-cards landing page and site-information pages now carry review dates and clear evidence boundaries.', '/en/editorial-policy', 'Read the editorial policy'],
      ['2026-10-10', 'Home, model and article answer sections were made self-contained so readers can verify a claim before following a source.', '/en', 'Open the checker home'],
    ],
  },
  'zh-CN': {
    title: 'DLSS 5 检测器更新记录 | Neural Architect',
    description: '记录 DLSS 5 证据检测器及其来源页面的实质性变更，并标明受影响页面。',
    heading: '更新记录',
    intro: '本页只记录已经发生的实质性变更，不承诺每天更新。',
    items: [
      ['2026-10-10', '显卡证据页现在展示型号级发布时间、CUDA、位宽和板卡功耗，并附上来源链接。', '/zh-CN/supported-cards', '查看支持显卡'],
      ['2026-10-10', '支持显卡页和站点信息页加入复审日期，并明确证据边界。', '/zh-CN/editorial-policy', '阅读编辑政策'],
      ['2026-10-10', '首页、型号页和文章的回答段改为自足内容，读者可先核对主张再打开来源。', '/zh-CN', '打开检测器首页'],
    ],
  },
  'zh-TW': {
    title: 'DLSS 5 檢查器更新紀錄 | Neural Architect',
    description: '記錄 DLSS 5 證據檢查器與來源頁面的實質變更，並標明受影響頁面。',
    heading: '更新紀錄',
    intro: '本頁只記錄已經發生的實質變更，不承諾每日更新。',
    items: [
      ['2026-10-10', '顯示卡證據頁現在展示型號級發布時間、CUDA、位寬與板卡功耗，並附上來源連結。', '/zh-TW/supported-cards', '查看支援顯示卡'],
      ['2026-10-10', '支援顯示卡頁與站點資訊頁加入複審日期，並明確標示證據邊界。', '/zh-TW/editorial-policy', '閱讀編輯政策'],
      ['2026-10-10', '首頁、型號頁與文章的回答段改為自足內容，讀者可先核對主張再開啟來源。', '/zh-TW', '開啟檢查器首頁'],
    ],
  },
};

function updatesBody(lang: Lang): string {
  const c = updatesCopy[lang];
  const items = c.items.map(([date, text, href, label]) => `<article><time datetime="${date}">${date}</time><p>${escapeHtml(text)}</p><p><a href="${href}">${escapeHtml(label)} →</a></p></article>`).join('');
  const note = lang === 'en'
    ? 'A date here means that a substantive page, data, or evidence-boundary change was reviewed. It does not mean that the underlying hardware status changed on that day. Model pages remain the place to read the current status and its source.'
    : lang === 'zh-TW'
      ? '這裡的日期代表頁面、資料或證據邊界完成了一次實質複審，不代表硬體狀態在當天改變。型號頁仍是閱讀最新狀態與來源的地方。'
      : '这里的日期代表页面、资料或证据边界完成了一次实质复审，不代表硬件状态在当天改变。型号页仍是阅读最新状态与来源的地方。';
  const scope = lang === 'en'
    ? 'The checker keeps the game-internal status separate from the local Studio track. The update links above point to the page that owns each explanation, so a reader can verify the scope without treating this log as a compatibility table.'
    : lang === 'zh-TW'
      ? '檢查器把遊戲內狀態與本機 Studio 路線分開。上面的更新連結會指向負責該說明的頁面，讀者可以在不把這份紀錄當成相容性表格的情況下核對範圍。'
      : '检测器把游戏内状态与本地 Studio 路线分开。上面的更新链接会指向负责该说明的页面，读者可以在不把这份记录当成兼容性表格的情况下核对范围。';
  return `<main class="seo-shell"><header><p class="eyebrow">NEURAL ARCHITECT</p><h1>${escapeHtml(c.heading)}</h1><p class="lede">${escapeHtml(c.intro)}</p></header><section class="article-list">${items}</section><section><h2>${lang === 'en' ? 'How to use this log' : lang === 'zh-TW' ? '如何閱讀這份紀錄' : '如何阅读这份记录'}</h2><p>${escapeHtml(note)}</p><p>${escapeHtml(scope)}</p><p>${lang === 'en' ? 'For a correction, use the public contact page and include the affected URL and the source you checked.' : lang === 'zh-TW' ? '如果需要更正，請使用公開聯絡頁，附上受影響的網址與你核對過的來源。' : '如果需要更正，请使用公开联系页面，并附上受影响的网址与你核对过的来源。'}</p><p><a href="/${lang}/contact">${lang === 'en' ? 'Contact the evidence desk →' : lang === 'zh-TW' ? '聯絡資料頁 →' : '联系资料页 →'}</a></p></section><p><a href="/${lang}">${lang === 'en' ? 'Back to the checker home' : lang === 'zh-TW' ? '返回檢查器首頁' : '返回检测器首页'}</a></p></main>`;
}

const sampleFaq: Record<SampleLang, Array<[string, string]>> = {
  ja: [
    ['DLSS 5 の対応状況はどこで確認できますか？', 'モデル名を検索し、各モデルの証拠ページとリンクされた NVIDIA の情報を確認してください。'],
    ['RTX 40 シリーズは確認済みですか？', 'このサイトが追跡している公開情報では、RTX 40 シリーズのモデル単位の確認は未確定です。'],
    ['このページは NVIDIA の公式ツールですか？', 'いいえ。公開情報にリンクする独立した資料ページで、パソコンをスキャンしません。'],
    ['更新日は何を意味しますか？', '表示された日付は、このページのデータと文章を最後に確認した日です。'],
  ],
  ko: [
    ['DLSS 5 지원 상태는 어디에서 확인하나요?', '모델명을 검색한 뒤 해당 모델의 근거 페이지와 연결된 NVIDIA 정보를 확인하세요.'],
    ['RTX 40 시리즈는 확인되었나요?', '이 사이트가 추적하는 공개 정보에서는 RTX 40 시리즈의 모델별 지원이 아직 확인되지 않았습니다.'],
    ['이 페이지는 NVIDIA 공식 도구인가요?', '아니요. 공개 자료에 연결하는 독립 자료 페이지이며 컴퓨터를 스캔하지 않습니다.'],
    ['검토 날짜는 무엇을 뜻하나요?', '표시된 날짜는 이 페이지의 데이터와 문장을 마지막으로 확인한 날짜입니다.'],
  ],
};

function sampleStatus(lang: SampleLang, status: string): string {
  if (lang === 'ja') return status === 'confirmed' ? '確認済み' : status === 'unconfirmed' ? '未確認' : '公開範囲外';
  return status === 'confirmed' ? '확인됨' : status === 'unconfirmed' ? '미확인' : '공개 범위 밖';
}

function sampleRows(lang: SampleLang): string {
  const linkLang = lang === 'ja' || lang === 'ko' ? 'en' : lang;
  const headers = lang === 'ja' ? ['GPUモデル', 'VRAM', 'アーキテクチャ', 'DLSS 5 状態', '根拠'] : ['GPU 모델', 'VRAM', '아키텍처', 'DLSS 5 상태', '근거'];
  const rows = gpuEntries.map(gpu => {
    const architecture = gpuData.gpu_series.find(series => series.id === gpu.series)?.architecture || '';
    const evidence = lang === 'ja' ? 'モデル証拠ページ' : '모델 근거 페이지';
    return `<tr><th scope="row"><a href="/${linkLang}/gpu/${gpu.id}">${escapeHtml(gpu.name)}</a></th><td>${gpu.vram_gb} GB</td><td>${escapeHtml(architecture)}</td><td>${sampleStatus(lang, gpu.dlss5_status)}</td><td><a href="/${linkLang}/gpu/${gpu.id}">${evidence} →</a></td></tr>`;
  }).join('');
  return `<table><thead><tr>${headers.map(escapeHtml).map(item => `<th>${item}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
}

function sampleHomeBody(lang: SampleLang): string {
  const ja = lang === 'ja';
  const questions = sampleFaq[lang].map(([q, a]) => `<section><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></section>`).join('');
  const title = ja ? 'DLSS 5 GPU 証拠チェッカー' : 'DLSS 5 GPU 근거 검사기';
  const intro = ja ? 'GPU モデルごとの状態、VRAM、アーキテクチャ、根拠リンクを確認できるサンプルページです。' : 'GPU 모델별 상태, VRAM, 아키텍처와 근거 링크를 확인하는 샘플 페이지입니다.';
  const method = ja ? 'RTX 50 は公開された範囲で確認済み、RTX 40 は未確認、RTX 30/20 と AMD は現在の公開範囲外です。各結論はモデルページのリンク先で再確認してください。' : 'RTX 50은 공개된 범위에서 확인되었고 RTX 40은 미확인입니다. RTX 30/20과 AMD는 현재 공개 범위 밖입니다. 각 결론은 모델 페이지의 링크에서 다시 확인하세요.';
  const steps = ja ? ['検査器で GPU モデルを検索', '表示された状態を読む', 'モデルの証拠ページを開く', 'ページの NVIDIA リンクで文言を確認'] : ['검사기에서 GPU 모델 검색', '표시된 상태 읽기', '모델 근거 페이지 열기', '페이지의 NVIDIA 링크에서 문구 확인'];
  return `<main class="seo-shell"><header><p class="eyebrow">NEURAL ARCHITECT · ${ja ? '日本語サンプル' : '한국어 샘플'}</p><h1>${title}</h1><p class="lede">${intro}</p><p>${method}</p></header><section><h2>${ja ? '4段階で根拠を読む' : '4단계로 근거 읽기'}</h2><ol>${steps.map(escapeHtml).map(step => `<li>${step}</li>`).join('')}</ol><p><a href="/${lang}/supported-cards">${ja ? '対応カード一覧を見る →' : '전체 지원 카드 표 보기 →'}</a></p></section><section><h2>${ja ? `${gpuEntries.length} GPUモデル` : `${gpuEntries.length}개 GPU 모델`}</h2>${sampleRows(lang)}</section><section><h2>${ja ? 'よくある質問' : '자주 묻는 질문'}</h2>${questions}</section></main>`;
}

function sampleSupportedCardsBody(lang: SampleLang): string {
  const ja = lang === 'ja';
  const questions = sampleFaq[lang].map(([q, a]) => `<section><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></section>`).join('');
  const title = ja ? 'DLSS 5 対応カードと GPU 証拠' : 'DLSS 5 지원 카드와 GPU 근거';
  const intro = ja ? 'モデル別の VRAM、アーキテクチャ、状態、証拠ページを一覧で確認できます。' : '모델별 VRAM, 아키텍처, 상태와 근거 페이지를 한 표에서 확인할 수 있습니다.';
  return `<main class="seo-shell"><header><p class="eyebrow">NEURAL ARCHITECT · ${ja ? '日本語サンプル' : '한국어 샘플'}</p><h1>${title}</h1><p class="lede">${intro}</p><p>${ja ? '状態は公開資料の範囲に限定しています。確認できないモデルを推測で支援扱いにはしません。' : '상태는 공개 자료의 범위로 한정합니다. 확인되지 않은 모델을 추측으로 지원한다고 쓰지 않습니다.'}</p></header><section><h2>${ja ? 'モデル一覧' : '모델 목록'}</h2>${sampleRows(lang)}</section><section><h2>${ja ? 'よくある質問' : '자주 묻는 질문'}</h2>${questions}</section></main>`;
}

function documentFor(route: string, lang: string, title: string, description: string, body: string, type: 'website' | 'article', jsonLd: unknown, robots = 'index,follow', image = defaultOgImage, alternateCodes: string[] = ['en', 'zh-CN', 'zh-TW']): string {
  const template = readFileSync(join(dist, 'index.html'), 'utf8');
  const canonical = `${baseUrl}${route === '/' ? `/${lang}` : route}`;
  const suffix = route === '/' ? '' : route.slice(`/${lang}`.length);
  const alternates = route === '/'
    ? ''
    : [
      ...alternateCodes.map(code => [code, `${baseUrl}/${code}${suffix}`]),
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
    .replace('<div id="root"></div>', `<div id="root">${body}${trustNav(lang)}</div>`);
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
      { '@type': 'SoftwareApplication', '@id': `${baseUrl}/#application`, name: 'Neural Architect', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', isAccessibleForFree: true, url: `${baseUrl}${homeRoute}`, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, publisher: { '@id': brandOrganization['@id'] } },
      { '@type': 'HowTo', name: lang === 'en' ? "How to check a GPU's DLSS 5 evidence" : lang === 'zh-TW' ? '如何查核顯示卡的 DLSS 5 證據' : '如何查核显卡的 DLSS 5 证据', step: (lang === 'en' ? ['Search for your GPU model in the checker', 'Read the status shown for that card', "Open the card's evidence page", 'Open the NVIDIA source linked on that page and verify the wording'] : lang === 'zh-TW' ? ['在檢查器裡查找你的顯示卡型號', '閱讀該顯示卡顯示的狀態', '開啟該型號的證據頁', '開啟頁面上掛出的 NVIDIA 來源並核對原文'] : ['在检测器里查找你的显卡型号', '阅读该显卡显示的状态', '打开该型号的证据页', '打开页面上挂出的 NVIDIA 来源并核对原文']).map((name, index) => ({ '@type': 'HowToStep', position: index + 1, name })), },
      { '@type': 'FAQPage', mainEntity: faq[lang].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
    ],
  };
  writeRoute(homeRoute, documentFor(homeRoute, lang, c.title, c.description, homeBody(lang), 'website', homeJsonLd));
  const studioRoute = `${homeRoute}/studio`;
  const studioTitle = lang === 'en' ? 'DLSS 5 Studio local software requirements and measured performance | Neural Architect' : lang === 'zh-TW' ? 'DLSS 5 Studio 本機軟體要求與實測效能 | Neural Architect' : 'DLSS 5 Studio 本地软件要求与实测性能 | Neural Architect';
  const studioDescription = lang === 'en' ? 'DLSS 5 Studio local software requirements, RTX and Windows compatibility, NVENC driver notes and a measured RTX 4090 workflow.' : lang === 'zh-TW' ? 'DLSS 5 Studio 本機軟體要求、RTX 與 Windows 相容性、NVENC 驅動程式說明，以及 RTX 4090 實測工作流程。' : 'DLSS 5 Studio 本地软件要求、RTX 与 Windows 兼容性、NVENC 驱动说明，以及 RTX 4090 实测工作流。';
  writeRoute(studioRoute, documentFor(studioRoute, lang, studioTitle, studioDescription, studioBody(lang), 'website', {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: studioTitle, description: studioDescription, url: `${baseUrl}${studioRoute}` },
      breadcrumbNode(lang, [[crumbLabel(lang, 'home'), ''], [crumbLabel(lang, 'studio'), '/studio']]),
    ],
  }));
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
        breadcrumbNode(lang, [[crumbLabel(lang, 'home'), ''], [crumbLabel(lang, 'supportedCards'), '/supported-cards'], [gpu.name, `/gpu/${gpu.id}`]]),
      ],
    };
    writeRoute(gpuRoute, documentFor(gpuRoute, lang, gpuTitle, gpuDescription, gpuDetailBody(lang, gpu.id), 'article', gpuSchema));
  }
  const supportedCardsRoute = `${homeRoute}/supported-cards`;
  const supportedCardsHeading = lang === 'en'
    ? 'DLSS 5 Supported Cards & GPU Compatibility Checker'
    : lang === 'zh-TW'
      ? 'DLSS 5 支援顯示卡與 GPU 相容性檢查器'
      : 'DLSS 5 支持的显卡与 GPU 兼容性检测器';
  const supportedCardsTitle = `${supportedCardsHeading} | Neural Architect`;
  const supportedCardsDescription = lang === 'en'
    ? 'Evidence-based DLSS 5 GPU compatibility matrix by series, architecture and official NVIDIA sources, with an FAQ for upgrade decisions.'
    : lang === 'zh-TW'
      ? '按系列、架構與 NVIDIA 官方來源整理的 DLSS 5 顯示卡相容性矩陣，並提供升級決策常見問題。'
      : '按系列、架构与 NVIDIA 官方来源整理的 DLSS 5 显卡兼容性矩阵，并提供升级决策常见问题。';
  writeRoute(supportedCardsRoute, documentFor(supportedCardsRoute, lang, supportedCardsTitle, supportedCardsDescription, supportedCardsBody(lang), 'website', {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'FAQPage', mainEntity: faq[lang].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
      breadcrumbNode(lang, [[crumbLabel(lang, 'home'), ''], [crumbLabel(lang, 'supportedCards'), '/supported-cards']]),
    ],
  }));
  const blogRoute = `${homeRoute}/blog`;
  const blogDescription = lang === 'en'
    ? 'Independent DLSS 5 explainers covering neural rendering, supported hardware, game settings and AI image tools.'
    : lang === 'zh-TW'
      ? '獨立整理 DLSS 5 神經渲染、支援硬體、遊戲設定與 AI 圖像工具的技術指南。'
      : '独立整理 DLSS 5 神经渲染、支持硬件、游戏设置与 AI 图片工具的技术指南。';
  writeRoute(blogRoute, documentFor(blogRoute, lang, `${c.blog} | Neural Architect`, blogDescription, blogBody(lang), 'website', {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', name: c.blog, url: `${baseUrl}${blogRoute}` },
      breadcrumbNode(lang, [[crumbLabel(lang, 'home'), ''], [crumbLabel(lang, 'blog'), '/blog']]),
    ],
  }));
  const updatesRoute = `${homeRoute}/updates`;
  const updates = updatesCopy[lang];
  writeRoute(updatesRoute, documentFor(updatesRoute, lang, updates.title, updates.description, updatesBody(lang), 'website', {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: updates.heading, description: updates.description, url: `${baseUrl}${updatesRoute}`, dateModified: reviewedDate },
      breadcrumbNode(lang, [[crumbLabel(lang, 'home'), ''], [updates.heading, '/updates']]),
    ],
  }));
  for (const slug of articleSlugs) {
    const route = `${blogRoute}/${slug}`;
    const article = articleBody(lang, slug);
    const articleSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Article', headline: article.meta.title, description: article.meta.description, image: article.meta.og_image ? [article.meta.og_image] : [defaultOgImage], datePublished: article.meta.date, dateModified: article.meta.reviewed || article.meta.date, author: { '@type': 'Organization', name: 'Neural Architect', url: baseUrl }, publisher: { '@id': 'https://www.dlss5nvidia.com/#organization' }, mainEntityOfPage: `${baseUrl}${route}` },
        breadcrumbNode(lang, [[crumbLabel(lang, 'home'), ''], [crumbLabel(lang, 'blog'), '/blog'], [article.meta.title, `/blog/${slug}`]]),
      ],
    };
    writeRoute(route, documentFor(route, lang, `${article.meta.title} | Neural Architect`, article.meta.description, article.body, 'article', articleSchema, 'index,follow', article.meta.og_image || defaultOgImage));
  }
  for (const slug of TRUST_PAGE_SLUGS) {
    const page = trustPage(slug, lang);
    const route = `${homeRoute}/${slug}`;
    const body = `<main class="seo-shell"><header><p class="eyebrow">NEURAL ARCHITECT</p><h1>${escapeHtml(page.heading)}</h1><p class="lede">${escapeHtml(page.description)}</p></header>${page.body}</main>`;
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': page.schemaType, name: page.title, description: page.description, url: `${baseUrl}${route}` },
        breadcrumbNode(lang, [[crumbLabel(lang, 'home'), ''], [page.heading, `/${slug}`]]),
      ],
    };
    writeRoute(route, documentFor(route, lang, `${page.title} | Neural Architect`, page.description, body, 'website', schema));
  }
}

// T4 is intentionally a small evaluation sample: only home and supported-cards
// are emitted for Japanese and Korean, rather than expanding every route.
for (const sampleLang of ['ja', 'ko'] as SampleLang[]) {
  const sampleName = sampleLang === 'ja' ? '日本語' : '한국어';
  const homeRoute = `/${sampleLang}`;
  const homeTitle = sampleLang === 'ja' ? 'DLSS 5 GPU 証拠チェッカー | Neural Architect' : 'DLSS 5 GPU 근거 검사기 | Neural Architect';
  const homeDescription = sampleLang === 'ja' ? 'DLSS 5 の GPU 状態、VRAM、アーキテクチャと根拠リンクを確認する日本語サンプル。' : 'DLSS 5 GPU 상태, VRAM, 아키텍처와 근거 링크를 확인하는 한국어 샘플입니다.';
  writeRoute(homeRoute, documentFor(homeRoute, sampleLang, homeTitle, homeDescription, sampleHomeBody(sampleLang), 'website', {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${baseUrl}/#website`, name: 'Neural Architect', url: baseUrl, inLanguage: sampleLang, publisher: { '@id': brandOrganization['@id'] } },
      { '@type': 'SoftwareApplication', '@id': `${baseUrl}/#application`, name: 'Neural Architect', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', isAccessibleForFree: true, url: `${baseUrl}${homeRoute}`, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, publisher: { '@id': brandOrganization['@id'] } },
      { '@type': 'FAQPage', mainEntity: sampleFaq[sampleLang].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
    ],
  }, 'index,follow', defaultOgImage, ['en', 'zh-CN', 'zh-TW', 'ja', 'ko']));
  const supportedRoute = `/${sampleLang}/supported-cards`;
  const supportedTitle = sampleLang === 'ja' ? 'DLSS 5 対応カードと GPU 証拠 | Neural Architect' : 'DLSS 5 지원 카드와 GPU 근거 | Neural Architect';
  const supportedDescription = sampleLang === 'ja' ? 'DLSS 5 の GPU モデル別状態、VRAM、アーキテクチャと証拠ページ。' : 'DLSS 5 GPU 모델별 상태, VRAM, 아키텍처와 근거 페이지.';
  writeRoute(supportedRoute, documentFor(supportedRoute, sampleLang, supportedTitle, supportedDescription, sampleSupportedCardsBody(sampleLang), 'website', {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'FAQPage', mainEntity: sampleFaq[sampleLang].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
      { '@type': 'WebPage', name: supportedTitle, description: supportedDescription, url: `${baseUrl}${supportedRoute}`, inLanguage: sampleLang },
    ],
  }, 'index,follow', defaultOgImage, ['en', 'zh-CN', 'zh-TW', 'ja', 'ko']));
  console.log(`Generated ${sampleName} sample routes: ${homeRoute}, ${supportedRoute}`);
}

// Keep the root response useful for crawlers that discover the bare domain first.
const rootCopy = copy.en;
writeRoute('/', documentFor('/', 'en', rootCopy.title, rootCopy.description, homeBody('en'), 'website', { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Neural Architect', url: baseUrl }, 'noindex,follow'));

function sitemapXml(): string {
  const date = '2026-10-10';
  const suffixes = ['', '/studio', '/supported-cards', '/blog', '/updates', ...articleSlugs.map(slug => `/blog/${slug}`), ...gpuEntries.map(gpu => `/gpu/${gpu.id}`), ...TRUST_PAGE_SLUGS.map(slug => `/${slug}`)];
  // 文章用自己 frontmatter 的复审日期，别和页面里的 dateModified 打架。
  const articleReviewed = new Map(articleSlugs.map(slug => [`/blog/${slug}`, parseFrontmatter(readFileSync(join(root, 'src/content', `${slug}.md`), 'utf8')).meta.reviewed || date]));
  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const urls: string[] = [];
  for (const suffix of suffixes) {
    for (const lang of Object.keys(copy) as Lang[]) {
      const path = `/${lang}${suffix}`;
      const lastmod = articleReviewed.get(suffix) || date;
      const alternates = (Object.keys(copy) as Lang[]).map(code => `    <xhtml:link rel="alternate" hreflang="${code}" href="${baseUrl}/${code}${suffix}" />`).join('\n');
      // 站点信息页不常改，别跟着首页写 daily —— 编辑政策页承诺过 lastmod 与页面一致，口径也得跟着。
      const changefreq = suffix.startsWith('/blog/') ? 'weekly' : (TRUST_PAGE_SLUGS as readonly string[]).includes(suffix.slice(1)) ? 'monthly' : 'daily';
      const priority = suffix === '' ? '1.0' : suffix === '/supported-cards' ? '0.9' : (TRUST_PAGE_SLUGS as readonly string[]).includes(suffix.slice(1)) ? '0.5' : '0.8';
      urls.push(`  <url>\n    <loc>${escapeXml(`${baseUrl}${path}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${suffix}" />\n  </url>`);
    }
  }
  for (const sample of [
    { lang: 'ja', suffix: '' }, { lang: 'ja', suffix: '/supported-cards' },
    { lang: 'ko', suffix: '' }, { lang: 'ko', suffix: '/supported-cards' },
  ]) {
    const path = `/${sample.lang}${sample.suffix}`;
    const alternates = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko'].map(code => `    <xhtml:link rel="alternate" hreflang="${code}" href="${baseUrl}/${code}${sample.suffix}" />`).join('\n');
    urls.push(`  <url>\n    <loc>${escapeXml(`${baseUrl}${path}`)}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${sample.suffix}" />\n  </url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

// 两份都写：dist 是真正被部署的那份（vite 先跑、拷的是上一轮的 public/sitemap.xml），
// public 是仓库里的源，dev server 与下次构建的拷贝都用它。只写一份就会一直落后一轮。
const sitemap = sitemapXml();
writeFileSync(join(root, 'public/sitemap.xml'), sitemap);
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

console.log(`Pre-rendered ${Object.keys(copy).length} languages, ${articleSlugs.length} articles, supported-cards landing pages and static FAQ/checker content.`);
