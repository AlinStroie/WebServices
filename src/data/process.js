export const processSteps = [
  {
    number: "01",
    title: "Clarificăm direcția proiectului",
    shortText:
      "Începem prin a înțelege ce trebuie să transmită site-ul și ce rezultat vrei să obții.",
    tag: "Brief",
    previewType: "brief",
    hoverPoints: ["obiectiv clar", "public țintă", "direcție vizuală"],
    details: {
      intro:
        "Înainte de design sau cod, stabilim scopul real al site-ului: ce trebuie să comunice, cui se adresează și ce acțiune trebuie să facă vizitatorul.",
      points: [
        "analizăm tipul afacerii și serviciile oferite",
        "stabilim publicul țintă și nevoile lui",
        "definim obiectivul principal al site-ului",
        "discutăm stilul vizual potrivit pentru brand",
        "identificăm funcționalitățile necesare",
      ],
      result:
        "La finalul etapei avem o direcție clară, astfel încât site-ul să nu fie doar frumos, ci construit cu un scop concret.",
    },
  },
  {
    number: "02",
    title: "Construim structura site-ului",
    shortText:
      "Organizăm paginile și secțiunile astfel încât informația să fie ușor de parcurs.",
    tag: "Arhitectură",
    previewType: "sitemap",
    hoverPoints: ["pagini logice", "CTA-uri clare", "traseu simplu"],
    details: {
      intro:
        "Un site bun nu înseamnă doar design. Structura trebuie să conducă vizitatorul natural de la prima impresie până la contact, programare sau cerere de ofertă.",
      points: [
        "definim paginile și secțiunile necesare",
        "ordonăm informația în funcție de importanță",
        "stabilim call-to-action-urile principale",
        "pregătim traseul utilizatorului pentru desktop și mobil",
        "eliminăm conținutul inutil sau repetitiv",
      ],
      result:
        "La final avem scheletul site-ului: clar, logic și pregătit pentru design, fără secțiuni puse doar ca să umple spațiul.",
    },
  },
  {
    number: "03",
    title: "Creăm direcția vizuală",
    shortText:
      "Transformăm structura într-un design modern, coerent și potrivit pentru identitatea afacerii.",
    tag: "Design",
    previewType: "design",
    hoverPoints: ["layout premium", "stil coerent", "UI curat"],
    details: {
      intro:
        "Designul este gândit să transmită încredere și profesionalism, dar și să ajute utilizatorul să înțeleagă rapid ce oferi.",
      points: [
        "stabilim stilul vizual general",
        "alegem culori, fonturi și spațiere potrivite",
        "creăm carduri, secțiuni și zone de impact",
        "adaptăm designul pentru mobil, tabletă și desktop",
        "păstrăm un aspect curat, fără elemente încărcate inutil",
      ],
      result:
        "La final ai o direcție vizuală clară, modernă și ușor de recunoscut, nu un template generic modificat superficial.",
    },
  },
  {
    number: "04",
    title: "Dezvoltăm site-ul în React",
    shortText:
      "Transformăm designul în cod curat, responsive și ușor de modificat ulterior.",
    tag: "Development",
    previewType: "code",
    hoverPoints: ["React", "Tailwind", "cod reutilizabil"],
    details: {
      intro:
        "Site-ul este construit pe componente reutilizabile, astfel încât textele, secțiunile și informațiile importante să poată fi modificate rapid.",
      points: [
        "dezvoltăm interfața în React",
        "folosim Tailwind pentru un design flexibil și rapid",
        "separăm datele importante în fișiere ușor de editat",
        "optimizăm afișarea pentru toate dimensiunile de ecran",
        "adăugăm animații fine, fără să afectăm inutil performanța",
      ],
      result:
        "La final site-ul este funcțional, responsive și organizat corect, astfel încât să poată fi întreținut sau extins mai ușor.",
    },
  },
  {
    number: "05",
    title: "Testăm și pregătim publicarea",
    shortText:
      "Verificăm site-ul înainte de lansare: afișare, butoane, formulare, viteză și experiență pe mobil.",
    tag: "Launch",
    previewType: "checklist",
    hoverPoints: ["test mobil", "verificări finale", "publicare"],
    details: {
      intro:
        "Înainte ca site-ul să fie publicat, verificăm zonele importante pentru ca experiența utilizatorului să fie cât mai clară și stabilă.",
      points: [
        "testăm site-ul pe desktop, tabletă și telefon",
        "verificăm linkurile, butoanele și formularul de contact",
        "corectăm problemele vizibile de layout",
        "pregătim build-ul pentru producție",
        "verificăm viteza și comportamentul general al paginii",
      ],
      result:
        "La final site-ul este pregătit pentru publicare și poate fi prezentat clientului sau urcat online.",
    },
  },
  {
    number: "06",
    title: "Oferim suport după livrare",
    shortText:
      "După publicare, site-ul poate fi ajustat, îmbunătățit sau extins în funcție de nevoile afacerii.",
    tag: "Support",
    previewType: "support",
    hoverPoints: ["modificări", "mentenanță", "îmbunătățiri"],
    details: {
      intro:
        "Un site nu trebuie să rămână blocat în forma inițială. Pe măsură ce afacerea evoluează, pot fi adăugate secțiuni, texte, servicii sau funcționalități noi.",
      points: [
        "actualizăm texte, imagini sau informații",
        "adăugăm secțiuni noi atunci când este nevoie",
        "facem mici ajustări de design sau structură",
        "verificăm periodic funcționarea site-ului",
        "putem pregăti extinderi ulterioare, precum blog, SEO sau analytics",
      ],
      result:
        "La final clientul nu primește doar un site predat și uitat, ci o bază digitală care poate fi îmbunătățită în timp.",
    },
  },
];