import http from "node:http";

const PORT = 5000;

const prolinenData = {
  id: "prolinen",
  slug: "prolinen",
  status: "PUBLISHED",
  featured: true,
  publishedAt: "2026-03-01T12:00:00.000Z",
  kicker: "STUDIU DE CAZ · WEBSITE B2B PENTRU SPĂLĂTORIE INDUSTRIALĂ HORECA",
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
      caption: "Hero — poziționare clară + zonă deservită, vizibile fără scroll",
    },
  ],
  stats: [
    { value: "5", label: "categorii de textile, prezentate impecabil" },
    { value: "4", label: "pași expl. în procesul de colectare–livrare" },
    { value: "2", label: "zone deservite: Brașov & Întorsura Buzăului" },
    { value: "100%", label: "site responsive, gata pentru orice ecran" },
  ],
};

import fs from "node:fs";
import path from "node:path";

let GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || "AIzaSyCXj1vBc6uSbFtFUKbJ6-9aoY_9cukxIvg";
let GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJw6SOcVc9DEgRNJlM7wTTejs";

try {
  const envPath = path.resolve(process.cwd(), "server/.env");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = (match[2] || "").trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (key === "GOOGLE_PLACES_API_KEY") GOOGLE_PLACES_API_KEY = val;
        if (key === "GOOGLE_PLACE_ID") GOOGLE_PLACE_ID = val;
      }
    }
  }
} catch (e) {
  // ignore
}

const DEFAULT_REVIEWS = [
  {
    author: "Ali Baba",
    avatarUrl: "https://lh3.googleusercontent.com/a-/ALV-UjUMzfPDyhQ0vv2SZe_TZMkScrThSNAqixskE6JXDv6vO4ZOriDN=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Foarte Profi\nM a ajutat în dezvoltarea afacerii mele foarte mult!!!",
    relativeTime: "acum 3 săptămâni",
  },
  {
    author: "zew Stroie",
    avatarUrl: "https://lh3.googleusercontent.com/a-/ALV-UjU0TjF8Gbnco72k5shhI5En4OyufgiZsKz2-sEJZOCh1UovNK0=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Design curat, comunicare clară, termene respectate. A Squared Studio a transformat un site vechi și greoi într-unul modern și funcțional. Recomand cu încredere.",
    relativeTime: "acum 3 săptămâni",
  },
  {
    author: "Drgj Ciorobitca",
    avatarUrl: "https://lh3.googleusercontent.com/a-/ALV-UjXrpU-NytdO0kBjp3-MJlw1YzMm2q-yLvHkjH-B17oTVhpdYDw=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Colaborare excelentă și servicii profesionale de 5 stele!",
    relativeTime: "acum 3 săptămâni",
  },
  {
    author: "Neagoe Alex",
    avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKXsGeyJiOI4Ue_KHYpgFnCGz0Uk1D9q_Fqlmjlgofg6fN2WA=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Recomand cu încredere A Squared Studio. Calitate ireproșabilă!",
    relativeTime: "acum 3 săptămâni",
  },
];

let reviewsCache = {
  data: {
    configured: true,
    rating: 5,
    totalReviews: 4,
    mapsUrl: "https://maps.google.com/?cid=4285970013544552756&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA",
    reviews: DEFAULT_REVIEWS,
  },
  fetchedAt: 0,
};

async function getLiveReviews() {
  const isFresh = reviewsCache.data && Date.now() - reviewsCache.fetchedAt < 60 * 60 * 1000;
  if (isFresh && reviewsCache.fetchedAt > 0) {
    return reviewsCache.data;
  }

  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    return reviewsCache.data;
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?languageCode=ro`;
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "id,displayName,formattedAddress,rating,userRatingCount,reviews,googleMapsUri",
      },
    });

    if (response.ok) {
      const payload = await response.json();
      const rawReviews = payload.reviews || [];
      const fallbackTexts = [
        "Foarte Profi\nM a ajutat în dezvoltarea afacerii mele foarte mult!!!",
        "Design curat, comunicare clară, termene respectate. A Squared Studio a transformat un site vechi și greoi într-unul modern și funcțional. Recomand cu încredere.",
        "Colaborare excelentă și servicii profesionale de 5 stele!",
        "Recomand cu încredere A Squared Studio. Calitate ireproșabilă!",
      ];

      const mappedReviews = rawReviews
        .filter((r) => (r.rating || 5) >= 4)
        .map((r, idx) => ({
          author: r.authorAttribution?.displayName || "Client A Squared Studio",
          avatarUrl: r.authorAttribution?.photoUri || null,
          rating: r.rating || 5,
          text: (r.text?.text || r.originalText?.text || "").trim() || fallbackTexts[idx % fallbackTexts.length],
          relativeTime: r.relativePublishTimeDescription || "recent",
        }));

      reviewsCache = {
        data: {
          configured: true,
          rating: payload.rating ?? 5,
          totalReviews: payload.userRatingCount ?? mappedReviews.length,
          mapsUrl: payload.googleMapsUri || `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`,
          reviews: mappedReviews.length > 0 ? mappedReviews : DEFAULT_REVIEWS,
        },
        fetchedAt: Date.now(),
      };
      return reviewsCache.data;
    }
  } catch (err) {
    console.warn("Eroare interogare Google Places API (mock server):", err.message);
  }

  return reviewsCache.data;
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  if (path === "/api/reviews") {
    const reviewsData = await getLiveReviews();
    res.writeHead(200);
    res.end(
      JSON.stringify({
        success: true,
        data: reviewsData,
      })
    );
    return;
  }

  if (path === "/api/case-studies") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        success: true,
        data: [
          {
            id: prolinenData.id,
            slug: prolinenData.slug,
            kicker: prolinenData.kicker,
            title: prolinenData.title,
            description: prolinenData.description,
            featured: prolinenData.featured,
            publishedAt: prolinenData.publishedAt,
          },
        ],
      })
    );
    return;
  }

  if (path === "/api/case-studies/prolinen") {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: prolinenData }));
    return;
  }

  if (path === "/api/contact" && req.method === "POST") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        success: true,
        message: "Mesajul a fost trimis cu succes! Te vom contacta în cel mai scurt timp.",
      })
    );
    return;
  }

  if (path.startsWith("/api/analytics")) {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true }));
    return;
  }

  if (path.startsWith("/api/admin/auth/me")) {
    res.writeHead(401);
    res.end(JSON.stringify({ success: false, message: "Neautentificat" }));
    return;
  }

  if (path === "/api/health") {
    res.writeHead(200);
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ success: false, message: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Mock dev API server running on http://localhost:${PORT}`);
});
