/**
 * Marquee band slot (rendered by components/replica/Marquee.jsx).
 *
 * PLACEHOLDER STATE: the reference runs client logos through this band. We
 * have no client-logo permissions, so each entry is a plain text label
 * (our service names) — an ambient drift with nothing borrowed or implied.
 *
 * TO ADD REAL CLIENT LOGOS: set `logo` to an SVG/webp path (transparent,
 * ~64px tall displayed). Any entry with a `logo` renders as an <img>;
 * entries without one keep rendering as their text `label`. Only add logos
 * you have written permission to display.
 *
 *   { label: "Clinica Zâmbet", logo: "/clients/clinica-zambet.svg" }
 */
export const clients = [
  { label: "Site de prezentare", logo: null },
  { label: "Landing page", logo: null },
  { label: "Magazin online", logo: null },
  { label: "Redesign", logo: null },
  { label: "Identitate vizuală", logo: null },
  { label: "Optimizare", logo: null },
];
