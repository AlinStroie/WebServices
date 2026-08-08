/**
 * Placeholder tiles for the ProblemStatement showcase grid.
 *
 * The reference site floats a collage of 12 real website screenshots
 * (256×192 webp, `grid-image-showcase-*.webp`). We have no cleared
 * screenshots yet, so each tile renders a crafted browser-frame mock
 * (see SiteThumb in ShowcaseGrid.jsx) built from the palette below.
 *
 * To use a real screenshot instead, add `src: "/showcase/grid/<name>.webp"`
 * to a tile — SiteThumb renders the image and the hover preview shows the
 * same image at 2×. Target size 512×384 (2:1.5) so the 2× preview is crisp.
 * See docs/PLACEHOLDERS-TO-PREPARE.md.
 *
 * `layout` only varies the wireframe so the placeholders don't read as a
 * wall of identical boxes; it is ignored once `src` is set.
 */
export const showcaseTiles = [
  { id: "s01", label: "Cabinet kinetoterapie", kind: "Servicii medicale", from: "#0f3d3a", to: "#10b981", layout: "hero" },
  { id: "s02", label: "Salon beauty", kind: "Servicii beauty", from: "#3b1230", to: "#e896cd", layout: "grid" },
  { id: "s03", label: "Firmă transport", kind: "Corporate", from: "#0b2a4a", to: "#2c7dff", layout: "dashboard" },
  { id: "s04", label: "Portofoliu personal", kind: "Personal brand", from: "#241a3a", to: "#7a5cff", layout: "editorial" },
  { id: "s05", label: "Magazin online", kind: "E-commerce", from: "#123a1e", to: "#5fd08a", layout: "shop" },
  { id: "s06", label: "Restaurant local", kind: "HoReCa", from: "#3a1c0b", to: "#f5a623", layout: "hero" },
  { id: "s07", label: "Studio arhitectură", kind: "Corporate", from: "#1c1c22", to: "#9aa3b2", layout: "editorial" },
  { id: "s08", label: "Clinică stomatologică", kind: "Servicii medicale", from: "#0b2f4a", to: "#4cc3ff", layout: "dashboard" },
  { id: "s09", label: "Brand cosmetice", kind: "E-commerce", from: "#3a0f2a", to: "#ff7ac0", layout: "shop" },
  { id: "s10", label: "Agenție imobiliară", kind: "Corporate", from: "#10233a", to: "#3b82f6", layout: "grid" },
  { id: "s11", label: "Cafenea de specialitate", kind: "HoReCa", from: "#2a1a10", to: "#c98a4b", layout: "hero" },
  { id: "s12", label: "Fotograf de nuntă", kind: "Personal brand", from: "#241826", to: "#b4aaff", layout: "editorial" },
];
