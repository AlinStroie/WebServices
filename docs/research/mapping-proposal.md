# Phase 2 mapping proposal

Our section → reference section → what would actually be applied.
**Nothing here is implemented.** This document exists to be approved, amended or rejected before any component is touched.

Research it draws on: `docs/research/components/`.

---

## First: two architectural blockers

These came out of reading `src/pages/Home.jsx` and they change what is realistically on the table. Both need a decision from you before the hero work can proceed.

### Blocker 1 — `overflow-hidden` on the page root breaks `position: sticky`

`src/pages/Home.jsx:167`:

```jsx
<div className="relative min-h-screen overflow-hidden bg-black text-white">
```

An ancestor with `overflow: hidden` turns into the scroll container for its descendants, so **every `position: sticky` inside it silently stops working**. This affects both sticky techniques in the research: the hero overlap (`01-hero.md`) and the timeline sidebar (`10-process-timeline.md`).

Options:
1. **Remove `overflow-hidden` from the root** and re-clip whatever actually needs clipping (the blurred gradient blobs) on their own wrapper. Correct fix, small blast radius, but needs a visual check that nothing starts overflowing horizontally on mobile.
2. Drop the sticky effects entirely and keep the current flat scroll.

My recommendation is option 1, verified at 375px before anything else is built on top of it.

### Blocker 2 — our dark atmospheric background is incompatible with the hero wipe

Our page is a single continuous dark surface: a `fixed inset-0 z-0` layer with radial gradients and blurred blobs, plus a lazy-loaded `ThreeDotWaveBackground` (Three.js). Sections sit **transparent** on top of it. That is a deliberate and good design decision — it is what gives our site its depth.

The reference's hero wipe requires the covering section to be **fully opaque** (`bg-dark`, `z-20`), because the whole effect is one section hiding another. If we make our sections opaque, we destroy the fixed background and the wave. If we leave them transparent, the hero does not get covered — it shows through and the effect reads as a bug.

So the reference's light/dark slab alternation (`01-hero.md`, `02-problem-statement.md`, `08-benefits.md`) is **not portable to our design** without abandoning the atmospheric background.

Options:
1. **Skip the hero wipe.** Keep our background. We lose the single most striking transition on the reference site but keep our own strongest visual asset.
2. **Give one section an opaque background** to act as the wipe surface, accepting a visible seam where the fixed background stops.
3. Abandon the fixed background and adopt slab alternation. Not recommended — it is a rewrite of our visual identity, and TARGET.md explicitly says our identity stays.

My recommendation is option 1. This is the "impossible to reproduce faithfully with our stack, propose a simpler alternative" case the global rules asked me to call out explicitly, and the alternative is: apply the sticky *pin* to the hero without the wipe, so the hero holds while content scrolls up over it with our existing translucent treatment. Cheaper, compatible, and about 70% of the perceived effect.

---

## What we already have (worth knowing before changing anything)

We are not starting from nothing. `src/components/AnimatedSection.jsx` is already a Framer Motion reveal wrapper:

| | Ours (current) | Reference | 
|---|---|---|
| translateY | 22px | 100px |
| Duration | 550ms | ~1000ms |
| Easing | `[0.22, 1, 0.36, 1]` | `[0.33, 1, 0.68, 1]` (cubicOut) |
| Trigger | `margin: 0 0 -100px` → fires **late**, 100px into view | `+150px` → fires **early**, before visible |
| Granularity | whole `<section>` as one unit | individual cards |

Ours is smaller, faster and later. The reference is bigger, slower and earlier — which is most of why it feels more deliberate.

Also already present: `framer-motion@^12.38.0`, `embla-carousel-react` (so no new carousel dependency), and `Hero.jsx` already runs a staggered `animate-hero-in` CSS entrance.

Our section rhythm is `py-14 md:py-24` (56/96px). The reference is a consistent **160px**.

---

## Proposed mapping

### Tier A — recommend doing, low risk, no content decisions

