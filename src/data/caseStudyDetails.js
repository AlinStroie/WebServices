/**
 * Full case-study page content, keyed by portfolio project id. Only
 * projects with real, shipped work get an entry here — mocks stay on the
 * generic /project/:id placeholder. Structure follows dixieraizpacheco.com's
 * own project pages (metadata row, overview, challenge, approach, solution,
 * gallery, live-site embed, results) rebuilt with our layout/motion and our
 * own honest content — no invented metrics for a real client's site.
 */
export const caseStudyDetails = {
  prolinen: {
    role: "Web design & dezvoltare",
    timeline: "De la brief la site live, într-un singur sprint",
    overview:
      "ProLinen HORECA spală și livrează lenjerie pentru hoteluri și restaurante din Brașov și Întorsura Buzăului. E un serviciu B2B foarte specific — clientul lor nu caută inspirație, caută răspunsuri clare: ce spălați, cum funcționează programul de livrare și cum cer o ofertă. Site-ul trebuia să răspundă la exact atât, fără decor în plus.",
    challenge: {
      intro:
        "Un site B2B pentru un serviciu operațional are un singur job: să elimine orice ezitare înainte de „Cere o ofertă”. Trei lucruri stăteau în cale:",
      points: [
        "Serviciul e greu de explicat rapid — colectare, spălare, control calitate, livrare — fără să pară o listă seacă de proceduri.",
        "Zona deservită (Brașov & Întorsura Buzăului) trebuie să fie evidentă din prima secundă, ca un hotelier din altă zonă să nu piardă timp citind.",
        "Cele 5 categorii de textile (lenjerie de pat, prosoape, fețe de masă, uniforme, covorașe) trebuiau să fie ușor de scanat, nu înghesuite într-un singur paragraf.",
      ],
    },
    approach: [
      {
        title: "Claritate înainte de estetică",
        text: "Titlul, subtitlul și butonul de ofertă rezolvă totul din primele 3 secunde — restul paginii doar susține decizia deja luată.",
      },
      {
        title: "Procesul, ca argument de vânzare",
        text: "Colectare → spălare → control → livrare devine o secțiune vizuală proprie, nu o listă ascunsă în footer.",
      },
      {
        title: "O acțiune, repetată consecvent",
        text: "„Cere o ofertă” apare la fiecare punct de decizie relevant, mereu cu același stil, ca vizitatorul să nu-l caute de două ori.",
      },
      {
        title: "Conținut ușor de întreținut",
        text: "Categoriile de textile și pașii procesului sunt structurate ca blocuri repetabile, ușor de editat sau extins fără să umbli prin cod.",
      },
    ],
    solution:
      "Echipa noastră a construit o pagină unică, de lungime medie, organizată strict pe intenția vizitatorului: cine sunt (hero + zonă deservită), ce spală (cele 5 categorii, fiecare cu iconiță și descriere scurtă), cum funcționează (proces în 4 pași, cu imagini reale din operațiune) și cum cer o ofertă (CTA repetat + formular de contact). Fără galerie decorativă, fără testimoniale inventate — doar informația de care are nevoie un hotelier ca să ia decizia.",
    gallery: [
      {
        src: "/case-studies/prolinen/hero.jpg",
        caption: "Hero — poziționare clară + zonă deservită, vizibile fără scroll",
      },
    ],
    results:
      "Rezultatul e un site pe care un hotelier îl poate parcurge în sub un minut și tot ce mai trebuie să facă e să apese „Cere o ofertă”. Pentru un serviciu B2B de nișă, asta contează mai mult decât orice animație — claritatea e ceea ce transformă un hotelier ezitant într-un client care sună azi.",
  },
};
