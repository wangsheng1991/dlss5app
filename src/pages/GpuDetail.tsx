import { gpuMetadata } from '../seo/metadata';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { gpuData } from '../data';
import { getGpuDetailContent } from '../gpuDetailContent';

const source = 'https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/';

const toneClass: Record<string, string> = {
  met: 'text-primary',
  below: 'text-amber-400',
  info: 'text-white/70',
};

export default function GpuDetail() {
  const { lang = 'en', id = '' } = useParams<{ lang: string; id: string }>();
  const gpu = gpuData.gpus.find(entry => entry.id === id);
  if (!gpu) return <main className="pt-32 text-center text-white"><h1>GPU not found</h1><Link to={`/${lang}`} className="text-primary">Back to checker</Link></main>;
  const series = gpuData.gpu_series.find(entry => entry.id === gpu.series);
  const copy = getGpuDetailContent(
    lang === 'zh-CN' || lang === 'zh-TW' ? lang : 'en',
    gpu,
    series,
    gpuData.feature_matrix,
    gpuData.gpus,
    gpuData.spec_sources,
  );
  const metadata = gpuMetadata(lang, gpu, copy.status);
  const toolHref = gpu.series === 'rtx50' ? '/game-character-style' : gpu.series === 'rtx40' ? '/video-upscaler' : '/image-quality-enhancer';
  const toolLabel = gpu.series === 'rtx50'
    ? (lang === 'zh-TW' ? '在 DLSS5NVIDIA 試用人物風格轉換 →' : lang === 'zh-CN' ? '在 DLSS5NVIDIA 试用人物风格转换 →' : 'Try character style conversion on DLSS5NVIDIA →')
    : gpu.series === 'rtx40'
      ? (lang === 'zh-TW' ? '在 DLSS5NVIDIA 查看影片增強工作流程 →' : lang === 'zh-CN' ? '在 DLSS5NVIDIA 查看视频增强工作流 →' : 'Open the video enhancement workflow on DLSS5NVIDIA →')
      : (lang === 'zh-TW' ? '在 DLSS5NVIDIA 開啟影像品質增強器 →' : lang === 'zh-CN' ? '在 DLSS5NVIDIA 打开图像质量增强器 →' : 'Open the image quality enhancer on DLSS5NVIDIA →');
  return (
    <main className="pt-32 px-6 pb-24 max-w-5xl mx-auto text-white">
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="canonical" href={`https://www.dlss5.app/${lang}/gpu/${gpu.id}`} />
      </Helmet>
      <p className="text-primary text-xs tracking-[0.2em] font-bold">{copy.eyebrow}</p>
      <h1 className="text-4xl md:text-6xl font-bold mt-4">{copy.title}</h1>
      <p className="text-white/70 text-lg mt-5">{gpu.name} · {series?.architecture} · {gpu.vram_gb} GB VRAM</p>

      <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.statusHeading}</h2>
        <p className="text-white/75 leading-8">{copy.statusExplanation}</p>
        <p className="text-2xl text-primary font-bold">{copy.status}</p>
        <p className="text-white/80">{copy.modelNoteLabel}：{gpu.note}</p>
        <p className="text-white/70">{copy.sourceLabel}：<a className="text-primary underline" href={source}>{source}</a></p>
        <p className="text-white/50 text-sm">{copy.disclaimer}</p>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.factsHeading}</h2>
        <table className="w-full text-left text-white/75">
          <tbody>
            {copy.facts.map(fact => (
              <tr key={fact.label} className="border-b border-white/10 last:border-0">
                <th scope="row" className="py-3 pr-6 font-semibold text-white/60 align-top">{fact.label}</th>
                <td className="py-3">{fact.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {copy.evidenceParagraphs.map(paragraph => <p key={paragraph} className="text-white/75 leading-8">{paragraph}</p>)}
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.specHeading}</h2>
        {copy.specRows.length > 0 && (
          <table className="w-full text-left text-white/75">
            <tbody>
              {copy.specRows.map(row => (
                <tr key={row.label} className="border-b border-white/10 last:border-0">
                  <th scope="row" className="py-3 pr-6 font-semibold text-white/60 align-top">{row.label}</th>
                  <td className="py-3">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {copy.specParagraphs.map(paragraph => <p key={paragraph} className="text-white/75 leading-8">{paragraph}</p>)}
        {copy.specSourceUrl && (
          <p className="text-white/50 text-sm">
            {copy.specSourceLabel}：<a className="text-primary underline" href={copy.specSourceUrl}>{copy.specSourceUrl}</a> — {copy.specSourceNote}
          </p>
        )}
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.studioHeading}</h2>
        <p className={`text-lg font-semibold ${toneClass[copy.studioVerdictTone]}`}>{copy.studioVerdict}</p>
        <table className="w-full text-left text-white/75">
          <tbody>
            {copy.studioChecks.map(check => (
              <tr key={check.label} className="border-b border-white/10 last:border-0">
                <th scope="row" className="py-3 pr-6 font-semibold text-white/60 align-top">{check.label}</th>
                <td className={`py-3 ${toneClass[check.verdict]}`}>{check.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {copy.studioParagraphs.map(paragraph => <p key={paragraph} className="text-white/75 leading-8">{paragraph}</p>)}
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.featuresHeading}</h2>
        <table className="w-full text-left text-white/75">
          <tbody>
            {copy.featureRows.map(row => (
              <tr key={row.label} className="border-b border-white/10 last:border-0">
                <th scope="row" className="py-3 pr-6 font-semibold text-white/60 align-top">{row.label}</th>
                <td className="py-3">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {copy.featureParagraphs.map(paragraph => <p key={paragraph} className="text-white/75 leading-8">{paragraph}</p>)}
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.peersHeading}</h2>
        <ul className="space-y-2 text-white/75">
          {copy.peers.map(peer => (
            <li key={peer.id}>
              <Link className="text-primary underline" to={`/${lang}/gpu/${peer.id}`}>{peer.name || peer.id}</Link>
              {` · ${peer.vram_gb} GB${peer.spec ? ` · ${peer.spec.cores.toLocaleString('en-US')} CUDA cores` : ''}`}
            </li>
          ))}
        </ul>
        {copy.peersParagraphs.map(paragraph => <p key={paragraph} className="text-white/75 leading-8">{paragraph}</p>)}
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.nextHeading}</h2>
        <ol className="list-decimal pl-6 space-y-3 text-white/75">{copy.nextSteps.map(step => <li key={step}>{step}</li>)}</ol>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.faqHeading}</h2>
        {copy.faq.map(({ question, answer }) => <div key={question}><h3 className="text-lg font-semibold text-white">{question}</h3><p className="mt-2 text-white/70 leading-7">{answer}</p></div>)}
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link className="text-primary underline" to={`/${lang}`}>← {copy.back}</Link>
        <Link className="text-primary underline" to={`/${lang}/studio`}>{copy.studioLink}</Link>
        <Link className="text-primary underline" to={`/${lang}/blog`}>{copy.guidesLink}</Link>
        <a className="text-primary underline" href={`https://www.dlss5nvidia.com${toolHref}`}>{toolLabel}</a>
      </div>
    </main>
  );
}
