# Footer

`<footer class="footer bg-dark py-40 space-y-40 z-10">` — height 3,313px at 375px wide, 160px padding top and bottom.

## Layout

```
footer.bg-dark.py-40.space-y-40      160px padding, 160px between child blocks
  .grid.gap-8.items-center.place-items-center.mx-auto     gap 32px, centred
  .grid.mx-auto.w-fit.mt-20.justify-items-center.gap-4    gap 16px, 80px top margin
  .button-styles.relative.inline-flex.items-center.justify-center
```

The defining choice: `py-40` **and** `space-y-40` — 160px of padding *and* 160px between every child block. The footer uses the same vertical rhythm as a full page section rather than compressing at the end. At 3,313px tall it is larger than most sections on the page.

This is a deliberate "big closing CTA" footer, not a link dump. The structure is centred throughout (`place-items-center`, `justify-items-center`, `mx-auto`, `w-fit`), which is unusual — the rest of the page is left-aligned. Centring the footer makes it read as a full stop.

`z-10` keeps it below `#testimonials` (`z-30`) and `#faqs` (`z-20`).

## Animation

**None detected.** No entrance reveal, no scroll trigger. The CTA button carries the site's standard hover transition (200–300ms, `cubic-bezier(0.4, 0, 0.2, 1)`) but nothing beyond that.

## Notes for mapping

`src/components/Footer.jsx` (4.1K) and `CTA.jsx` (2.8K) already exist and cover this ground.

The transferable idea is proportional, not structural: **give the footer the same vertical rhythm as a section** (160px padding, 160px between blocks) and centre it, so the page ends on a deliberate closing statement rather than trailing off.

This is a low-risk, content-neutral change — pure spacing and alignment on components we already have. Good candidate to bundle with whatever else gets done, since it needs no decisions.
