# Web Services Portfolio

Un website modern de prezentare pentru servicii web, construit cu **React**, **Vite** și **Tailwind CSS**. Proiectul este gândit pentru o agenție mică, freelancer sau studio digital care oferă servicii de creare site-uri, landing page-uri, portofolii, magazine online simple, mentenanță și optimizare SEO de bază.

Designul este inspirat de stilul modern, premium și minimalist: fundal închis, text mare, carduri elegante, animații fine și layout responsive.

---

## Preview

Website-ul include următoarele secțiuni:

- Navbar responsive
- Hero section cu mesaj principal și call-to-action
- Beneficii
- Servicii
- Portofoliu / Showcase
- Proces de lucru
- Pachete de prețuri
- Call-to-action final
- Formular de contact
- Footer

---

## Tehnologii folosite

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- JavaScript

---

## Funcționalități

- Design modern, dark și minimalist
- Layout responsive pentru desktop, tabletă și mobil
- Animații smooth la scroll și hover
- Componente reutilizabile
- Date separate în fișiere dedicate
- Formular de contact cu mesaj local de succes
- Structură clară și ușor de modificat
- Secțiuni potrivite pentru site de agenție / freelancer

---

## Structura proiectului

```txt
web-services-portfolio/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AnimatedSection.jsx
│   │   ├── Benefits.jsx
│   │   ├── Contact.jsx
│   │   ├── CTA.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Pricing.jsx
│   │   ├── Process.jsx
│   │   ├── SectionHeader.jsx
│   │   └── Services.jsx
│   │
│   ├── data/
│   │   ├── benefits.js
│   │   ├── portfolio.js
│   │   ├── pricing.js
│   │   ├── process.js
│   │   └── services.js
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md

Instalare și rulare locală
1. Clonează repository-ul
git clone https://github.com/AlinStroie/WebServices.git
2. Intră în folderul proiectului
cd WebServices
3. Instalează dependențele
npm install
4. Pornește serverul de dezvoltare
npm run dev

După rulare, proiectul va fi disponibil de obicei la:

http://localhost:5173/
Build pentru producție

Pentru generarea versiunii finale:

npm run build

Fișierele generate vor fi în folderul:

dist/

Pentru preview local al build-ului:

npm run preview
Personalizare proiect
Schimbarea numelui brandului

Numele brandului poate fi modificat în:

src/components/Navbar.jsx
src/components/Footer.jsx

Caută:

WebNova Studio

și înlocuiește cu numele dorit.

Modificarea serviciilor

Serviciile se modifică din:

src/data/services.js

Acolo poți schimba:

titlul serviciului;
descrierea;
iconița folosită.
Modificarea beneficiilor

Beneficiile se modifică din:

src/data/benefits.js
Modificarea portofoliului

Proiectele demo se modifică din:

src/data/portfolio.js

Fiecare proiect are:

titlu;
categorie;
descriere;
gradient vizual.
Modificarea pachetelor de preț

Pachetele se modifică din:

src/data/pricing.js

Exemplu:

{
  name: "Basic",
  price: "de la 300€",
  description: "Pentru site simplu de prezentare sau pagină one-page.",
  highlight: false,
  features: [
    "Design responsive",
    "Până la 4 secțiuni",
    "Formular de contact",
    "Buton WhatsApp",
    "SEO basic",
  ],
}
Modificarea datelor de contact

Datele de contact se modifică din:

src/components/Contact.jsx
src/components/Footer.jsx

Poți schimba:

email;
telefon;
locație;
textul formularului.
Formularul de contact

Formularul de contact este momentan local. La trimitere, acesta afișează un mesaj de succes, dar nu trimite email și nu salvează datele într-o bază de date.

Pentru funcționalitate reală, formularul poate fi conectat ulterior la:

EmailJS;
Formspree;
un backend propriu;
o funcție serverless.
Securitate

În forma actuală, formularul nu trimite date către server, deci riscurile sunt reduse.

Pentru o variantă de producție, sunt recomandate:

validare client-side;
validare server-side;
limitare număr cereri;
protecție anti-spam;
honeypot field;
protecție CSRF dacă se folosește autentificare sau sesiune;
evitarea expunerii cheilor API în frontend.
Design

Direcția vizuală a proiectului:

fundal negru / foarte închis;
text alb și gri deschis;
accente discrete;
carduri cu border subtil;
efect glass / blur;
colțuri rotunjite;
spațiere generoasă;
animații fine;
aspect premium și minimalist.
Secțiuni principale
Hero

Secțiune principală cu titlu mare, subtitlu și butoane call-to-action.

Beneficii

Prezintă avantajele principale ale serviciilor oferite.

Servicii

Listă de servicii web:

site de prezentare;
landing page;
portofoliu personal;
magazin online simplu;
redesign site vechi;
mentenanță lunară.
Portofoliu

Proiecte fictive/demo care pot fi înlocuite cu proiecte reale.

Proces

Pașii de lucru de la idee până la publicarea site-ului.

Prețuri

Trei pachete orientative:

Basic;
Standard;
Premium.
Contact

Formular simplu și date de contact.

Comenzi utile
npm install
npm run dev
npm run build
npm run preview
Status proiect

Proiectul este funcțional și poate fi rulat local. Este potrivit ca bază pentru un site real de prezentare, portofoliu sau servicii web.

Autor

Proiect realizat de Alin Stroie.

Licență

Acest proiect poate fi folosit și modificat în scop personal, educațional sau comercial.