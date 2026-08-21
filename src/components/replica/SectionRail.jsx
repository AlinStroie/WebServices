import { useEffect, useState } from "react";
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
 * Icon-only at all times — `.rail-item` never auto-expands off the active
 * state, only off `:hover` (pure CSS, see index.css). Active is a color
 * change only (brand purple, same as the CTA buttons), decoupled from the
 * hover-driven label reveal so an inactive item still shows its name on
 * hover and the active one doesn't lose its color when it isn't hovered.
 *
 * Active section is resolved by "which section's top is closest to, but
 * not past, one third of the viewport" rather than a plain
 * IntersectionObserver — with sections this tall (the works section is
 * 6000px+) several are intersecting at once and a naive observer flickers
 * between them.
 *
 * Hidden below lg: on a narrow viewport it would cover content, and the
 * slideout menu already covers that job.
 */
const ITEMS = [
  { id: "hero", label: "Acasă", Icon: Compass },
  { id: "servicii", label: "Servicii", Icon: Shapes },
  { id: "studiu-caz", label: "Studiu de caz", Icon: Sparkles },
  { id: "avantaje", label: "Avantaje", Icon: Award },
  { id: "lucrari", label: "Lucrări", Icon: Frame },
  { id: "faq", label: "Întrebări", Icon: MessagesSquare },
];

function SectionRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    let frame = 0;

    function onScroll() {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;

        const line = window.innerHeight / 3;
        let current = ITEMS[0].id;

        for (const item of ITEMS) {
          const el = document.getElementById(item.id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= line) current = item.id;
        }

        setActive(current);
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Navigare secțiuni"
      className="fixed right-6 top-1/2 z-[90] hidden -translate-y-1/2 lg:block"
    >
      <ul className="grid w-40 justify-items-end gap-3">
        {ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id;

          return (
            <li key={id} className="flex justify-end">
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                aria-label={`Navighează la secțiunea ${label}`}
                onClick={() =>
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`rail-item border backdrop-blur-md ${
                  isActive
                    ? "border-transparent bg-[color:var(--color-brand)] text-white shadow-lg"
                    : "border-[color:var(--color-ink)]/10 bg-white/60 text-[color:var(--color-ink)]/70 hover:bg-white"
                }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className="rail-text whitespace-nowrap text-[13px] font-medium">
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SectionRail;
