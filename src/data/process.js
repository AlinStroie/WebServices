export const processSteps = [
  {
    number: "01",
    title: "Discutăm ideea",
    shortText: "Înțelegem obiectivul site-ului și direcția proiectului.",
    tag: "Brief",
    previewType: "brief",
    hoverPoints: ["obiectiv clar", "public țintă", "stil vizual"],
    details: {
      intro:
        "În această etapă stabilim scopul proiectului și aflăm ce trebuie să transmită site-ul.",
      points: [
        "tipul site-ului necesar",
        "publicul țintă",
        "serviciile sau produsele promovate",
        "stilul vizual dorit",
        "funcționalitățile principale",
      ],
      result:
        "La final avem un brief clar, pe baza căruia putem construi structura site-ului.",
    },
  },
  {
    number: "02",
    title: "Stabilim structura",
    shortText: "Organizăm paginile, secțiunile și traseul utilizatorului.",
    tag: "Structură",
    previewType: "sitemap",
    hoverPoints: ["pagini principale", "secțiuni clare", "traseu logic"],
    details: {
      intro:
        "Construim scheletul site-ului astfel încât utilizatorul să înțeleagă rapid ce oferi și cum te poate contacta.",
      points: [
        "stabilim paginile importante",
        "ordonăm secțiunile în mod logic",
        "definim call-to-action-urile",
        "pregătim structura pentru desktop și mobil",
        "eliminăm informațiile inutile",
      ],
      result:
        "La final avem o structură clară, ușor de transformat în design și cod.",
    },
  },
  {
    number: "03",
    title: "Realizăm designul",
    shortText: "Creăm direcția vizuală: layout, culori, carduri și spațiere.",
    tag: "Design",
    previewType: "design",
    hoverPoints: ["layout premium", "culori potrivite", "UI modern"],
    details: {
      intro:
        "Transformăm structura într-o interfață vizuală modernă, curată și potrivită pentru brand.",
      points: [
        "alegem stilul vizual",
        "definim paleta de culori",
        "stabilim tipografia",
        "creăm carduri și secțiuni aerisite",
        "adaptăm designul pentru mobil",
      ],
      result:
        "La final avem o direcție vizuală coerentă, pregătită pentru dezvoltare.",
    },
  },
  {
    number: "04",
    title: "Dezvoltăm site-ul",
    shortText: "Transformăm designul în cod responsive, rapid și curat.",
    tag: "Development",
    previewType: "code",
    hoverPoints: ["React", "Tailwind", "responsive"],
    details: {
      intro:
        "Construim site-ul în React, cu componente reutilizabile și structură ușor de modificat.",
      points: [
        "scriem componente clare",
        "folosim Tailwind pentru stilizare rapidă",
        "optimizăm pentru mobil și desktop",
        "adăugăm animații fine",
        "pregătim proiectul pentru publicare",
      ],
      result:
        "La final avem un site funcțional, modern și ușor de întreținut.",
    },
  },
  {
    number: "05",
    title: "Testăm și publicăm",
    shortText: "Verificăm afișarea, viteza, linkurile și formularul.",
    tag: "Launch",
    previewType: "checklist",
    hoverPoints: ["test mobil", "viteză", "publicare"],
    details: {
      intro:
        "Înainte de publicare, verificăm site-ul pe mai multe dimensiuni de ecran și corectăm problemele vizibile.",
      points: [
        "testăm pe desktop și mobil",
        "verificăm formularul",
        "verificăm linkurile",
        "facem build pentru producție",
        "pregătim publicarea online",
      ],
      result:
        "La final site-ul este pregătit să fie publicat și trimis către client.",
    },
  },
  {
    number: "06",
    title: "Oferim suport",
    shortText: "Ajutăm cu modificări, mentenanță și îmbunătățiri ulterioare.",
    tag: "Support",
    previewType: "support",
    hoverPoints: ["update-uri", "mentenanță", "suport"],
    details: {
      intro:
        "După livrare, site-ul poate fi ajustat, actualizat sau extins în funcție de nevoile afacerii.",
      points: [
        "modificări de text sau imagini",
        "adăugare secțiuni noi",
        "verificări periodice",
        "optimizări simple",
        "suport pentru publicare și mentenanță",
      ],
      result:
        "La final clientul are un site care poate evolua odată cu afacerea.",
    },
  },
];