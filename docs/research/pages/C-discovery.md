# Template C — Discovery form (`/discovery`)

Sampled: `/discovery`. Research only. Note: our repo already has a partial `/discovery` build (`src/pages/Discovery.jsx`) from a prior session — this documents the reference precisely so we can align.

## Purpose
Multi-step "Free 15-Minute Consultation" booking flow. Single viewport, no scroll — the whole thing is a centered card that swaps step content.

## Layout
- Root `main`: `display:flex; justify-content:center; align-items:center`, fills the viewport. Doc height ~879px (single screen, no page scroll).
- **5 steps** with a progress indicator (`.progress`) — circular step dots (`button` with `border-radius:50%`, `transition 0.2s`).
- H1 is small (16px, Inter 400) — the form, not the headline, is the focus.

## Option cards (the signature element)
Selectable choice buttons, e.g. "New custom website", "Website redesign", "Landing page", "Custom E-commerce / Full-stack":

| Property | Value |
|---|---|
| `border-radius` | **14px** |
| `border` | `1px solid rgba(0,0,0,0.07)` |
| padding | 16px / 20px |
| transition | `0.2s cubic-bezier(0.22, 1, 0.36, 1)` |

The easing `cubic-bezier(0.22, 1, 0.36, 1)` is **easeOutExpo-like** — fast start, long gentle settle. This is the hover/select feedback curve for the cards. Selected state changes border/background within that 0.2s.

## Flow (from prior session's live walkthrough, obs S34)
Step 1 project type → Step 2 details → Step 3 contact collection. Reference completes through a contact step; no visible `<input>` on step 1 (option-card driven).

## Reproduction
Already partially built on our side. Match: flex-centered single-viewport card, 5-step progress dots, option cards at radius 14px / border rgba(0,0,0,0.07) / easing `cubic-bezier(0.22,1,0.36,1)`. No library needed (Framer Motion for step transitions if we want animated swaps).
