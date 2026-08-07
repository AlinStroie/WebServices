# Template A — Portfolio detail (`/project/*`)

Sampled: `/project/martin-architectural-group`. 8 routes share this template. Research only.

## Purpose
Narrative case study of a single client build — the "here is a project we made and how we thought about it" page. This is the template A Squared would use for a dedicated project/case-study page if we decide we want one (Phase 2 asks before creating).

## Structure (top → bottom)

| # | Element | Notes |
|---|---|---|
| 0 | `header.fixed` (92px) | shared nav |
| 1 | `header.case-study-hero` (579px) | H1 title + intro. H1 = **Inter 500, ~54px, line-height 67px** (lighter weight than home's 700 hero) |
| 2 | `section.case-study-section` "Overview" | prose block |
| 3 | `section.case-study-section.bg-neutral-50` "The Challenge" | alternating light-grey bg |
| 4 | `section.case-study-section` "Industry Context" | |
| 5 | `section.case-study-section.bg-neutral-50` "The Approach" | |
| 6 | `section.case-study-section` "The Solution" | |
| 7 | `section.case-study-embed.py-16.sm:py-24` "Interactive Prototype" | **`<iframe>` live embed** of the built site, pad 96/96 |
| 8 | `section.case-study-section.bg-dark.text-white` "The Result" | dark inverted block |
| 9 | `section.case-study-section` "Reflection" | |
| 10 | shared `footer` CTA | |

Doc height ~9,928px. 1 video, 7 images (mostly in footer).

## Key techniques
- **Alternating section backgrounds**: plain → `bg-neutral-50` → plain, with one `bg-dark.text-white` inversion for "The Result". Pure structural rhythm, no JS.
- **Sticky section labels**: the section `<h2>` labels ("Overview", "The Challenge"…) are `position: sticky` — they pin while the paragraph body scrolls, acting as an inline running header. Cheap, effective.
- **Live iframe embed** for "Interactive Prototype" rather than a screenshot — the visitor scrolls a real running copy of the client site.
- `gradient-text` utility on a `text-heading-md.font-medium` accent.
- Reveal: same `all` transition primitive as elsewhere; no per-element scroll-reveal utility classes detected (site relies on CSS transitions + the home page's `translateY(100px)` reveal only on cards).

## Reproduction
Trivial with our stack: alternating-bg long-form + sticky `<h2>` + an `<iframe>` (or our existing minisite mockup renderer in the embed slot). No library needed.
