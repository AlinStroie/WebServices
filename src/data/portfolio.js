import {
  beautyMiniSite,
  personalMiniSite,
  restaurantMiniSite,
  shopMiniSite,
  transportMiniSite,
} from "./minisites";

const defaultCaseStudy = {
  goal: "Creșterea numărului de cereri printr-o prezentare clară a serviciilor.",
  solution:
    "Am pus accent pe hero clar, servicii explicate, beneficii vizibile și butoane de contact ușor de accesat.",
  benefit:
    "Vizitatorul înțelege rapid ce servicii există și poate cere detalii fără să caute informații prin pagină.",
};

const defaultDeliverables = [
  "homepage structurată",
  "secțiune servicii",
  "formular de contact",
  "buton WhatsApp",
  "design responsive",
  "SEO de bază",
];

const colorThemes = {
  prolinen: {
    gradient: "bg-gradient-to-br from-teal-400/40 via-slate-300/20 to-white/5",
    glowFrom: "from-teal-400/20",
    glowVia: "via-slate-300/10",
    glowAccentOne: "bg-teal-400/20",
    glowAccentTwo: "bg-slate-300/20",
    modalBg: "from-teal-400/10 via-slate-300/5 to-transparent",
    browserBar: "bg-slate-50",
    browserLine: "bg-slate-200",
    browserBorder: "border-slate-200",
  },
  beauty: {
    gradient: "bg-gradient-to-br from-pink-400/40 via-purple-300/20 to-white/5",
    glowFrom: "from-pink-400/20",
    glowVia: "via-fuchsia-300/10",
    glowAccentOne: "bg-pink-400/20",
    glowAccentTwo: "bg-fuchsia-300/20",
    modalBg: "from-pink-400/10 via-fuchsia-300/5 to-transparent",
    browserBar: "bg-pink-50",
    browserLine: "bg-pink-100",
    browserBorder: "border-pink-100",
  },
  transport: {
    gradient: "bg-gradient-to-br from-blue-400/40 via-sky-300/20 to-white/5",
    glowFrom: "from-blue-400/20",
    glowVia: "via-sky-300/10",
    glowAccentOne: "bg-blue-400/20",
    glowAccentTwo: "bg-sky-300/20",
    modalBg: "from-blue-400/10 via-sky-300/5 to-transparent",
    browserBar: "bg-slate-50",
    browserLine: "bg-slate-200",
    browserBorder: "border-slate-200",
  },
  restaurant: {
    gradient: "bg-gradient-to-br from-orange-400/40 via-red-300/20 to-white/5",
    glowFrom: "from-orange-400/20",
    glowVia: "via-red-300/10",
    glowAccentOne: "bg-orange-400/20",
    glowAccentTwo: "bg-red-300/20",
    modalBg: "from-orange-400/10 via-red-300/5 to-transparent",
    browserBar: "bg-orange-50",
    browserLine: "bg-orange-100",
    browserBorder: "border-orange-100",
  },
  personal: {
    gradient: "bg-gradient-to-br from-violet-400/40 via-indigo-300/20 to-white/5",
    glowFrom: "from-violet-400/20",
    glowVia: "via-indigo-300/10",
    glowAccentOne: "bg-violet-400/20",
    glowAccentTwo: "bg-indigo-300/20",
    modalBg: "from-violet-400/10 via-indigo-300/5 to-transparent",
    browserBar: "bg-violet-50",
    browserLine: "bg-violet-100",
    browserBorder: "border-violet-100",
  },
  shop: {
    gradient: "bg-gradient-to-br from-lime-400/40 via-emerald-300/20 to-white/5",
    glowFrom: "from-lime-400/20",
    glowVia: "via-emerald-300/10",
    glowAccentOne: "bg-lime-400/20",
    glowAccentTwo: "bg-emerald-300/20",
    modalBg: "from-lime-400/10 via-emerald-300/5 to-transparent",
    browserBar: "bg-lime-50",
    browserLine: "bg-lime-100",
    browserBorder: "border-lime-100",
  },
};

function createProject({
  id,
  title,
  category,
  text,
  client,
  tags,
  mockupType = "default",
  features,
  miniSite,
  video = null,
  poster = null,
  liveUrl = null,
  caseStudy = defaultCaseStudy,
  deliverables = defaultDeliverables,
}) {
  const { gradient, ...theme } = colorThemes[id];

  return {
    id,
    title,
    category,
    text,
    client,
    tags,
    mockupType,
    gradient,
    theme,
    features,
    caseStudy,
    deliverables,
    miniSite,
    // Showcase clip (recorded from our own mockup via scripts/record-mockups.mjs,
    // or from the live site itself via scripts/record-live-site.mjs). VideoShowcase
    // and Works render it automatically. See docs/PLACEHOLDERS-TO-PREPARE.md #3.
    video,
    // First-frame still, extracted from the clip itself — shown instantly
    // via the <video poster> attribute while the actual video is still
    // buffering, so an inactive carousel slide never shows a blank black
    // box before you swipe to it.
    poster,
    // Real, shipped client work only — when set, the portfolio card links out
    // to the live site instead of the internal /project/:id placeholder.
    liveUrl,
  };
}

