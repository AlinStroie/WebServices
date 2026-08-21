# Reference site — technical overview

Source: `https://dixieraizpacheco.com`
Captured: 2026-08-07, Playwright (Chromium), viewports 1440×900 / 768×1024 / 375×812.

Research only. Nothing in this folder is content to copy — it records **structure, motion technique and timing** so we can apply the same interaction feel to A Squared Studio's own content. Colours, fonts and copy recorded here are for context and are explicitly **not** to be ported (see TARGET.md).

## Stack detected

| Thing | Finding |
|---|---|
| Framework | SvelteKit (all component classes carry `svelte-<hash>` scoping) |
| CSS | Tailwind with custom design tokens (`--color-*`, `py-section-xl`, `text-heading-lg`) |
| Animation libraries | **None.** No GSAP, no ScrollTrigger, no Lenis, no Locomotive, no Swiper, no Barba |
| 3D / WebGL | **None.** No Three.js anywhere on the page |
| Scrolling | Native browser scroll. No smooth-scroll/virtual-scroll library |
| Scroll-driven CSS | Not used — zero `animation-timeline` rules |

This matters a lot for us: there is **no effect on this page that requires a heavy dependency**. Everything is CSS transitions, CSS keyframes, framework transitions, and one scroll-linked style update. All of it is reproducible with Framer Motion (already in our `package.json` at `^12.38.0`) plus plain CSS.

## Page metrics

- Document height: 25,324px at 1440×900 (26,175px at 375px wide)
- 12 `<section>` elements plus `<header>` (88px) and `<footer>` (3,313px)
- Container: `max-width: 1366px`, horizontal padding 32px desktop / 24px mobile
- Section vertical rhythm: **160px top and bottom** (`py-40` / `py-section-xl`) is the dominant value

## The four motion mechanisms

Everything on the page is one of these four. Phase 2 should reuse the same four rather than inventing new ones.

### 1. Scroll reveal (the workhorse)

The only content-entrance animation on the site.

- **From:** `opacity: 0`, `transform: translateY(100px)`
- **To:** `opacity: 1`, `transform: translateY(0)`
- **Duration:** ~1000ms
- **Easing:** cubic-out (measured curve fits `1-(1-t)³` almost exactly; matches Svelte's default `cubicOut`)
- **Trigger:** fires when the element's top edge is ~150px *below* the viewport bottom — i.e. it starts slightly *before* the element is visible, so it is already part-way through by the time you see it
- **Applied to:** `.project` cards (works section) and `.testimonial-card` only

Measured curve (translateY, from a fresh load):

| t (ms) | 0 | 68 | 190 | 320 | 450 | 570 | 690 | 810 |
|---|---|---|---|---|---|---|---|---|
| translateY | 100 | 81.5 | 54.7 | 32.0 | 18.3 | 8.2 | 3.2 | 0.6 |
| opacity | 0 | .185 | .452 | .680 | .816 | .918 | .968 | .993 |

Notably, **section headings, benefit cards, FAQ rows, stat counters and slider quotes do not animate in at all** — they are simply present. The site is far more restrained than it first appears; the perceived richness comes from the sticky/scroll-linked effects, not from blanket fade-ins.

Framer Motion equivalent:
```jsx
<motion.div
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px 150px 0px" }}
  transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}  // cubicOut
/>
```

### 2. CSS sticky (structural, zero JS)

Two pinned elements, both pure CSS:

- **Hero** — `position: sticky; top: 0` inside a wrapper with `margin-bottom: -100svh`. The negative margin pulls the following section up by one viewport height so it slides *over* the pinned hero. Pins for ~900px of scroll. No JS at all.
- **Timeline sidebar** — `sm:sticky; top: 80px`, pins for ~3,077px while the milestone list scrolls past. Reverts to `position: static` below the `sm` breakpoint.

### 3. Scroll-linked progress (the timeline)

One element whose style is updated directly from scroll position — the only genuinely scroll-linked (as opposed to scroll-triggered) effect. Fully documented in `10-process-timeline.md`. Linear, no easing, 1:1 with scroll distance.

### 4. CSS keyframes and transitions (ambient + state)

| Name | Target | Spec |
|---|---|---|
| `marquee` | logo band | 50s linear infinite |
| `spin` | active process card `::before` / `::after` | 5s and 4s linear infinite (counter-layered) |
| `revealMask` | page root on load | `clip-path: inset(50%)` → `inset(0%)`, 1000ms `cubic-bezier(0.77, 0, 0.175, 1)`, `forwards` |
| hover / state | nav, buttons, cards | 200–300ms, mostly `cubic-bezier(0.4, 0, 0.2, 1)` |
| accordion | benefits, FAQ | `block-size 0.25s ease-out`, `content-visibility 0.2s allow-discrete` |

## Breakpoints

Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280) plus two custom ones seen in class names: `mdd` and `min-[1800px]`.

