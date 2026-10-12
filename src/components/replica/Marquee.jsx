import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clients } from "../../data/clients";

// Repetăm lista pentru a asigura continuitate impecabilă pe orice rezoluție (chiar și ecrane ultra-wide / 4K).
const marqueeItems = [...clients, ...clients, ...clients, ...clients];

/**
 * Bandă de tip inel infinit (infinite loop conveyor).
 * Rulează fluid și continuu prin toate tipurile de website-uri și servicii.
 * Optimizat cu useInView pentru a opri animația când nu este vizibilă pe ecran.
 */
function Marquee() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "300px 0px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[color:var(--color-ink)] py-12 sm:py-16"
    >
      {/* Bandă continuă în inel (infinite loop ring) */}
      <div
        className="relative w-full overflow-hidden select-none py-2"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <motion.div
          animate={isInView ? { x: ["0%", "-50%"] } : undefined}
          transition={{
            ease: "linear",
            duration: 65,
            repeat: Infinity,
          }}
          className="flex w-max items-center gap-10 sm:gap-16 transform-gpu will-change-transform"
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="group flex shrink-0 items-center gap-5 sm:gap-8 select-none cursor-default"
            >
              <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
              </span>

              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.label}
                  className="h-9 sm:h-11 w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="text-[21px] sm:text-[27px] md:text-[29px] font-medium tracking-tight text-[color:var(--color-copy-on-dark)] transition-colors duration-300 group-hover:text-white whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Marquee;
