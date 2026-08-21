import { prisma } from "../src/lib/prisma.js";

async function main() {
  const existing = await prisma.caseStudy.findUnique({
    where: { slug: "prolinen" },
  });

  if (existing) {
    console.log("ProLinen case study already exists, skipping seed.");
    return;
  }

  await prisma.caseStudy.create({
    data: {
      slug: "prolinen",
      status: "PUBLISHED",
      featured: true,
      publishedAt: new Date(),

      kicker:
        "STUDIU DE CAZ · WEBSITE B2B PENTRU SPĂLĂTORIE INDUSTRIALĂ HORECA",
      title: "Un site care vinde, pentru o afacere B2B foarte specifică",
      description:
        "Echipa noastră a construit site-ul ProLinen HORECA de la zero: o prezentare directă a serviciului de spălătorie industrială pentru hoteluri și restaurante, cu procesul de colectare–spălare–livrare explicat pas cu pas și un singur obiectiv clar pentru vizitator — cererea de ofertă.",

      role: "Web design & dezvoltare",
      timeline: "De la brief la site live, într-un singur sprint",
      overview:
        "ProLinen HORECA spală și livrează lenjerie pentru hoteluri și restaurante din Brașov și Întorsura Buzăului. E un serviciu B2B foarte specific — clientul lor nu caută inspirație, caută răspunsuri clare: ce spălați, cum funcționează programul de livrare și cum cer o ofertă. Site-ul trebuia să răspundă la exact atât, fără decor în plus.",

      challengeIntro:
        "Un site B2B pentru un serviciu operațional are un singur job: să elimine orice ezitare înainte de „Cere o ofertă”. Trei lucruri stăteau în cale:",
      challengePoints: [
        "Serviciul e greu de explicat rapid — colectare, spălare, control calitate, livrare — fără să pară o listă seacă de proceduri.",
        "Zona deservită (Brașov & Întorsura Buzăului) trebuie să fie evidentă din prima secundă, ca un hotelier din altă zonă să nu piardă timp citind.",
        "Cele 5 categorii de textile (lenjerie de pat, prosoape, fețe de masă, uniforme, covorașe) trebuiau să fie ușor de scanat, nu înghesuite într-un singur paragraf.",
      ],

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
      results:
        "Rezultatul e un site pe care un hotelier îl poate parcurge în sub un minut și tot ce mai trebuie să facă e să apese „Cere o ofertă”. Pentru un serviciu B2B de nișă, asta contează mai mult decât orice animație — claritatea e ceea ce transformă un hotelier ezitant într-un client care sună azi.",

      gallery: [
        {
          src: "/case-studies/prolinen/hero.jpg",
          caption:
            "Hero — poziționare clară + zonă deservită, vizibile fără scroll",
        },
      ],

      stats: [
        { value: "5", label: "categorii de textile, prezentate impecabil" },
        {
          value: "4",
          label: "pași expl. în procesul de colectare–livrare",
        },
        {
          value: "2",
          label: "zone deservite: Brașov & Întorsura Buzăului",
        },
        { value: "100%", label: "site responsive, gata pentru orice ecran" },
      ],
    },
  });

  console.log("Seeded ProLinen case study.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
