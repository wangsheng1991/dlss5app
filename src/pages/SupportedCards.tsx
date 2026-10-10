import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { gpuData } from '../data';
import { REVIEWED_DATE } from '../siteMeta';

const canonicalHost = 'https://www.dlss5.app';

export default function SupportedCards() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const isChinese = lang.startsWith('zh');
  const isTraditional = lang === 'zh-TW';
  const heading = isChinese
    ? (isTraditional ? 'DLSS 5 支援顯示卡與 GPU 相容性檢查器' : 'DLSS 5 支持的显卡与 GPU 兼容性检测器')
    : 'DLSS 5 Supported Cards & GPU Compatibility Checker';
  // title / description 与预渲染脚本 scripts/prerender-seo.ts 里的口径逐字一致：
  // SSR 一份、JS 跑起来后 Helmet 一份，两边不能各说各话。
  const title = `${heading} | Neural Architect`;
  const description = isChinese
    ? (isTraditional ? '按系列、架構與 NVIDIA 官方來源整理的 DLSS 5 顯示卡相容性矩陣，並提供升級決策常見問題。' : '按系列、架构与 NVIDIA 官方来源整理的 DLSS 5 显卡兼容性矩阵，并提供升级决策常见问题。')
    : 'Evidence-based DLSS 5 GPU compatibility matrix by series, architecture and official NVIDIA sources, with an FAQ for upgrade decisions.';
  const faqs = isChinese
    ? [
        ['哪些显卡支持 DLSS 5？', '目前 NVIDIA 已确认 RTX 50 系列 Blackwell 支持 DLSS 5；RTX 40 系列需等待 NVIDIA 的兼容性公告。'],
        ['RTX 4090 能运行 DLSS 5 吗？', '目前没有 NVIDIA 官方确认。请把 RTX 4090 视为未确认，而不是已支持或已不支持。'],
        ['这个检测器是 NVIDIA 官方工具吗？', '不是。它是独立资料页，整理公开的 NVIDIA 公告并标注核对日期，不会扫描你的电脑。'],
        ['显卡状态多久更新一次？', '当 NVIDIA 发布可核实的驱动、游戏或硬件信息时更新；每条结论都应回到来源核对。'],
      ]
    : [
        ['Which GPUs support DLSS 5?', 'NVIDIA has confirmed DLSS 5 for GeForce RTX 50 Series Blackwell hardware. RTX 40 support remains unconfirmed until NVIDIA publishes a compatibility statement.'],
        ['Can an RTX 4090 run DLSS 5?', 'No official NVIDIA confirmation is available yet. Treat the RTX 4090 as unconfirmed rather than assuming support or rejection.'],
        ['Is this an official NVIDIA checker?', 'No. This is an independent reference that links each status to public NVIDIA information and does not scan your computer.'],
        ['How often is the matrix updated?', 'We update entries when NVIDIA publishes verifiable driver, game or hardware information. Recheck the linked source before making an upgrade decision.'],
      ];

  const counts = {
    confirmed: gpuData.gpus.filter(gpu => gpu.dlss5_status === 'confirmed').length,
    unconfirmed: gpuData.gpus.filter(gpu => gpu.dlss5_status === 'unconfirmed').length,
    outOfScope: gpuData.gpus.filter(gpu => gpu.dlss5_status === 'no').length,
  };
  const summary = isChinese
    ? (isTraditional
        ? `本資料集收錄的 ${gpuData.gpus.length} 款 GeForce RTX 型號全部列在下面，每款都標明顯存、架構、狀態，並連到該型號自己的證據頁：${counts.confirmed} 款 RTX 50 系列已確認、${counts.unconfirmed} 款 RTX 40 系列尚未確認、${counts.outOfScope} 款 RTX 30/20 系列落在已公佈範圍之外。`
        : `本资料集收录的 ${gpuData.gpus.length} 款 GeForce RTX 型号全部列在下面，每款都标明显存、架构、状态，并连到该型号自己的证据页：${counts.confirmed} 款 RTX 50 系列已确认、${counts.unconfirmed} 款 RTX 40 系列未确认、${counts.outOfScope} 款 RTX 30/20 系列落在已公布范围之外。`)
    : `All ${gpuData.gpus.length} GeForce RTX models in this data set are listed below with VRAM, architecture, status and a link to the evidence page for each card: ${counts.confirmed} RTX 50-series cards confirmed, ${counts.unconfirmed} RTX 40-series cards unconfirmed, ${counts.outOfScope} RTX 30/20-series cards outside the published scope.`;

  const seriesIntro = (seriesId: string): string => {
    const series = gpuData.gpu_series.find(item => item.id === seriesId);
    const members = gpuData.gpus.filter(gpu => gpu.series === seriesId);
    const names = members.map(gpu => gpu.name).join(isChinese ? '、' : ', ');
    const architecture = series?.architecture || '';
    if (seriesId === 'rtx50') {
      return isChinese
        ? (isTraditional
            ? `NVIDIA 已公佈的 DLSS 5 範圍點名的就是這一代（${architecture}）。下面 ${members.length} 款全部記為已確認——${names}。已確認是硬體範圍結論：單款遊戲仍要自己上線這個功能，為某款遊戲買卡前請先確認那款遊戲。`
            : `NVIDIA 已公布的 DLSS 5 范围点名的就是这一代（${architecture}）。下面 ${members.length} 款全部记为已确认——${names}。已确认是硬件范围结论：单款游戏仍要自己上线这个功能，为某款游戏买卡前请先确认那款游戏。`)
        : `NVIDIA's published DLSS 5 scope names this generation (${architecture}). All ${members.length} models below are recorded as confirmed — ${names}. Confirmed is a hardware-scope statement: each game still has to ship the feature, so check the title you care about before buying a card for it.`;
    }
    if (seriesId === 'rtx40') {
      return isChinese
        ? (isTraditional
            ? `NVIDIA 沒有針對 ${architecture} 的型號級聲明，因此下面 ${members.length} 款全部維持尚未確認——${names}。尚未確認不等於被否定：它表示「支援」這句話所需的來源還沒公佈。`
            : `NVIDIA 没有针对 ${architecture} 的型号级声明，因此下面 ${members.length} 款全部维持未确认——${names}。未确认不等于被否定：它表示「支持」这句话所需的来源还没公布。`)
        : `No NVIDIA statement covers ${architecture} at model level, so all ${members.length} cards below stay unconfirmed — ${names}. Unconfirmed is not a rejection: it means the source needed to say "supported" has not been published.`;
    }
    return isChinese
      ? (isTraditional
          ? `${architecture} 落在 NVIDIA 已公佈的 DLSS 5 範圍之外，因此下面 ${members.length} 款全部記為「目前官方清單不支援」——${names}。這些卡上的舊版 DLSS 功能是另一回事，不受本紀錄影響。`
          : `${architecture} 落在 NVIDIA 已公布的 DLSS 5 范围之外，因此下面 ${members.length} 款全部记为「当前官方列表不支持」——${names}。这些卡上的旧版 DLSS 功能是另一回事，不受本条记录影响。`)
      : `${architecture} sits outside the DLSS 5 scope NVIDIA has published, so all ${members.length} cards below read "not supported in the current official list" — ${names}. Older DLSS features on these cards are separate and unchanged by this record.`;
  };

  return (
    <main className="pt-16 px-6 pb-24">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${canonicalHost}/${lang}/supported-cards`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${canonicalHost}/${lang}/supported-cards`} />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://www.dlss5nvidia.com/#organization',
                name: 'DLSS 5 NVIDIA Independent Showcase',
                url: 'https://www.dlss5nvidia.com/',
                sameAs: ['https://www.dlss5nvidia.com/', 'https://www.dlss5.app/'],
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map(([name, text]) => ({
                  '@type': 'Question',
                  name,
                  acceptedAnswer: { '@type': 'Answer', text },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: isChinese ? (isTraditional ? '首頁' : '首页') : 'Home', item: `${canonicalHost}/${lang}` },
                  { '@type': 'ListItem', position: 2, name: isChinese ? (isTraditional ? 'DLSS 5 支援顯示卡' : 'DLSS 5 支持显卡') : 'DLSS 5 supported cards', item: `${canonicalHost}/${lang}/supported-cards` },
                ],
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="mx-auto max-w-6xl space-y-14">
        <nav aria-label={isChinese ? (isTraditional ? '麵包屑' : '面包屑') : 'Breadcrumb'} className="text-sm text-on-surface-variant">
          <Link className="text-primary underline" to={`/${lang}`}>{isChinese ? (isTraditional ? '首頁' : '首页') : 'Home'}</Link>
          <span className="px-2">/</span>
          <span>{isChinese ? (isTraditional ? 'DLSS 5 支援顯示卡' : 'DLSS 5 支持显卡') : 'DLSS 5 supported cards'}</span>
        </nav>

        <header className="max-w-3xl space-y-5">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">{isChinese ? (isTraditional ? '獨立相容性資料' : '独立兼容性资料') : 'INDEPENDENT COMPATIBILITY REFERENCE'}</p>
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">{heading}</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">{description}</p>
          <p className="text-on-surface-variant leading-relaxed">{summary}</p>
          <p className="text-sm text-on-surface-variant/80">
            {isChinese ? (isTraditional ? '狀態分為已確認、未確認和不支援；未確認代表缺少官方原文，不代表相容或不相容。' : '状态分为已确认、未确认和不支持；未确认代表缺少官方原文，不代表兼容或不兼容。') : 'Statuses are confirmed, unconfirmed or unsupported. Unconfirmed means the official evidence is missing, not that compatibility has been decided.'}
          </p>
          <p className="text-sm text-on-surface-variant/80">{isChinese ? (isTraditional ? `內容複審 ${REVIEWED_DATE}` : `内容复审 ${REVIEWED_DATE}`) : `Last reviewed ${REVIEWED_DATE}`}</p>
        </header>

        <section aria-labelledby="gpu-matrix" className="space-y-5">
          <h2 id="gpu-matrix" className="text-3xl font-headline font-bold">{isChinese ? (isTraditional ? 'DLSS 5 GPU 支援矩陣' : 'DLSS 5 GPU 支持矩阵') : 'DLSS 5 GPU support matrix'}</h2>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-surface-container-highest text-on-surface-variant">
                <tr><th className="px-5 py-4">{isChinese ? (isTraditional ? 'GPU 型號' : 'GPU 型号') : 'GPU model'}</th><th className="px-5 py-4">{isChinese ? (isTraditional ? '架構' : '架构') : 'Architecture'}</th><th className="px-5 py-4">{isChinese ? (isTraditional ? '顯示記憶體' : '显存') : 'VRAM'}</th><th className="px-5 py-4">{isChinese ? (isTraditional ? '狀態' : '状态') : 'Status'}</th><th className="px-5 py-4">{isChinese ? (isTraditional ? '證據頁' : '证据页') : 'Evidence page'}</th></tr>
              </thead>
              <tbody>
                {gpuData.gpus.map((gpu) => {
                  const series = gpuData.gpu_series.find(item => item.id === gpu.series);
                  const status = gpu.dlss5_status === 'confirmed' ? (isChinese ? (isTraditional ? '已確認' : '已确认') : 'Confirmed') : gpu.dlss5_status === 'unconfirmed' ? (isChinese ? (isTraditional ? '未確認' : '未确认') : 'Unconfirmed') : (isChinese ? (isTraditional ? '不支援' : '不支持') : 'Unsupported');
                  const color = gpu.dlss5_status === 'confirmed' ? 'text-primary' : gpu.dlss5_status === 'unconfirmed' ? 'text-secondary' : 'text-error';
                  return <tr key={gpu.id} className="border-t border-outline-variant/10"><th scope="row" className="px-5 py-4 font-semibold text-white"><Link className="text-primary underline" to={`/${lang}/gpu/${gpu.id}`}>GeForce {gpu.name}</Link></th><td className="px-5 py-4 text-on-surface-variant">{series?.architecture}</td><td className="px-5 py-4 text-on-surface-variant">{gpu.vram_gb} GB</td><td className={`px-5 py-4 font-semibold ${color}`}>{status}</td><td className="px-5 py-4"><Link className="text-primary underline" to={`/${lang}/gpu/${gpu.id}`}>{isChinese ? (isTraditional ? `${gpu.name} 紀錄` : `${gpu.name} 记录`) : `${gpu.name} record`} →</Link></td></tr>;
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-on-surface-variant">{isChinese ? (isTraditional ? '資料來源：' : '资料来源：') : 'Sources: '}<a className="text-primary underline" href="https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/">NVIDIA DLSS 5 launch article</a>. {isChinese ? (isTraditional ? '本站與 NVIDIA 沒有隸屬關係。' : '本站与 NVIDIA 没有隶属关系。') : 'This independent reference is not affiliated with NVIDIA.'}</p>
        </section>

        {gpuData.gpu_series.map(series => (
          <section key={series.id} aria-labelledby={`series-${series.id}`} className="space-y-4">
            <h2 id={`series-${series.id}`} className="text-3xl font-headline font-bold">{`${series.name}${isChinese ? '（' : ' ('}${series.architecture}${isChinese ? '）' : ')'}`}</h2>
            <p className="text-on-surface-variant leading-relaxed">{seriesIntro(series.id)}</p>
          </section>
        ))}

        <section aria-labelledby="faq" className="space-y-6">
          <h2 id="faq" className="text-3xl font-headline font-bold">{isChinese ? (isTraditional ? '相容性常見問題' : '兼容性常见问题') : 'Compatibility FAQ'}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map(([question, answer]) => <article key={question} className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6"><h3 className="text-lg font-bold text-white">{question}</h3><p className="mt-3 text-on-surface-variant leading-relaxed">{answer}</p></article>)}
          </div>
        </section>

        <nav className="flex flex-wrap gap-4 text-sm" aria-label={isChinese ? (isTraditional ? '相關頁面' : '相关页面') : 'Related pages'}>
          <Link className="text-primary underline" to={`/${lang}`}>{isChinese ? '返回检测器首页' : 'Back to the GPU checker'}</Link>
          <Link className="text-primary underline" to={`/${lang}/blog`}>{isChinese ? '阅读 DLSS 5 技术指南' : 'Read DLSS 5 technical guides'}</Link>
          <Link className="text-primary underline" to={`/${lang}/studio`}>{isChinese ? (isTraditional ? 'Studio 執行要求' : 'Studio 运行要求') : 'Studio requirements'}</Link>
          <Link className="text-primary underline" to={`/${lang}/about`}>{isChinese ? (isTraditional ? '關於本站' : '关于本站') : 'About this site'}</Link>
          <Link className="text-primary underline" to={`/${lang}/editorial-policy`}>{isChinese ? (isTraditional ? '編輯政策' : '编辑政策') : 'Editorial policy'}</Link>
          <Link className="text-primary underline" to={`/${lang}/contact`}>{isChinese ? (isTraditional ? '聯絡我們' : '联系我们') : 'Contact'}</Link>
          <Link className="text-primary underline" to={`/${lang}/privacy`}>{isChinese ? (isTraditional ? '隱私' : '隐私') : 'Privacy'}</Link>
          <a className="text-primary underline" href="https://www.dlss5nvidia.com/download">{isChinese ? (isTraditional ? '試用免費視覺轉換器' : '试用免费视觉转换器') : 'Try the free visual converter'}</a>
          <a className="text-primary underline" href="https://www.dlss5nvidia.com/models">{isChinese ? (isTraditional ? '瀏覽模型工作流程' : '浏览模型工作流') : 'Browse model workflows'}</a>
          <a className="text-primary underline" href="https://www.dlss5nvidia.com/comparisons">{isChinese ? (isTraditional ? '比較視覺工作流程' : '比较视觉工作流') : 'Compare visual workflows'}</a>
        </nav>
      </div>
    </main>
  );
}
