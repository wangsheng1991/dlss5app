import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { gpuData } from '../data';
import { getGpuDetailContent } from '../gpuDetailContent';

const source = 'https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/';

export default function GpuDetail() {
  const { lang = 'en', id = '' } = useParams<{ lang: string; id: string }>();
  const gpu = gpuData.gpus.find(entry => entry.id === id);
  if (!gpu) return <main className="pt-32 text-center text-white"><h1>GPU not found</h1><Link to={`/${lang}`} className="text-primary">Back to checker</Link></main>;
  const series = gpuData.gpu_series.find(entry => entry.id === gpu.series);
  const copy = getGpuDetailContent(lang === 'zh-CN' || lang === 'zh-TW' ? lang : 'en', gpu, series);
  return (
    <main className="pt-32 px-6 pb-24 max-w-5xl mx-auto text-white">
      <Helmet>
        <title>{copy.title} | Neural Architect</title>
        <meta name="description" content={copy.description} />
        <link rel="canonical" href={`https://www.dlss5.app/${lang}/gpu/${gpu.id}`} />
      </Helmet>
      <p className="text-primary text-xs tracking-[0.2em] font-bold">{copy.eyebrow}</p>
      <h1 className="text-4xl md:text-6xl font-bold mt-4">{copy.title}</h1>
      <p className="text-white/70 text-lg mt-5">{gpu.name} · {series?.architecture} · {gpu.vram_gb} GB VRAM</p>
      <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.statusHeading}</h2>
        <p className="text-2xl text-primary font-bold">{copy.status}</p>
        <p className="text-white/80">{copy.modelNoteLabel}：{gpu.note}</p>
        <p className="text-white/70">{copy.sourceLabel}：<a className="text-primary underline" href={source}>{source}</a></p>
        <p className="text-white/70">{copy.statusExplanation}</p>
        <p className="text-white/50 text-sm">{copy.disclaimer}</p>
      </section>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.evidenceHeading}</h2>
        {copy.evidenceParagraphs.map((paragraph) => <p key={paragraph} className="text-white/75 leading-8">{paragraph}</p>)}
      </section>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.hardwareHeading}</h2>
        {copy.hardwareParagraphs.map((paragraph) => <p key={paragraph} className="text-white/75 leading-8">{paragraph}</p>)}
      </section>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.studioHeading}</h2>
        {copy.studioParagraphs.map((paragraph) => <p key={paragraph} className="text-white/75 leading-8">{paragraph}</p>)}
      </section>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.nextHeading}</h2>
        <ol className="list-decimal pl-6 space-y-3 text-white/75">{copy.nextSteps.map((step) => <li key={step}>{step}</li>)}</ol>
      </section>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{copy.faqHeading}</h2>
        {copy.faq.map(({ question, answer }) => <div key={question}><h3 className="text-lg font-semibold text-white">{question}</h3><p className="mt-2 text-white/70 leading-7">{answer}</p></div>)}
      </section>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link className="text-primary underline" to={`/${lang}`}>← {copy.back}</Link>
        <Link className="text-primary underline" to={`/${lang}/studio`}>{copy.studioLink}</Link>
        <Link className="text-primary underline" to={`/${lang}/blog`}>{copy.guidesLink}</Link>
      </div>
    </main>
  );
}
