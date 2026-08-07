# Awards bar

`<section id="awards" class="relative w-full overflow-hidden pt-32 pb-8 bg-dark">` — top 1877px, height 1215px, padding 128px top / 32px bottom.

## Layout

Outer: `flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-stretch justify-center`

| Viewport | Direction | Gap |
|---|---|---|
| 1440 | row, `items-stretch` | 64px |
| 768 | **column**, `items-center` | 32px |
| 375 | column | 32px |

Collapses to a stack at `lg` (1024px) — earlier than most of the page, because the award badges need horizontal room.

Each award item: `flex flex-col gap-6 items-center justify-start`, with an inner `flex items-center justify-center` for the badge graphic and a `flex flex-col items-center justify-start mr-[-4px]` for the caption.

The `mr-[-4px]` is optical alignment — nudging text back to compensate for the badge's visual centre. Small detail, but it is the kind of thing that makes a trust row look deliberate rather than dropped in.

## Animation

**None on the section itself.** No entrance reveal, no hover state on the badges.

The award badges are static images with captions. The only motion anywhere near this region is the separate logo marquee, documented in `07-logo-marquee.md`.

## Notes for mapping

We do not currently have an awards section. Per the prompt's Phase 2 rule 5, this is a section where the reference has something we lack — **do not invent award badges or fabricate credentials.**

If we want a trust element in this slot, the honest options using material we already have are:
- the client logo marquee (technique in `07-logo-marquee.md`), if we have permission to show client logos
- the stat counters pattern (`06-case-study-stats.md`) populated with our real numbers
- nothing at all — the page reads fine without it

Flagging for a decision rather than proposing an implementation.
