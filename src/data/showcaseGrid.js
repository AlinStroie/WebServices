/**
 * Tiles for the ProblemStatement showcase grid.
 *
 * The reference site floats a collage of 12 real website screenshots.
 * s01-s07 now use real assets: the same portfolio-preview screenshots
 * PortfolioBrowserFrame renders elsewhere (s01-s06, one per real minisite
 * mockup) plus ProLinen HORECA's own poster frame (s07, our one real
 * shipped client site). s08-s12 are extra categories with no project
 * behind them yet, so they still render the crafted browser-frame mock
 * (see SiteThumb in ShowcaseGrid.jsx) built from the palette below.
 *
 * `layout` only varies the wireframe so the placeholders don't read as a
 * wall of identical boxes; it is ignored once `src` is set.
 */
export const showcaseTiles = [
  { id: "s01", label: "Cabinet kinetoterapie", kind: "Servicii medicale", from: "#0f3d3a", to: "#10b981", layout: "hero", src: "/images/portfolio-previews/movea-preview.webp" },
  { id: "s02", label: "Salon beauty", kind: "Servicii beauty", from: "#3b1230", to: "#e896cd", layout: "grid", src: "/images/portfolio-previews/luna-beauty-studio-preview.webp" },
  { id: "s03", label: "Firmă transport", kind: "Corporate", from: "#0b2a4a", to: "#2c7dff", layout: "dashboard", src: "/images/portfolio-previews/atlas-freight-preview.webp" },
  { id: "s04", label: "Portofoliu personal", kind: "Personal brand", from: "#241a3a", to: "#7a5cff", layout: "editorial", src: "/images/portfolio-previews/andrei-crisan-design-preview.webp" },
  { id: "s05", label: "Magazin online", kind: "E-commerce", from: "#123a1e", to: "#5fd08a", layout: "shop", src: "/images/portfolio-previews/vlom-cust-preview.webp" },
  { id: "s06", label: "Restaurant local", kind: "HoReCa", from: "#3a1c0b", to: "#f5a623", layout: "hero", src: "/images/portfolio-previews/hieu-bowl-preview.webp" },
  // Real, shipped client site — same screenshot VideoShowcase/Works use as
  // this project's poster frame (see portfolio.js).
  { id: "s07", label: "ProLinen HORECA", kind: "Website B2B", from: "#1c1c22", to: "#9aa3b2", layout: "editorial", src: "/showcase/prolinen-poster.webp" },
  { id: "s08", label: "Clinică stomatologică", kind: "Servicii medicale", from: "#0b2f4a", to: "#4cc3ff", layout: "dashboard" },
  { id: "s09", label: "Brand cosmetice", kind: "E-commerce", from: "#3a0f2a", to: "#ff7ac0", layout: "shop" },
  { id: "s10", label: "Agenție imobiliară", kind: "Corporate", from: "#10233a", to: "#3b82f6", layout: "grid" },
  { id: "s11", label: "Cafenea de specialitate", kind: "HoReCa", from: "#2a1a10", to: "#c98a4b", layout: "hero" },
  { id: "s12", label: "Fotograf de nuntă", kind: "Personal brand", from: "#241826", to: "#b4aaff", layout: "editorial" },
];
