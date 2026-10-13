---
title: "Crimson Desert PC Settings for 4K 60fps — and Upscaling Your Screenshots (2026)"
title_cn: "绯红荒漠 PC 设置：4K 60fps 怎么调，截图怎么再放大（2026）"
description: "Crimson Desert settings by GPU tier for 4K 60fps, the Kastone stutter fix, and how to upscale the screenshots you capture with Black Space Engine."
description_cn: "按显卡档位给出的绯红荒漠 4K 60fps 设置、卡斯通卡顿修复，以及怎么把 Black Space Engine 里截的图再放大。"
date: "2026-04-11"
reviewed: "2026-10-10"
og_image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1600"
tags: ["crimson desert", "crimson desert dlss", "crimson desert performance", "dlss 4.5", "绯红荒漠优化"]
counterpart: "https://www.dlss5nvidia.com/blog/crimson-desert-pc-optimization-dlss-fsr-guide-2026"
---
<!-- ============================================================
     ENGLISH VERSION
     ============================================================ -->

*6 min read*

---

Crimson Desert launched on March 19, 2026, and it immediately became one of the most visually ambitious open-world games in years — powered by Pearl Abyss's proprietary Black Space Engine. The good news: it's surprisingly well-optimized compared to many modern AAA titles. The less good news: even on launch day, dense areas like Kastone city can still stress test your GPU hard.

Here's how to get the most out of it, with every upscaling option explained.

---

## Supported Upscaling Technologies

Crimson Desert supports a comprehensive list of AI upscaling and frame generation options:

- **NVIDIA DLSS 4** (all RTX GPUs — upscaling + frame generation on RTX 40/50)
- **NVIDIA DLSS 4.5** (all RTX GPUs — note: DLSS 4.5 has a flickering bug at launch; DLSS 4 is more stable)
- **NVIDIA DLSS Ray Reconstruction** (RTX 20 series and newer)
- **AMD FSR 3** (any GPU)
- **AMD FSR 4** (RDNA 4 only — upscaling + frame generation)
- **AMD FSR Ray Regeneration** (AMD GPUs)
- **Apple MetalFX** (Mac)

The game supports both DLSS 4 and DLSS 4.5. DLSS 4.5 suffers from flickering issues that are not present in DLSS 4. Until Pearl Abyss patches this, use DLSS 4 for the stable experience.

---

## Benchmark Targets by GPU

No numeric frame-rate table is published here: these values have no matching local GPU run or citable first-party result. The table keeps the comparison fields visible so a future measured run can fill them without changing the page structure.

| GPU | Native 4K Ultra (avg fps) | DLSS 4 Quality (avg fps) | DLSS 4 Performance (avg fps) |
|-----|----------------------------|--------------------------|------------------------------|
| RTX 5090 | Not measured here | Not measured here | Not measured here |
| RTX 5080 | Not measured here | Not measured here | Not measured here |
| RTX 5070 Ti | Not measured here | Not measured here | Not measured here |
| RTX 4090 | Not measured here | Not measured here | Not measured here |
| RTX 4080 Super | Not measured here | Not measured here | Not measured here |
| RTX 4070 Ti Super | Not measured here | Not measured here | Not measured here |
| RX 9070 XT (FSR 4) | Not measured here | Not measured here | Not measured here |

## Recommended Settings for Each Tier

### High-End (RTX 5080/5090, RX 9070 XT) — 4K Ultra 60fps+
- **Quality**: Ultra or Cinematic
- **Upscaling**: DLSS 4 Quality mode (or FSR 4 Quality on AMD)
- **Frame Generation**: Enable (RTX 50: DLSS 4.5 MFG; RTX 40: DLSS FG; RDNA 4: FSR FG)
- **Ray Reconstruction**: Enable
- **Shadow Distance**: Ultra
- **NPC Density**: Ultra

### Mid-High (RTX 4080, RTX 4070 Ti Super) — 4K High 60fps
- **Quality**: High
- **Upscaling**: DLSS 4 Balanced mode
- **Frame Generation**: Enable
- **Ray Reconstruction**: Enable
- **Shadow Distance**: High
- **Volumetric Fog**: Medium (saves 8–10% with minimal visual difference)

### Mid-Range (RTX 4070, RTX 4060 Ti) — 1440p High 60fps+
- **Quality**: High
- **Upscaling**: DLSS 4 Quality mode
- **Frame Generation**: Enable (if RTX 40 series)
- **Shadow Distance**: Medium
- **NPC Density**: Medium (major improvement to 1% lows in Kastone)

---

## The Stuttering Fix (Kastone and Large Battles)

If you're experiencing stuttering specifically in Kastone or during large-scale combat, the key changes are: reduce NPC Density to Medium, lower Shadow Distance, and enable DLSS 4. This significantly improves 1% lows and smooths large-scale combat performance.

Additionally, Crimson Desert uses Pearl Abyss's Black Space Engine with Asynchronous Loading, which nearly eliminates the shader compilation stutter common in Unreal Engine 5 titles from 2024–2025. If you're experiencing compilation stutter, it's almost certainly a driver issue — update to NVIDIA driver 581.29 or AMD driver 25.9.2 minimum.

