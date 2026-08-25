export const pricing = [
  {
    name: "Starter",
    eyebrow: "O pagină, construită să convertească",
    audience:
      "Pentru campanii, lansări, liste de așteptare și oferte punctuale",
    price: "1.500 lei",
    timeline: "Termen: 1-2 săptămâni",
    description:
      "O pagină unică, construită pentru a genera o singură acțiune clară — și cât mai des posibil.",
    features: [
      "Copywriting orientat spre conversie, nu doar design frumos",
      "Optimizare Core Web Vitals pentru viteză de încărcare de top",
      "Structură tehnică SEO completă, gata de trafic plătit și organic",
      "Ecran de încărcare cu animație de brand, la nivel de agenție",
      "Acces în portalul de client pentru fișierele finale",
      "O rundă de revizuire pe versiunea de staging",
    ],
    cta: "Cere ofertă personalizată",
    highlight: false,
  },
  {
    name: "Growth",
    eyebrow: "Proiectăm și construim noi, tu validezi rezultatul",
    audience:
      "Pentru afaceri care preferă viteză și direcție de expert în locul unui proces colaborativ",
    price: "2.500 lei",
    timeline: "Termen: 2-3 săptămâni",
    description:
      "Site complet, livrat rapid, cu un singur punct de validare din partea ta.",
    features: [
      "Până la 8 pagini, fiecare construită custom pentru brandul tău",
      "SEO tehnic avansat: date structurate, sitemap, indexare Google rapidă",
      "Performanță de top: Core Web Vitals optimizate, încărcare rapidă pe orice dispozitiv",
      "Securitate implementată din start: SSL, hardening, protecție formulare",
      "Portal client dedicat — vezi statusul proiectului live, oricând",
      "CMS ușor: acasă, blog și o zonă editabilă, fără cod",
      "Integrare programări și trimitere automată a sitemap-ului la Google",
    ],
    cta: "Cere ofertă personalizată",
    highlight: false,
  },
  {
    name: "Pro",
    eyebrow: "Design colaborativ, CMS propriu și motion avansat",
    audience:
      "Pentru afaceri deja formate care vor colaborare strategică și control asupra structurii",
    price: "4.000 lei",
    timeline: "Termen: 4-6 săptămâni",
    description:
      "Procesul nostru cel mai complet: design colaborativ, CMS propriu și control total.",
    features: [
      "Tot ce include Growth, plus:",
      "Până la 12 pagini, cu arhitectură de informație gândită strategic",
      "Moodboard, design Figma personalizat și prototip colaborativ",
      "SEO on-page avansat + date structurate (schema markup) pentru Google",
      "Hardening de securitate: rate limiting, anti-spam, conformitate GDPR",
      "Portal client premium — status live, fișiere și istoric complet",
      "CMS propriu pentru blog, acasă, date companie și o zonă suplimentară",
      "Formular de contact personalizat, cu bază de date și inbox intern",
      "Animații complexe la scroll, tranziții tip aplicație și iconițe custom",
    ],
    cta: "Cere ofertă personalizată",
    highlight: true,
    badge: "Cel mai ales",
  },
  {
    name: "Elite",
    eyebrow: "Site complet editabil, cu pipeline de clienți potențiali",
    audience:
      "Pentru echipe în creștere care au nevoie de publicare de conținut scalabilă și operațiuni de lead-uri",
    price: "Ofertă pe proiect",
    timeline: "Termen: 6-10 săptămâni",
    description:
      "Platforma completă: publicare la scară, infrastructură de nivel enterprise și gestionare proprie a lead-urilor.",
    features: [
      "Tot ce include Pro, plus:",
      "Până la 20 de pagini proiectate, scalabile pe măsură ce crești",
      "CMS complet, pe fiecare pagină — control total, fără developer",
      "Creare nelimitată de pagini din biblioteca proprie de șabloane",
      "Mini-CRM pentru lead-uri: pipeline, notițe, etichete, căutare și export CSV",
      "Dashboard cu analytics în timp real: volum lead-uri, surse, rată de conversie",
      "Infrastructură enterprise: CDN global Cloudflare, cache la nivel de edge",
      "Identitate de animație personalizată, construită exclusiv pentru brandul tău",
    ],
    cta: "Cere ofertă personalizată",
    highlight: false,
  },
];

// "All packages include" — shared baseline across every tier above,
// grouped the way the reference groups its footer inclusions.
export const pricingIncludes = [
  {
    title: "Construcție personalizată",
    items: [
      "Construcție React personalizată, cod curat, fără șabloane reciclate",
      "Dezvoltare responsive, mobile-first, testată pe device-uri reale",
      "Optimizare de performanță maximă — Core Web Vitals construite din start",
    ],
  },
  {
    title: "Fundație SEO",
    items: [
      "Implementare SEO tehnic completă: meta, sitemap, robots, canonical",
      "Date structurate (schema markup) pentru rezultate bogate în Google",
      "CI/CD automat prin GitHub, cu versionare și trimitere sitemap",
    ],
  },
  {
    title: "Securitate & lansare administrată",
    items: [
      "SSL, hardening al headerelor de securitate și protecție anti-spam",
      "Stocare media și CDN global Cloudflare, pentru încărcare rapidă oriunde",
      "Medii separate de staging și producție, cu trei luni de hosting administrat",
    ],
  },
  {
    title: "Portal client & suport post-lansare",
    items: [
      "Portal client dedicat, cu autentificare securizată — status proiect și fișiere livrate, oricând",
      "30 de zile de suport post-lansare, cu istoric de deploy versionat",
      "Hosting administrat disponibil la 30 lei/lună după perioada inclusă",
    ],
  },
];
