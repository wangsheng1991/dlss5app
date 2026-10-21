# Homepage comparison assets — 2026-10-21

User approved deploying the five selected static comparisons to dlss5.app. Added an image section immediately after the checker hero, using the approved library's 01-makeup-detail, 15-cat-fur, 21-night-street, 22-home-real and 23-flower-macro compare.jpg files without changing the library originals.

English, Simplified Chinese and Traditional Chinese use the same React component in both client rendering and static prerendering. Each case links to its original source/license/task metadata. Images preserve their proportions and load lazily. Links lead to the product site's visual enhancer and before/after center.

The text distinguishes flux-klein model regeneration from NVIDIA DLSS 5 game rendering and GPU benchmarks. It explains that generated detail can differ from the source. No timing, sharpness ratios or performance claims were added.

Validation: npm run lint and npm run build passed; the repository has no npm test script. Static output checks found exactly five cases and five image files in each of en, zh-CN and zh-TW. Local full-sitemap checker: `DLSS5APP: shell=0/145 ssr=145/145 uniqueTitles=145 sitemap=145 verdict=SSR-OK`. Browser preview confirmed five loaded images, source records and complete uncropped static side-by-side comparisons. Existing GPU checker and page metadata remain unchanged.
