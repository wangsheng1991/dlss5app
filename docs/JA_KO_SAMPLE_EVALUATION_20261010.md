# Japanese/Korean sample evaluation — 2026-10-10

This is a deliberately limited language experiment. It does not roll the entire checker out in Japanese or Korean.

## Routes delivered

Four static, indexable routes are included in the sitemap:

- `/ja` and `/ja/supported-cards`
- `/ko` and `/ko/supported-cards`

Each sample has manually written headings, explanatory paragraphs, four FAQ entries, the 31-model table, model links and FAQPage JSON-LD. The pages state that they are samples; no unsupported model conclusion was added.

## What the sample tells us

- **Route count:** 4 additional routes on top of the 141 standard English/Simplified Chinese/Traditional Chinese routes.
- **Build impact:** the same Vite + static prerender build emits four extra HTML files; the exact elapsed time is recorded by the build command in CI/local logs rather than guessed here.
- **Maintenance cost:** each sample currently needs manual copy review for the home explanation, table headings/status labels, four FAQ answers, title/description, and evidence-boundary wording. GPU values remain shared from `src/data.ts`, so hardware numbers are not duplicated.
- **Locale keys:** no full locale rollout was added. If this experiment is expanded, `src/locales.ts` will need reviewed `hero.*`, `checker.*`, `matrix.*`, `faq.*`, `nav.*`, `banner.*`, `footer.*`, `status.*`, and page metadata keys for `ja` and `ko`, plus localized article and trust-page copy. The four sample routes intentionally bypass that large translation surface.

## Decision gate

Do not expand to GPU detail, blog, studio, or trust pages until Search Console impressions and human language review justify the maintenance cost. The sample pages are evidence for that decision, not a claim that the whole site is localized.
