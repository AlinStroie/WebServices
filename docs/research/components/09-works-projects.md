# Works / featured projects

`<section id="works" class="w-full bg-dark">` — top 8800px, **height 6042px**. The largest section on the page by a wide margin.

## Layout

```
.container.mx-auto.pt-40.pb-40   grid, 1 col (1302px), gap 160px, px-4 sm:px-8
  .grid.gap-20.md:gap-40         grid, gap 160px
    .project                     grid, lg:grid-cols-[2fr_1fr], gap 80px
      (visual)                   815px
      .text                      grid, content-center, gap 64px → 407px
```

| Viewport | Project row | Gap |
|---|---|---|
| 1440 | `2fr 1fr` → 815px + 407px | 80px |
| 768 | 1 col (689px) | 80px |
| 375 | 1 col (328px) | 40px |

- **8 `.project` items**
- 160px between projects (`gap-40`) — the same value as the section padding rhythm
- The `2fr 1fr` split gives the visual twice the width of the copy; the copy column is `content-center` so it centres vertically against a tall image
- Copy column internal gap: 64px (`lg:gap-16`)

The 160px inter-project gap is what makes this section 6042px tall for only 8 items. The generosity is the point — each project gets its own moment rather than reading as a grid.

## Animation: the scroll reveal

This is the section where the site's one content-entrance animation lives.

- **From:** `opacity: 0`, `transform: translateY(100px)`
- **To:** `opacity: 1`, `transform: translateY(0)`
- **Duration:** ~1000ms
- **Easing:** cubic-out — measured curve fits `1-(1-t)³` closely
- **Trigger:** fires when the element's top edge is **~150px below the viewport bottom**, i.e. slightly before it is visible
- **Fires once**, does not reverse on scroll-up
- Driven by the framework's transition system (Web Animations / inline style tweening), **not** a CSS transition — computed `transition-duration` is `0s`

Measured, from a cold load:

| t (ms) | 0 | 68 | 190 | 320 | 450 | 570 | 690 | 810 |
|---|---|---|---|---|---|---|---|---|
| translateY | 100 | 81.5 | 54.7 | 32.0 | 18.3 | 8.2 | 3.2 | 0.6 |
| opacity | 0 | .185 | .452 | .680 | .816 | .918 | .968 | .993 |

Opacity and translateY share a single eased progress value — one tween driving both, not two independent animations.

**No stagger between the two columns** of a project, and no stagger between projects — each `.project` animates as one unit when it individually crosses the trigger line. Because the projects are 160px apart, they never animate simultaneously anyway.

### Reproducing it

```jsx
<motion.article
  className="project"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px 150px 0px" }}
  transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
>
```

`[0.33, 1, 0.68, 1]` is `easeOutCubic`. The `margin` bottom value reproduces the early trigger — without it the card starts animating only once it is already on screen, which feels noticeably later.

Add a `prefers-reduced-motion` branch that drops to `opacity` only.

## Hover

No hover animation was detected on the project rows.

## Notes for mapping

`src/components/Portfolio.jsx` (18.7K) and `PortfolioBrowserFrame.jsx` (4.8K) are the direct equivalents, and this is the **best-fit mapping on the whole page** — same content type, same job.

Two changes, both non-destructive to content:
1. Layout: alternating `2fr 1fr` rows with 160px separation, replacing whatever grid density we currently use
2. Motion: the `translateY(100px)` + fade reveal per project

Worth noting: our existing `PortfolioBrowserFrame` (a browser-chrome mockup around each project shot) is a device the reference site does not have. Per Phase 2 rule 4, that stays — it is ours, and it is a stronger presentation than a bare image.
