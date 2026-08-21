# Logo marquee

`<section class="relative py-20 bg-dark grid gap-20">` — top 7004px, height 377px, padding 80px top and bottom. No `id`.

## Layout

```
.marquee            flex, row, gap 80px, overflow-hidden, container, mx-auto, position relative
  .marquee__content flex, row, gap 80px, justify space-around
  .marquee__content flex, row, gap 80px, justify space-around   ← duplicate
```

**Two identical `.marquee__content` tracks.** This is the standard seamless-loop construction: the second track is a copy of the first, and when the pair has translated by exactly one track width the animation restarts at a visually identical position, so the loop is invisible.

- Gap between logos: 80px
- Gap between the two tracks: 80px (same value, so spacing stays even across the seam)
- `overflow: hidden` on the parent clips the tracks

## Animation

```css
.marquee__content {
  animation: marquee 50s linear infinite;
  display: flex;
}
```

- **Duration:** 50s
- **Easing:** `linear` — mandatory. Any easing on an infinite marquee produces a visible pulse at each cycle boundary.
- **Iteration:** infinite
- No pause-on-hover was detected.

50s is slow. That is deliberate: a logo band should register as ambient drift, not as something demanding attention.

### Reproducing it

```css
@keyframes marquee { to { transform: translateX(-100%); } }

.marquee { display: flex; gap: 80px; overflow: hidden; }
.marquee__track {
  display: flex; gap: 80px; flex-shrink: 0;
  animation: marquee 50s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
```

Render the track twice. `flex-shrink: 0` matters — without it the tracks compress instead of overflowing and the loop breaks.

The `prefers-reduced-motion` guard is important for an infinite animation. The reference site does not implement it.

## Notes for mapping

We have no logo band today. Using one requires **client logos we have permission to display** — and per the global rules, absolutely none of the reference site's client logos.

If we have that permission, this is one of the cheapest high-credibility additions available: ~15 lines of CSS, no dependency, no JS. If we do not, skip it rather than filling it with placeholder marks.
