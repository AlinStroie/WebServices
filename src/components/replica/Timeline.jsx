import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MagneticCta from "./MagneticCta";
import {
  motion,
  motionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { processSteps } from "../../data/process";
import useIsMobile from "../../hooks/useIsMobile";

const CTA_TITLE_WORDS = [
  { text: "Pregătit" },
  { text: "pentru" },
  { text: "un" },
  { text: "site" },
  { text: "care" },
  { text: "chiar", accent: true },
  { text: "aduce", accent: true },
  { text: "clienți?" },
];

// The title is rendered twice, in two exactly-overlapping layers: a muted
// base that is always there, and a lit layer on top whose characters are
// revealed one by one. Every character needs a stable position in the
// overall sequence to stagger against, so the words are flattened once
// here rather than counted during render.
const CTA_TITLE_CHARS = (() => {
  let cursor = 0;
  return CTA_TITLE_WORDS.map((word) => ({
    accent: word.accent,
    chars: Array.from(word.text, (char) => ({ char, order: cursor++ })),
  }));
})();

const CTA_TILT_DEG = 12;
const CTA_CHAR_STAGGER = 0.035;
const CTA_MUTED = "rgb(116, 128, 160)";

// A vertical gradient repeated per character is indistinguishable from one
// gradient spanning the whole line — every character box shares the same
// line height — and unlike a single `background-clip: text` on the heading
// it survives per-character reveal, since a parent-level clipped
// background ignores the opacity of the child spans painting over it.
const CTA_TITLE_GRADIENT =
  "linear-gradient(180deg, #ffffff 0%, #f4f7ff 45%, #bccaef 100%)";

// `background-clip: text` only paints within the character's own box, but
// that box is sized off font *metrics* (line-height x font-size), not off
// the glyph's actual drawn ink — and the italic accent-serif run (Times
// New Roman italic at 1.2x scale) overshoots those metrics on ascenders,
// descenders and connecting swashes. Where ink pokes outside the box, the
// gradient simply isn't there to clip to, leaving an unpainted (visually
// "missing gradient") spot on exactly the cursive letters that swash the
// most. Padding the box out on all sides gives the paint region enough
// margin to comfortably contain that overshoot; an equal, opposite margin
// cancels the padding back out for LAYOUT purposes (inline-block spacing
// is resolved off the margin box), so neighbouring characters don't drift
// apart even though each one's own paint region now runs wider than its
// glyph. The extra region beyond the ink is simply glyph-less, so
// overlapping it with a neighbour's is invisible.
const CTA_LIT_CHAR_STYLE = {
  display: "inline-block",
  backgroundImage: CTA_TITLE_GRADIENT,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  backgroundRepeat: "no-repeat",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  paddingBlock: "0.35em",
  paddingInline: "0.2em",
  marginBlock: "-0.35em",
  marginInline: "-0.2em",
};

// `drop-shadow` rather than `text-shadow`: it applies to the element's
// painted result, so it sits behind the gradient-filled glyph instead of
// hazing over the top of it the way a text shadow does once the glyph's
// own fill is transparent.
const CTA_CHAR_DARK = {
  opacity: 0,
  filter: "blur(6px) drop-shadow(0 0 0px rgba(190, 212, 255, 0))",
};

const CTA_CHAR_LIT = {
  opacity: [0, 1, 1],
  filter: [
    "blur(6px) drop-shadow(0 0 0px rgba(190, 212, 255, 0))",
    "blur(0px) drop-shadow(0 0 26px rgba(190, 212, 255, 0.7))",
    "blur(0px) drop-shadow(0 0 12px rgba(190, 212, 255, 0.3))",
  ],
};

const ACTIVE_COLOR = "rgba(23, 27, 39, 1)";
const MUTED_COLOR = "rgba(23, 27, 39, 0.35)";

/**
 * The single constant this whole section is built around: the growing tip
 * ("head") of the accent rail is pinned to a fixed line in the VIEWPORT,
 * two thirds of the way down — i.e. one third up from the bottom edge.
 *
 * This is measured off the reference site rather than guessed. In two of
 * its captures at completely different scroll positions the head sits at
 * the same absolute screen Y (~543px in both): once with the previous dot
 * at 43% of the viewport and 219px of drawn line, once with that dot at
 * 15% and 429px of line. A fixed head line is the only rule that produces
 * both, and it is what makes the rail feel anchored instead of running
 * away off the top of the screen.
 *
 * Everything else follows from it: a segment starts drawing the instant
 * its own upper dot crosses the head line, grows exactly as fast as the
 * page scrolls (the head never moves, the tail rides up with the dot),
 * and is complete the instant the NEXT dot reaches the head line — which
 * is the moment that step "arrives".
 */
const RAIL_HEAD = 2 / 3;

// A step fades up from nothing as its dot travels from the bottom edge of
// the viewport to 88% down — so the next step is already visible, muted,
// by the time the rail is roughly halfway between the two dots.
const APPEAR_AT = 1;
const APPEAR_DONE = 0.88;

// Ink handoff, expressed as fractions of the relevant gap rather than in
// vh, so it stays proportional whatever the measured spacing turns out to
// be: a step goes muted -> full ink over the last 15% of the rail's
// approach (landing on full ink exactly as the rail meets its dot), and
// dims back out over the last 15% of the rail's run to the NEXT dot.
const INK_LEAD = 0.15;
const DIM_AFTER = 0.85;

// The dot's centre relative to its row's top: `top-3` (12px) plus half of
// its own 12px height.
const DOT_OFFSET = 18;

// Chosen so the measured dot-to-dot distance lands a little over RAIL_HEAD
// (~72vh of gap against a 66.7vh head line, matching the reference's own
// ~75vh gap): the previous dot is then only just above the top edge when
// the rail completes, instead of long gone.
const ROW_GAP_VH = 48;

const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value);

