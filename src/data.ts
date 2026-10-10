export const gpuData = {
  "gpu_series": [
    { "id": "rtx50", "name": "GeForce RTX 50 Series", "architecture": "Blackwell" },
    { "id": "rtx40", "name": "GeForce RTX 40 Series", "architecture": "Ada Lovelace" },
    { "id": "rtx30", "name": "GeForce RTX 30 Series", "architecture": "Ampere" },
    { "id": "rtx20", "name": "GeForce RTX 20 Series", "architecture": "Turing" }
  ],
  "gpus": [
    { "id": "rtx5090", "series": "rtx50", "name": "RTX 5090", "vram_gb": 32, "dlss5": true, "dlss5_status": "confirmed", "note": "Used in GTC 2026 DLSS 5 dual-GPU demo", "spec": { "launch": "2025-01-30", "die": "GB202-300", "cores": 21760, "bus": 512, "tdp": 575 } },
    { "id": "rtx5080", "series": "rtx50", "name": "RTX 5080", "vram_gb": 16, "dlss5": true, "dlss5_status": "confirmed", "note": "Full DLSS 5 support", "spec": { "launch": "2025-01-30", "die": "GB203-400", "cores": 10752, "bus": 256, "tdp": 360 } },
    { "id": "rtx5070ti", "series": "rtx50", "name": "RTX 5070 Ti", "vram_gb": 16, "dlss5": true, "dlss5_status": "confirmed", "note": "Full DLSS 5 support", "spec": { "launch": "2025-02-20", "die": "GB203-300", "cores": 8960, "bus": 256, "tdp": 300 } },
    { "id": "rtx5070", "series": "rtx50", "name": "RTX 5070", "vram_gb": 12, "dlss5": true, "dlss5_status": "confirmed", "note": "Full DLSS 5 support", "spec": { "launch": "2025-03-05", "die": "GB205-300", "cores": 6144, "bus": 192, "tdp": 250 } },
    { "id": "rtx5060ti", "series": "rtx50", "name": "RTX 5060 Ti", "vram_gb": 16, "dlss5": true, "dlss5_status": "confirmed", "note": "Full DLSS 5 support", "spec": { "launch": "2025-04-16", "die": "GB206-300", "cores": 4608, "bus": 128, "tdp": 180 } },
    { "id": "rtx5060", "series": "rtx50", "name": "RTX 5060", "vram_gb": 8, "dlss5": true, "dlss5_status": "confirmed", "note": "Entry-level Blackwell, full DLSS 5 support confirmed", "spec": { "launch": "2025-05-19", "die": "GB206-250", "cores": 3840, "bus": 128, "tdp": 145 } },
    { "id": "rtx4090", "series": "rtx40", "name": "RTX 4090", "vram_gb": 24, "dlss5": false, "dlss5_status": "unconfirmed", "note": "Best non-50 series card. DLSS 5 unconfirmed.", "spec": { "launch": "2022-10-12", "die": "AD102-300", "cores": 16384, "bus": 384, "tdp": 450 } },
    { "id": "rtx4080super", "series": "rtx40", "name": "RTX 4080 Super", "vram_gb": 16, "dlss5": false, "dlss5_status": "unconfirmed", "note": "DLSS 5 unconfirmed", "spec": { "launch": "2024-01-31", "die": "AD103-400", "cores": 10240, "bus": 256, "tdp": 320 } },
    { "id": "rtx4080", "series": "rtx40", "name": "RTX 4080", "vram_gb": 16, "dlss5": false, "dlss5_status": "unconfirmed", "note": "DLSS 5 unconfirmed", "spec": { "launch": "2022-11-16", "die": "AD103-300", "cores": 9728, "bus": 256, "tdp": 320 } },
    { "id": "rtx4070tisuper", "series": "rtx40", "name": "RTX 4070 Ti Super", "vram_gb": 16, "dlss5": false, "dlss5_status": "unconfirmed", "note": "DLSS 5 unconfirmed", "spec": { "launch": "2024-01-24", "die": "AD103-275", "cores": 8448, "bus": 256, "tdp": 285 } },
    { "id": "rtx4070ti", "series": "rtx40", "name": "RTX 4070 Ti", "vram_gb": 12, "dlss5": false, "dlss5_status": "unconfirmed", "note": "DLSS 5 unconfirmed", "spec": { "launch": "2023-01-05", "die": "AD104-400", "cores": 7680, "bus": 192, "tdp": 285 } },
    { "id": "rtx4070super", "series": "rtx40", "name": "RTX 4070 Super", "vram_gb": 12, "dlss5": false, "dlss5_status": "unconfirmed", "note": "DLSS 5 unconfirmed", "spec": { "launch": "2024-01-17", "die": "AD104-350", "cores": 7168, "bus": 192, "tdp": 220 } },
    { "id": "rtx4070", "series": "rtx40", "name": "RTX 4070", "vram_gb": 12, "dlss5": false, "dlss5_status": "unconfirmed", "note": "DLSS 5 unconfirmed", "spec": { "launch": "2023-04-13", "die": "AD104-250", "cores": 5888, "bus": 192, "tdp": 200 } },
    { "id": "rtx4060ti", "series": "rtx40", "name": "RTX 4060 Ti", "vram_gb": 16, "dlss5": false, "dlss5_status": "unconfirmed", "note": "DLSS 5 unconfirmed", "spec": { "launch": "2023-07-18", "die": "AD106-351", "cores": 4352, "bus": 128, "tdp": 165 } },
    { "id": "rtx4060", "series": "rtx40", "name": "RTX 4060", "vram_gb": 8, "dlss5": false, "dlss5_status": "unconfirmed", "note": "DLSS 5 unconfirmed", "spec": { "launch": "2023-06-29", "die": "AD107-400", "cores": 3072, "bus": 128, "tdp": 115 } },
    { "id": "rtx3090ti", "series": "rtx30", "name": "RTX 3090 Ti", "vram_gb": 24, "dlss5": false, "dlss5_status": "no", "note": "No DLSS Frame Generation. DLSS 4.5 ~5x more demanding without FP8.", "spec": { "launch": "2022-03-29", "die": "GA102-350", "cores": 10752, "bus": 384, "tdp": 450 } },
    { "id": "rtx3090", "series": "rtx30", "name": "RTX 3090", "vram_gb": 24, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2020-09-24", "die": "GA102-250", "cores": 10496, "bus": 384, "tdp": 350 } },
    { "id": "rtx3080ti", "series": "rtx30", "name": "RTX 3080 Ti", "vram_gb": 12, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2021-06-03", "die": "GA102-225", "cores": 10240, "bus": 384, "tdp": 350 } },
    { "id": "rtx3080", "series": "rtx30", "name": "RTX 3080", "vram_gb": 10, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2020-09-17", "die": "GA102-200", "cores": 8704, "bus": 320, "tdp": 320 } },
    { "id": "rtx3070ti", "series": "rtx30", "name": "RTX 3070 Ti", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2021-06-10", "die": "GA104-400", "cores": 6144, "bus": 256, "tdp": 290 } },
    { "id": "rtx3070", "series": "rtx30", "name": "RTX 3070", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2020-10-29", "die": "GA104-300", "cores": 5888, "bus": 256, "tdp": 220 } },
    { "id": "rtx3060ti", "series": "rtx30", "name": "RTX 3060 Ti", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2020-12-02", "die": "GA104-200", "cores": 4864, "bus": 256, "tdp": 200 } },
    { "id": "rtx3060", "series": "rtx30", "name": "RTX 3060", "vram_gb": 12, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2021-02-25", "die": "GA106-300", "cores": 3584, "bus": 192, "tdp": 170 } },
    { "id": "rtx3050", "series": "rtx30", "name": "RTX 3050", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2022-01-27", "die": "GA106-150", "cores": 2560, "bus": 128, "tdp": 130 } },
    { "id": "rtx2080ti", "series": "rtx20", "name": "RTX 2080 Ti", "vram_gb": 11, "dlss5": false, "dlss5_status": "no", "note": "Tensor Cores present. DLSS Super Resolution only.", "spec": { "launch": "2018-09-27", "die": "TU102-300", "cores": 4352, "bus": 352, "tdp": 250 } },
    { "id": "rtx2080super", "series": "rtx20", "name": "RTX 2080 Super", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2019-07-23", "die": "TU104-450", "cores": 3072, "bus": 256, "tdp": 250 } },
    { "id": "rtx2080", "series": "rtx20", "name": "RTX 2080", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2018-09-20", "die": "TU104-400", "cores": 2944, "bus": 256, "tdp": 215 } },
    { "id": "rtx2070super", "series": "rtx20", "name": "RTX 2070 Super", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2019-07-09", "die": "TU104-410", "cores": 2560, "bus": 256, "tdp": 215 } },
    { "id": "rtx2070", "series": "rtx20", "name": "RTX 2070", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2018-10-17", "die": "TU106-400", "cores": 2304, "bus": 256, "tdp": 175 } },
    { "id": "rtx2060super", "series": "rtx20", "name": "RTX 2060 Super", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2019-07-09", "die": "TU106-410", "cores": 2176, "bus": 256, "tdp": 175 } },
    { "id": "rtx2060", "series": "rtx20", "name": "RTX 2060", "vram_gb": 6, "dlss5": false, "dlss5_status": "no", "note": "No DLSS 5 support", "spec": { "launch": "2019-01-15", "die": "TU106-200A", "cores": 1920, "bus": 192, "tdp": 160 } }
  ],
  "spec_sources": {
    "rtx20": "https://en.wikipedia.org/wiki/GeForce_RTX_20_series",
    "rtx30": "https://en.wikipedia.org/wiki/GeForce_RTX_30_series",
    "rtx40": "https://en.wikipedia.org/wiki/GeForce_RTX_40_series",
    "rtx50": "https://en.wikipedia.org/wiki/GeForce_RTX_50_series"
  },
  "feature_matrix": [
    { "label": "DLSS 5 Neural Rendering", "rtx50": "confirmed", "rtx40": "unconfirmed", "rtx30": "no" },
    { "label": "DLSS 4.5 Dynamic MFG", "rtx50": "yes", "rtx40": "yes", "rtx30": "no" },
    { "label": "DLSS 4 Multi Frame Gen", "rtx50": "yes", "rtx40": "yes", "rtx30": "no" },
    { "label": "DLSS 3 Frame Generation", "rtx50": "yes", "rtx40": "yes", "rtx30": "no" },
    { "label": "Ray Reconstruction", "rtx50": "yes", "rtx40": "yes", "rtx30": "yes" },
    { "label": "DLSS Super Resolution", "rtx50": "yes", "rtx40": "yes", "rtx30": "yes" },
    { "label": "FP8 Precision", "rtx50": "yes", "rtx40": "yes", "rtx30": "no" }
  ],
  "faq": [
    { "q": "Does DLSS 5 require a new GPU?", "a": "Yes. DLSS 5 Neural Rendering is confirmed exclusively for RTX 50 series (Blackwell architecture). RTX 40 series support has not been confirmed by NVIDIA." },
    { "q": "When does DLSS 5 launch?", "a": "NVIDIA announced a Fall 2026 release window. No specific date has been given." },
    { "q": "What is DLSS 5 Neural Rendering?", "a": "DLSS 5 takes each frame's color data and motion vectors as input, then uses an AI model to add photoreal lighting, shadows, and material properties in real time at up to 4K. Jensen Huang called it 'the GPT moment for graphics.'" },
    { "q": "Can RTX 3080 or RTX 4090 use DLSS 5?", "a": "Not confirmed. NVIDIA's DLSS 5 announcements have focused exclusively on RTX 50 series hardware. RTX 40 support is unconfirmed; RTX 30 and older will not support it." },
    { "q": "Is DLSS 5 different from DLSS 4?", "a": "Yes, completely different goals. DLSS 4 is about performance (more frames per second via frame generation). DLSS 5 is about visual fidelity (better lighting and materials). On an RTX 50 series card you can use both simultaneously." },
    { "q": "What games will support DLSS 5?", "a": "15+ games confirmed at launch including Starfield, Hogwarts Legacy, Assassin's Creed Shadows, Resident Evil Requiem, and more. See the full games list above." },
    { "q": "Why did the DLSS 5 demo require two RTX 5090s?", "a": "The GTC 2026 demo was a preview build, not the shipping version. One GPU ran the game, the other ran the DLSS 5 model. NVIDIA confirmed the shipping version will run on a single GPU." }
  ]
};
