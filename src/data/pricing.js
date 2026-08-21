export const pricing = [
  {
    name: "Landing Page",
    eyebrow: "O pagină, un obiectiv clar",
    audience:
      "Pentru campanii, lansări, liste de așteptare și oferte punctuale",
    price: "1.500€",
    timeline: "Termen: 1-2 săptămâni",
    description:
      "O pagină unică, construită pentru a genera o singură acțiune clară.",
    features: [
      "O pagină complet personalizată, construită în React",
      "Ecran de încărcare cu animație de brand",
      "Animații și interacțiuni proprii la scroll",
      "O rundă de revizuire pe versiunea de staging",
      "Construcție mobile-first și SEO tehnic",
      "Fără CMS, bază de date sau zonă de administrare",
    ],
    cta: "Cere ofertă personalizată",
    highlight: false,
  },
  {
    name: "Express",
    eyebrow: "Proiectăm și construim noi, tu validezi rezultatul",
    audience:
      "Pentru afaceri care preferă viteză și direcție de expert în locul unui proces colaborativ",
    price: "2.500€",
    timeline: "Termen: 2-3 săptămâni",
    description:
      "Site complet, livrat rapid, cu un singur punct de validare din partea ta.",
    features: [
      "Până la 8 pagini complet personalizate",
      "Primul livrabil este chiar site-ul de staging",
      "O rundă consolidată de revizuire pe staging",
      "CMS ușor: acasă, blog și o zonă editabilă",
      "Integrare programări și trimitere sitemap",
      "Ecran de încărcare și animații de brand",
    ],
    cta: "Cere ofertă personalizată",
    highlight: false,
  },
  {
    name: "Bespoke Pro",
    eyebrow: "Design colaborativ, CMS propriu și motion avansat",
    audience:
      "Pentru afaceri deja formate care vor colaborare strategică și control asupra structurii",
    price: "4.000€",
    timeline: "Termen: 4-6 săptămâni",
    description:
      "Procesul nostru cel mai complet: design colaborativ, CMS propriu și control total.",
    features: [
      "Tot ce include Express, plus:",
      "Până la 12 pagini",
      "Moodboard, design Figma personalizat și prototip colaborativ",
      "Două runde de revizuire în Figma și o rundă de polish pe staging",
      "CMS propriu pentru blog, acasă, date companie și o zonă suplimentară",
      "Formular de contact personalizat, cu bază de date și inbox intern",
      "Animații complexe la scroll, tranziții tip aplicație și iconițe custom",
    ],
    cta: "Cere ofertă personalizată",
    highlight: true,
    badge: "Cea mai bună alegere",
  },
  {
    name: "Bespoke Max",
    eyebrow: "Site complet editabil, cu pipeline de clienți potențiali",
    audience:
      "Pentru echipe în creștere care au nevoie de publicare de conținut scalabilă și operațiuni de lead-uri",
    price: "6.500€",
    timeline: "Termen: 6-10 săptămâni",
    description:
      "Platforma completă: publicare la scară și gestionare proprie a lead-urilor.",
    features: [
      "Tot ce include Bespoke Pro, plus:",
      "Până la 20 de pagini proiectate",
      "CMS complet, pe fiecare pagină",
      "Creare nelimitată de pagini din biblioteca proprie de șabloane",
      "Mini-CRM pentru lead-uri: pipeline, notițe, etichete, căutare și export CSV",
      "Mini-dashboard cu volum de lead-uri, pagini sursă și rată de conversie",
      "Identitate de animație personalizată",
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
      "Construcție React personalizată",
      "Dezvoltare responsive, mobile-first",
      "Țintă de performanță Lighthouse 95-100",
    ],
  },
  {
    title: "Fundație SEO",
    items: [
      "Implementare SEO tehnic",
      "Conținut și metadate structurate",
      "CI/CD prin GitHub și trimitere sitemap",
    ],
  },
  {
    title: "Lansare administrată",
    items: [
      "Medii de staging și producție",
      "SSL, stocare media și CDN Cloudflare",
      "Trei luni de hosting administrat",
    ],
  },
  {
    title: "Post-lansare",
    items: [
      "30 de zile de suport post-lansare",
      "Istoric de deploy cu versionare",
      "Hosting administrat disponibil la 30€/lună după perioada inclusă",
    ],
  },
];