| Ours | Reference | What gets applied |
|---|---|---|
| `Portfolio.jsx` | `09-works-projects.md` | `2fr 1fr` alternating rows; 160px between projects; per-project reveal at `y:100 / 1000ms / cubicOut / +150px` |
| `AnimatedSection.jsx` | `09-works-projects.md` | Retune the shared reveal to the reference values, and add an opt-in per-card variant |
| `Footer.jsx` + `CTA.jsx` | `13-footer.md` | 160px padding and 160px between blocks; centre the closing CTA |
| `Services.jsx` | `02-problem-statement.md` | `64ch` / `44ch` measure caps; gap ramp 16→32→40px across breakpoints |

`Portfolio.jsx` is the strongest mapping on the page — same content type, same job, and our `PortfolioBrowserFrame` stays exactly as-is (per rule 4, it is ours and it is better than the reference's bare images).

Note on retuning `AnimatedSection`: it is used by **7 components** (Contact, Pricing, BlogPreview, Benefits, Services, BlogCarousel, Process). Changing its defaults changes all of them at once. I would rather add the reference timing as a variant and migrate section by section than flip the shared default — safer to roll back.

### Tier B — recommend doing, higher effort, still no content decisions

| Ours | Reference | What gets applied |
|---|---|---|
| `Process.jsx` | `04-process-cards.md` | Dual-speed conic glow (5s + 4s linear infinite) on the highlighted step; `h-full` equal card heights |
| `Process.jsx` | `10-process-timeline.md` | Scroll-linked progress rail + markers; optional rolling number |

The timeline is the highest-effort item in the whole set and depends on Blocker 1 being resolved. I would ship the rail and markers first and treat the rolling number as a separate follow-up — they are independent.

### Tier C — needs a content decision from you before I build anything

| Ours | Reference | Blocking question |
|---|---|---|
| `Benefits.jsx` | `08-benefits.md` | Turning a static list into a 2-column disclosure grid means splitting our benefit copy into summary + detail. Do you want that rewrite? |
| `BlogCarousel.jsx` | `05-testimonial-slider.md` | Only the layout proportions transfer (96px gap, right-aligned quote). Worth it, or leave the carousel alone? |
| — | `03-awards.md` | We have no awards. **Will not fabricate credentials.** Skip, or do we have real ones? |
| — | `06-case-study-stats.md` | Needs real A Squared Studio metrics. Skip, or supply numbers? |
| — | `07-logo-marquee.md` | Needs client logos we have permission to display. Do we? |
| — | `11-testimonials.md` | Needs real client quotes. Do we have publishable ones? |
| — | `12-faqs.md` | Safest addition — content is ours to write, no permissions needed. Want it? |

### Tier D — leave unchanged

`Pricing.jsx` has no equivalent in the reference. Per rule 4, it stays as it is — no structure forced onto it.

---

## Cross-cutting items I would apply regardless

- **`prefers-reduced-motion` guards** on the marquee, the conic spin and the reveals. The reference site does not implement these; we should. Our `Home.jsx` already checks `prefers-reduced-motion` before loading the Three.js wave, so the pattern is established in the codebase.
- **No scroll-lock intro.** Documented in `00-overview.md` — the reference's preloader hangs permanently in a throttled tab. Not copying it.
- **Per-word rather than per-character split text** if we do the hero headline, with `aria-label` on the heading and `aria-hidden` on the pieces. Visually near-identical, much cheaper, and avoids screen readers spelling the headline out letter by letter.

---

## Suggested sequence

1. Resolve Blocker 1 and Blocker 2 (decisions, plus one small refactor if we go with removing `overflow-hidden`)
2. Tier A — `Portfolio` first, since it is the highest value and lowest risk
3. Tier B — process cards, then the timeline rail, then the rolling number
4. Tier C — only whatever survives your content decisions

Per the global rules, each section gets its own commit so any one of them can be rolled back independently, and I will run `npm run dev` and describe what I see after each before moving on.

---

## What I need from you

1. **Blocker 1** — remove `overflow-hidden` from the page root, or drop the sticky effects?
2. **Blocker 2** — skip the hero wipe and keep our background (my recommendation), or something else?
3. **Tier C** — which of those seven, if any?
4. Confirm Tier A as scoped, or amend it.
