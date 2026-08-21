import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { testimonials } from "../../data/testimonials";
import useIsMobile from "../../hooks/useIsMobile";

// Measured off the reference captures: "WHAT" runs ~300px tall against a
// ~1877px-wide capture (~16vw), and it is not two lines centred in one
// spot — it's three words, one per line, spread across the section's
// FULL height with big gaps between them (the next word's glyph only
// starts appearing roughly a card-row further down). That spread is what
// makes any single word read as a fragment rather than a caption.
const WATERMARK_LINES = ["WHAT", "THEY", "SAY"];

// Roughly double a first pass at "~10% of a card's own height" — big
// enough that the drift reads as a deliberate, felt motion rather than a
// hint of one.
const DRIFT_PX = 54;

/**
 * Testimonials — rebuilt on the reference's own section (`section8_*`):
 * a light gradient surface, a giant stroked "WHAT / THEY SAY" watermark
 * bleeding off the left edge behind the heading, a soft pink -> lavender
 * -> blue bloom pooling behind the card grid, and four whitish glass
 * cards holding quote + avatar + name + role.
 *
 * The only animation is on the cards themselves, and it is purely
 * positional (no fade/scale) — a slow, continuous, scroll-linked drift,
 * not a one-shot trigger: cards sit in a perfectly square grid the
 * instant the grid is centred in the viewport, and drift apart
 * symmetrically as you scroll away from that point in either direction —
 * right-column cards ease up, left-column cards ease down. Scroll
 * progress is measured off the grid itself (not the whole section, whose
 * heading would otherwise throw off where "centred" lands).
 */
/** Card markup shared by the desktop drifting grid and the mobile carousel. */
function TestimonialCard({ item, y, className = "" }) {
  return (
    <motion.figure
      style={y !== undefined ? { y } : undefined}
      className={`testimonial-card relative grid gap-6 rounded-none p-8 md:aspect-[602/331] ${className}`}
    >
      <blockquote className="text-lg leading-relaxed text-[color:var(--color-ink)]">
        {item.quote}
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3">
        {item.avatar.src ? (
          <img
            src={item.avatar.src}
            alt={item.name}
            className="hero-avatar"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span
            className="hero-avatar"
            style={{
              backgroundImage: `linear-gradient(135deg, ${item.avatar.from}, ${item.avatar.to})`,
            }}
          >
            {item.avatar.initials}
          </span>
        )}

        <span className="grid">
          <span className="text-sm font-semibold text-[color:var(--color-ink)]">
            {item.name}
          </span>
          <span className="text-sm text-[color:var(--color-copy-muted)]">
            {[item.role, item.company].filter(Boolean).join(" · ")}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

function Testimonials() {
  const gridRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [-DRIFT_PX, DRIFT_PX]);
  const rightY = useTransform(scrollYProgress, [0, 1], [DRIFT_PX, -DRIFT_PX]);

  return (
    <section className="testimonials-surface relative z-30 w-full overflow-clip">
      {/* Spread across the FULL section height via justify-between (not
          centred in one spot) — three separate words, each big on its
          own, with big empty gaps between them. That spread is what
          makes the block's total footprint match the section's own
          height, and what keeps any one word from being read whole at a
          typical scroll position — you only ever see one fragment. */}
      <div
        aria-hidden="true"
        className="testimonials-watermark pointer-events-none absolute inset-y-0 left-0 z-0 flex -translate-x-[10%] flex-col justify-between py-16 select-none"
      >
        {WATERMARK_LINES.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="testimonials-bloom pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1366px] gap-16 px-6 py-32 sm:px-8 lg:py-40">
        <h2 className="display max-w-[16ch] text-[clamp(2rem,1.3rem+2.6vw,3.75rem)] leading-[1.1] text-[color:var(--color-ink)]">
          Ce spun clienții despre{" "}
          <span className="accent-serif font-normal">colaborarea</span> cu
          noi
        </h2>

        {/* Measured off section8_1_reference.PNG: the two cards there run
            308px-910px and 951px-1553px in a 1877px-wide capture — 602px
            wide each, roughly symmetric ~308/324px side margins, i.e. the
            grid sits CENTRED in the viewport even though the heading
            above it stays left-aligned. max-w-5xl (1024px) reproduces
            that centred, generously-margined placement inside our own
            1366px section container. */}
        {isMobile ? (
          // The desktop grid's independent per-card scroll-drift (left
          // column easing one way, right column the other) is what the
          // reference wants for a 2-column layout — but stacked
          // single-column on mobile, two adjacent cards drifting in
          // opposite directions just overlapped and jittered against each
          // other. Simplest fix: no drift at all on mobile, swap the
          // stacked grid for a swipeable one-card-at-a-time carousel
          // instead (a peek of the next card hints it's swipeable).
          <div
            ref={gridRef}
            className="testimonials-carousel flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item) => (
              // flex + h-full: without it every card sized to its own
              // quote's line-wrapped height, so whichever quote happened
              // to be shortest (the first one, here) rendered visibly
              // smaller than its neighbours instead of all four matching.
              <div
                key={item.quote}
                className="flex w-[85%] shrink-0 snap-center"
              >
                <TestimonialCard item={item} className="h-full w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={gridRef}
            className="relative mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2"
          >
            {testimonials.map((item, index) => {
              const isLeftColumn = index % 2 === 0;
              const y = reduceMotion ? 0 : isLeftColumn ? leftY : rightY;

              return <TestimonialCard key={item.quote} item={item} y={y} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
