import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { whyUs } from "../../data/whyUs";

/**
 * "Why choose us" accordion grid — rebuilt on dixieraizpacheco.com's own
 * section (read from its live computed styles): a light rounded-24px slab
 * between two dark sections, 10 native-`<details>` cards in a 2-column
 * grid, native accordion behavior (no JS open/close state).
 *
 * Scroll-in reveal is the exact same mask mechanism as the case-study
 * video, not a resize of the section: the mask gets `scale(s)`, s: 0.35 ->
 * 1, which visibly shrinks/grows the mask's own on-screen box (rounded
 * corners included) — that's the thing that moves. Its child gets the
 * exact inverse `scale(1/s)`; nested transforms multiply, so the content's
 * net on-screen scale is always 1 — title, cards, text never resize, only
 * how much of that constant-size content the mask's window shows changes.
 * The outer shell stays the navy `--color-ink` (matching the marquee above
 * it) so there's no white flash before the mask starts revealing it.
 */
function WhyUs() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.35"],
  });

  const maskScale = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const counterScale = useTransform(maskScale, (s) => 1 / s);

  return (
    <div ref={sectionRef} className="relative w-full bg-[color:var(--color-ink)]">
      <motion.div
        className="grad-light w-full origin-center overflow-hidden rounded-[24px] will-change-transform"
        style={{ scale: reduceMotion ? 1 : maskScale }}
      >
        <motion.div
          className="origin-center will-change-transform"
          style={{ scale: reduceMotion ? 1 : counterScale }}
        >
          <section
            id="avantaje"
            className="w-full px-6 py-24 text-[color:var(--color-ink)] sm:px-8 md:py-32"
          >
            <div className="mx-auto w-full max-w-[1536px]">
              <div className="mx-auto grid max-w-[64rem] justify-items-center gap-5 text-center">
                <p className="text-sm uppercase tracking-wider text-[color:var(--color-copy-muted)]">
                  Avantajele unei agenții de web design din România
                </p>

                <h3 className="display text-[clamp(2.5rem,1.8932rem+2.589vw,4rem)]">
                  De ce aleg afacerile{" "}
                  <span className="accent-serif">românești</span> un{" "}
                  <span className="accent-serif">web design</span> personalizat
                </h3>

                <p className="max-w-[72ch] text-sm leading-relaxed text-[color:var(--color-ink)]/70">
                  Ca echipă specializată în web design, livrăm site-uri
                  interactive, premium, care aduc rezultate reale,
                  cuantificabile. Ieși în evidență față de concurență și
                  obține o valoare excepțională pentru fiecare leu investit
                  în <span className="accent-serif">afacerea ta</span>.
                </p>
              </div>

              <div className="mt-20 grid gap-8 md:grid-cols-2 md:gap-12">
                {whyUs.map((item) => (
                  <WhyUsCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </motion.div>
    </div>
  );
}

function WhyUsCard({ item }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <details
      className="replica-details h-fit rounded-xl border border-black/[0.06] bg-white p-[clamp(1.125rem,1.4vw+0.7rem,2rem)] shadow-[0_1px_2px_rgba(23,27,39,0.04)] transition-colors duration-300 hover:border-black/15"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <Icon size={20} className="shrink-0 text-[color:var(--color-ink)]/70" />
          <span className="text-[clamp(1rem,0.8409rem+0.6818vw,1.5rem)] font-normal leading-[1.5]">
            {item.title}
          </span>
        </span>

        <ChevronDown
          size={20}
          className={`shrink-0 text-[color:var(--color-ink)]/50 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </summary>

      <div className="py-4 text-sm leading-relaxed text-[color:var(--color-ink)]/55">
        {item.text}
      </div>
    </details>
  );
}

export default WhyUs;
