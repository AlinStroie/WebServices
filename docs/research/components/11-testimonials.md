# Testimonials (card grid)

`<section id="testimonials" class="relative bg-[#C9D3D7] z-30 overflow-clip">` — top 19751px, height 1343px.

Distinct from the single featured quote earlier on the page (`05-testimonial-slider.md`). This is a two-column card grid.

## Layout

```
.container.mx-auto.px-4.xs:px-8.py-40   grid, 1 col (1334px), gap 96px, z-10
  .grid.xl:grid-cols-12.gap-10          12 col, 75px each, gap 40px
    .grid.md:grid-cols-2.gap-10.xl:col-span-10.xl:col-start-2
                                        2 × 533px, gap 40px
      .testimonial-card                 grid, 451px, row gap 24px, rounded-lg, overflow-hidden
```

| Viewport | Columns | Card width | Gap |
|---|---|---|---|
| 1440 | 2 | 533px | 40px |
| 768 | 2 | 341px | 40px |
| 375 | 1 | 328px | 40px |

The `xl:col-span-10 xl:col-start-2` is the detail worth noting: on extra-large screens the card grid is **inset by one column on each side** of the 12-column parent, so the testimonials sit narrower than the rest of the page. It stops a two-up card layout from becoming uncomfortably wide on a large monitor, without hardcoding a max-width.

`py-40` → 160px vertical padding, matching the page rhythm. 96px gap between the heading and the grid.

## Stacking

`z-30` — the highest z-index of any section, above `#faqs` (`z-20`) and `#problem-statement` (`z-20`). Combined with `overflow-clip`, this suggests the section is intended to overlap its neighbours cleanly. It sits on `#C9D3D7`, the same pale blue-grey as the hero, bracketing the dark middle of the page.

## Animation

`.testimonial-card` uses the site's standard scroll reveal — the same one as the project cards:

- **From:** `opacity: 0`, `transform: translateY(100px)`
- **To:** `opacity: 1`, `transform: translateY(0)`
- **Duration:** ~1000ms, cubic-out
- Confirmed mid-flight at `translateY(10.87px)` during capture, so it is a genuine eased tween rather than a snap

Same implementation as `09-works-projects.md`; reuse the same component wrapper.

Whether the two cards in a row stagger relative to each other was **not** established — both sit at the same vertical offset, so they cross the trigger line together. If we implement it, a small stagger (~80–100ms) between the two would be a reasonable enhancement, but it is not in the reference.

## Card interior

`grid gap-y-6` (24px row gap), `rounded-lg`, `overflow-hidden`, with a background layer. Nothing unusual.

## Notes for mapping

We do not currently have a dedicated testimonials component in `src/components/`. Adding one requires **real testimonials from real A Squared Studio clients** — this cannot be filled with reference-site content or invented quotes under any circumstances.

Per Phase 2 rule 5, flagging for your decision: do we have testimonials to publish? If yes, this is a straightforward build (two-column grid, standard reveal, 40px gaps). If no, skip the section entirely rather than staging placeholder quotes.