/**
 * Scroll-linked process timeline — rebuilt on dixieraizpacheco.com's own
 * process section (`.milestone-*`, read from its live computed styles),
 * with a richer per-step viewport-relative choreography layered on top.
 *
 *   - the rail fill is exactly linear and 1:1 with scroll distance — no
 *     easing, no spring, no lerp; transform-origin `top`.
 *   - the giant step number is "0" (static, with an explicit crossed
 *     stroke through it — Inter's `slashed-zero` OpenType feature is kept
 *     as a progressive enhancement, but the visible cross is a real CSS
 *     bar so it always shows regardless of the loaded font subset) plus a
 *     rolling ones-digit column that rolls on a discrete 700ms
 *     ease-in-out, not tracking scroll continuously.
 *   - each step becomes "active" (its number rolls in, its dot turns
 *     accent-colored, its copy goes to full ink while the outgoing step
 *     dims) at exactly the moment the rail's head reaches its dot — i.e.
 *     when the dot itself crosses the RAIL_HEAD line — not at a
 *     container-wide midpoint and not on a separate threshold that could
 *     drift out of sync with the line.
 *
 * All of the scroll maths lives here in the parent, off ONE window scroll
 * position and ONE set of measured document coordinates, rather than a
 * per-step `useScroll` progress. That is deliberate: the rail's rule is
 * "the head sits at a fixed viewport line", which relates each step to
 * the one before it and to a screen position — neither of which a
 * progress value normalised over a single element's own travel can
 * express without running out of range (a step's own 0..1 progress is
 * already clamped long before the rail between the two dots is done).
 * With absolute positions there is nothing to clamp and the animation is
 * exactly reversible in both directions.
 *
 * The sidebar is `md:sticky` and goes static below the md breakpoint —
 * a pinned sidebar on a 375px viewport eats the whole screen.
 */
