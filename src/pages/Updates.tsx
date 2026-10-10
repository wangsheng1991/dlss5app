import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

type UpdateItem = { date: string; text: string; href: string; label: string };

const updates: Record<string, { title: string; description: string; heading: string; intro: string; items: UpdateItem[] }> = {
  en: {
    title: 'DLSS 5 checker updates | Neural Architect',
    description: 'A dated record of substantive changes to the DLSS 5 evidence checker and its source-linked pages.',
    heading: 'Updates',
    intro: 'This page records substantive changes when they are made. It is not a promise of daily updates.',
    items: [
      { date: '2026-10-10', text: 'GPU evidence pages now expose model-level launch, CUDA, bus-width and board-power facts with source links.', href: '/en/supported-cards', label: 'Open supported cards' },
      { date: '2026-10-10', text: 'The supported-cards landing page and site-information pages now carry review dates and clear evidence boundaries.', href: '/en/editorial-policy', label: 'Read the editorial policy' },
      { date: '2026-10-10', text: 'Home, model and article answer sections were made self-contained so readers can verify a claim before following a source.', href: '/en', label: 'Open the checker home' },
    ],
  },
  'zh-CN': {
    title: 'DLSS 5 检测器更新记录 | Neural Architect',
    description: '记录 DLSS 5 证据检测器及其来源页面的实质性变更，并标明受影响页面。',
    heading: '更新记录',
    intro: '本页只记录已经发生的实质性变更，不承诺每天更新。',
    items: [
      { date: '2026-10-10', text: '显卡证据页现在展示型号级发布时间、CUDA、位宽和板卡功耗，并附上来源链接。', href: '/zh-CN/supported-cards', label: '查看支持显卡' },
      { date: '2026-10-10', text: '支持显卡页和站点信息页加入复审日期，并明确证据边界。', href: '/zh-CN/editorial-policy', label: '阅读编辑政策' },
      { date: '2026-10-10', text: '首页、型号页和文章的回答段改为自足内容，读者可先核对主张再打开来源。', href: '/zh-CN', label: '打开检测器首页' },
    ],
  },
  'zh-TW': {
    title: 'DLSS 5 檢查器更新紀錄 | Neural Architect',
    description: '記錄 DLSS 5 證據檢查器與來源頁面的實質變更，並標明受影響頁面。',
    heading: '更新紀錄',
    intro: '本頁只記錄已經發生的實質變更，不承諾每日更新。',
    items: [
      { date: '2026-10-10', text: '顯示卡證據頁現在展示型號級發布時間、CUDA、位寬與板卡功耗，並附上來源連結。', href: '/zh-TW/supported-cards', label: '查看支援顯示卡' },
      { date: '2026-10-10', text: '支援顯示卡頁與站點資訊頁加入複審日期，並明確標示證據邊界。', href: '/zh-TW/editorial-policy', label: '閱讀編輯政策' },
      { date: '2026-10-10', text: '首頁、型號頁與文章的回答段改為自足內容，讀者可先核對主張再開啟來源。', href: '/zh-TW', label: '開啟檢查器首頁' },
    ],
  },
};

export default function Updates() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const copy = updates[lang] || updates.en;
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Helmet>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
        <link rel="canonical" href={`https://www.dlss5.app/${lang}/updates`} />
        <meta property="og:title" content={copy.title} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:type" content="website" />
      </Helmet>
      <header className="mb-12">
        <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase">NEURAL ARCHITECT</p>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mt-3 mb-4">{copy.heading}</h1>
        <p className="text-on-surface-variant text-lg">{copy.intro}</p>
      </header>
      <ol className="space-y-6">
        {copy.items.map(item => (
          <li key={`${item.date}-${item.text}`} className="rounded-2xl border border-white/10 bg-surface-container p-6">
            <time className="text-primary text-sm font-bold" dateTime={item.date}>{item.date}</time>
            <p className="text-white/85 mt-3 leading-relaxed">{item.text}</p>
            <Link className="inline-flex mt-4 text-primary underline" to={item.href}>{item.label} →</Link>
          </li>
        ))}
      </ol>
      <p className="mt-12 text-sm text-on-surface-variant"><Link className="text-primary underline" to={`/${lang}`}>{lang === 'en' ? 'Back to the checker home' : lang === 'zh-TW' ? '返回檢查器首頁' : '返回检测器首页'}</Link></p>
    </main>
  );
}
