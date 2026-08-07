# Benefits

`<section id="benefits" class="relative w-full py-24 md:py-32 bg-light rounded-[24px] transform-gpu">` — top 7414px, height 1353px, padding 128px top and bottom.

## Layout

Heading block: `grid gap-6 lg:gap-8 text-center justify-items-center max-w-[60rem] mx-auto` — centred, capped at 960px.

Card grid: `grid md:grid-cols-2 gap-8 md:gap-12 mt-20`

| Viewport | Columns | Card width | Gap |
|---|---|---|---|
| 1440 | 2 | 627px | 48px |
| 768 | 2 | 321px | 48px |
| 375 | 1 | 328px | 32px |

Holds two columns down to 768px. 80px top margin (`mt-20`) separating the heading from the grid.

## The section-level detail worth stealing

```
bg-light            #c9d3d7  ← light section between two dark ones
rounded-[24px]      corner radius on the section itself
transform-gpu       promotes to its own layer
```

The section is a **light, rounded slab set against the dark page**. Because `#works` below it is `bg-dark` and the marquee above it is `bg-dark`, the 24px radius reads as a card floating on the page rather than a background change. It is a cheap way to break up a long dark scroll without adding any motion.

`transform-gpu` (`translateZ(0)`) forces a compositor layer. On a section with a radius sitting between other layered content, this avoids repaint artifacts on scroll.

## Animation: accordion disclosure

The cards are interactive disclosures, not static panels.

Trigger row: `flex items-center justify-between gap-3 cursor-pointer list-none` — `list-none` strips the native `<summary>` marker, confirming this is a native `<details>` / `<summary>` element rather than a JS accordion.

Icon row: `flex items-center gap-3`.

Transitions found on the card:

```
transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1)                    ← hover/active state
transition: block-size 0.25s ease-out,
            content-visibility 0.2s allow-discrete                 ← the open/close
```

This is the **modern CSS-only accordion**: `content-visibility` with `allow-discrete` plus a `block-size` transition, which lets a native `<details>` animate open to its intrinsic height without JavaScript measuring anything.

- Open/close: **250ms `ease-out`** on height
- `content-visibility`: 200ms, discrete
- Hover feedback: 150ms `cubic-bezier(0.4, 0, 0.2, 1)`

No entrance animation on the cards — they do not fade or slide in on scroll.

### Reproducing it

Browser support for `allow-discrete` + `interpolate-size` is still uneven (Chromium yes, Firefox/Safari partial as of the capture date). Two options:

1. **Native `<details>` with the CSS above** and a graceful fallback to instant open where unsupported. Best accessibility for free — keyboard, screen reader and `Ctrl+F` find-in-page all work.
2. **Framer Motion `<AnimatePresence>`** with `height: auto`. Works everywhere, but we then own the keyboard and ARIA handling ourselves.

Recommend option 1. The fallback (instant open) is completely acceptable, and native `<details>` is significantly more robust than a hand-rolled accordion.

Match the reference timing either way: **250ms ease-out**, and 150ms for the hover state.

## Notes for mapping

`src/components/Benefits.jsx` is currently only 1.8K — likely a simple static list. This section is a candidate for a genuine structural upgrade (list → two-column disclosure grid), which means it needs a content decision: our benefit copy would have to be split into summary + detail.

That is a content restructure, not a pure style change, so it should be confirmed before implementation.
