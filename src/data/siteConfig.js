export const siteConfig = {
  siteUrl: "https://asquaredstudio.ro",

  brand: {
    name: "A Squared Studio",
    shortName: "A² Studio",
    logoLetter: "A²",
    tagline: "Site-uri de excepție, construite de o echipă care transformă vizitatori în clienți fideli.",
  },

  contact: {
    email: "contact@asquaredstudio.ro",
    phone: "+40 729 818 039",
    whatsapp: "+40 729 818 039",
    location: "Brașov, România",
  },

  social: {
    instagram: "https://instagram.com/byasqared.studio/",
    facebook: "https://facebook.com/profile.php?id=61589528503382",
    linkedin: "https://linkedin.com/a-squared-studio-33a25340b/",
  },

  navigation: [
    { label: "Acasă", href: "#home" },
    { label: "Servicii", href: "#servicii" },
    { label: "Portofoliu", href: "#portofoliu" },
    { label: "Proces", href: "#proces" },
    { label: "Studii de caz", href: "/studii-de-caz" },
    { label: "Prețuri", href: "#preturi" },
  ],

  hero: {
    eyebrow: "Web design / prezență online",
    title: "Site-uri clare, rapide și bine structurate.",
    subtitle:
      "Construim website-uri de prezentare, landing page-uri și portofolii pentru afaceri care vor să arate profesionist online, fără design încărcat inutil.",
    primaryButton: "Vezi exemple",
    secondaryButton: "Cere recomandare",
  },

  seo: {
    defaultTitle: "A Squared Studio",
    titleTemplate: "%s | A Squared Studio",
    description:
      "Agenție de web design din Brașov — echipa noastră construiește site-uri de prezentare, landing page-uri și magazine online care transformă vizitatorii în clienți.",
    keywords:
      "agenție web design, creare site web, site de prezentare, landing page, web design Brașov, portofoliu, SEO, mentenanță website",
    ogImage: "/banner site.svg",
  },

  legal: {
    privacy: {
      eyebrow: "Politică de confidențialitate",
      title: "Cum sunt protejate datele tale",
      subtitle:
        "Această politică explică ce date pot fi colectate prin intermediul site-ului, de ce sunt necesare și cum sunt folosite.",
      updatedAt: "Mai 2026",
      highlights: [
        "Colectăm doar datele necesare pentru a răspunde cererilor trimise prin formular.",
        "Datele nu sunt vândute și nu sunt transmise către terți în scopuri comerciale.",
        "Poți solicita oricând ștergerea sau modificarea datelor transmise.",
        "Site-ul poate folosi cookies necesare pentru funcționare și experiența de navigare.",
      ],
      sections: [
        {
          label: "01",
          title: "Ce date putem colecta",
          content: [
            "Prin formularul de contact pot fi colectate date precum numele, adresa de email, numărul de telefon și mesajul transmis.",
            "Aceste informații sunt oferite voluntar atunci când alegi să trimiți o cerere de ofertă sau să soliciți detalii despre servicii.",
          ],
          points: [
            "nume și prenume, dacă sunt completate în formular;",
            "adresă de email pentru răspuns;",
            "număr de telefon, dacă alegi să îl trimiți;",
            "detalii despre proiectul sau serviciul solicitat.",
          ],
        },
        {
          label: "02",
          title: "De ce folosim aceste date",
          content: [
            "Datele sunt folosite exclusiv pentru a putea răspunde solicitării tale, pentru a înțelege nevoia proiectului și pentru a transmite informații relevante despre serviciile cerute.",
            "Nu folosim datele trimise prin formular pentru spam, campanii agresive sau comunicări care nu au legătură cu solicitarea inițială.",
          ],
          points: [
            "răspuns la cererea de ofertă;",
            "clarificarea detaliilor proiectului;",
            "transmiterea unei propuneri comerciale;",
            "comunicare ulterioară legată strict de proiect.",
          ],
        },
        {
          label: "03",
          title: "Cât timp păstrăm datele",
          content: [
            "Datele sunt păstrate doar atât timp cât este necesar pentru gestionarea solicitării, pentru comunicarea cu tine și, dacă este cazul, pentru respectarea unor obligații administrative sau legale.",
            "Dacă proiectul nu se concretizează, datele pot fi șterse la cerere.",
          ],
        },
        {
          label: "04",
          title: "Cui pot fi transmise datele",
          content: [
            "Datele nu sunt vândute, închiriate sau distribuite către terți în scopuri comerciale.",
            "În anumite situații, pot fi folosite servicii tehnice necesare funcționării site-ului, precum hosting, email sau instrumente de securitate.",
          ],
        },
        {
          label: "05",
          title: "Drepturile tale",
          content: [
            "Ai dreptul să soliciți acces la datele transmise, corectarea lor, ștergerea acestora sau limitarea prelucrării, în condițiile prevăzute de legislația aplicabilă.",
            "Pentru orice solicitare legată de datele personale, ne poți contacta folosind datele afișate pe site.",
          ],
          points: [
            "dreptul de acces la date;",
            "dreptul de rectificare;",
            "dreptul de ștergere;",
            "dreptul de opoziție sau restricționare a prelucrării.",
          ],
        },
      ],
    },

    cookies: {
      eyebrow: "Politică de cookies",
      title: "Cum folosim cookies pe site",
      subtitle:
        "Această politică explică ce sunt cookies, ce rol au și cum pot influența experiența ta de navigare pe site.",
      updatedAt: "Mai 2026",
      highlights: [
        "Cookies necesare pot fi folosite pentru funcționarea corectă a site-ului.",
        "Preferința ta privind cookies poate fi salvată local în browser.",
        "Nu folosim cookies pentru a vinde date personale.",
        "Poți șterge sau bloca cookies direct din setările browserului.",
      ],
      sections: [
        {
          label: "01",
          title: "Ce sunt cookies",
          content: [
            "Cookies sunt fișiere mici salvate în browserul tău atunci când vizitezi un site.",
            "Ele ajută site-ul să rețină anumite preferințe sau să funcționeze corect.",
          ],
        },
        {
          label: "02",
          title: "Ce cookies folosim momentan",
          content: [
            "În versiunea actuală, site-ul salvează local preferința privind acordul pentru cookies, astfel încât bannerul să nu fie afișat la fiecare vizită.",
            "Această preferință este salvată în browser prin localStorage, nu într-o bază de date externă.",
          ],
          points: [
            "cookie-consent: reține dacă ai acceptat sau refuzat bannerul de cookies;",
            "nu trimite date personale către server;",
            "poate fi șters din browser oricând.",
          ],
        },
        {
          label: "03",
          title: "Cookies necesare",
          content: [
            "Cookies necesare sunt folosite pentru funcționarea de bază a site-ului, pentru securitate, afișare corectă sau salvarea unor preferințe esențiale.",
            "Acestea nu au scop publicitar și nu urmăresc comportamentul utilizatorului în afara site-ului.",
          ],
        },
        {
          label: "04",
          title: "Cookies de analiză sau marketing",
          content: [
            "Dacă în viitor vor fi adăugate instrumente precum Google Analytics, Meta Pixel sau alte servicii similare, acestea vor fi menționate în această politică.",
            "Pentru astfel de instrumente, este recomandată obținerea consimțământului înainte de activarea lor, în funcție de legislația aplicabilă.",
          ],
        },
        {
          label: "05",
          title: "Cum poți controla cookies",
          content: [
            "Poți șterge, bloca sau gestiona cookies din setările browserului folosit.",
            "Blocarea anumitor cookies poate afecta funcționarea unor părți ale site-ului.",
          ],
        },
      ],
    },

    gdpr: {
      eyebrow: "Date personale",
      title: "Acord GDPR",
      content: [
        "Prin trimiterea formularului, ești de acord cu prelucrarea datelor introduse.",
        "Datele sunt folosite pentru comunicare și ofertare.",
        "Nu solicităm date sensibile prin formular.",
      ],
    },
  },
};
