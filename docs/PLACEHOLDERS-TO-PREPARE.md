# Placeholders to prepare — A Squared home replica

Everything the replica currently fakes, and exactly what you need to hand me
to make it real. Every item is wired so you drop the file/data in and it
renders — no code change needed. Ranked within each tier by visual impact.

Legend: 🔴 blocking real parity · 🟠 strong upgrade · 🟢 nice-to-have

Last updated: 2026-08-07 (updated per section as the rebuild proceeds).

---

## Tier 1 — media (this is 80% of the "looks premium vs looks AI" gap)

| # | Placeholder now | What to provide | Spec | Where it lands |
|---|---|---|---|---|
| 1 | 🔴 Floated **kineto mockup** in hero | A **cut-out portrait** (you/team) OR a signature product shot | ~1290×1978, `.webp`, transparent or clean bg | `Hero.jsx` — replaces the mockup; unlocks the giant outlined numeral + ghost caption layers too |
| 2 | 🔴 **Gradient-disc avatars** (initials) in hero + testimonials | 6+ **real headshots** | 300×300 min, `.webp` | `Hero.jsx` avatars → add `src`; `data/testimonials.js` → `avatar` |
| 3 | 🟢 ~~Static mockups~~ → **now our own recorded mockup videos** (`public/showcase/*.webm`) | Optional: **real client screen-recordings** to replace them | 1600px+ wide, muted, looping, `.webm` (+`.mp4` if you have ffmpeg) | `data/portfolio.js` → point `video:` at the new file. Re-record ours: `node scripts/record-mockups.mjs` |
| 4 | 🟠 **Gradient tiles** in the drifting strip | ~16 **project screenshots** | 1024×768, `.webp` | `DriftingStrip.jsx` tiles → `<img>` |

## Tier 2 — content (needed for structural parity, no fabrication)

| # | Placeholder now | What to provide | Notes |
|---|---|---|---|
| 5 | 🟠 Working **principles** in the testimonials slot | Real **client quotes** + name/role/company | `data/testimonials.js` — fill `name` and it renders as a testimonial |
| 6 | 🟠 **Service-name text** in the marquee | **Client logos** (SVG) | Only with written permission; `data/clients.js` → `logo:` |
| 7 | 🟠 "How we work" **stats** | Real, defensible **metrics** | `data/stats.js`; do not invent results |
| 8 | 🟠 **"A²" text logo** in nav/footer | A proper **logo mark** (SVG) | ~139×56 |

## Tier 3 — only if genuinely true

| # | Item | Note |
|---|---|---|
| 9 | 🟢 Award badges | Only if A Squared has actually won them. Fake awards = fabricated credentials. |
| 10 | 🟢 Hard result metrics | e.g. "+X% leads in 30 days" — only real numbers. |

---

## Per-section notes (screenshot-verified 2026-08-07 at 1440px)

Finding: after the hero rebuild, **every section already reads premium**. The
"AI-vibecoded" impression was dominated by the old hero "A²" box; the rest of
the page was already at structural + visual parity. Remaining gap is real
media (Tier 1–2 above), not craft.

| Section | Verdict | Placeholder in play |
|---|---|---|
| Hero | Rebuilt (commit 671efd2) | portrait #1, avatars #2 — numeral/ghost layers wait on the portrait |
| Problem statement + drifting strip | Strong | gradient tiles #4 (swap for screenshots) |
| Service cards | Strong (conic-glow active card) | — |
| Stats | Strong (restrained, matches reference) | metrics #7 |
| VideoShowcase | Strong (real browser-framed mini-site UIs) | videos #3 |
| Marquee | Strong | logos #6 (text placeholder) |
| Benefits accordion | Strong | — |
| Works | Strong (real product mockups, 2fr/1fr) | videos/screenshots optional |
| Timeline | Strong (rolling number + live scroll rail) | — |
| Principles (testimonials slot) | Strong | quotes #5 |
| Pricing | Strong (tiers + Recomandat badge) | — |
| FAQ | Strong | — |
| Footer | Strong (dark ROI CTA + contact + links) | logo mark #8 |

Biggest single upgrade available now: **a hero portrait cut-out (#1)** and
**real showcase videos (#3)**. Those two close most of the remaining distance
to the reference.
