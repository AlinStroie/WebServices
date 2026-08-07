# What a 1:1 replica still needs

Follow-up research after the MVP build (commit `bc399f9`). Re-scanned the reference on 2026-08-07 at 1440×900 and found several things the first pass missed, plus an audit of what still carries over from the old design.

Short version: **the structure is ~70% there, but the reference is an asset-heavy site and assets are the bulk of what's missing.** 102 images and 13 videos carry most of its visual weight. No amount of CSS closes that gap.

---

## 1. Things I got wrong or missed in the first research pass

These are corrections to `docs/research/components/`. Three sections are materially different from what I documented.

### 1.1 `#problem-statement` contains a drifting image strip — undocumented

I described this section as static with no animation. It is not. It contains:

```
div.my-8.space-y-[10px].overflow-hidden      ← clipped viewport, rows 10px apart
  div.flex.gap-[10px].min-w-max              ← horizontal strip, translateX drift
    img.w-64.h-48.object-cover  × ~12        ← 256×192 display, 1024×768 source
```

Multiple rows of project thumbnails drifting horizontally at slightly different offsets behind the copy. `min-w-max` lets the row overflow its container; the parent clips it. This is a second marquee, distinct from the logo band, and it is a large part of why that section feels alive.

**Not built.** Needs ~16 showcase images.

### 1.2 `#awards` is an 11-video carousel, not a badge row

I documented this as a static row of award badges with no animation. Wrong. It contains **11 looping videos** plus 11 images. Each video sits in:

```
div.relative.flex-shrink-0.w-[calc(100vw-2rem)]
```

Full-bleed slides, ~855px displayed at 1440. Videos are `loop muted` and start paused — they play on intersection. The award badges (3 CSS Design Awards SVGs + 2 wreath SVGs) are a small part of the section, not the whole of it.

This is the single heaviest section on the page and I built nothing for it.

### 1.3 The H1 mixes two typefaces

The headline is not one font. It is:

- **Inter Bold 700** for most of it
- **Times New Roman, `font-style: italic`** for the accent words ("win clients"), same 72px size, applied per-character

I missed this entirely — my earlier query filtered wrong and reported Inter for everything. A serif italic set against a tight sans bold is doing a lot of the visual work in that headline, and our build has no equivalent.

### 1.4 Other gaps

| Item | Reference | Ours |
|---|---|---|
| Split text | per-**character** (41 `.char` divs) | per-**word** (deliberate a11y tradeoff, but not 1:1) |
| Nav | Awards · Case Studies · Pricing · **Insights (dropdown)** · Book a Free Consultation | 5 flat links, no dropdown |
| Featured quote slider | present (819px section, 1 video + portrait) | not built |
| Case-study section | "From 0 leads in three years to 20 in 30 days" + video | not built |
| Logo marquee | **26 real client logo SVGs** | our service names as text |
| Fonts | Inter 400/500/600/700 **self-hosted woff2** | system Inter fallback, no woff2 |

---

## 2. Assets you would need to provide

This is the real answer to "what else do I need to give you". Ranked by how much they matter.

### Tier 1 — blocking. Without these the page cannot look like the reference.

| # | Asset | Spec | Where it goes |
|---|---|---|---|
| 1 | **~13 project animation videos** | 1600–2280px wide, muted, looping, `.mp4` + `.webm` | `#awards` carousel + case study + featured quote |
| 2 | **~16 showcase images** | 1024×768, `.webp` | drifting strip in `#problem-statement` |
| 3 | **Hero portrait** | ~1290×1978, `.webp`, cut out or on a clean background | hero right column |
| 4 | **Logo** | SVG, ~139×56 | nav + footer |

The videos are the big one. They are screen recordings of real client sites animating — that is what makes the reference read as a portfolio of working products rather than a brochure. We currently substitute static mockups in browser chrome.

