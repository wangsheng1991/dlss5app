// Approved asset-library comparisons; metadata is published beside each image.
const cases = [{"id": "lighting-06-courtyard", "names": ["Courtyard · stone & sunlight", "庭院 · 石材与日光", "庭院 · 石材與日光"], "notes": ["Leaves and masonry details may change.", "叶片与石缝细节可能变化。", "葉片與石縫細節可能變化。"], "width": 2204, "height": 808}, {"id": "lighting-03-interior", "names": ["Bedroom · daylight & fabric", "卧室 · 窗光与布料", "臥室 · 窗光與布料"], "notes": ["Artwork, cushion patterns and cabinet details were re-rendered.", "挂画、枕头花纹与柜门细节存在重绘。", "掛畫、枕頭花紋與櫃門細節存在重繪。"], "width": 2204, "height": 834}, {"id": "lighting-04-kitchen", "names": ["Kitchen · wood & reflections", "厨房 · 木质与反射", "廚房 · 木質與反射"], "notes": ["Faucet, appliance details and the source UI overlay may change.", "龙头、小家电与源图界面文字存在重绘。", "龍頭、小家電與來源圖介面文字存在重繪。"], "width": 2204, "height": 867}] as const;

export default function HomeComparisons({ lang }: { lang: string }) {
  const i = lang === 'zh-CN' ? 1 : lang === 'zh-TW' ? 2 : 0;
  const copy = [
    { title: 'Lighting and materials: see the difference', intro: 'Clear CG scene in, independently re-rendered lighting and materials out. Compare daylight, contact shadows, stone, wood and fabric — without deliberately blurring the input. These are our flux-klein image-editing examples, not NVIDIA DLSS 5 game captures or benchmarks.', before: 'Input · original scene', after: 'Output · lighting & materials', note: 'Generated October 21, 2026. Static visual examples: AI can redraw objects and fine details. They do not demonstrate geometry preservation, real-time game performance or consistency across frames.', record: 'Source, prompt & task record', cta: 'Explore scene style conversion →', more: 'More before / after examples →' },
    { title: '光照与材质，改变画面的观感', intro: '从清晰的 CG 场景出发，对比窗光、接触阴影，以及石材、木质和布料的表现。输入不刻意压糊，输出由我们的 flux-klein 图像编辑管线生成；这些是独立效果示例，不是 NVIDIA DLSS 5 游戏实测或性能对比。', before: '输入 · 原始场景', after: '输出 · 光照与材质', note: '生成日期：2026-10-21。静态视觉示例：AI 可能重绘物体和局部细节，不代表几何保真、游戏实时性能或连续帧一致性。', record: '来源、提示词与任务记录', cta: '探索场景风格转换 →', more: '查看更多前后效果案例 →' },
    { title: '光照與材質，改變畫面的觀感', intro: '從清晰的 CG 場景出發，比較窗光、接觸陰影，以及石材、木質和布料的表現。輸入不刻意壓糊，輸出由我們的 flux-klein 圖像編輯管線生成；這些是獨立效果示例，不是 NVIDIA DLSS 5 遊戲實測或效能比較。', before: '輸入 · 原始場景', after: '輸出 · 光照與材質', note: '生成日期：2026-10-21。靜態視覺示例：AI 可能重繪物體和局部細節，不代表幾何保真、遊戲即時效能或連續影格一致性。', record: '來源、提示詞與任務記錄', cta: '探索場景風格轉換 →', more: '查看更多前後效果案例 →' },
  ][i];
  const productLang = i === 0 ? '' : '/zh';
  return <section id="enhancement-examples" className="py-16 px-6 bg-surface-container-low" aria-labelledby="comparison-heading">
    <div className="max-w-6xl mx-auto">
      <h2 id="comparison-heading" className="text-3xl md:text-4xl font-bold mb-5">{copy.title}</h2>
      <p className="text-on-surface-variant leading-relaxed mb-8 max-w-3xl">{copy.intro}</p>
      <div className="grid grid-cols-1 gap-8">
        {cases.map(item => <figure key={item.id} data-home-comparison={item.id} className="rounded-xl overflow-hidden border border-white/10 bg-surface-container">
          <div className="grid grid-cols-2 text-center text-xs p-3 gap-2"><span>{copy.before}</span><span className="text-primary">{copy.after}</span></div>
          <a href={`/examples/homepage/${item.id}.jpg`} aria-label={item.names[i]}>
            <img src={`/examples/homepage/${item.id}.jpg`} alt={`${item.names[i]} — ${copy.before} / ${copy.after}`} width={item.width} height={item.height} loading="lazy" decoding="async" className="w-full h-auto block" />
          </a>
          <figcaption className="p-4 flex flex-wrap justify-between gap-2"><div><strong>{item.names[i]}</strong><p className="mt-2 text-sm text-on-surface-variant">{item.notes[i]}</p></div><a className="text-primary text-sm underline" href={`/examples/homepage/${item.id}.txt`}>{copy.record}</a></figcaption>
        </figure>)}
      </div>
      <p className="text-sm text-on-surface-variant leading-relaxed mt-6">{copy.note}</p>
      <div className="flex flex-wrap gap-5 mt-6"><a className="text-primary font-bold underline" href={`https://www.dlss5nvidia.com${productLang}/game-character-style`}>{copy.cta}</a><a className="text-primary underline" href={`https://www.dlss5nvidia.com${productLang}/before-after`}>{copy.more}</a></div>
    </div>
  </section>;
}
