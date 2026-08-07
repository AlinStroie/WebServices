# Testimonial slider (featured quote)

`<section class="testimonial-slider">` — top 4702px, height 819px, padding 96px top and bottom. No `id`.

A single large featured quote, distinct from the two-column testimonial card grid later on the page (`11-testimonials.md`).

## Layout

```
.testimonial-slider__content        flex, row, gap 96px, align center
  .testimonial-slider__quote-wrapper   flex, row, justify flex-end
    .testimonial-slider__quote-content flex, column, gap 40px, align flex-start
      .testimonial-slider__quote-section flex, column, gap 24px
```

A 96px gap between the portrait and the quote column is the defining measurement — generous, and what makes it read as an editorial pull-quote rather than a card.

The nested `justify-end` on the wrapper right-aligns the quote block against the portrait, so the two elements meet in the middle regardless of quote length.

## Animation

Two keyframes are scoped to this component:

- `fadeIn`
- `scaleIn`

Both are defined in the component's stylesheet. In the captured state the quote content sits at `opacity: 1`, `transform: none` — the animations are applied on entrance and cleaned up, matching the pattern used elsewhere on the page.

`scaleIn` alongside `fadeIn` implies the standard subtle scale-up entrance (typically `scale(0.95) → 1` paired with the fade) rather than a translate. That is a slightly different flavour to the `translateY(100px)` used on project cards — softer, better suited to something that is centred rather than arriving from below.

The section itself carries no scroll trigger; the quote does not animate on re-entry.

## Slider behaviour

Named "slider", but no Swiper/Embla/Splide is present and no carousel library was detected anywhere on the page. If it rotates between quotes it does so with bespoke state and a CSS transition. Only one quote was present in the captured DOM.

**Not fully characterised** — if we want the rotating behaviour specifically, it needs another look with multiple quotes loaded. Recording this as a known gap rather than guessing.

## Notes for mapping

We already use Embla (`embla-carousel-react` ^8.6.0, plus `embla-carousel-autoplay`) in `BlogCarousel.jsx`. If we want a rotating featured quote, Embla is the right tool and we should not add anything new.

The transferable detail here is really the **layout proportions** — 96px portrait-to-quote gap, right-aligned quote column, 40px/24px internal rhythm — plus using `fade + slight scale` for a centred element instead of the `translateY` used for cards.
