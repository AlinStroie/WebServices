# Process timeline (scroll-linked)

`<section id="process" class="relative bg-gradient-to-b from-neutral-100 from-0% via-neutral-100 via-90% to-neutral-400">` — top 14842px, height 4908px, padding 160px top and bottom.

The most technically interesting section on the page, and the one TARGET.md calls out as a priority. It is the only genuinely **scroll-linked** effect on the site — everything else is scroll-*triggered*.

## Layout

```
.grid.gap-4.md:gap-8.grid-cols-12          12 col, 79px each, gap 32px
  .sm:sticky.top-20.col-span-4             ← sticky sidebar, h 566px
  .grid.col-span-7.md:col-span-6.gap-16    ← milestone content, 635px, gap 64px
```

Sidebar pins at `top: 80px` and stays pinned for **~3,077px** of scroll while the milestone list moves past it.

Below the `sm` breakpoint the sidebar becomes `position: static` — **the entire pinned behaviour is desktop/tablet only**. On mobile it is a plain stacked list. This is the right call and we should copy it; a sticky sidebar on a 375px viewport eats the screen.

Background is a three-stop vertical gradient that stays flat (`neutral-100`) for the first 90% and only darkens to `neutral-400` at the very bottom — a subtle hand-off into the next section rather than an even wash.

## The progress rail

```
.milestone-container   absolute, width 2px, height 3643px, left 39.58px, transform: translateX(-1px)
.milestone-line        absolute, width 2px, height 3051px, top 224px, background #d1d5db (grey-300)
.milestone-progress    absolute, width 2px, background #10b981 (emerald), transform: scaleY(0…1)
.milestone-marker      absolute, 12×12px, transform: translate(-6px, -6px), transition: background-color 0.3s
.milestone-marker.active  background #10b981
```

- The rail is a 2px track with `translateX(-1px)` to centre it on its anchor
- Markers are 12×12 dots offset by `translate(-6px, -6px)` to centre on the rail
- Marker vertical positions: **224, 816.5, 1437, 2057.75, 2650** — roughly 600px apart, 6 milestones total
- Markers switch grey→emerald with a **300ms `background-color` transition**

## Measured scroll linkage

Sampled across the section (section top 14842, height 4908, viewport 900):

| Section top vs viewport | progress scaleY | filled px | active markers |
|---|---|---|---|
| +450 | 0.000 | 0 | 1 |
| −41 | 0.071 | 216 | 1 |
| −532 | 0.229 | 699 | 2 |
| −1023 | 0.388 | 1183 | 2 |
| −1514 | 0.546 | 1666 | 3 |
| −2004 | 0.704 | 2149 | 4 |
| −2495 | 0.863 | 2632 | 5 |
| −2986 | 1.000 | 3051 | 6 |
| −3477 and beyond | 1.000 | 3051 | 6 |

**The relationship is exactly linear, and it is 1:1 with scroll distance.** Filled pixels equal pixels scrolled past the section top. No easing, no smoothing, no lerp.

```
fill = clamp(scrollY - sectionTop, 0, 3051)      // in px
scaleY = fill / 3051
```

Fill begins the moment the section top crosses the viewport top and completes after 3,051px — which is exactly the rail height. A marker becomes `.active` when the fill passes its offset.

### Reproducing it

```jsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end end"],   // linear, matches the 1:1 mapping
});

<motion.div
  className="milestone-progress"
  style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
/>
```

Framer Motion's `useScroll` gives this directly. Two things to get right:

- **`transformOrigin: top`** — without it the bar grows from the centre outward
- **Do not add a spring.** The reference is dead linear, and a spring on a progress indicator lags behind the scroll position in a way that reads as broken rather than smooth.

For the markers, subscribe to `scrollYProgress` and compare against each marker's normalised offset, toggling a class with a 300ms colour transition.

Disable the whole thing below `sm`, matching the sidebar going static.

## The rolling number

Alongside the rail, a huge step number counts up.

```
.absolute.flex.h-full.w-fit.flex-col.transition-all.duration-700.ease-in-out-cubic
transition: 0.7s cubic-bezier(0.4, 0, 0.2, 1)
children: "1." "2." "3." "4." "5." "6."
```

A vertical stack of the six numbers inside an `overflow: hidden` viewport, translated on the Y axis so only the active one shows — a slot-machine roll.

- Type size: **313.5px**, line height 250.8px (0.8), letter spacing −2.88px
- Transition: **700ms `cubic-bezier(0.4, 0, 0.2, 1)`** (ease-in-out)
- Snaps to **discrete stops**, one per milestone — it is not continuously scroll-linked like the rail

Measured translateY at successive sample points: 0 → −115 → −237 → −375 → −577 → −808 → −1050 → −1235 → −1254. Intermediate values are mid-transition samples; the resting stops are one per milestone.

This is the detail that makes the section feel expensive, and it costs a `translateY` plus a 700ms transition.

Note the line height of **0.8** — below 1.0, which crops the numerals tight and is what allows a 313px glyph to sit in a ~250px box.

### Reproducing it

```jsx
<div className="overflow-hidden" style={{ height: "0.8em", fontSize: "clamp(8rem, 20vw, 313px)" }}>
  <motion.div
    animate={{ y: `${-activeIndex * 0.8}em` }}
    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
  >
    {steps.map((_, i) => <div key={i}>{i + 1}.</div>)}
  </motion.div>
</div>
```

Using `em` units keeps the stops correct when the font size changes responsively — hardcoding pixel offsets breaks at every breakpoint.

## Notes for mapping

`src/components/Process.jsx` (8.5K) and `ProcessModal.jsx` (15.7K) are the closest existing components. We do have a process concept already, so this is a **structural upgrade to something real**, not a new invented section — good.

Recommended order if we take this on: rail and markers first (self-contained, immediately convincing), rolling number second (more fiddly, higher polish). The two are independent and can ship separately.

This is the highest-effort item in the whole research set. Worth it, but it should be scheduled on its own rather than bundled with other sections.
