# Case-study stats

`<section class="cs">` — top 5521px, height 1483px, padding 128px top and bottom, `bg-dark`. No `id`.

## Layout

```
.cs__inner    flex, column, align center
  .cs__stats  grid, 4 × 252px, gap 48px
    .cs__stat flex, column, align center, gap 6.4px
```

| Viewport | Columns | Gap |
|---|---|---|
| 1440 | 4 × 252px | 48px |
| 768 | 2 × 345px | ~30px |
| 375 | 1 | — |

The `6.4px` gap inside each stat is the interesting number — it is `0.4rem`, deliberately tight so the big number and its label read as a single unit rather than two stacked items. Everything else on the page uses the 8px scale; this is a considered exception.

Four columns → two → one is a cleaner ladder than 4 → 4 → 1 would be, and it means the stats never get narrower than ~250px.

## Animation

**None.** The stats are static — no count-up animation, no scroll-triggered reveal, no stagger.

This is worth calling out because a counting number animation is the reflexive choice for a stats row, and the reference site deliberately does not do it. The numbers are simply typeset large and left alone. Given that count-up animations are also an accessibility nuisance (screen readers announce intermediate values on some implementations), the restraint here is a feature, not an omission.

## Notes for mapping

We do not currently have a dedicated stats row. Content for it would have to be real A Squared Studio numbers — per the prompt's Phase 2 rule 5, **this needs your input before it gets built**, since inventing metrics is exactly the kind of fabricated content the global rules forbid.

If we do want one, the pattern is trivial: a 4→2→1 grid, tight 0.4rem number-to-label gap, no animation. The technique here is almost entirely typographic.