export const portfolio = [
  createProject({
    id: "prolinen",
    title: "ProLinen HORECA",
    category: "Website B2B — servicii industriale",
    text: "Site de prezentare pentru o spălătorie industrială dedicată exclusiv hotelurilor și restaurantelor.",
    client: "ProLinen HORECA",
    tags: ["Web Design", "B2B / HORECA", "Cerere ofertă"],
    mockupType: "default",
    features: [
      "Prezentare clară a celor 5 categorii de textile deservite",
      "Proces de colectare–spălare–livrare explicat pas cu pas",
      "Zonă de acoperire afișată explicit (Brașov & Întorsura Buzăului)",
      "Buton „Cere o ofertă” repetat la fiecare secțiune relevantă",
    ],
    video: "/showcase/prolinen.webm",
    poster: "/showcase/prolinen-poster.jpg",
    liveUrl: "https://prolinen-horeca.vercel.app/",
  }),
  createProject({
    id: "beauty",
    title: "Salon beauty",
    category: "Website servicii beauty",
    text: "Prezentare elegantă pentru servicii, galerie, testimoniale și programări.",
    client: "Salon Luna",
    tags: ["Web Design", "Galerie foto", "Programări online"],
    mockupType: "beauty",
    features: [
      "Design elegant pentru servicii beauty",
      "Secțiune pentru programări rapide",
      "Galerie vizuală și carduri pentru servicii",
      "Layout premium pentru telefon și desktop",
    ],
    miniSite: beautyMiniSite,
    video: "/showcase/beauty.webm",
    poster: "/showcase/beauty-poster.jpg",
  }),
  createProject({
    id: "transport",
    title: "Firmă transport",
    category: "Website corporate",
    text: "Structură clară pentru flotă, servicii, rute, parteneri și cereri rapide.",
    client: "Atlas Transport",
    tags: ["Web Design", "Corporate", "Formular cereri"],
    features: [
      "Prezentare servicii transport",
      "Secțiune pentru flotă și parteneri",
      "Formular pentru cereri rapide",
      "Design corporate responsive",
    ],
    miniSite: transportMiniSite,
    video: "/showcase/transport.webm",
    poster: "/showcase/transport-poster.jpg",
  }),
  createProject({
    id: "restaurant",
    title: "Restaurant",
    category: "Website HoReCa",
    text: "Meniu, atmosferă, rezervări și secțiuni vizuale pentru prezentarea localului.",
    client: "Bistro Local",
    tags: ["Web Design", "HoReCa", "Meniu digital"],
    features: [
      "Prezentare meniu și atmosferă",
      "Secțiune pentru rezervări",
      "Galerie foto pentru preparate",
      "Design responsive pentru mobil",
    ],
    miniSite: restaurantMiniSite,
    video: "/showcase/restaurant.webm",
    poster: "/showcase/restaurant-poster.jpg",
  }),
  createProject({
    id: "personal",
    title: "Portofoliu personal",
    category: "Personal brand",
    text: "Prezentare modernă pentru proiecte, experiență, servicii și contact.",
    client: "Andrei Design",
    tags: ["Web Design", "Personal Brand", "Portofoliu"],
    features: [
      "Prezentare personală modernă",
      "Secțiune pentru proiecte",
      "Experiență și servicii",
      "Contact rapid pentru colaborări",
    ],
    miniSite: personalMiniSite,
    video: "/showcase/personal.webm",
    poster: "/showcase/personal-poster.jpg",
  }),
  createProject({
    id: "shop",
    title: "Magazin online",
    category: "E-commerce simplu",
    text: "Layout pentru produse, categorii, beneficii, coș și proces simplu de comandă.",
    client: "Vlom Shop",
    tags: ["Web Design", "E-commerce", "Coș & comandă"],
    features: [
      "Layout pentru produse și categorii",
      "Carduri pentru beneficii",
      "Structură simplă pentru comandă",
      "Design responsive pentru cumpărători",
    ],
    miniSite: shopMiniSite,
    video: "/showcase/shop.webm",
    poster: "/showcase/shop-poster.jpg",
  }),
];
