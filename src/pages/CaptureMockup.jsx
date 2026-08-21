import { useParams } from "react-router-dom";

import { MiniSiteRenderer } from "../components/minisites";
import { portfolio } from "../data/portfolio";

/**
 * Dev-only capture surface for recording showcase videos.
 *
 * Renders a single mini-site mockup full-viewport, desktop layout, with no
 * browser chrome or site nav, so `scripts/record-mockups.mjs` can drive
 * Playwright to scroll it and record a webm. Mounted only under
 * `import.meta.env.DEV` (see App.jsx) — it never ships to production.
 *
 * The mockup root is an internal `overflow-y-auto` container filling the
 * viewport, so the recorder scrolls that element, not the window.
 */
export default function CaptureMockup() {
  const { id } = useParams();
  const project = portfolio.find((p) => p.id === id) || portfolio[0];

  return (
    <div
      style={{ height: "100vh", width: "100vw", overflow: "hidden", background: "#fff" }}
    >
      <MiniSiteRenderer project={project} size="full" device="desktop" />
    </div>
  );
}