If we do not have client work to record, an honest alternative: record the six mini-site mockups we already built (`src/components/minisites/mockups/`) scrolling and interacting. They are ours, they are real UI, and they would fill the same slot.

### Tier 2 — needed for full structural parity

| # | Asset | Spec | Notes |
|---|---|---|---|
| 5 | **Client logos** | SVG, ~64px displayed, ~26 of them | Only with written permission to display. Otherwise keep the text marquee. |
| 6 | **Client avatars** | 300×300 min, `.webp` | trust row + testimonial cards |
| 7 | **Testimonial quotes** | text + name + role + company | Real and cleared for publication |
| 8 | **Atmospheric layers** | 1440px `.avif` — a soft shadow, a light cast, a blur | Cheap to generate; these sit behind the hero |
| 9 | **Inter woff2 files** | 400/500/600/700 | Self-host. Free, from rsms.me/inter or Google Fonts. I can wire this up. |
| 10 | **A serif italic** | for the H1 accent | Times New Roman works but is dated; a licensed serif would look better |

### Tier 3 — only if genuinely true

| # | Asset | Notes |
|---|---|---|
| 11 | **Award badges** | The reference shows 3 CSS Design Awards wins. **Do not add these unless you have actually won something.** Fake awards on a real business's site are fabricated credentials. |
| 12 | **Real metrics** | The reference leads with "From 0 leads in three years to 20 in 30 days". Our stats row currently describes *how we work* rather than claiming results. Swap in real numbers only if you can stand behind them. |

---

## 3. What still carries over from the old design

You are right that the MVP is mixed. Concretely, on the home page:

| Component | Status |
|---|---|
| `PortfolioBrowserFrame` → `PortfolioMockupRenderer` → 6 minisite mockups | **Old dark design.** Renders inside every project row. Biggest visual clash. |
| `CookieBanner` | Old dark styling, floats over the light hero |
| `LegalModal` | Old dark styling |
| `SEO` | Fine — no visual output |

And every other route is still entirely the old design:

`/blog` · `/blog/:slug` · `/privacy` · `/cookies` · `/terms` · `/succes` · `/admin/*` · 404

`src/index.css` also still carries the old dark `:root` / `body` background and all the old utility classes (`.glass`, `.soft-grid`, `.drawer-input`, `.admin-input`, …). Those are load-bearing for the routes above, so they cannot simply be deleted — the old and new systems have to coexist until every route is migrated.

**Estimated work to finish the migration:** the 6 minisite mockups are the largest single chunk (Personal 580 lines, Transport 494, Shop 321, Beauty 260, Medical 213 + renderer). Restyling them to the light system is mechanical but not small.

---

## 4. Decisions I need from you

1. **Videos** — do we have client work we can record? If not, shall I record our own mini-site mockups instead?
2. **Client logos** — do we have permission to display any?
3. **Testimonials** — any real quotes cleared for publication?
4. **Language** — the reference is English, our content is Romanian. Staying Romanian?
5. **Migration scope** — restyle the 6 minisite mockups and the other 8 routes to the new light system, or leave them dark for now?
6. **Split text** — go per-character for exact parity, accepting the accessibility cost, or keep per-word?

---

## 5. What I can do without anything from you

Ordered by impact:

1. **Self-host Inter** (400/500/600/700 woff2) — free, removes the system-font fallback, closes a real fidelity gap
2. **Build the drifting image strip** — works with placeholder images now, swap in real ones later
3. **Build the `#awards` video carousel shell** — full-bleed slides, intersection-triggered playback, ready for real videos
4. **Add the serif italic H1 accent**
5. **Build the featured quote slider and case-study section** (structure, placeholder content)
6. **Add the Insights nav dropdown**
7. **Restyle `CookieBanner` and `LegalModal`** to the light system — removes the two most obvious leftovers on the home page
8. **Restyle the 6 minisite mockups** — the big one

Items 1–4 and 7 are the highest fidelity-per-hour. Item 7 in particular is the fastest way to stop the home page looking mixed.
