import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gpuData } from '../data';

const canonicalHost = 'https://www.dlss5.app';

export default function SupportedCards() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const isChinese = lang.startsWith('zh');
  const title = isChinese
    ? `${t('checker.title1')} ${t('checker.title2')}｜DLSS 5 GPU 兼容性检测`
    : 'DLSS 5 Supported Cards & GPU Compatibility Checker';
  const description = isChinese
    ? '按 GPU 型号查看 DLSS 5 支持状态、架构、显存和官方证据；不确定的型号明确标注，避免把推测当成兼容性承诺。'
    : 'Check DLSS 5 support by GPU model, architecture and VRAM. Unconfirmed cards stay clearly marked until NVIDIA publishes evidence.';
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
            '@type': 'FAQPage',
            mainEntity: faqs.map(([name, text]) => ({
              '@type': 'Question',
              name,
              acceptedAnswer: { '@type': 'Answer', text },
            })),
          })}
        </script>
      </Helmet>

      <div className="mx-auto max-w-6xl space-y-14">
        <header className="max-w-3xl space-y-5">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">{isChinese ? '独立兼容性资料' : 'INDEPENDENT COMPATIBILITY REFERENCE'}</p>
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">{title}</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">{description}</p>
          <p className="text-sm text-on-surface-variant/80">
            {isChinese ? '状态分为已确认、未确认和不支持；未确认代表缺少官方原文，不代表兼容或不兼容。' : 'Statuses are confirmed, unconfirmed or unsupported. Unconfirmed means the official evidence is missing, not that compatibility has been decided.'}
          </p>
        </header>

        <section aria-labelledby="gpu-matrix" className="space-y-5">
          <h2 id="gpu-matrix" className="text-3xl font-headline font-bold">{isChinese ? 'DLSS 5 GPU 支持矩阵' : 'DLSS 5 GPU support matrix'}</h2>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-surface-container-highest text-on-surface-variant">
                <tr><th className="px-5 py-4">{isChinese ? 'GPU 型号' : 'GPU model'}</th><th className="px-5 py-4">{isChinese ? '架构' : 'Architecture'}</th><th className="px-5 py-4">{isChinese ? '显存' : 'VRAM'}</th><th className="px-5 py-4">{isChinese ? '状态' : 'Status'}</th></tr>
              </thead>
              <tbody>
                {gpuData.gpus.map((gpu) => {
                  const series = gpuData.gpu_series.find(item => item.id === gpu.series);
                  const status = gpu.dlss5_status === 'confirmed' ? (isChinese ? '已确认' : 'Confirmed') : gpu.dlss5_status === 'unconfirmed' ? (isChinese ? '未确认' : 'Unconfirmed') : (isChinese ? '不支持' : 'Unsupported');
                  const color = gpu.dlss5_status === 'confirmed' ? 'text-primary' : gpu.dlss5_status === 'unconfirmed' ? 'text-secondary' : 'text-error';
                  return <tr key={gpu.id} className="border-t border-outline-variant/10"><th scope="row" className="px-5 py-4 font-semibold text-white">GeForce {gpu.name}</th><td className="px-5 py-4 text-on-surface-variant">{series?.architecture}</td><td className="px-5 py-4 text-on-surface-variant">{gpu.vram_gb} GB</td><td className={`px-5 py-4 font-semibold ${color}`}>{status}</td></tr>;
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-on-surface-variant">{isChinese ? '资料来源：' : 'Sources: '}<a className="text-primary underline" href="https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/">NVIDIA DLSS 5 launch article</a>. {isChinese ? '本站与 NVIDIA 没有隶属关系。' : 'This independent reference is not affiliated with NVIDIA.'}</p>
        </section>

        <section aria-labelledby="faq" className="space-y-6">
          <h2 id="faq" className="text-3xl font-headline font-bold">{isChinese ? '兼容性常见问题' : 'Compatibility FAQ'}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map(([question, answer]) => <article key={question} className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-6"><h3 className="text-lg font-bold text-white">{question}</h3><p className="mt-3 text-on-surface-variant leading-relaxed">{answer}</p></article>)}
          </div>
        </section>

        <nav className="flex flex-wrap gap-4 text-sm" aria-label="Related pages">
          <Link className="text-primary underline" to={`/${lang}`}>{isChinese ? '返回检测器首页' : 'Back to the GPU checker'}</Link>
          <Link className="text-primary underline" to={`/${lang}/blog`}>{isChinese ? '阅读 DLSS 5 技术指南' : 'Read DLSS 5 technical guides'}</Link>
          <a className="text-primary underline" href="https://dlss5nvidia.com">{isChinese ? '试用免费视觉转换器' : 'Try the free visual converter'}</a>
        </nav>
      </div>
    </main>
  );
}
