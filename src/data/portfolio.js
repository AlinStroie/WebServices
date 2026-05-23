import {
  beautyMiniSite,
  kinetoMiniSite,
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
  kineto: {
    gradient: "bg-gradient-to-br from-emerald-400/40 via-cyan-300/20 to-white/5",
    glowFrom: "from-emerald-400/20",
    glowVia: "via-cyan-300/10",
    glowAccentOne: "bg-emerald-400/20",
    glowAccentTwo: "bg-cyan-300/20",
    modalBg: "from-emerald-400/10 via-cyan-300/5 to-transparent",
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
  mockupType = "default",
  features,
  miniSite,
  caseStudy = defaultCaseStudy,
  deliverables = defaultDeliverables,
}) {
  const { gradient, ...theme } = colorThemes[id];

  return {
    id,
    title,
    category,
    text,
    mockupType,
    gradient,
    theme,
    features,
    caseStudy,
    deliverables,
    miniSite,
  };
}

export const portfolio = [
  createProject({
    id: "kineto",
    title: "Cabinet kinetoterapie",
    category: "Website servicii medicale",
    text: "Design curat, secțiuni de servicii, beneficii, programări și contact rapid.",
    mockupType: "medical",
    features: [
      "Design modern pentru cabinet medical",
      "Secțiune hero cu programare rapidă",
      "Carduri pentru servicii de recuperare",
      "Layout responsive pentru mobil și desktop",
    ],
    miniSite: kinetoMiniSite,
  }),
  createProject({
    id: "beauty",
    title: "Salon beauty",
    category: "Website servicii beauty",
    text: "Prezentare elegantă pentru servicii, galerie, testimoniale și programări.",
    mockupType: "beauty",
    features: [
      "Design elegant pentru servicii beauty",
      "Secțiune pentru programări rapide",
      "Galerie vizuală și carduri pentru servicii",
      "Layout premium pentru telefon și desktop",
    ],
    miniSite: beautyMiniSite,
  }),
  createProject({
    id: "transport",
    title: "Firmă transport",
    category: "Website corporate",
    text: "Structură clară pentru flotă, servicii, rute, parteneri și cereri rapide.",
    features: [
      "Prezentare servicii transport",
      "Secțiune pentru flotă și parteneri",
      "Formular pentru cereri rapide",
      "Design corporate responsive",
    ],
    miniSite: transportMiniSite,
  }),
  createProject({
    id: "restaurant",
    title: "Restaurant",
    category: "Website HoReCa",
    text: "Meniu, atmosferă, rezervări și secțiuni vizuale pentru prezentarea localului.",
    features: [
      "Prezentare meniu și atmosferă",
      "Secțiune pentru rezervări",
      "Galerie foto pentru preparate",
      "Design responsive pentru mobil",
    ],
    miniSite: restaurantMiniSite,
  }),
  createProject({
    id: "personal",
    title: "Portofoliu personal",
    category: "Personal brand",
    text: "Prezentare modernă pentru proiecte, experiență, servicii și contact.",
    features: [
      "Prezentare personală modernă",
      "Secțiune pentru proiecte",
      "Experiență și servicii",
      "Contact rapid pentru colaborări",
    ],
    miniSite: personalMiniSite,
  }),
  createProject({
    id: "shop",
    title: "Magazin online",
    category: "E-commerce simplu",
    text: "Layout pentru produse, categorii, beneficii, coș și proces simplu de comandă.",
    features: [
      "Layout pentru produse și categorii",
      "Carduri pentru beneficii",
      "Structură simplă pentru comandă",
      "Design responsive pentru cumpărători",
    ],
    miniSite: shopMiniSite,
  }),
];
