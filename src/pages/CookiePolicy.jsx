import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import LegalLayout, { LegalSection } from "../components/replica/LegalLayout";

function CookiePolicy() {
  const companyName = siteConfig?.company?.name || "A Squared Studio";

  const companyEmail =
    siteConfig?.contact?.email || siteConfig?.company?.email || "contact@example.com";

  return (
    <LegalLayout
      currentPath="/cookies"
      title="Politica de cookies"
      updated="mai 2026"
      intro={`Această politică explică modul în care ${companyName} folosește cookie-uri și tehnologii similare.`}
    >
      <SEO
        title="Politica de cookies"
        description="Informații despre cookie-urile esențiale și cookie-urile de analiză folosite pe website."
      />

      <LegalSection number="01" title="Ce sunt cookie-urile">
        <p>
          Cookie-urile sunt fișiere mici salvate în browserul tău. Ele pot fi
          folosite pentru funcționarea site-ului, salvarea preferințelor sau
          analizarea modului în care utilizatorii interacționează cu website-ul.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Cookie-uri esențiale">
        <p>
          Cookie-urile esențiale sunt necesare pentru funcționarea corectă a
          site-ului. Acestea pot include preferințele privind cookie bannerul,
          securitatea sesiunii sau funcții strict necesare ale aplicației.
        </p>
        <p>
          Aceste cookie-uri sunt mereu active și nu pot fi dezactivate din banner,
          deoarece site-ul nu poate funcționa corect fără ele.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Cookie-uri de analiză">
        <p>
          Cookie-urile și datele de analiză ne ajută să înțelegem cum este folosit
          site-ul: pagini accesate, clickuri, surse UTM, interacțiuni cu blogul și
          formularul.
        </p>
        <p>
          Acestea sunt activate doar după ce utilizatorul își exprimă
          consimțământul prin bannerul de cookies.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Cookie-uri de marketing">
        <p>
          În prezent, site-ul nu folosește cookie-uri de marketing sau
          publicitate comportamentală. Dacă acest lucru se va schimba, politica va
          fi actualizată, iar utilizatorul va putea decide dacă acceptă sau nu
          această categorie.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Cum poți modifica opțiunile">
        <p>
          Poți modifica sau retrage consimțământul pentru cookie-urile opționale
          din setările de cookies disponibile pe site. Poți, de asemenea, șterge
          cookie-urile direct din setările browserului.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Ce chei pot fi salvate în browser">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <span className="text-[color:var(--color-ink)]">
              asquared_cookie_consent
            </span>{" "}
            — salvează preferințele privind cookie-urile.
          </li>
          <li>
            <span className="text-[color:var(--color-ink)]">
              asquared_session_id
            </span>{" "}
            — identificator temporar de sesiune, folosit doar dacă analytics este
            acceptat.
          </li>
          <li>
            <span className="text-[color:var(--color-ink)]">
              asquared_utm_data
            </span>{" "}
            — date despre sursa traficului, folosite doar dacă analytics este
            acceptat.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="07" title="Contact">
        <p>
          Pentru întrebări privind cookie-urile, ne poți contacta la{" "}
          <span className="text-[color:var(--color-ink)]">{companyEmail}</span>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default CookiePolicy;