function Timeline() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const numberRef = useRef(null);
  const rowRefs = useRef([]);
  const metricsRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [gaps, setGaps] = useState([]);
  const [track, setTrack] = useState(null);
  const [leadIn, setLeadIn] = useState(null);
  const reduceMotion = useReducedMotion();

  // One set of motion values per step, owned by the parent and written
  // imperatively from the scroll handler. Motion values (rather than
  // state) keep the whole section off React's render path while scrolling.
  const rails = useMemo(
    () =>
      processSteps.map(() => ({
        fill: motionValue(0),
        opacity: motionValue(0),
        tone: motionValue(0),
      })),
    []
  );

  const registerRowRef = useCallback((index, el) => {
    rowRefs.current[index] = el;
  }, []);

  /**
   * Recompute every step's rail fill, opacity and ink tone for the
   * current scroll position. `dots` are absolute document Y coordinates
   * of each dot's centre, so `dotY - scrollY` is that dot's live viewport
   * Y and the head line is a plain number of pixels to compare against.
   */
  const update = useCallback(() => {
    const metrics = metricsRef.current;
    if (!metrics || metrics.dots.length === 0) return;

    // Cached at last measure(), not read live: iOS Safari's dynamic
    // toolbar changes window.innerHeight mid-gesture as it shows/hides
    // during scroll, which would otherwise jostle the head line (and
    // every dot position derived from it) on every scroll tick.
    const viewport = metrics.viewport ?? window.innerHeight;
    const head = viewport * RAIL_HEAD;
    const scrolled = window.scrollY;
    let nextActive = 0;

    metrics.dots.forEach((dotY, index) => {
      const dot = dotY - scrolled;
      const inGap = index > 0 ? dotY - metrics.dots[index - 1] : 0;
      const outGap =
        index < metrics.dots.length - 1
          ? metrics.dots[index + 1] - dotY
          : 0;
      const rail = rails[index];

      // Rail segment running from the previous dot down into this one.
      // Its drawn length is simply "how far the previous dot has travelled
      // past the head line", which is what pins the head in place.
      if (inGap > 0) {
        rail.fill.set(clamp01((head - (dot - inGap)) / inGap));
      }

      // Step 01 alone measures its entrance from the top of the sidebar
      // numeral it is centred against (see `firstLead`), so numeral and
      // copy come up over the bottom edge together.
      const entrance =
        index === 0 ? viewport * APPEAR_AT + (metrics.firstLead ?? 0) : viewport * APPEAR_AT;
      const appear = clamp01(
        (entrance - dot) / (viewport * (APPEAR_AT - APPEAR_DONE))
      );
      rail.opacity.set(appear);

      // First step has no rail approaching it, so it inks in as it enters
      // instead — matching the reference, where step 01 is already solid
      // black well before the rail beneath it starts drawing.
      let tone =
        inGap > 0
          ? clamp01((head + inGap * INK_LEAD - dot) / (inGap * INK_LEAD))
          : appear;

      // ...and dims back to muted right as the rail leaving it reaches the
      // next dot, so the handoff between the two steps is simultaneous.
      if (outGap > 0) {
        const dim = clamp01(
          ((head - dot) / outGap - DIM_AFTER) / (1 - DIM_AFTER)
        );
        tone = Math.min(tone, 1 - dim);
      }
      rail.tone.set(tone);

      const arrived = index === 0 ? dot <= viewport * APPEAR_DONE : dot <= head;
      if (arrived) nextActive = index;
    });

    if (nextActive !== activeRef.current) {
      activeRef.current = nextActive;
      setActive(nextActive);
    }
  }, [rails]);

  /**
   * A row's rendered height (title + paragraph) varies with its copy
   * length, so the real distance between two dots is rowGap PLUS that
   * variable content height — a fixed vh guess for the rail segments
   * undershoots or overshoots depending on how long each step's text is.
   * Measuring each row's actual top gives every segment its exact real
   * pixel span, so the fill always lands precisely on the next dot, and
   * gives `update` the absolute dot coordinates it works in.
   *
   * The lead-in above the first dot is measured too. Per the reference,
   * step 01's dot lines up with the middle of the giant "01" in the
   * sidebar, not with the section heading above it — and the distance
   * between the two depends on the heading's wrapped height and on the
   * clamped `min(20rem, 20vw)` numeral size, so no hardcoded vh value
   * holds across viewports.
   */
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const listRect = list.getBoundingClientRect();
    const scrolled = window.scrollY;
    const tops = rowRefs.current.map((el) =>
      el ? el.getBoundingClientRect().top : 0
    );

    setGaps(tops.map((top, i) => (i === 0 ? 0 : top - tops[i - 1])));
    metricsRef.current = {
      dots: tops.map((top) => top + scrolled + DOT_OFFSET),
      viewport: window.innerHeight,
    };

    if (tops.length > 1) {
      const firstDot = tops[0] - listRect.top + DOT_OFFSET;
      const lastDot = tops[tops.length - 1] - listRect.top + DOT_OFFSET;
      setTrack({ top: firstDot, height: lastDot - firstDot });
    }

    const numeral = numberRef.current;
    const firstRow = rowRefs.current[0];
    const sideBySide = window.matchMedia("(min-width: 768px)").matches;
    if (numeral && firstRow && sideBySide) {
      const numeralRect = numeral.getBoundingClientRect();
      const numeralMiddle = numeralRect.top + numeralRect.height / 2;

      // Centre the whole first step — title AND paragraph — on the middle
      // of the giant numeral, rather than hanging its dot off that middle
      // and letting the copy run down past the numeral's baseline.
      setLeadIn(
        Math.max(
          0,
          numeralMiddle - listRect.top - firstRow.offsetHeight / 2
        )
      );

      // Distance from the first dot up to the numeral's top edge. Step 01
      // fades in on the numeral clearing the bottom of the viewport rather
      // than on its own dot, so the two arrive together instead of leaving
      // the numeral sitting next to an empty column.
      metricsRef.current.firstLead =
        metricsRef.current.dots[0] - (numeralRect.top + scrolled);
    } else {
      setLeadIn(0);
      metricsRef.current.firstLead = 0;
    }

    update();
  }, [update]);

  // Applying the measured lead-in changes the section's height, which the
  // ResizeObserver picks up and re-measures from — one extra pass, then it
  // settles (the second pass computes the same lead-in, and React bails on
  // an unchanged state value). That second pass's getBoundingClientRect
  // reads land in the same tick as the height change that triggered it,
  // forcing a synchronous reflow (flagged by Lighthouse) — deferring the
  // re-measure to the next animation frame lets the browser settle the
  // layout from the state update first, so the read doesn't have to force
  // it. Same two-pass result, just not synchronous with its own write.
  useEffect(() => {
    measure();

    let raf = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", update);

  return (
    <section
      ref={sectionRef}
      id="proces"
      className="relative w-full bg-gradient-to-b from-[color:var(--color-surface-2)] from-0% via-[color:var(--color-surface-2)] via-90% to-[color:var(--color-surface)] px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="grid gap-4 md:grid-cols-12 md:gap-8">
          {/* Sticky sidebar: title, then 0 + rolling step number */}
          {/* col-span-6, not 5: column 6 was dead space (the list starts
              at column 7) and the numeral needs every pixel of width it
              can get, since its height is bounded by how wide it may run. */}
          <div className="h-fit md:col-span-6 md:sticky md:top-32">
            <h2 className="whitespace-nowrap text-[clamp(1.25rem,0.7rem+1.6vw,2rem)] font-semibold leading-tight tracking-[-0.025em] text-[color:var(--color-ink)]">
              Un proces <span className="accent-serif">clar</span>, de la
              idee la lansare
            </h2>

            <div
              ref={numberRef}
              className="relative mt-6 flex items-baseline text-[color:var(--color-ink)]"
              style={{ fontSize: "min(25rem, 26vw)", lineHeight: 0.8 }}
              aria-hidden="true"
            >
              <span className="relative inline-block shrink-0">0</span>

              <span
                className="relative block shrink-0 overflow-hidden"
                style={{ height: "0.8em", width: "1em" }}
              >
                <motion.span
                  className="absolute left-0 top-0 flex flex-col"
                  animate={{ y: `${-active * 0.8}em` }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
                  }
                >
                  {processSteps.map((step) => (
                    <span
                      key={step.number}
                      className="block"
                      style={{ lineHeight: "0.8em" }}
                    >
                      {step.number.replace(/^0/, "")}.
                    </span>
                  ))}
                </motion.span>
              </span>
            </div>
          </div>

          {/* Milestone list with the progress rail */}
          <div
            ref={listRef}
            className="relative pl-10 md:col-span-6 md:col-start-7"
          >
            {/* rail track — anchored to the first and last dot's real
                measured centres (see the measurement effect above), not a
                vh guess, so it always spans exactly dot-to-dot. */}
            <div
              className="absolute left-0 w-0.5 bg-[color:var(--color-ink)]/15"
              style={
                track
                  ? { top: track.top, height: track.height }
                  : { top: 0, height: 0 }
              }
            />

            {/* lead-in spacer as padding, not a grid item — a grid-item
                spacer would stack with rowGap and double the gap before
                step 1, since padding doesn't interact with rowGap. It is
                the measured distance down to the middle of the sidebar's
                giant numeral; before the first measurement lands, nothing
                is painted yet (all three motion values start at 0), so the
                provisional 0 never flashes. */}
            <div
              className="grid"
              style={{ rowGap: `${ROW_GAP_VH}vh`, paddingTop: leadIn ?? 0 }}
            >
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.number}
                  index={index}
                  registerRowRef={registerRowRef}
                  leadGap={gaps[index]}
                  rail={rails[index]}
                  step={step}
                  active={index <= active}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProcessCTA />
    </section>
  );
}

