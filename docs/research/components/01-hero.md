# Hero

`<section id="hero" class="sticky top-0 overflow-clip">` — top 0, height 864px (desktop).

## The structural idea

This is the most valuable pattern on the page and it is pure CSS.

```
div.mb-[-100svh]          ← wrapper, height 1764px, margin-bottom: -100svh (-900px)
  └ section#hero.sticky.top-0   ← height 864px = min(864px, 100svh)
section#problem-statement.z-20  ← next section, opaque background
```

The wrapper's negative bottom margin pulls the following section up by exactly one viewport height. The hero is `sticky top-0`, so it stays pinned while `#problem-statement` (which has `z-20` and a solid `bg-dark`) scrolls up and covers it. The hero appears to sit still and be "wiped away" by the next section.

- Pin distance: ~900px of scroll
- No JavaScript, no scroll listener, no IntersectionObserver
- Requires the covering section to be opaque and have a higher stacking context

## Layout

Container: `w-[min(100%,60rem)] lg:container mx-auto px-4 sm:px-8` → 32px side padding at desktop.

Inner grid: `grid md:grid-cols-6 lg:grid-cols-12 relative sm:h-[min(864px,100svh)] items-center`

| Viewport | Columns | Column width | H1 |
|---|---|---|---|
| 1440 | 12 | 109px | 72px |
| 768 | 6 | 115px | 60px |
| 375 | 8 (content spans full) | 41px | 36px |

- Text column: `col-span-8`, width 981px at 1440, inner `grid gap-10 lg:gap-16` (64px at desktop), nested `grid gap-8` (32px)
- Portrait: `hidden mdd:inline-block absolute right-[-10%] xl:right-0 self-end` — absolutely positioned, deliberately bleeds 10% off the right edge below `xl`, snaps flush at `xl`. **Hidden entirely at 375px.**
- Trust row: `flex items-center flex-wrap gap-4 text-sm` — overlapping avatars, then a star rating

## Typography (reference values — do not port, we keep our own)

| Element | Size | Line height | Weight | Letter spacing |
|---|---|---|---|---|
| Eyebrow | 14px | 20px | 400 | 4.2px (0.3em), uppercase |
| H1 | 72px | 72px (1.0) | 700 | −3.6px (−0.05em) |

The two things worth carrying over as *technique*, independent of our font choice: a **line-height of exactly 1.0** on the display heading, and **tight negative tracking** (−0.05em) at large sizes. Both are what make the headline read as a solid block. The wide-tracked uppercase eyebrow is the standard counterweight to that.

## Animation: per-character split text

The H1 is split into a nested DOM structure:

```html
<h1>
  <div class="word">
    <div class="char">C</div><div class="char">u</div>…
  </div>
  …
</h1>
```

- 41 `.char` elements, each `display: inline-block`
- Wrapped in `.word` elements, also `display: inline-block` (so wrapping happens at word boundaries, not mid-word)
- `.word` has `overflow: visible` — so the reveal is **not** a mask/clip wipe

By the time the intro completes, the characters are at `opacity: 1`, `transform: none`, `animation: none` — the animation is applied once on load and cleaned up. The stagger is driven from the page intro, not from scroll.

### Reproducing it

Framer Motion with a small splitter and `staggerChildren`:

```jsx
<motion.h1
  initial="hidden" animate="visible"
  variants={{ visible: { transition: { staggerChildren: 0.02 } } }}
  aria-label={headline}
>
  {words.map((word, wi) => (
    <span key={wi} style={{ display: "inline-block" }} aria-hidden>
      {[...word].map((ch, ci) => (
        <motion.span key={ci} style={{ display: "inline-block" }}
          variants={{ hidden: { opacity: 0, y: "0.4em" }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}>
          {ch}
        </motion.span>
      ))}
      {" "}
    </span>
  ))}
</motion.h1>
```

**Accessibility:** keep the full string in `aria-label` and mark the split pieces `aria-hidden`, otherwise screen readers announce the headline letter by letter. This is a real regression risk and the reason to consider splitting per *word* instead of per *character* — visually very similar, much cheaper, and no a11y cost.

## Notes for mapping

Our existing `src/components/Hero.jsx` (11.9K) already has a headline, a supporting bullet row and a portrait/visual. The sticky-overlap technique can be applied to it without touching any content — it is a change to the wrapper markup and two utility classes, nothing more. That makes it the highest value / lowest risk item in Phase 2.