Measured collapse behaviour:

| Section | 1440 | 768 | 375 |
|---|---|---|---|
| Hero grid | 12 col | 6 col | 8 col (content spans full) |
| Hero H1 | 72px | 60px | 36px |
| Hero portrait | shown, bleeds 10% off right | shown | **hidden** |
| Problem statement | 2 col (1fr 1fr) | 1 col | 1 col |
| Awards | flex row | flex column | flex column |
| Process cards | 3 col | 3 col | 1 col |
| Benefits | 2 col, gap 48 | 2 col, gap 48 | 1 col, gap 32 |
| Project row | `2fr 1fr` | 1 col | 1 col |
| Case-study stats | 4 col | 2 col | — |
| Testimonials | 2 col | 2 col | 1 col |
| Timeline sidebar | sticky | sticky | **static** |

## Page-load sequence (worth knowing, probably not worth copying)

The site gates first paint behind an intro: the root wrapper carries `.no-scroll` (locks `overflow`) while a `clip-path: inset(50%)` → `inset(0%)` mask opens over 1000ms, then the lock is released.

**Caveat found the hard way:** this intro is driven by `requestAnimationFrame`, so in a throttled/background browser tab it never completes and the page stays scroll-locked at one viewport tall. That is a real robustness cost for a marketing site. Recommend we do **not** reproduce the scroll lock; if we want the mask reveal, run it without blocking scroll and give it a timeout fallback.

## Reproduction difficulty

Ranked for Phase 2 planning.

**Trivial — plain CSS, no library**
- Sticky hero with negative-margin overlap
- Sticky timeline sidebar
- Logo marquee (50s linear, duplicated track)
- Rotating conic glow on the active process card
- All hover/accordion transitions

**Easy — Framer Motion `whileInView`**
- The `translateY(100px)` + fade reveal on project and testimonial cards

**Moderate — needs a small amount of custom work**
- **Timeline progress bar.** Straightforward maths (documented in `10-process-timeline.md`) but needs a scroll listener or `useScroll`; must be throttled and disabled on mobile where the sidebar is static.
- **Rolling number slider** on the timeline — 313px type translating between discrete stops on a 700ms ease. Reproducible; the fiddly part is `overflow: hidden` on a viewport-relative-sized element.

**Hardest here, still very doable — per-character split text**
- The hero H1 is split into 41 individual `.char` divs inside `.word` wrappers. Framer Motion has no built-in splitter, so we would write a small `splitText` helper (or map over characters in JSX) and stagger the children. Note the accessibility cost: splitting text per character breaks screen-reader pronunciation unless the original string is preserved in an `aria-label` and the pieces are `aria-hidden`.

**Nothing on this page is impossible with our stack.** There is no WebGL, no canvas, no video-scrubbing, and no physics — the categories that usually force compromises. The limitations noted in SETUP.md about GSAP/Three.js simplification do not bite here.

## One thing to flag before Phase 2

Our repo is **React + Vite**, not Next.js as the prompt assumed, and the reference is **SvelteKit**. Neither matters for porting CSS and motion values, but it does mean there is no framework-level transition primitive to copy — Svelte's `fly` becomes Framer Motion's `whileInView`, and the mapping is one-to-one.
