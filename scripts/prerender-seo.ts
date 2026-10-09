import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const dist = join(root, 'dist');
const baseUrl = 'https://dlss5.app';

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
    title: 'DLSS 5 Supported Cards & GPU Compatibility Checker',
    description: 'Free DLSS 5 GPU compatibility checker with an evidence-based RTX 50, RTX 40, RTX 30 and RTX 20 series matrix, technical guides and FAQ.',
    h1: 'DLSS 5 Supported Cards & GPU Checker',
    intro: 'Search your NVIDIA GeForce model to see the current DLSS 5 status, architecture, VRAM and the evidence behind each result.',
    checker: 'DLSS 5 supported cards by GPU series',
    matrix: 'DLSS 5, DLSS 4 and FSR 4 explained',
    faq: 'Frequently asked questions',
    blog: 'DLSS 5 technical guides and news',
    sourceNote: 'Independent reference. Hardware status is updated when NVIDIA publishes verifiable information; this site is not affiliated with NVIDIA.',
  },
  'zh-CN': {
    title: 'DLSS 5 支持的显卡与 GPU 兼容性检测器',
    description: '免费的 DLSS 5 显卡兼容性检测器，提供 RTX 50、RTX 40、RTX 30 和 RTX 20 系列的证据、技术指南与常见问题。',
    h1: 'DLSS 5 支持的显卡与 GPU 检测器',
    intro: '输入 NVIDIA GeForce 型号，查看当前 DLSS 5 状态、架构、显存，以及每个结论对应的证据。',
    checker: '按 GPU 系列查看 DLSS 5 支持情况',
    matrix: 'DLSS 5、DLSS 4 与 FSR 4 说明',
    faq: '常见问题',
    blog: 'DLSS 5 技术指南与新闻',
    sourceNote: '独立资料页。NVIDIA 发布可核实信息后我们会更新硬件状态；本站与 NVIDIA 没有隶属关系。',
  },
  'zh-TW': {
    title: 'DLSS 5 支援顯示卡與 GPU 相容性檢查器',
    description: '免費的 DLSS 5 顯示卡相容性檢查器，提供 RTX 50、RTX 40、RTX 30 與 RTX 20 系列的證據、技術指南與常見問題。',
    h1: 'DLSS 5 支援顯示卡與 GPU 檢查器',
    intro: '輸入 NVIDIA GeForce 型號，查看目前 DLSS 5 狀態、架構、顯示記憶體，以及每個結論的證據。',
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

function homeBody(lang: Lang): string {
  const c = copy[lang];
  const questions = faq[lang];
  const rows = gpuSeries.map(([series, architecture, status]) => {
    const translatedStatus = lang === 'en' ? status : status === 'Confirmed' ? (lang === 'zh-CN' ? '已确认' : '已確認') : status === 'Not confirmed by NVIDIA' ? (lang === 'zh-CN' ? 'NVIDIA 尚未确认' : 'NVIDIA 尚未確認') : (lang === 'zh-CN' ? '当前官方列表不支持' : '目前官方清單不支援');
    return `<tr><th scope="row">${escapeHtml(lang === 'en' ? series : series.replace('RTX ', 'GeForce RTX '))}</th><td>${escapeHtml(architecture)}</td><td>${escapeHtml(translatedStatus)}</td></tr>`;
  }).join('');
  const questionsHtml = questions.map(([q, a]) => `<section><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></section>`).join('');
  const isEnglish = lang === 'en';
  return `<main class="seo-shell"><header><p class="eyebrow">${isEnglish ? 'FREE GPU COMPATIBILITY CHECKER' : '免费 GPU 兼容性检测器'}</p><h1>${escapeHtml(c.h1)}</h1><p class="lede">${escapeHtml(c.intro)}</p><form action="/${lang}" method="get"><label for="gpu-query">${isEnglish ? 'GPU model' : 'GPU 型号'}</label><input id="gpu-query" name="gpu" placeholder="RTX 5090" /><button type="submit">${isEnglish ? 'Check compatibility' : '检查兼容性'}</button></form></header><section><h2>${escapeHtml(c.checker)}</h2><table><thead><tr><th>GPU series</th><th>Architecture</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table><p class="source-note">${escapeHtml(c.sourceNote)}</p></section><section><h2>${escapeHtml(c.matrix)}</h2><p>${isEnglish ? 'Compare the neural rendering, frame generation and super resolution paths across NVIDIA GPU generations before you upgrade.' : '在升级前比较不同 NVIDIA GPU 世代的神经渲染、帧生成与超分辨率路径。'}</p><p><a href="https://www.nvidia.com/en-us/geforce/technologies/dlss/">${isEnglish ? 'Read NVIDIA’s official DLSS information' : '阅读 NVIDIA 官方 DLSS 信息'}</a> · <a href="https://dlss5nvidia.com">${isEnglish ? 'Try the free visual converter' : '试用免费的视觉转换工具'}</a></p></section><section><h2>${escapeHtml(c.faq)}</h2>${questionsHtml}</section><section><h2>${escapeHtml(c.blog)}</h2><p><a href="/${lang}/blog">${isEnglish ? 'Browse all technical guides and comparisons →' : '浏览全部技术指南与对比文章 →'}</a></p></section></main>`;
}

function blogBody(lang: Lang): string {
  const isEnglish = lang === 'en';
  const items = articleSlugs.map(slug => {
    const { meta } = parseFrontmatter(readFileSync(join(root, 'src/content', `${slug}.md`), 'utf8'));
    const title = isEnglish ? meta.title : (meta.title_cn || meta.title);
    const description = isEnglish ? meta.description : (meta.description_cn || meta.description);
    return `<article><h2><a href="/${lang}/blog/${slug}">${escapeHtml(title)}</a></h2><p>${escapeHtml(description)}</p><time datetime="${escapeHtml(meta.date || '')}">${escapeHtml(meta.date || '')}</time></article>`;
  }).join('');
  const c = copy[lang];
  return `<main class="seo-shell"><header><p class="eyebrow">${isEnglish ? 'NEURAL ARCHITECT' : 'NEURAL ARCHITECT'}</p><h1>${escapeHtml(c.blog)}</h1><p class="lede">${isEnglish ? 'Independent explainers on DLSS 5 hardware, neural rendering, game settings and AI image tools.' : '关于 DLSS 5 硬件、神经渲染、游戏设置和 AI 图片工具的独立解读。'}</p></header><section class="article-list">${items}</section></main>`;
}

function articleBody(lang: Lang, slug: string): { body: string; meta: Record<string, string> } {
  const parsed = parseFrontmatter(readFileSync(join(root, 'src/content', `${slug}.md`), 'utf8'));
  const title = lang === 'en' ? parsed.meta.title : (parsed.meta.title_cn || parsed.meta.title);
  const description = lang === 'en' ? parsed.meta.description : (parsed.meta.description_cn || parsed.meta.description);
  const body = markdownToHtml(languageBody(parsed.body, lang));
  return { meta: { ...parsed.meta, title, description }, body: `<main class="seo-shell article-shell"><article><p class="eyebrow">${lang === 'en' ? 'DLSS 5 TECHNICAL GUIDE' : 'DLSS 5 技术指南'}</p><h1>${escapeHtml(title)}</h1><p class="lede">${escapeHtml(description)}</p><time datetime="${escapeHtml(parsed.meta.date || '')}">${escapeHtml(parsed.meta.date || '')}</time><div class="article-content">${body}</div><p><a href="/${lang}/blog">← ${lang === 'en' ? 'Back to all guides' : '返回全部指南'}</a> · <a href="https://dlss5nvidia.com">${lang === 'en' ? 'Try the free DLSS 5 visual converter' : '试用免费的 DLSS 5 视觉转换工具'}</a></p></article></main>` };
}

function documentFor(route: string, lang: Lang, title: string, description: string, body: string, type: 'website' | 'article', jsonLd: unknown): string {
  const template = readFileSync(join(dist, 'index.html'), 'utf8');
  const canonical = `${baseUrl}${route === '/' ? `/${lang}` : route}`;
  const head = `<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"/><meta name="robots" content="index,follow"/><link rel="canonical" href="${canonical}"/><meta property="og:title" content="${escapeHtml(title)}"/><meta property="og:description" content="${escapeHtml(description)}"/><meta property="og:type" content="${type}"/><meta property="og:url" content="${canonical}"/><meta name="twitter:card" content="summary_large_image"/><script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('</head>', `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function writeRoute(route: string, html: string): void {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

for (const lang of Object.keys(copy) as Lang[]) {
  const c = copy[lang];
  const homeRoute = `/${lang}`;
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', name: 'Neural Architect', url: baseUrl, inLanguage: lang },
      { '@type': 'WebApplication', name: c.title, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', isAccessibleForFree: true, url: `${baseUrl}${homeRoute}` },
      { '@type': 'FAQPage', mainEntity: faq[lang].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
    ],
  };
  writeRoute(homeRoute, documentFor(homeRoute, lang, c.title, c.description, homeBody(lang), 'website', homeJsonLd));
  const blogRoute = `${homeRoute}/blog`;
  writeRoute(blogRoute, documentFor(blogRoute, lang, `${c.blog} | Neural Architect`, c.description, blogBody(lang), 'website', { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.blog, url: `${baseUrl}${blogRoute}` }));
  for (const slug of articleSlugs) {
    const route = `${blogRoute}/${slug}`;
    const article = articleBody(lang, slug);
    writeRoute(route, documentFor(route, lang, `${article.meta.title} | Neural Architect`, article.meta.description, article.body, 'article', { '@context': 'https://schema.org', '@type': 'Article', headline: article.meta.title, description: article.meta.description, datePublished: article.meta.date, dateModified: article.meta.date, author: { '@type': 'Organization', name: 'Neural Architect', url: baseUrl }, mainEntityOfPage: `${baseUrl}${route}` }));
  }
}

// Keep the root response useful for crawlers that discover the bare domain first.
const rootCopy = copy.en;
writeRoute('/', documentFor('/', 'en', rootCopy.title, rootCopy.description, homeBody('en'), 'website', { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Neural Architect', url: baseUrl }));

console.log(`Pre-rendered ${Object.keys(copy).length} languages, ${articleSlugs.length} articles and static FAQ/checker content.`);
