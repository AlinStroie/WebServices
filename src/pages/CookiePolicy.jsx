import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";

function CookiePolicy() {
  const companyName =
    siteConfig?.company?.name || "A Squared Studio";

  const companyEmail =
    siteConfig?.contact?.email ||
    siteConfig?.company?.email ||
    "contact@example.com";

  return (
    <main className="min-h-screen bg-black px-5 py-28 text-white lg:px-8">
      <SEO
        title="Politica de cookies"
        description="Informații despre cookie-urile esențiale și cookie-urile de analiză folosite pe website."
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
          Politica de cookies
        </h1>

        <p className="mt-6 text-lg leading-8 text-white/55">
          Această politică explică modul în care {companyName} folosește
          cookie-uri și tehnologii similare.
        </p>

        <div className="mt-12 space-y-8 text-white/60">
          <LegalSection title="1. Ce sunt cookie-urile">
            <p>
              Cookie-urile sunt fișiere mici salvate în browserul tău. Ele pot
              fi folosite pentru funcționarea site-ului, salvarea preferințelor
              sau analizarea modului în care utilizatorii interacționează cu
              website-ul.
            </p>
          </LegalSection>

          <LegalSection title="2. Cookie-uri esențiale">
            <p>
              Cookie-urile esențiale sunt necesare pentru funcționarea corectă a
              site-ului. Acestea pot include preferințele privind cookie bannerul,
              securitatea sesiunii sau funcții strict necesare ale aplicației.
            </p>
            <p className="mt-3">
              Aceste cookie-uri sunt mereu active și nu pot fi dezactivate din
              banner, deoarece site-ul nu poate funcționa corect fără ele.
            </p>
          </LegalSection>

          <LegalSection title="3. Cookie-uri de analiză">
            <p>
              Cookie-urile și datele de analiză ne ajută să înțelegem cum este
              folosit site-ul: pagini accesate, clickuri, surse UTM, interacțiuni
              cu blogul și formularul.
            </p>
            <p className="mt-3">
              Acestea sunt activate doar după ce utilizatorul își exprimă
              consimțământul prin bannerul de cookies.
            </p>
          </LegalSection>

          <LegalSection title="4. Cookie-uri de marketing">
            <p>
              În prezent, site-ul nu folosește cookie-uri de marketing sau
              publicitate comportamentală. Dacă acest lucru se va schimba,
              politica va fi actualizată, iar utilizatorul va putea decide dacă
              acceptă sau nu această categorie.
            </p>
          </LegalSection>

          <LegalSection title="5. Cum poți modifica opțiunile">
            <p>
              Poți modifica sau retrage consimțământul pentru cookie-urile
              opționale din setările de cookies disponibile pe site. Poți, de
              asemenea, șterge cookie-urile direct din setările browserului.
            </p>
          </LegalSection>

          <LegalSection title="6. Ce chei pot fi salvate în browser">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <span className="text-white">asquared_cookie_consent</span> —
                salvează preferințele privind cookie-urile.
              </li>
              <li>
                <span className="text-white">asquared_session_id</span> —
                identificator temporar de sesiune, folosit doar dacă analytics
                este acceptat.
              </li>
              <li>
                <span className="text-white">asquared_utm_data</span> — date
                despre sursa traficului, folosite doar dacă analytics este
                acceptat.
              </li>
            </ul>
          </LegalSection>

          <LegalSection title="7. Contact">
            <p>
              Pentru întrebări privind cookie-urile, ne poți contacta la{" "}
              <span className="text-white">{companyEmail}</span>.
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

export default CookiePolicy;