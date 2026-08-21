# Template E — SEO article / landing page (~25 routes)

Sampled: `/web-design-philippines-pricing`. Represents all ~25 SEO landers listed in `00-sitemap.md`. Research only.

## Purpose
Content-marketing / SEO long-form article. There are ~25 of these and they are all the same template. **Low structural relevance to A Squared** — these are a blog/guide system, not a distinctive interaction pattern. Documented once so nothing is silently skipped.

## Structure
- `header.fixed` (88px) — shared nav.
- `section.sticky.top-0.overflow-clip` (864px) — **same sticky hero** as Template B, with the article title.
- `section.p-section-md.min-h-fit` — intro/TL;DR.
- **N × `section.py-12.sm:py-16`** — repeated prose blocks, one per H2 heading. The sampled page had **27 sections** and a document height of **~45,000px** (very long).
- 3 `<table>` elements — pricing/comparison tables inline in the prose.
- Shared `footer` CTA.

Doc height ~44,998px. 27 imgs, 1 video, 3 tables.

## Key techniques
- Nothing new. Sticky hero (Template B) + endlessly repeated `py-12 sm:py-16` prose blocks + tables + shared footer. No unique motion.
- This is effectively A Squared's blog article template with a sticky title hero.

## Reproduction / recommendation
If A Squared wants a blog/guides section, this is the pattern: sticky-title hero + prose blocks + tables + shared footer. We already have `/blog` + `/blog/:slug` routes in the repo (old dark design). Applying this template = restyle the existing blog to the light system with a sticky title hero. **Not a Phase-2 priority** unless the user asks; the home page and portfolio/discovery templates carry the transform's value.
