# Problem statement

`<section id="problem-statement" class="dark bg-dark border-none relative w-full overflow-clip z-20 flex-shrink-0">` — top 864px, height 1013px.

## Role in the page

This is the section that performs the hero wipe. Two properties make it work:

- `z-20` — sits above the sticky hero
- `bg-dark` (`#171b27`), fully opaque — so the hero is genuinely hidden, not blended

It is also the first hard light→dark switch on the page. The hero sits on `#c9d3d7` (pale blue-grey); this lands on near-black. That contrast jump is doing a lot of the work that an animation would otherwise have to do.

## Layout

Outer: `relative grid lg:grid-cols-[1fr,1fr] gap-4 sm:gap-8 md:gap-10`

| Viewport | Columns | Gap |
|---|---|---|
| 1440 | 2 × 631px | 40px |
| 768 | 1 col (689px) | 40px |
| 375 | 1 col (328px) | 16px |

Note the gap ramps across three breakpoints (16 → 32 → 40px) rather than staying fixed — worth copying as a rhythm habit.

Inner structure:
- Left: `flex flex-col justify-between min-[1800px]:ml-44` — pushes content apart vertically, gains an extra 176px left indent on ultra-wide displays
- Copy block: `grid lg:w-[min(100%,64ch)] gap-12 text-left place-items-start` — **measure capped at 64ch**, 48px gap
- Sub-copy: `grid text-neutral-300 text-sm md:text-body-s max-w-[90%] sm:max-w-[44ch] gap-8px`

The `64ch` / `44ch` measure caps are the notable detail. Line length is constrained by character count, not by pixel width, so it holds up across font sizes.

## Animation

**None.** No entrance animation, no scroll trigger, no transform. The section is static.

Its motion comes entirely from *being* the thing that slides over the pinned hero — the movement is the hero's stickiness, not this section's animation. This is a good example of the site's restraint: the most dramatic transition on the page has zero animation code in the moving element.

## Colours (reference only — we keep ours)

- Background `#171b27` (`--color-dark`)
- Body copy `--color-copy-on-dark` `#a3aabf`
- Sub-copy `text-neutral-300`

## Notes for mapping

Our nearest equivalents are `src/components/Services.jsx` (2.3K) or `src/components/Benefits.jsx` (1.8K) — whichever we position directly after the hero. The requirement for the wipe to work is only that this section is opaque and stacked above the hero; its own content and layout can stay exactly as they are.

If we adopt the sticky hero, **this section's background must become opaque** if it currently is not. That is the one hard dependency.
