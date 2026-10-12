import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Compass,
  Frame,
  MessagesSquare,
  Shapes,
  Sparkles,
} from "lucide-react";

/**
 * Vertical section navigator, pinned to the right edge.
 *
 * Implements the exact same smooth two-phase morphing animation as WhatsAppButton:
 * - Phase 1: Sleek compact circle (40x40px) with the section icon centered.
 * - Phase 2: Expanded pill smoothly revealing the section title.
 *
 * Choreography:
 * 1. Initial page load: icons appear with a soft stagger.
 * 2. Intro preview: sections expand in a gentle cascade sequence so the user discovers
 *    the available sections, hold comfortably, then seamlessly glide back into circles.
 * 3. Hover / focus: hovering over any item smoothly unfolds its pill label with zero text clipping,
 *    subtle scale feedback, and fluid cubic-bezier easing ([0.16, 1, 0.3, 1]).
 */
const ITEMS = [
  { id: "hero", label: "Acasă", Icon: Compass },
  { id: "de-ce-noi", label: "De ce noi", Icon: Shapes },
  { id: "studiu-caz", label: "Studiu de caz", Icon: Sparkles },
  { id: "avantaje", label: "Avantaje", Icon: Award },
  { id: "lucrari", label: "Lucrări", Icon: Frame },
  { id: "faq", label: "Întrebări", Icon: MessagesSquare },
];

function RailItem({ id, label, Icon, isActive, onNavigate, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isHovered;

  return (
    <li className="flex justify-end">
      <motion.button
        type="button"
        aria-current={isActive ? "true" : undefined}
        aria-label={`Navighează la secțiunea ${label}`}
        onClick={onNavigate}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          backgroundColor: isActive
            ? "var(--color-brand)"
            : isHovered
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.65)",
          color: isActive
            ? "#ffffff"
            : isHovered
            ? "var(--color-ink)"
            : "rgba(23, 23, 28, 0.75)",
          boxShadow: isActive
            ? isExpanded
              ? "0 10px 25px -4px rgba(124, 58, 237, 0.45), 0 4px 12px -2px rgba(0, 0, 0, 0.15)"
              : "0 8px 20px -3px rgba(124, 58, 237, 0.38)"
            : isHovered
            ? "0 8px 20px -2px rgba(0, 0, 0, 0.14)"
            : "0 2px 8px -2px rgba(0, 0, 0, 0.05)",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{
          opacity: { duration: 0.45, delay: 0.2 + index * 0.06 },
          x: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.06 },
          backgroundColor: { duration: 0.3 },
          color: { duration: 0.25 },
          boxShadow: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        className={`group flex h-10 items-center rounded-full border backdrop-blur-md select-none overflow-hidden cursor-pointer ${
          isActive
            ? "border-transparent text-white"
            : "border-[color:var(--color-ink)]/10 text-[color:var(--color-ink)]/75"
        }`}
      >
        {/* Phase 1 core: Fixed 40x40 icon */}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center">
          <Icon size={16} className="shrink-0" />
        </span>

        {/* Phase 2 core: Fluid expanding text label (matches WhatsAppButton) */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            width: {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            },
            opacity: {
              duration: isExpanded ? 0.45 : 0.2,
              delay: isExpanded ? 0.16 : 0,
              ease: isExpanded ? "easeOut" : "easeIn",
            },
          }}
          className="overflow-hidden whitespace-nowrap shrink-0"
        >
          <motion.span
            animate={{
              x: isExpanded ? 0 : -8,
            }}
            transition={{
              duration: isExpanded ? 0.6 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block pr-4 pl-0.5 text-[13px] font-medium tracking-[-0.01em] select-none whitespace-nowrap shrink-0"
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.button>
    </li>
  );
}

function SectionRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    // SectionRail is strictly hidden below lg (1024px) - skip scroll measurement on mobile
    if (typeof window === "undefined") return;

    let frame = 0;
    let isDesktop = window.innerWidth >= 1024;

    function handleResize() {
      isDesktop = window.innerWidth >= 1024;
    }
    window.addEventListener("resize", handleResize, { passive: true });

    function onScroll() {
      if (!isDesktop || frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;

        const line = window.innerHeight / 3;
        let current = ITEMS[0].id;

        for (let i = 0; i < ITEMS.length; i++) {
          const el = document.getElementById(ITEMS[i].id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= line) {
            current = ITEMS[i].id;
          }
        }

        setActive((prev) => (prev === current ? prev : current));
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Navigare secțiuni"
      className="fixed right-6 top-1/2 z-[90] hidden -translate-y-1/2 lg:block"
    >
      <ul className="grid w-56 justify-items-end gap-3">
        {ITEMS.map((item, index) => (
          <RailItem
            key={item.id}
            {...item}
            index={index}
            isActive={active === item.id}
            onNavigate={() =>
              document
                .getElementById(item.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />
        ))}
      </ul>
    </nav>
  );
}

export default SectionRail;
