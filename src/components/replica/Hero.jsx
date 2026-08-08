import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, CircleCheck, Star } from "lucide-react";

import SplitText from "./SplitText";
import PortfolioBrowserFrame from "../PortfolioBrowserFrame";
import { portfolio } from "../../data/portfolio";

// Reference checkmark row, translated. Same three promises as the reference
// ("Build Customer Trust / Drive Organic Traffic / Maximize Conversions").
const proofPoints = [
  "Construiește încredere",
  "Atrage trafic organic",
  "Maximizează conversiile",
];

/**
 * Placeholder proof avatars — the reference floats a row of 7 real client
 * headshots at 48px. We have no cleared photos, so each is a crafted
 * gradient disc with initials. Add `src: "/team/ana.webp"` to render a real
 * image instead. See docs/PLACEHOLDERS-TO-PREPARE.md #2.
 */
const avatars = [
  { initials: "AM", from: "#2c2cf3", to: "#7a5cff" },
  { initials: "IR", from: "#10b981", to: "#3bc8a6" },
  { initials: "DP", from: "#e896cd", to: "#b4aaff" },
  { initials: "SV", from: "#f59e0b", to: "#f7c56b" },
  { initials: "MC", from: "#2c2cf3", to: "#4c86ff" },
  { initials: "LT", from: "#6366f1", to: "#a78bfa" },
  { initials: "GA", from: "#0ea5e9", to: "#6ee7f0" },
];

const featured = portfolio[0];

/**
 * Sticky hero with a scroll-linked fade.
 *
 * The wrapper carries `mb-[-100svh]` and the section is `sticky top-0`, so
 * the next section is pulled up by one viewport and scrolls OVER the pinned
 * hero. On top of that, the reference hero does NOT sit statically behind a
 * cover — it fades and recedes as you scroll: its whole content drops from
 * opacity 1 -> 0 and scale 1 -> ~0.93 across the first ~700px of page scroll,
 * revealing the light ground behind it (the "whiteish fog"). We drive that
 * with useScroll on the page and map scrollY onto opacity + scale.
 *
 * Composition mirrors the reference: soft corner colour bloom, a floated
 * subject (our own product mockup — real UI), translated checkmark row, and
 * the avatars │ stars + trust-line block.
 */
function Hero() {
  const reduceMotion = useReducedMotion();

  // Scroll fade mapped to real page distance: opacity reaches 0 by 640px and
  // scale eases to 0.93 by 720px, so the hero gradually fogs out and recedes,
  // gone by the time the next (opaque) section scrolls over the pin.
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 640], [1, 0]);
  const scale = useTransform(scrollY, [0, 720], [1, 0.93]);

  const fade = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] },
        };

  return (
    <div className="grad-light mb-[-100svh]">
      <section
        id="hero"
        className="relative sticky top-0 overflow-clip"
        style={{ height: "min(880px, 100svh)" }}
      >
        {/* Atmospheric corner bloom — behind everything. */}
        <div className="hero-bloom" aria-hidden="true" />

        <motion.div
          className="relative z-10 mx-auto h-full w-full max-w-[1366px] px-6 sm:px-8"
          style={reduceMotion ? undefined : { opacity, scale }}
        >
          <div className="grid h-full items-center gap-12 md:grid-cols-6 lg:grid-cols-12">
            <div className="col-span-full grid gap-10 pt-12 md:col-span-6 lg:col-span-7 lg:gap-14 lg:pt-0">
              <div className="grid gap-8">
                <motion.p
                  className="eyebrow text-[color:var(--color-copy-muted)]"
                  {...fade(0)}
                >
                  Web design · Brașov
                </motion.p>

                <h1 className="display text-[clamp(2.5rem,7vw,4.5rem)] text-[color:var(--color-ink)]">
                  <SplitText
                    text={"Site-uri clare,\nrapide și\n*bine gândite*"}
                  />
                </h1>

                <motion.ul
                  className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
                  {...fade(0.5)}
                >
                  {proofPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <CircleCheck
                        size={17}
                        className="text-[color:var(--color-accent)]"
                      />
                      <span className="text-[color:var(--color-ink)]/85">
                        {point}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              </div>

              <motion.div className="grid gap-8" {...fade(0.65)}>
                <Link
                  to="/discovery"
                  className="group flex w-fit items-center gap-2 rounded-full bg-[color:var(--color-brand)] px-8 py-4 text-base font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  Consultanță gratuită
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                {/* Social proof, laid out like the reference: overlapping
                    avatars │ a thin divider │ stars stacked over the trust
                    line. */}
                <div className="flex items-center gap-4">
                  <div className="flex" aria-hidden="true">
                    {avatars.map((a) =>
                      a.src ? (
                        <img
                          key={a.initials}
                          src={a.src}
                          alt=""
                          className="hero-avatar"
                        />
                      ) : (
                        <span
                          key={a.initials}
                          className="hero-avatar"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                          }}
                        >
                          {a.initials}
                        </span>
                      )
                    )}
                  </div>

                  <span
                    className="h-10 w-px bg-[color:var(--color-ink)]/15"
                    aria-hidden="true"
                  />

                  <div className="grid gap-1.5">
                    <div className="flex gap-0.5" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-[color:var(--color-ink)] text-[color:var(--color-ink)]"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[color:var(--color-ink)]">
                      Servicii de web design de încredere
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/*
              Right subject. The reference bleeds a cut-out portrait here; we
              float one of our OWN product mockups (real UI) over the bloom.
              Swap for a portrait `.webp` cut-out later.
            */}
            <motion.div
              className="relative col-span-full hidden self-center md:col-span-6 lg:col-span-5 lg:block"
              {...fade(0.4)}
            >
              <div className="hero-product relative z-10 ml-auto max-w-[440px] overflow-hidden bg-white">
                <PortfolioBrowserFrame project={featured} size="card" />
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
