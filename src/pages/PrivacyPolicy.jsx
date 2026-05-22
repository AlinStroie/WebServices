import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";

function PrivacyPolicy() {
  const companyName =
    siteConfig?.company?.name || "A Squared Studio";

  const companyEmail =
    siteConfig?.contact?.email ||
    siteConfig?.company?.email ||
    "contact@example.com";

  return (
    <main className="min-h-screen bg-black px-5 py-28 text-white lg:px-8">
      <SEO
        title="Politica de confidențialitate / GDPR"
        description="Informații despre modul în care colectăm, folosim și protejăm datele personale."
      />

      <section className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-8 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white/50 transition hover:bg-white hover:text-black"
        >
          Înapoi la site
        </Link>

        <p className="text-sm uppercase tracking-[0.35em] text-white/35">
          Legal
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Politica de confidențialitate / GDPR
        </h1>

        <p className="mt-6 text-lg leading-8 text-white/55">
          Această politică explică modul în care {companyName} colectează,
          folosește, stochează și protejează datele personale transmise prin
          website.
        </p>

        <div className="mt-12 space-y-8 text-white/60">
          <LegalSection title="1. Operatorul datelor">
            <p>
              Operatorul datelor este {companyName}. Pentru orice solicitare
              privind datele personale, ne poți contacta la adresa:
              <span className="text-white"> {companyEmail}</span>.
            </p>
            <p className="mt-3">
              După definitivarea datelor firmei/PFA, această secțiune trebuie
              completată cu denumirea completă, forma juridică, sediul și datele
              de identificare.
            </p>
          </LegalSection>

          <LegalSection title="2. Ce date colectăm">
            <p>Prin formularul de contact putem colecta:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>nume și prenume;</li>
              <li>adresă de email;</li>
              <li>număr de telefon, dacă este completat;</li>
              <li>mesajul transmis prin formular;</li>
              <li>pachetul sau serviciul selectat;</li>
              <li>pagina de pe care a fost trimisă solicitarea.</li>
            </ul>
            <p className="mt-4">
              Pentru securitate, prevenirea spamului și diagnosticarea erorilor,
              putem colecta și date tehnice precum adresa IP, tipul browserului,
              dispozitivul folosit și user-agent-ul, dacă această funcție este
              activată în backend.
            </p>
          </LegalSection>

          <LegalSection title="3. Scopul prelucrării">
            <p>Datele sunt folosite pentru:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>preluarea și analizarea cererilor trimise prin formular;</li>
              <li>contactarea persoanei care a solicitat o ofertă;</li>
              <li>pregătirea unei propuneri comerciale;</li>
              <li>administrarea solicitărilor primite;</li>
              <li>securitatea site-ului și prevenirea abuzurilor;</li>
              <li>
                analizarea performanței site-ului, doar dacă utilizatorul a
                acceptat cookie-urile de analiză.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Temeiul legal">
            <p>
              Datele din formular sunt prelucrate pentru a răspunde unei cereri
              transmise de utilizator și pentru demersuri precontractuale.
              Datele tehnice strict necesare pot fi prelucrate pentru interesul
              legitim de securitate și prevenire a abuzurilor. Datele de
              analytics sunt prelucrate doar pe baza consimțământului.
            </p>
          </LegalSection>

          <LegalSection title="5. Analytics și UTM">
            <p>
              Website-ul poate folosi analytics propriu pentru a înțelege cum
              este utilizat site-ul: pagini vizitate, clickuri pe butoane,
              interacțiuni cu blogul, formularul și sursele de trafic UTM.
            </p>
            <p className="mt-3">
              Aceste date sunt colectate doar dacă utilizatorul acceptă
              cookie-urile de analiză. Dacă utilizatorul refuză analytics, nu
              salvăm sessionId, UTM-uri sau evenimente de tracking asociate
              formularului.
            </p>
          </LegalSection>

          <LegalSection title="6. Unde sunt stocate datele">
            <p>
              Datele formularului sunt salvate în baza de date a aplicației și
              pot fi transmise prin email către adresa firmei. Pentru funcționarea
              site-ului putem folosi servicii precum Vercel pentru frontend,
              Railway/PostgreSQL pentru backend și baza de date și Brevo sau alt
              furnizor SMTP pentru trimiterea emailurilor.
            </p>
          </LegalSection>

          <LegalSection title="7. Durata de stocare">
            <p>
              Cererile trimise prin formular sunt păstrate atât timp cât este
              necesar pentru gestionarea solicitării și a comunicării comerciale,
              dar nu mai mult decât este rezonabil pentru scopul pentru care au
              fost colectate. Cererile pot fi șterse manual din admin panel.
            </p>
          </LegalSection>

          <LegalSection title="8. Drepturile tale">
            <p>Ai dreptul să soliciți:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>acces la datele personale;</li>
              <li>rectificarea datelor incorecte;</li>
              <li>ștergerea datelor, în condițiile legii;</li>
              <li>restricționarea prelucrării;</li>
              <li>opoziție față de anumite prelucrări;</li>
              <li>retragerea consimțământului pentru analytics;</li>
              <li>portabilitatea datelor, unde este aplicabil.</li>
            </ul>
            <p className="mt-4">
              Pentru exercitarea acestor drepturi, ne poți contacta la{" "}
              <span className="text-white">{companyEmail}</span>.
            </p>
          </LegalSection>

          <LegalSection title="9. Dreptul de a depune plângere">
            <p>
              Dacă apreciezi că datele tale sunt prelucrate necorespunzător,
              poți contacta Autoritatea Națională de Supraveghere a Prelucrării
              Datelor cu Caracter Personal.
            </p>
          </LegalSection>

          <LegalSection title="10. Actualizarea politicii">
            <p>
              Această politică poate fi actualizată periodic, în funcție de
              modificările tehnice ale site-ului, de serviciile folosite sau de
              cerințele legale aplicabile.
            </p>
            <p className="mt-3 text-white/40">
              Ultima actualizare: mai 2026.
            </p>
          </LegalSection>
        </div>
      </section>
    </main>
  );
}

function LegalSection({ title, children }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-4 leading-7">{children}</div>
    </section>
  );
}

export default PrivacyPolicy;