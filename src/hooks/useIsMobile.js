import { useEffect, useState } from "react";

const QUERY = "(max-width: 767px)";

// Matches Tailwind's `md` breakpoint (768px) — the same boundary Timeline
// already used inline for its sticky-sidebar cutoff. Centralised here so
// every component gates mobile-only behaviour off one consistent query.
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = (event) => setIsMobile(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
