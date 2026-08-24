import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { showcaseTiles } from "../../data/showcaseGrid";
import SkeletonImage from "../SkeletonImage";

/**
 * The collage that fills the right side of the ProblemStatement section,
 * reproduced 1:1 from the reference:
 *
 *  - Three horizontal rows of 256×192 thumbnails (rounded-lg, 10px gaps),
 *    each row a `min-w-max` flex track wider than its `overflow-hidden`
 *    parent, so it bleeds off the right edge.
 *  - The rows drift horizontally with scroll — measured on the reference at
 *    ~±80px of travel across the section's pass through the viewport, with
 *    rows 1 & 3 moving right and row 2 moving left. Nothing moves while the
 *    page is still; the motion is purely scroll-linked.
 *  - Hovering any tile spawns a cursor-following preview of the same image
 *    at exactly 2× (512×384), `fixed pointer-events-none z-50`, fading in
 *    over 200ms — the reference's exact popup.
 *
 * Placeholders are crafted browser-frame mocks (SiteThumb). Add `src` to a
 * tile in src/data/showcaseGrid.js to render a real screenshot; the hover
 * preview then shows that image at 2× via object-cover.
 */

// 4 tiles per row, 3 rows.
const rows = [
  showcaseTiles.slice(0, 4),
  showcaseTiles.slice(4, 8),
  showcaseTiles.slice(8, 12),
];

/** A single placeholder that reads as a website screenshot. */
function SiteThumb({ tile, large = false }) {
  if (tile.src) {
    return (
      <SkeletonImage
        src={tile.src}
        alt={tile.label}
        className="rounded-lg"
        imgClassName="rounded-lg object-cover"
        draggable="false"
      />
    );
  }

  const bar = large ? "h-6 gap-2 px-3" : "h-4 gap-1 px-2";
  const dot = large ? "h-2 w-2" : "h-1 w-1";

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-lg"
      style={{ backgroundImage: `linear-gradient(135deg, ${tile.from}, ${tile.to})` }}
    >
      {/* Browser chrome */}
      <div className={`flex shrink-0 items-center bg-black/25 ${bar}`}>
        <span className={`rounded-full bg-white/50 ${dot}`} />
        <span className={`rounded-full bg-white/35 ${dot}`} />
        <span className={`rounded-full bg-white/25 ${dot}`} />
        <span
          className={`ml-auto rounded-full bg-white/15 ${large ? "h-2.5 w-24" : "h-1.5 w-12"}`}
        />
      </div>

      {/* Content mock */}
      <div className={`flex flex-1 flex-col justify-end ${large ? "gap-2 p-4" : "gap-1 p-2.5"}`}>
        <span className={`rounded bg-white/25 ${large ? "h-2 w-1/3" : "h-1 w-1/3"}`} />
        <span
          className={`font-semibold leading-tight text-white ${large ? "text-xl" : "text-[11px]"}`}
        >
          {tile.label}
        </span>
        <div className={`flex flex-wrap ${large ? "gap-1.5 pt-1" : "gap-1"}`}>
          <span className={`rounded bg-white/20 ${large ? "h-6 w-16" : "h-3 w-8"}`} />
          <span className={`rounded bg-white/15 ${large ? "h-6 w-24" : "h-3 w-12"}`} />
          <span className={`rounded bg-white/10 ${large ? "h-6 w-14" : "h-3 w-7"}`} />
        </div>
      </div>
    </div>
  );
}

function ShowcaseGrid() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);

  // Scroll progress as the collage passes through the viewport (0 entering
  // from the bottom → 1 leaving at the top).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The rows drift in opposite directions with scroll, but the translation is
  // kept NON-NEGATIVE so no tile is ever pulled left of the collage's start —
  // the left edge stays flush (uncut), the text is never overlapped, and only
  // the far right runs off-screen where the section clips it at the viewport.
  const driftA = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const driftB = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const rowX = [driftA, driftB, driftA];

  // Cursor-following preview, desktop hover only — touch has no hover, and
  // a tap-to-open version of this on mobile turned out worse than no
  // preview at all, so touch just doesn't set this.
  const [preview, setPreview] = useState(null); // { tile, x, y }

  // Pointermove can fire far faster than the display repaints (a 125Hz+
  // mouse), and each one was triggering a full setState + re-render of the
  // portaled preview — a straight main-thread hammering while the cursor
  // just sat over a tile. Coalescing to one flush per animation frame keeps
  // the preview exactly as responsive (still every frame) without the
  // redundant sub-frame re-renders.
  const rafRef = useRef(null);
  const pendingRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function onMove(tile, event) {
    if (event.pointerType === "touch") return;
    pendingRef.current = { tile, x: event.clientX, y: event.clientY };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setPreview(pendingRef.current);
    });
  }

  function clearPreview() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingRef.current = null;
    setPreview(null);
  }

  return (
    <div ref={ref} className="relative my-8 space-y-[10px]">
      {rows.map((tiles, r) => (
        <motion.div
          key={r}
          className={`flex min-w-max gap-[10px] will-change-transform ${
            // Brick-stagger: the middle row reads half a tile (+gap) further
            // left than rows 1 & 3. Rather than pull row 2 left (which would
            // slide it under the copy), we push rows 1 & 3 right — same
            // relative offset, but nothing ever moves toward the text, so
            // there's no overlap at any width. Rows 1 & 3 just bleed a touch
            // more off the right edge. Only from lg up, where the collage is
            // beside the copy.
            r !== 1 ? "lg:ml-[133px]" : ""
          }`}
          style={reduceMotion ? undefined : { x: rowX[r] }}
        >
          {tiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              aria-label={`${tile.kind} — ${tile.label}`}
              onPointerEnter={(e) => onMove(tile, e)}
              onPointerMove={(e) => onMove(tile, e)}
              onPointerLeave={(e) => {
                if (e.pointerType !== "touch") clearPreview();
              }}
              className="h-32 w-44 shrink-0 cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] sm:h-48 sm:w-64"
            >
              <SiteThumb tile={tile} />
            </button>
          ))}
        </motion.div>
      ))}

      {preview && !reduceMotion && <HoverPreview {...preview} />}
    </div>
  );
}

/**
 * The 2× cursor-following preview, portaled to <body> so the section's
 * overflow-clip never crops it. It floats to the left of the cursor, then
 * flips to the right only when it would clip off the left edge.
 */
function HoverPreview({ tile, x, y }) {
  // Clamp to the viewport width so a 512px preview doesn't overflow a
  // narrow phone screen (the desktop cursor-following case never hits
  // this clamp — 512 + 2*pad comfortably fits any desktop viewport).
  const W = Math.min(512, window.innerWidth - 32);
  const H = W * (384 / 512);
  const pad = 16;

  // Prefer the left of the cursor; fall back to the right only if it would
  // clip off the left edge.
  let left = x - W - pad;
  if (left < pad) left = x + pad;
  left = Math.min(left, window.innerWidth - W - pad);

  let top = y - H / 2;
  top = Math.max(pad, Math.min(top, window.innerHeight - H - pad));

  return createPortal(
    <div
      className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10"
      style={{ left, top, width: W, height: H, animation: "replica-overlay-fade 200ms ease-out" }}
      aria-hidden="true"
    >
      <SiteThumb tile={tile} large />
    </div>,
    document.body
  );
}

export default ShowcaseGrid;
