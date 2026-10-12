import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CircleCheck, Star } from "lucide-react";

import SplitText from "./SplitText";
import MagneticCta from "./MagneticCta";
import useInViewVideo from "../../hooks/useInViewVideo";

// Reference checkmark row, translated. Same three promises as the reference
// ("Build Customer Trust / Drive Organic Traffic / Maximize Conversions").
const proofPoints = [
  "Construim încredere instant",
  "Atragem trafic organic constant",
  "Maximizăm fiecare conversie",
];

/**
 * Sticky hero with a scroll-linked fade, over a full-bleed looping
 * background video (`public/hero/hero-video.mp4`). The reference floats a
 * cut-out subject on the right; here the video itself is the subject, and
 * the copy sits in a frosted glass panel over its left third so it stays
 * legible against whatever the footage is doing underneath — the right
 * two-thirds show the video clean.
 *
 * The wrapper carries `mb-[-100svh]` and the section is `sticky top-0`, so
 * the next section is pulled up by one viewport and scrolls OVER the pinned
 * hero. The glass panel + copy fade/recede on scroll (opacity 1 -> 0, scale
 * 1 -> ~0.93); the video itself stays put as the static backdrop.
 */
function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useInViewVideo(0.15);

  // Scroll fade mapped to a fraction of the live viewport height (80%/90%,
  // matching the original 640px/720px thresholds measured off an ~800px
  // desktop viewport) rather than fixed pixels — a short mobile viewport
  // would otherwise finish the fade well before the pin's own scroll room
  // (100svh) runs out, or a tall one would never finish it at all.
  const [viewportH, setViewportH] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 800
  );
  useEffect(() => {
    const onResize = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, viewportH * 0.8], [1, 0]);
  const scale = useTransform(scrollY, [0, viewportH * 0.9], [1, 0.93]);

  const fade = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] },
        };

  return (
    <div className="mb-[-100svh] bg-[color:var(--color-ink)]">
      <section
        id="hero"
        // Shorter on mobile on purpose: at full 100svh, a narrow-tall
        // viewport forces object-cover to zoom the 16:9 video in hard to
        // cover the height, cropping down to a narrow, over-zoomed sliver
        // of the frame. A shallower box needs far less zoom to cover, so
        // more of the actual shot stays visible. 72svh was too aggressive
        // though — content taller than the box got clipped by this
        // section's own `overflow-clip` (the heading's first line was
        // disappearing under the fixed nav). 84svh leaves real headroom.
        className="relative sticky top-0 h-[min(680px,84svh)] overflow-clip sm:h-[min(880px,100svh)]"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero/hero-video.mp4"
          poster="/hero/hero-poster.webp"
          muted
          loop
          playsInline
          preload="auto"
          fetchPriority="high"
          aria-hidden="true"
        />

        <div className="hero-video-glass absolute inset-0" aria-hidden="true" />

        <motion.div
          // items-start + pt on mobile instead of relying on centering math
          // to happen to leave enough headroom under the fixed nav — the
          // eyebrow line was still getting clipped by this section's own
          // overflow-clip at the top edge even after the height fix. This
          // guarantees clearance regardless of exact content height.
          className="relative z-10 mx-auto flex h-full w-full max-w-[1366px] items-start px-6 pt-20 sm:items-center sm:px-8 sm:pt-0"
          style={reduceMotion ? undefined : { opacity, scale }}
        >
          <div className="w-full max-w-[560px]">
            <div className="grid gap-5 sm:gap-8">
              <motion.p className="eyebrow text-white/60" {...fade(0)}>
                Agenție de web design · Brașov
              </motion.p>

              <h1 className="display text-[clamp(2.5rem,6vw,4rem)] text-white">
                <SplitText
                  text={"Site-uri care\ntransformă vizitatori\n*în clienți fideli*"}
                />
              </h1>

              <motion.ul
                className="flex flex-col gap-2.5 text-sm"
                {...fade(0.5)}
              >
                {proofPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <CircleCheck
                      size={17}
                      className="shrink-0 text-[color:var(--color-accent)]"
                    />
                    <span className="text-white/85">{point}</span>
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-6"
              {...fade(0.65)}
            >
              <MagneticCta
                to="/discovery"
                className="w-fit px-6 py-3.5 text-sm font-medium text-white sm:px-8 sm:py-4 sm:text-base"
              >
                Consultanță gratuită
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </MagneticCta>

              <span className="hidden sm:block h-8 w-px bg-white/20 sm:h-10" aria-hidden="true" />

              <div className="grid gap-1.5">
                <div className="flex gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-white text-white sm:h-4 sm:w-4"
                    />
                  ))}
                </div>
                <p className="text-sm text-white">
                  Agenție de web design de încredere
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Scroll room for the pin — without it the sticky hero has no travel
          distance and simply scrolls away. */}
      <div aria-hidden="true" className="h-[100svh]" />
    </div>
  );
}

export default Hero;