---

## Will Crimson Desert Get DLSS 5 Support?

DLSS 5 is not out yet — it launches in Fall 2026. Studios have to approve and implement DLSS 5 support for their games when it does. Crimson Desert is not on the current confirmed list of DLSS 5 titles. However, given Pearl Abyss's existing deep integration with NVIDIA (the game launched alongside DLSS 4 and DLSS Ray Reconstruction), DLSS 5 support in a future patch is plausible. Nothing confirmed.

---

## Beyond the Game: Upscaling Your Screenshots

If you're taking screenshots in Crimson Desert — and with Black Space Engine's visuals, you absolutely should be — you can push them further with AI image upscaling tools. Our online tool can take your in-game captures and enhance their detail, lighting, and sharpness using the same diffusion-based AI principles that power DLSS 5's neural rendering. No RTX 5090 required.

→ **[Enhance your Crimson Desert screenshots — try free](/__studio__)**

<!-- ============================================================
     CHINESE VERSION (中文版)
     ============================================================ -->

*阅读约6分钟*

---

《绯红荒漠》于 2026 年 3 月 19 日发布，立刻成为近年来视觉最具野心的开放世界游戏之一，由 Pearl Abyss 自研的 Black Space Engine 驱动。好消息是：与许多现代 AAA 作品相比，它的优化出人意料地出色。坏消息是：即便如此，密集城区（如卡斯通）和大规模战斗仍然会给 GPU 带来显著压力。

---

## 支持的超分辨率技术

《绯红荒漠》支持目前最全面的 AI 超分和帧生成选项：

- **NVIDIA DLSS 4**（所有 RTX 显卡——RTX 40/50 支持帧生成）
- **NVIDIA DLSS 4.5**（注意：DLSS 4.5 在发布时存在闪烁 bug，DLSS 4 更稳定）
- **NVIDIA DLSS 光线重建**（RTX 20 系列及以上）
- **AMD FSR 3**（任意显卡）
- **AMD FSR 4**（仅限 RDNA 4——超分 + 帧生成）
- **Apple MetalFX**（Mac）

**关键注意：** 游戏同时支持 DLSS 4 和 4.5，但 DLSS 4.5 存在闪烁问题，在 Pearl Abyss 修复补丁发布之前，建议使用 DLSS 4。

---

## 各 GPU 的帧率参考（4K 分辨率）

本表保留比较字段，但不填没有本地显卡实测或可引用一手来源的数字；未来有合格测量时可在原位置补录。

| 显卡 | 原生4K超高（平均帧率） | DLSS 4质量模式 | DLSS 4性能模式 |
|------|---------------------|---------------|---------------|
| RTX 5090 | 本站未测量 | 本站未测量 | 本站未测量 |
| RTX 5080 | 本站未测量 | 本站未测量 | 本站未测量 |
| RTX 5070 Ti | 本站未测量 | 本站未测量 | 本站未测量 |
| RTX 4090 | 本站未测量 | 本站未测量 | 本站未测量 |
| RTX 4080 Super | 本站未测量 | 本站未测量 | 本站未测量 |
| RTX 4070 Ti Super | 本站未测量 | 本站未测量 | 本站未测量 |
| RX 9070 XT（FSR 4） | 本站未测量 | 本站未测量 | 本站未测量 |

## 各配置档位推荐设置

**高端配置（RTX 5080/5090，RX 9070 XT）——4K超高 60fps+**
超分辨率：DLSS 4 质量模式；帧生成：开启；光线重建：开启；阴影距离：超高；NPC 密度：超高。

**中高端（RTX 4080，RTX 4070 Ti Super）——4K高 60fps**
超分辨率：DLSS 4 均衡模式；体积雾质量：高（改为中可节省 8-10% 性能，画质差别微小）。

**中端（RTX 4070，RTX 4060 Ti）——2K高画质 60fps+**
超分辨率：DLSS 4 质量模式；NPC 密度：中（大幅改善卡斯通中的最低帧率）。

---

## 卡斯通卡顿修复方案

如果你在卡斯通或大规模战斗中遇到卡顿：将 NPC 密度降至中、降低阴影距离、开启 DLSS 4，这三项操作能显著改善最低帧率。同时确保驱动版本不低于 NVIDIA 581.29 或 AMD 25.9.2。

---

## 绯红荒漠会获得 DLSS 5 支持吗？

DLSS 5 要到 2026 年秋季才发布，《绯红荒漠》目前不在已确认的 DLSS 5 支持游戏列表中。但考虑到 Pearl Abyss 与 NVIDIA 的深度合作关系（游戏发布时就集成了 DLSS 4 和光线重建），后续补丁加入 DLSS 5 支持是有可能的，只是尚未确认。

---

## 用 AI 增强你的游戏截图

如果你在《绯红荒漠》中截图——凭借 Black Space Engine 的画面，你绝对应该截——可以用 AI 图像超分工具进一步提升细节、光照和清晰度。我们的在线工具使用与 DLSS 5 神经渲染同样原理的扩散模型 AI，不需要 RTX 5090。

→ **[免费增强你的绯红荒漠截图](/__studio__)**
