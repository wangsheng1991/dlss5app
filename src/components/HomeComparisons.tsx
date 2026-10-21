// Approved asset-library comparisons; metadata is published beside each image.
const cases = [{"id": "01-makeup-detail", "names": ["Skin & makeup", "人像与妆容", "人像與妝容"], "width": 2404, "height": 800}, {"id": "15-cat-fur", "names": ["Pet fur", "宠物毛发", "寵物毛髮"], "width": 2400, "height": 896}, {"id": "21-night-street", "names": ["Night street", "夜间街景", "夜間街景"], "width": 1792, "height": 1200}, {"id": "22-home-real", "names": ["Living room", "居家细节", "居家細節"], "width": 2400, "height": 800}, {"id": "23-flower-macro", "names": ["Flower close-up", "花卉微距", "花卉微距"], "width": 2400, "height": 800}] as const;

export default function HomeComparisons({ lang }: { lang: string }) {
  const i = lang === 'zh-CN' ? 1 : lang === 'zh-TW' ? 2 : 0;
  const copy = [
    { title: 'From blurry input to regenerated detail', intro: 'Five real examples from our independent image-enhancement pipeline. Left: downsampled, JPEG-compressed input. Right: flux-klein output. These are not NVIDIA DLSS 5 game screenshots or GPU benchmarks.', before: 'Before · low resolution', after: 'After · AI enhancement', note: 'Generated on October 17, 2026. AI can change fine details, colors and identity; this is visual reference, not recovery of the original detail. Source, license and task record are linked for each case.', record: 'Source, license & run record', cta: 'Try the online visual enhancer →', more: 'Explore more before / after examples →' },
    { title: '从模糊输入，到重新生成的细节', intro: '五组来自我们独立图像增强管线的真实案例。左侧：降采样并经 JPEG 压缩的输入；右侧：flux-klein 输出。这不是 NVIDIA DLSS 5 游戏截图，也不是显卡性能测试。', before: '处理前 · 低清输入', after: '处理后 · AI 增强', note: '生成日期：2026-10-17。AI 可能改变细节、颜色与人物特征；这些案例仅作视觉参考，不代表还原了原始细节。每组均提供来源、许可与运行记录。', record: '来源、许可与运行记录', cta: '试用在线图像增强器 →', more: '查看更多前后效果案例 →' },
    { title: '從模糊輸入，到重新生成的細節', intro: '五組來自我們獨立圖像增強管線的真實案例。左側：降採樣並經 JPEG 壓縮的輸入；右側：flux-klein 輸出。這不是 NVIDIA DLSS 5 遊戲截圖，也不是顯示卡效能測試。', before: '處理前 · 低清輸入', after: '處理後 · AI 增強', note: '生成日期：2026-10-17。AI 可能改變細節、顏色與人物特徵；這些案例僅作視覺參考，不代表還原了原始細節。每組均提供來源、授權與執行記錄。', record: '來源、授權與執行記錄', cta: '試用線上圖像增強工具 →', more: '查看更多前後效果案例 →' },
  ][i];
  const productLang = i === 0 ? '' : '/zh';
  return <section id="enhancement-examples" className="py-16 px-6 bg-surface-container-low" aria-labelledby="comparison-heading">
    <div className="max-w-6xl mx-auto">
      <h2 id="comparison-heading" className="text-3xl md:text-4xl font-bold mb-5">{copy.title}</h2>
      <p className="text-on-surface-variant leading-relaxed mb-8 max-w-3xl">{copy.intro}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
        {cases.map(item => <figure key={item.id} data-home-comparison={item.id} className="rounded-xl overflow-hidden border border-white/10 bg-surface-container">
          <div className="grid grid-cols-2 text-center text-xs p-3 gap-2"><span>{copy.before}</span><span className="text-primary">{copy.after}</span></div>
          <a href={`/examples/homepage/${item.id}.jpg`} aria-label={item.names[i]}>
            <img src={`/examples/homepage/${item.id}.jpg`} alt={`${item.names[i]} — ${copy.before} / ${copy.after}`} width={item.width} height={item.height} loading="lazy" decoding="async" className="w-full h-auto block" />
          </a>
          <figcaption className="p-4 flex flex-wrap justify-between gap-2"><strong>{item.names[i]}</strong><a className="text-primary text-sm underline" href={`/examples/homepage/${item.id}.txt`}>{copy.record}</a></figcaption>
        </figure>)}
      </div>
      <p className="text-sm text-on-surface-variant leading-relaxed mt-6">{copy.note}</p>
      <div className="flex flex-wrap gap-5 mt-6"><a className="text-primary font-bold underline" href={`https://www.dlss5nvidia.com${productLang}/visual-enhancer`}>{copy.cta}</a><a className="text-primary underline" href={`https://www.dlss5nvidia.com${productLang}/before-after`}>{copy.more}</a></div>
    </div>
  </section>;
}
