import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";

/**
 * Back-to-top control. Only appears while the user is actively scrolling
 * back up (not just past a threshold) — scrolling further down hides it
 * again even if you're still deep in the page.
 *
 * Background is a neutral glass (`bg-white/15` + `backdrop-blur`), not a
 * fixed color: over a dark section that blur reads as dark glass, over a
 * light section it reads as light glass, with no per-section detection
 * needed. The chevron is a fixed gray with a drop-shadow instead — that
 * combo stays legible on both dark and white backgrounds without needing
 * a blend-mode trick.
 */
function BackToTop() {
  const [shown, setShown] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = 0;

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;

        const y = window.scrollY;
        const pastThreshold = y > window.innerHeight * 0.9;
        const scrollingUp = y < lastY.current - 2;
        const scrollingDown = y > lastY.current + 2;

        if (!pastThreshold || scrollingDown) {
          setShown(false);
        } else if (scrollingUp) {
          setShown(true);
        }

        lastY.current = y;
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
    <button
      type="button"
      aria-label="Înapoi sus"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-[95] flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] sm:bottom-[calc(2rem+env(safe-area-inset-bottom))] sm:right-8 ${
        shown
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-75 opacity-0"
      }`}
    >
      <ChevronUp
        size={22}
        strokeWidth={2.5}
        className="text-[color:var(--color-copy-muted)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
      />
    </button>
  );
}

export default BackToTop;