/**
 * Closing CTA card — sized off the reference capture (`section_7_bottom`):
 * near full-bleed rather than centred inside the site's 1366px measure
 * (its side margins there are ~25px against a ~1590px viewport, i.e. just
 * the section's own gutter), around 725px tall, 28px corners, ~62px title.
 *
 * Two scroll behaviours, in sequence:
 *
 *   1. The card tilts up as it scrolls in — hinged on its bottom edge, so
 *      it reads as standing up to face the viewer rather than pivoting
 *      about its middle — driven 1:1 by scroll position.
 *   2. Once that tilt has finished, the title lights up character by
 *      character: a muted grey-blue base layer, with a gradient-filled,
 *      glowing white layer revealed over the top of it one glyph at a
 *      time, each blooming out of a blur as it lands.
 *
 * The scroll target is the outer, untransformed wrapper. Measuring the
 * card itself would feed its own rotation back into the progress driving
 * that rotation.
 */
function ProcessCTA() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const wrapRef = useRef(null);
  const litRef = useRef(false);
  const [lit, setLit] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "start 0.4"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [CTA_TILT_DEG, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1], {
    clamp: true,
  });

  const settle = useCallback((value) => {
    if (value >= 0.999 && !litRef.current) {
      litRef.current = true;
      setLit(true);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", settle);

  // Deep links and reloads can land past the card, where no scroll event
  // will ever fire to light the title.
  useEffect(() => {
    settle(scrollYProgress.get());
  }, [settle, scrollYProgress]);

  const stagger = reduceMotion ? 0 : CTA_CHAR_STAGGER;
  const showLit = reduceMotion || lit;

  const renderTitle = (isLitLayer) =>
    CTA_TITLE_CHARS.map((word, wordIndex) => (
      <Fragment key={wordIndex}>
        <span
          className={`inline-block whitespace-nowrap ${
            word.accent ? "accent-serif font-normal" : ""
          }`}
        >
          {word.chars.map(({ char, order }) =>
            isLitLayer ? (
              <motion.span
                key={order}
                style={CTA_LIT_CHAR_STYLE}
                initial={CTA_CHAR_DARK}
                animate={showLit ? CTA_CHAR_LIT : CTA_CHAR_DARK}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  times: [0, 0.55, 1],
                  ease: [0.22, 1, 0.36, 1],
                  delay: order * stagger,
                }}
              >
                {char}
              </motion.span>
            ) : (
              <span key={order} className="inline-block">
                {char}
              </span>
            )
          )}
        </span>
        {wordIndex < CTA_TITLE_CHARS.length - 1 ? " " : null}
      </Fragment>
    ));

  return (
    <div
      ref={wrapRef}
      className="relative mt-24 w-full lg:mt-32"
      style={isMobile ? undefined : { perspective: 1400 }}
    >
      <motion.div
        className="flex min-h-[clamp(420px,78vh,760px)] w-full flex-col items-center justify-center rounded-[28px] bg-[color:var(--color-ink)] px-6 py-20 text-center sm:px-12"
        style={
          reduceMotion
            ? undefined
            : // 3D perspective tilt is the priciest part of this card to paint
              // repeatedly on scroll; mobile keeps the fade/scale entrance and
              // drops just the rotateX, which reads the same at arm's length
              // on a small screen anyway.
              {
                rotateX: isMobile ? 0 : rotateX,
                scale,
                opacity,
                transformOrigin: "50% 100%",
              }
        }
      >
        <h2 className="relative max-w-[24ch] text-[clamp(2rem,1.1rem+3.1vw,3.9rem)] font-bold leading-[1.12] tracking-[-0.02em]">
          <span className="block" style={{ color: CTA_MUTED }}>
            {renderTitle(false)}
          </span>

          {/* Same markup at the same measure, so it wraps identically and
              every lit glyph lands exactly on its muted twin. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 block"
          >
            {renderTitle(true)}
          </span>
        </h2>

        <p className="mt-10 max-w-[64ch] text-base leading-relaxed text-[color:var(--color-copy-on-dark)]">
          Afacerea ta este excepțională. Site-ul tău ar trebui să transmită
          exact asta. Hai să construim, împreună, o prezență online la
          superlativ — gândită de echipa noastră să transforme fiecare
          vizitator într-un client.
        </p>

        <MagneticCta
          to="/discovery"
          className="mt-20 px-6 py-3.5 text-sm font-medium text-white sm:px-9 sm:py-4 sm:text-[17px]"
        >
          Consultanță gratuită
        </MagneticCta>
      </motion.div>
    </div>
  );
}

/**
 * A step is now purely a consumer: the parent hands it three motion
 * values (rail fill, opacity, ink tone) already computed from measured
 * geometry, and the only mapping left here is tone 0..1 -> muted..ink,
 * whose range is a pair of constants and so is safe to build once.
 */
function ProcessStep({
  step,
  index,
  registerRowRef,
  leadGap,
  rail,
  active,
  reduceMotion,
}) {
  const setRowRef = useCallback(
    (el) => registerRowRef(index, el),
    [registerRowRef, index]
  );

  const color = useTransform(rail.tone, [0, 1], [MUTED_COLOR, ACTIVE_COLOR]);

  const style = reduceMotion
    ? { color: ACTIVE_COLOR }
    : { opacity: rail.opacity, color };

  // leadGap is the real measured pixel distance from the previous row's
  // top to this row's top (rowGap + the previous row's actual rendered
  // content height, which varies with copy length) — a vh guess ignored
  // that content height and left the segment short, so the fill visually
  // stopped mid-text instead of reaching down into this row's own dot.
  // The segment runs centre-to-centre: from the previous dot's centre
  // (DOT_OFFSET - leadGap, in this row's own coordinates) down to this
  // row's dot centre (DOT_OFFSET).
  const segmentTop = leadGap ? DOT_OFFSET - leadGap : 0;
  const segmentHeight = leadGap ?? 0;

  return (
    <div ref={setRowRef} className="relative">
      {/* rail segment from the previous dot down to this one — lives
          outside the text's opacity/color wrapper below, so the fade
          in/out never dims the line itself, only the copy. No horizontal
          nudge here: at `-left-10` its 2px width already sits exactly on
          the backdrop track; only the 12px dot needs re-centring. */}
      {index > 0 && (
        <motion.div
          className="absolute -left-10 w-0.5 origin-top bg-[color:var(--color-accent)]"
          style={{
            top: segmentTop,
            height: segmentHeight,
            scaleY: reduceMotion ? 1 : rail.fill,
          }}
        />
      )}

      {/* marker, centred on the rail */}
      <span
        className="absolute -left-10 top-3 h-3 w-3 rounded-full transition-colors duration-300"
        style={{
          transform: "translate(-5px, 0)",
          backgroundColor: active ? "var(--color-accent)" : "rgb(209 213 219)",
        }}
      />

      <motion.div style={style}>
        <h3 className="max-w-[16ch] text-[clamp(1.75rem,1.2rem+2.5vw,3.5rem)] font-bold leading-[1.05]">
          {step.title}
        </h3>

        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed sm:text-base">
          {step.details.intro}
        </p>
      </motion.div>
    </div>
  );
}

export default Timeline;
