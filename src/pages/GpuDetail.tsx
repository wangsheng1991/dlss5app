import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { gpuData } from '../data';

const source = 'https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/';

export default function GpuDetail() {
  const { lang = 'en', id = '' } = useParams<{ lang: string; id: string }>();
  const gpu = gpuData.gpus.find(entry => entry.id === id);
  if (!gpu) return <main className="pt-32 text-center text-white"><h1>GPU not found</h1><Link to={`/${lang}`} className="text-primary">Back to checker</Link></main>;
  const traditional = lang === 'zh-TW';
  const chinese = lang === 'zh-CN' || traditional;
  const series = gpuData.gpu_series.find(entry => entry.id === gpu.series);
  const status = gpu.dlss5_status === 'confirmed' ? (traditional ? '已確認' : chinese ? '已确认' : 'Confirmed') : gpu.dlss5_status === 'unconfirmed' ? (traditional ? '尚未獲 NVIDIA 確認' : chinese ? 'NVIDIA 尚未确认' : 'Unconfirmed by NVIDIA') : (traditional ? '目前官方清單不支援' : chinese ? '当前官方列表不支持' : 'Not supported in current official scope');
  const title = traditional ? `${gpu.name} DLSS 5 支援與顯存證據` : lang === 'zh-CN' ? `${gpu.name} DLSS 5 支持与显存证据` : `${gpu.name} DLSS 5 support and VRAM evidence`;
  const description = traditional ? `${gpu.name} 的 DLSS 5 狀態、${gpu.vram_gb} GB 顯存、架構與 NVIDIA 來源證據。` : lang === 'zh-CN' ? `${gpu.name} 的 DLSS 5 状态、${gpu.vram_gb} GB 显存、架构与 NVIDIA 来源证据。` : `${gpu.name}: DLSS 5 status, ${gpu.vram_gb} GB VRAM, architecture and NVIDIA source-linked evidence.`;
  return (
    <main className="pt-32 px-6 pb-24 max-w-5xl mx-auto text-white">
      <Helmet>
        <title>{title} | Neural Architect</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://www.dlss5.app/${lang}/gpu/${gpu.id}`} />
      </Helmet>
      <p className="text-primary text-xs tracking-[0.2em] font-bold">GPU EVIDENCE DETAIL</p>
      <h1 className="text-4xl md:text-6xl font-bold mt-4">{title}</h1>
      <p className="text-white/70 text-lg mt-5">{gpu.name} · {series?.architecture} · {gpu.vram_gb} GB VRAM</p>
      <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 space-y-5">
        <h2 className="text-2xl font-bold">{traditional ? '目前 DLSS 5 狀態' : lang === 'zh-CN' ? '当前 DLSS 5 状态' : 'Current DLSS 5 status'}</h2>
        <p className="text-2xl text-primary font-bold">{status}</p>
        <p className="text-white/80">{traditional ? '型號備註' : lang === 'zh-CN' ? '型号备注' : 'Model note'}：{gpu.note}</p>
        <p className="text-white/70">{traditional ? '證據來源' : lang === 'zh-CN' ? '证据来源' : 'Evidence source'}：<a className="text-primary underline" href={source}>{source}</a></p>
        <p className="text-white/50 text-sm">{traditional ? '這是獨立證據頁，不是 NVIDIA 的相容性保證。' : lang === 'zh-CN' ? '这是独立证据页，不是 NVIDIA 的兼容性保证。' : 'Independent evidence page; this is not an NVIDIA compatibility guarantee.'}</p>
      </section>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link className="text-primary underline" to={`/${lang}`}>← {traditional ? '返回全部顯示卡型號' : lang === 'zh-CN' ? '返回全部显卡型号' : 'Back to all GPU models'}</Link>
        <Link className="text-primary underline" to={`/${lang}/studio`}>DLSS 5 Studio</Link>
        <Link className="text-primary underline" to={`/${lang}/blog`}>{traditional ? '技術指南' : lang === 'zh-CN' ? '技术指南' : 'Technical guides'}</Link>
      </div>
    </main>
  );
}
