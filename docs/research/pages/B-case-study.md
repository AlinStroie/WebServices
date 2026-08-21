# Template B — Case-study article (`/case-studies/*`)

Sampled: `/case-studies/prime-home-health` (`/case-studies` redirects here). Research only.

## Purpose
Long-form results story ("Home-Care Clinic Hits Page 1 in 30 Days") — heavier on data/screenshots than Template A. Structurally very close to the SEO landers (Template E); the difference is length and a sticky hero.

## Structure

| # | Element | Notes |
|---|---|---|
| 0 | `header.fixed` (88px) | shared nav, 1 logo img |
| 1 | `section.sticky.top-0.overflow-clip` (864px) | **sticky hero**, same `top:0` pin pattern as home hero. 8 images. H2 "Healthcare SEO that took a home-care…" |
| 2 | `section.p-section-md.min-h-fit` (2548px) | intro/summary block, 1 img |
| 3 | `section.py-12.sm:py-16` "First, make the site findable" | prose |
| 4 | `section.py-12.sm:py-16` "Then, earn the terms patients search" | prose |
| 5 | `section.relative.overflow-hidden.rounded-2xl.my-16.bg-dark` (398px) | **dark rounded feature card**, 6 images |
| 6 | `section.relative.z-20.bg-white` "Frequently Asked Questions" (1232px) | FAQ accordion |
| 7 | shared `footer` CTA | |

Doc height ~14,663px. 1 video, 33 images.

## Key techniques
- **Sticky hero** (`sticky top-0 overflow-clip`) — identical pin mechanism to the home hero; content below slides over it.
- **Dark rounded feature card** (`rounded-2xl bg-dark`) mid-article to break up the prose and spotlight a metric/gallery.
- FAQ accordion reuses the home `12-faqs` component (`block-size 0.25s ease-out`, `content-visibility allow-discrete`).
- Same alternating-rhythm + shared footer as every other template.

## Reproduction
Trivial. Sticky-hero + prose + one dark feature card + FAQ + footer. All already covered by home-page component research.
