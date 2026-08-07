# Template D — Awards page (`/awards`)

Sampled: `/awards`. Research only.

## Purpose
Credentials / recognition page. Heavy on video and badges. **Caution for A Squared**: this page displays specific design-award wins and SEO metrics. Per `../1-to-1-gap-analysis.md` §Tier 3, do **not** reproduce award badges or metrics unless A Squared has genuinely earned them — fabricated credentials on a real business site.

## Structure

| # | Element | Notes |
|---|---|---|
| 0 | `header.fixed` (88px) | shared nav |
| 1 | `section.bg-dark.min-h-[80svh].flex` "Awards & Recognition" (703px) | **dark full-height hero**, 5 imgs |
| 2 | `section.py-16.sm:py-24.max-w-4xl.mx-auto` "International Design Awards" (1939px) | centered prose, 1 video + 11 imgs (badges) |
| 3 | `section.scroll-text` (879px) | **scroll-linked text reveal** — large statement text tied to scroll (see below) |
| 4 | `section.relative.overflow-hidden.pt-32.pb-8` (738px) | **11-video full-bleed strip** — same asset set as home `#awards` carousel |
| 5 | `section…max-w-4xl` "SEO Performance" | metrics prose |
| 6 | `section.bg-dark.py-24` "Industry Recognition" (1173px) | dark block, 7 imgs |
| 7–8 | `section…max-w-4xl` "Design, Development & SEO" / "Across Industries" | prose |
| 9 | `section.rounded-2xl.my-16.bg-dark` (398px) | dark rounded feature card (same as Template B) |
| 10 | `section.bg-white` "Frequently Asked Questions" | FAQ |
| 11 | shared `footer` CTA | |

Doc height ~11,593px. **12 videos**, 37 images, 7 SVGs (badges).

## Key techniques
- **`.scroll-text` section** — a scroll-linked text reveal (statement text whose appearance is driven by scroll position). This is the one novel motion vs. the home page; likely the same scroll-linked style-update mechanism documented for the timeline (`../components/10-process-timeline.md`), applied to text opacity/position rather than a progress bar.
- **11-video full-bleed strip** — shared with home `#awards` (`../components/03-awards.md`). Intersection-triggered `loop muted` playback.
- `max-w-4xl mx-auto` centered reading column for all prose sections (narrower than the 1366px home container).
- Dark hero + dark rounded feature card = same dark-block vocabulary as Templates A/B.

## Reproduction
Structure trivial. `.scroll-text` needs the scroll-linked technique (Framer Motion `useScroll`), moderate. **Content is the blocker, not technique** — this page is meaningless without real awards; likely A Squared skips or repurposes it as a generic "Recognition / Why us" page without fabricated badges.
