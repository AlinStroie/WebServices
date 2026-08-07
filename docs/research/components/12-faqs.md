# FAQs

`<section id="faqs" class="relative z-20 bg-white">` — top 21094px, height 2058px.

The only pure-white section on the page. After ~21,000px of dark and pale blue-grey, the switch to white is what signals "we are at the end".

## Layout

```
.grid.gap-4                        1 col (896px), gap 16px
  button/summary                   flex, row, justify-between, align center, gap 8px, py-6, cursor-pointer, w-full, text-left
    .flex.gap-5.items-start        question row, gap 20px
```

- Content width capped at **896px** — narrower than the 1366px container, because FAQ answers are pure prose and need a readable measure
- 16px between rows (`gap-4`) — tight, so the list reads as one block
- 24px vertical padding inside each trigger (`py-6`)
- 20px gap between the question's leading element (number or icon) and its text

Single column at every breakpoint.

## Animation

Two things happen here.

### Accordion disclosure

Same mechanism as the benefits cards (`08-benefits.md`):

```
transition: block-size 0.25s ease-out,
            content-visibility 0.2s allow-discrete
```

- Open/close: **250ms `ease-out`** on height
- `content-visibility`: 200ms, discrete
- Native `<details>` / `<summary>` with `cursor-pointer` on a full-width `text-left` trigger

The trigger being `w-full` and `text-left` is worth copying — the whole row is the click target, not just the text. Standard, but frequently got wrong.

### `scaleLine` keyframe

A component-scoped keyframe named `scaleLine` exists in this section's stylesheet. Given the layout, this is almost certainly the **divider rule between FAQ rows animating its width or scaleX** as the row opens or enters — a hairline that draws itself rather than appearing.

**Not fully characterised.** The keyframe is present but was not caught mid-flight during capture. If we want this specific detail it needs one more look; it is a minor flourish and safe to omit.

## Animation that is *not* present

The FAQ rows themselves do **not** have an entrance reveal — no fade, no translate on scroll. They are simply there. Consistent with the rest of the page, where the `translateY(100px)` reveal is reserved for project and testimonial cards only.

## Notes for mapping

We have no FAQ component today, but we do have the content pattern elsewhere — `LegalModal.jsx` (11.1K) and `ProcessModal.jsx` (15.7K) both handle expand/collapse content.

An FAQ section is one of the safer additions here because the content is ours to write and does not require client permission or invented metrics. Still worth confirming before building, since it is a new section rather than a restyle.

If we build it: 896px measure, 16px row gap, native `<details>`, 250ms ease-out. The technique is almost identical to the benefits accordion, so the two should share a component.
