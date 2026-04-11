export const gpuData = {
  "gpu_series": [
    { "id": "rtx50", "name": "GeForce RTX 50 Series", "architecture": "Blackwell" },
    { "id": "rtx40", "name": "GeForce RTX 40 Series", "architecture": "Ada Lovelace" },
    { "id": "rtx30", "name": "GeForce RTX 30 Series", "architecture": "Ampere" },
    { "id": "rtx20", "name": "GeForce RTX 20 Series", "architecture": "Turing" }
  ],
  "gpus": [
    { "id": "rtx5090", "series": "rtx50", "name": "RTX 5090", "vram_gb": 32, "dlss5": true, "dlss5_status": "confirmed", "note": "Used in GTC 2026 DLSS 5 dual-GPU demo" },
    { "id": "rtx5080", "series": "rtx50", "name": "RTX 5080", "vram_gb": 16, "dlss5": true, "dlss5_status": "confirmed", "note": null },
    { "id": "rtx5070ti", "series": "rtx50", "name": "RTX 5070 Ti", "vram_gb": 16, "dlss5": true, "dlss5_status": "confirmed", "note": null },
    { "id": "rtx5070", "series": "rtx50", "name": "RTX 5070", "vram_gb": 12, "dlss5": true, "dlss5_status": "confirmed", "note": null },
    { "id": "rtx5060ti", "series": "rtx50", "name": "RTX 5060 Ti", "vram_gb": 16, "dlss5": true, "dlss5_status": "confirmed", "note": null },
    { "id": "rtx5060", "series": "rtx50", "name": "RTX 5060", "vram_gb": 8, "dlss5": true, "dlss5_status": "confirmed", "note": "Entry-level Blackwell, full DLSS 5 support confirmed" },
    { "id": "rtx4090", "series": "rtx40", "name": "RTX 4090", "vram_gb": 24, "dlss5": false, "dlss5_status": "unconfirmed", "note": "Best non-50 series card. DLSS 5 unconfirmed." },
    { "id": "rtx4080super", "series": "rtx40", "name": "RTX 4080 Super", "vram_gb": 16, "dlss5": false, "dlss5_status": "unconfirmed", "note": null },
    { "id": "rtx4080", "series": "rtx40", "name": "RTX 4080", "vram_gb": 16, "dlss5": false, "dlss5_status": "unconfirmed", "note": null },
    { "id": "rtx4070tisuper", "series": "rtx40", "name": "RTX 4070 Ti Super", "vram_gb": 16, "dlss5": false, "dlss5_status": "unconfirmed", "note": null },
    { "id": "rtx4070ti", "series": "rtx40", "name": "RTX 4070 Ti", "vram_gb": 12, "dlss5": false, "dlss5_status": "unconfirmed", "note": null },
    { "id": "rtx4070super", "series": "rtx40", "name": "RTX 4070 Super", "vram_gb": 12, "dlss5": false, "dlss5_status": "unconfirmed", "note": null },
    { "id": "rtx4070", "series": "rtx40", "name": "RTX 4070", "vram_gb": 12, "dlss5": false, "dlss5_status": "unconfirmed", "note": null },
    { "id": "rtx4060ti", "series": "rtx40", "name": "RTX 4060 Ti", "vram_gb": 16, "dlss5": false, "dlss5_status": "unconfirmed", "note": null },
    { "id": "rtx4060", "series": "rtx40", "name": "RTX 4060", "vram_gb": 8, "dlss5": false, "dlss5_status": "unconfirmed", "note": null },
    { "id": "rtx3090ti", "series": "rtx30", "name": "RTX 3090 Ti", "vram_gb": 24, "dlss5": false, "dlss5_status": "no", "note": "No Frame Generation. DLSS 4.5 ~5x more demanding without FP8." },
    { "id": "rtx3090", "series": "rtx30", "name": "RTX 3090", "vram_gb": 24, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx3080ti", "series": "rtx30", "name": "RTX 3080 Ti", "vram_gb": 12, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx3080", "series": "rtx30", "name": "RTX 3080", "vram_gb": 10, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx3070ti", "series": "rtx30", "name": "RTX 3070 Ti", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx3070", "series": "rtx30", "name": "RTX 3070", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx3060ti", "series": "rtx30", "name": "RTX 3060 Ti", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx3060", "series": "rtx30", "name": "RTX 3060", "vram_gb": 12, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx3050", "series": "rtx30", "name": "RTX 3050", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx2080ti", "series": "rtx20", "name": "RTX 2080 Ti", "vram_gb": 11, "dlss5": false, "dlss5_status": "no", "note": "Tensor Cores present. DLSS Super Resolution only." },
    { "id": "rtx2080super", "series": "rtx20", "name": "RTX 2080 Super", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx2080", "series": "rtx20", "name": "RTX 2080", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx2070super", "series": "rtx20", "name": "RTX 2070 Super", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx2070", "series": "rtx20", "name": "RTX 2070", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx2060super", "series": "rtx20", "name": "RTX 2060 Super", "vram_gb": 8, "dlss5": false, "dlss5_status": "no", "note": null },
    { "id": "rtx2060", "series": "rtx20", "name": "RTX 2060", "vram_gb": 6, "dlss5": false, "dlss5_status": "no", "note": null }
  ],
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
