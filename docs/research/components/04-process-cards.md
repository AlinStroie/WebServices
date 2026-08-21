# Process cards (three-up)

`<section id="process" class="w-full px-4 py-section-xl bg-dark isolate">` — top 3091px, height 1610px, padding 160px top and bottom.

Not to be confused with the large scroll-linked process timeline further down the page — that one is `10-process-timeline.md`. This is a simple three-card row.

## Layout

Heading block: `text-center flex flex-col items-center gap-4 lg:gap-8` (32px gap at desktop).

Card grid: `grid md:grid-cols-3 gap-8 max-w-5xl mx-auto`

| Viewport | Columns | Card width | Gap |
|---|---|---|---|
| 1440 | 3 | 320px | 32px |
| 768 | 3 | 219px | 32px |
| 375 | 1 | 328px | 32px |

Holds three columns all the way down to 768px, only stacking at mobile. `max-w-5xl` (1024px) keeps the row from stretching on wide screens.

Card interior: `relative z-10 space-y-6 h-full flex flex-col` — `h-full` so all three cards match height regardless of copy length.

`isolate` on the section creates a stacking context, which is what lets the card glow effect below sit behind the content without escaping the section.

## Animation: rotating conic glow on the active card

The only decorative animation in this section, and it is entirely CSS.

```
.step-card-holder            { transition: 0.3s; position: relative; }
.step-card-holder:first-child::before {
  animation: spin 5s linear infinite;
  position: absolute;
}
.step-card-holder:first-child::after  {
  animation: spin 4s linear infinite;
  transition: opacity 0.5s;
  transform: scale(0.8);
  opacity: 1;
  position: absolute;
}
.step-card                   { transition: 0.3s; position: relative; overflow: hidden; }
```

Two pseudo-elements rotate behind the first card at **different speeds (5s and 4s, both linear, both infinite)**. Because the periods differ, the two gradient layers drift in and out of phase and the glow never visibly loops — a 20s effective cycle from two cheap animations.

The `::after` layer is `scale(0.8)` — smaller and inset, so you get a brighter core inside a wider halo. `overflow: hidden` on `.step-card` clips both to the card's rounded rectangle, producing an animated gradient *border* rather than a blob.

Accent colour is `--color-accent-on-dark` `#10b981` (emerald).

### Reproducing it

Pure CSS, no Framer Motion needed:

```css
@keyframes spin { to { transform: rotate(360deg); } }

.card { position: relative; overflow: hidden; isolation: isolate; }
.card::before,
.card::after {
  content: ""; position: absolute; inset: -50%; z-index: -1;
  background: conic-gradient(from 0deg, transparent 0 70%, var(--accent) 100%);
  animation: spin 5s linear infinite;
}
.card::after { animation-duration: 4s; transform: scale(0.8); }
```

Add `@media (prefers-reduced-motion: reduce) { animation: none; }` — an infinite rotation is exactly the kind of thing that setting exists for. The reference site does not appear to honour it; we should.

## Note on the "active" state

The glow is bound to `:first-child`, not to a JS-managed active index. It is a static highlight of the first card, not a rotating spotlight. Simpler than it looks.

## Notes for mapping

Our `src/components/Process.jsx` (8.5K) and `ProcessStepVisual.jsx` (8.3K) already cover this ground. The transferable pieces are:
- the three-up grid holding to 768px before stacking
- `h-full` for equal card heights
- the dual-speed conic glow on the highlighted card

All three are additive — no content changes required.
