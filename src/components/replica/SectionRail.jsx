import { useEffect, useState } from "react";
import {
  Compass,
  Frame,
  Gem,
  MessagesSquare,
  Receipt,
  Shapes,
} from "lucide-react";

/**
 * Vertical section navigator, pinned to the right edge.
 *
 * Replicates the reference's rail: each entry is a 2.5rem circle while
 * inactive, and expands into a labelled pill when its section is the one
 * in view. The reference drives this off `aria-expanded` and hides the
 * label with `display: none` while collapsed — same here, so the width
 * animates cleanly and the label never lingers mid-transition.
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
  { id: "beneficii", label: "Beneficii", Icon: Gem },
  { id: "lucrari", label: "Lucrări", Icon: Frame },
  { id: "preturi", label: "Prețuri", Icon: Receipt },
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
                aria-expanded={isActive}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Navighează la secțiunea ${label}`}
                onClick={() =>
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`rail-item border backdrop-blur-md ${
                  isActive
                    ? "border-transparent bg-[color:var(--color-ink)] text-white shadow-lg"
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
