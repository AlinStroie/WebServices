We're transforming our existing website (React/Next.js, asquaredstudio.ro)
by applying the UX architecture and motion technique from a reference
site, as defined in TARGET.md in this project. Read TARGET.md before
starting.

Use Playwright (not just visual inspection) to extract technical detail
with maximum precision. Execute in two STRICT, separate phases. Do not
move to Phase 2 without showing me the Phase 1 results and getting my
confirmation first.

## PHASE 1 — Deep Technical Research (no build, no changes to our code)

Use Playwright to script the extraction rather than relying on manual
browsing — this should be thorough and repeatable.

1. Launch Playwright and navigate to https://dixieraizpacheco.com.
2. Discover and enumerate every route/page on the site (check the nav,
   footer, and any internal links) — build a full sitemap before
   extracting anything, so nothing gets missed.
3. For every page found, and for every section within each page:
   - Extract full computed CSS for each major element (layout mode,
     grid-template, flex properties, spacing, typography scale,
     dimensions, breakpoints via viewport resize testing at 375px,
     768px, 1024px, 1440px, 1920px)
   - Extract the DOM structure (semantic hierarchy, component
     boundaries) as a structural outline, not raw HTML dump
   - Identify every animated element: use Playwright to trigger scroll,
     hover, click, and resize events, and read the resulting style/
     transform changes and their computed timing (duration, delay,
     easing function) from the CSSOM/Web Animations API where possible
   - Document scroll-driven behaviors precisely: trigger thresholds
     (% of element in viewport), parallax ratios, sticky positioning
     ranges, timeline/progress-bar logic
   - Document the navbar in full: states (top of page vs scrolled),
     mobile menu behavior, transition timing
   - Note which JS animation library is likely in use (inspect for
     GSAP/Framer Motion/Lenis/etc. signatures) so we can match the
     technique with an equivalent in our stack
4. Write one file per page/section under docs/research/, with all
   findings above. Do not download or save original images, videos, or
   copy text as final assets — describe them structurally only (e.g.
   "16:9 video background, muted autoplay, object-fit: cover").
5. Do NOT generate any component code in this phase. Do NOT touch any
   files under src/ or app/ in our project.
6. When done, give me a full inventory: all pages found, all sections
   per page, and flag anything you were not able to fully capture
   technically (e.g. WebGL/Three.js effects, canvas-based animations)
   so I know the limits before Phase 2.

## PHASE 2 — Adapted Application (after my confirmation)

Important: the goal is a highly faithful technical adaptation — matching
structure, layout precision, and motion behavior as closely as our stack
allows — using OUR content throughout. This is not a visual clone of the
reference site's design; it is our site, restructured with equivalent
technique.

1. Analyze our current project's structure (components under src/ or
   app/, existing pages, existing content).
2. Propose a full page-by-page and section-by-section mapping (our
   content → equivalent structural pattern from the research) before
   writing code. Wait for my confirmation.
3. After confirmation, implement it section by section:
   - keep 100% of our existing text, images, CTAs, and client names
   - keep our current fonts and color palette
   - match layout precision (grid structure, spacing rhythm,
     breakpoints) and motion technique (trigger, timing, easing) as
     closely as our stack supports
   - reuse or add whichever animation library best matches the
     technique (confirm with me before adding a new dependency)
   - for any page the reference site has that we don't (e.g. a
     dedicated case-study page template), ask me first whether we
     actually want that page before creating it — don't assume
4. After each section, run locally (npm run dev) and describe to me
   what you see so I can confirm the motion behavior before moving on.

## Implementation freedom

You have full freedom to modify whatever is needed on our side to reach
the closest possible technical/motion fidelity — this includes:
- restructuring or rewriting components, even significantly
- changing our server-side setup, rendering strategy (SSR/SSG/ISR),
  routing, or data-fetching approach if it's needed to support the
  animation/interaction technique properly
- switching our animation library entirely (e.g. moving to GSAP +
  ScrollTrigger, or adding Lenis for smooth scroll) if that's what it
  takes to match the motion quality and technique — don't stay
  constrained to what we currently have if it's limiting the result
- adding, removing, or replacing any dependency, build tooling, or
  config needed

Use this freedom to solve technical/architectural problems and to reach
motion quality and technique that matches the reference site's
sophistication — not to relax the content and identity rules below.
Full technical freedom does not extend to reproducing the reference
site's exact visual design, copy, or media; those rules stay fixed
regardless of what changes on the implementation side.

## Re-extraction: deep motion capture (if Phase 1 output was shallow)

If your first pass only captured static CSS transition values and
missed the actual choreography, redo the motion extraction using live
instrumentation instead of static inspection:

1. For each animated element, use Playwright to inject a small script
   before triggering the interaction that hooks into the Web Animations
   API (`element.getAnimations()`) and/or overrides
   `requestAnimationFrame` temporarily to sample the element's computed
   transform/opacity/filter at short intervals (e.g. every 16ms) while
   the animation plays.
2. From those samples, reconstruct the actual motion curve (is it
   linear, ease-out, spring-based with overshoot, staggered across
   multiple children with a delay offset between each?) rather than
   assuming a simple CSS easing keyword.
3. For scroll-driven effects, sample the same way while Playwright
   programmatically scrolls in small increments, so you capture the
   actual relationship between scroll position and element state (this
   is what reveals parallax ratios, pinning/sticky ranges, and
   scrubbing behavior — these are almost never visible in static CSS).
4. For staggered reveals (multiple elements animating in sequence),
   measure the actual delay between each element's animation start —
   this rhythm is often the single biggest factor in how polished a
   site feels, and it's easy to miss without live sampling.
5. Note explicitly which animation technique this maps to (e.g. "GSAP
   ScrollTrigger with scrub", "Framer Motion staggerChildren", "custom
   rAF loop") so Phase 2 can pick the right tool to reproduce the
   technique, not just approximate the visual result.
6. Update docs/research/components/ with these deeper findings before
   moving to Phase 2.

## Global rules (apply to both phases)
- Zero text, images, video, or other original assets from
  dixieraizpacheco.com in the final result.
- The final site must replicate the referenced site, just with small adjustments with our current site info
- If something can't be matched faithfully with our stack, tell me
  explicitly and propose the closest reasonable alternative — don't
  silently approximate or skip it.
- Small, per-section commits with descriptive messages.