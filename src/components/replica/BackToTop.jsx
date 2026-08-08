import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Back-to-top control, matching the reference's `.fixed.bottom-8.right-8`
 * button: it starts hidden (opacity 0, scale 0.75) and fades/scales in once
 * you have scrolled past the hero, then scrolls smoothly back to the top.
 *
 * Sits below the right-edge SectionRail (which is vertically centred), so the
 * two never overlap.
 */
function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setShown(window.scrollY > window.innerHeight * 0.9);
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
      className={`fixed bottom-8 right-8 z-[95] flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-ink)] text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[color:var(--color-brand)] ${
        shown
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-75 opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}

export default BackToTop;
