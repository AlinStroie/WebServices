import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Star } from "lucide-react";

import SplitText from "./SplitText";
import PortfolioBrowserFrame from "../PortfolioBrowserFrame";
import { portfolio } from "../../data/portfolio";

const proofPoints = ["Design curat", "Livrare rapidă", "Optimizat mobil"];

/**
 * Placeholder proof avatars.
 *
 * The reference floats a row of real client headshots here. We have no
 * cleared photos, so each avatar is a crafted gradient disc with initials.
 * TO SWAP IN REAL PEOPLE: add `src: "/team/ana.webp"` to an entry and it
 * renders as an <img>; the initials disc is the fallback.
 */
const avatars = [
  { initials: "AM", from: "#2c2cf3", to: "#7a5cff" },
  { initials: "IR", from: "#10b981", to: "#3bc8a6" },
  { initials: "DP", from: "#e896cd", to: "#b4aaff" },
  { initials: "SV", from: "#f59e0b", to: "#f7c56b" },
  { initials: "MC", from: "#2c2cf3", to: "#4c86ff" },
  { initials: "LT", from: "#6366f1", to: "#a78bfa" },
];

const featured = portfolio[0];

/**
 * Sticky hero.
 *
 * The wrapper carries `mb-[-100svh]` and the section is `sticky top-0`, so
 * the next section is pulled up by exactly one viewport height and scrolls
 * OVER the pinned hero. Pure CSS — no scroll listener.
 *
 * Composition mirrors the reference's layered depth: a soft corner colour
 * bloom (its "apple glass" wash), a real subject floated over it, a giant
 * outlined numeral behind, and a ghosted caption band. Our subject is our
 * OWN product mockup (real UI), not a placeholder box.
 */
function Hero() {
  const reduceMotion = useReducedMotion();
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

        <div className="relative z-10 mx-auto h-full w-full max-w-[1366px] px-6 sm:px-8">
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
                      <Check
                        size={16}
                        className="text-[color:var(--color-accent)]"
                      />
                      <span className="text-[color:var(--color-ink)]/80">
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

                {/* Social proof: avatar row + stars, mirroring the reference. */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
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

                  <div className="flex items-center gap-3">
                    <div className="flex" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-[color:var(--color-ink)] text-[color:var(--color-ink)]"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[color:var(--color-copy-muted)]">
                      Proiecte livrate pentru afaceri locale
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/*
              Right subject. The reference bleeds a cut-out portrait here; we
              have no such asset, so we float one of our OWN product mockups
              (real UI) over the bloom. Swap the mockup for a portrait `.webp`
              cut-out later — the bloom layer stays. (A giant outlined numeral
              only reads behind a transparent cut-out, not a solid mockup, so
              it is intentionally omitted until a real portrait exists.)
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
        </div>
      </section>

      {/* Scroll room for the pin — without it the sticky hero has no travel
          distance and simply scrolls away. */}
      <div aria-hidden="true" className="h-[100svh]" />
    </div>
  );
}

export default Hero;
