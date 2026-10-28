import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

export default function Studio() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const traditional = lang === 'zh-TW';
  const chinese = lang === 'zh-CN' || traditional;
  const title = traditional ? 'DLSS 5 Studio 本機軟體要求與實測效能' : lang === 'zh-CN' ? 'DLSS 5 Studio 本地软件要求与实测性能' : 'DLSS 5 Studio local software requirements and measured performance';
  const description = traditional ? 'DLSS 5 Studio 本機軟體要求、RTX 與 Windows 相容性、NVENC 驅動程式說明，以及 RTX 4090 實測工作流程。' : lang === 'zh-CN' ? 'DLSS 5 Studio 本地软件要求、RTX 与 Windows 兼容性、NVENC 驱动说明，以及 RTX 4090 实测工作流。' : 'DLSS 5 Studio local software requirements, RTX and Windows compatibility, NVENC driver notes and a measured RTX 4090 workflow.';
  const rows = traditional ? [['作業系統', 'Windows 10 1909+ 或 Windows 11'], ['GPU', '已公開的 Studio 路徑支援 RTX 20 系列以上'], ['記憶體／磁碟', '8–16 GB 記憶體，約 3 GB 可用磁碟空間'], ['NVENC', '硬體影片編碼需要 610+ 驅動程式；較舊驅動可退回軟體編碼'], ['實測', 'RTX 4090 24 GB · 驅動程式 591.86 · 720p → 2560×1440 H.264 · 87.4 秒（2.43 秒／幀）']] : lang === 'zh-CN' ? [['操作系统', 'Windows 10 1909+ 或 Windows 11'], ['GPU', '已公开的 Studio 路径支持 RTX 20 系列以上'], ['内存／磁盘', '8–16 GB 内存，约 3 GB 可用磁盘空间'], ['NVENC', '硬件视频编码需要 610+ 驱动；较旧驱动可回退软件编码'], ['实测', 'RTX 4090 24 GB · 驱动 591.86 · 720p → 2560×1440 H.264 · 87.4 秒（2.43 秒/帧）']] : [['OS', 'Windows 10 1909+ or Windows 11'], ['GPU', 'RTX 20 series or newer for the published Studio path'], ['Memory / disk', '8–16 GB RAM and about 3 GB free disk space'], ['NVENC', 'Hardware video encoding requires driver 610+; older drivers can fall back to software encoding'], ['Measured run', 'RTX 4090 24 GB · driver 591.86 · 720p → 2560×1440 H.264 · 87.4 s (2.43 s/frame)']];
  return (
    <main className="pt-32 px-6 pb-24 max-w-5xl mx-auto text-white">
      <Helmet><title>{`${title} | Neural Architect`}</title><meta name="description" content={description} /><link rel="canonical" href={`https://www.dlss5.app/${lang}/studio`} /></Helmet>
      <p className="text-primary text-xs tracking-[0.2em] font-bold">DLSS 5 STUDIO · LOCAL SOFTWARE</p>
      <h1 className="text-4xl md:text-6xl font-bold mt-4">{title}</h1>
      <p className="text-white/70 text-lg mt-5">{traditional ? '這是本機軟體資料頁，與遊戲內 DLSS 5 支援是不同判定。' : lang === 'zh-CN' ? '这是本地软件资料页，与游戏内 DLSS 5 支持是不同判断。' : 'A separate local-software reference; game-internal DLSS 5 support is a different question.'}</p>
      <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-bold mb-6">{traditional ? '要求與實測結果' : lang === 'zh-CN' ? '要求与实测结果' : 'Requirements and measured result'}</h2>
        <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr><th className="py-3 pr-6">{traditional ? '項目' : lang === 'zh-CN' ? '项目' : 'Item'}</th><th className="py-3">{traditional ? '公開或實測內容' : lang === 'zh-CN' ? '公开或实测内容' : 'Published or measured detail'}</th></tr></thead><tbody>{rows.map(([name, value]) => <tr key={name} className="border-t border-white/10"><th className="py-4 pr-6 align-top">{name}</th><td className="py-4 text-white/75">{value}</td></tr>)}</tbody></table></div>
        <p className="text-white/50 text-sm mt-6">{traditional ? '87.4 秒是單一機器與設定的實測，不代表即時處理保證；擴大效能口徑前還需要補一張 12 GB 顯示卡的實測。' : lang === 'zh-CN' ? '87.4 秒是单一机器与设置的实测，不代表实时处理保证；扩大性能口径前还需要补一张 12 GB 显卡的实测。' : 'The 87.4-second result is one measured machine/configuration, not a real-time guarantee; add a second 12 GB card benchmark before broader claims.'}</p>
      </section>
      <p className="mt-8 text-white/70">{traditional ? 'GPU 表格回答 NVIDIA 是否公開遊戲內 DLSS 5 範圍；本頁回答本機 Studio 工作流程能否在你的電腦安裝並實測。兩者不能互相推導。' : lang === 'zh-CN' ? 'GPU 表格回答 NVIDIA 是否公开游戏内 DLSS 5 范围；本页回答本地 Studio 工作流能否在你的电脑安装并实测。两者不能互相推导。' : 'The GPU table covers NVIDIA’s published game-internal scope; this page covers whether the local Studio workflow can be installed and measured. One does not prove the other.'}</p>
      <div className="mt-8 flex flex-wrap gap-4"><Link className="text-primary underline" to={`/${lang}`}>← {traditional ? '返回 GPU 證據檢查器' : lang === 'zh-CN' ? '返回 GPU 证据检测器' : 'Back to the GPU evidence checker'}</Link><a className="text-primary underline" href="https://www.dlss5nvidia.com/download">{traditional ? '前往 Studio 下載頁' : lang === 'zh-CN' ? '前往 Studio 下载页' : 'Open the Studio download page'}</a></div>
    </main>
  );
}
