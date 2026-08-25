import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import LegalLayout, { LegalSection } from "../components/replica/LegalLayout";
import CookiePreferences from "../components/replica/CookiePreferences";

function CookieTable({ rows }) {
  return (
    <div className="not-prose mt-4 overflow-x-auto rounded-lg border border-[color:var(--color-divider)]">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[color:var(--color-divider)] text-[color:var(--color-ink)]">
            <th className="px-4 py-3 font-medium">Cookie</th>
            <th className="px-4 py-3 font-medium">Scop</th>
            <th className="px-4 py-3 font-medium">Durată</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-[color:var(--color-divider)] last:border-b-0">
              <td className="px-4 py-3 font-mono text-xs text-[color:var(--color-ink)]">
                {row.name}
              </td>
              <td className="px-4 py-3">{row.purpose}</td>
              <td className="px-4 py-3">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CookiePolicy() {
  const company = siteConfig?.company || {};
  const companyName = company.fullLegalName || company.name || "A Squared Studio";
  const companyEmail = company.email || siteConfig?.contact?.email || "contact@example.com";

  return (
    <LegalLayout
      currentPath="/cookies"
      title="Politica de cookies"
      updated="august 2026"
      intro={`Această politică explică modul în care ${companyName} folosește cookie-uri și tehnologii similare pe acest website.`}
    >
      <SEO
        title="Politica de cookies"
        description="Informații despre cookie-urile esențiale și cookie-urile de analiză folosite pe website."
      />

      <p className="measure -mt-6 mb-10 text-sm text-[color:var(--color-copy-muted)]">
        Temei legal: Legea nr. 506/2004 privind prelucrarea datelor cu caracter personal și
        protecția vieții private în sectorul comunicațiilor electronice și GDPR.
      </p>

      <LegalSection number="01" title="Ce sunt cookie-urile">
        <p>
          Cookie-urile sunt fișiere mici salvate în browserul tău. Ele pot fi folosite pentru
          funcționarea site-ului, salvarea preferințelor sau analizarea modului în care
          utilizatorii interacționează cu website-ul.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Temeiul legal">
        <p>
          Stocarea de cookie-uri neesențiale pe dispozitivul tău este permisă doar cu
          consimțământul tău prealabil, exprimat clar și liber. Cookie-urile strict necesare
          funcționării site-ului fac excepție de la această cerință.
        </p>
        <p>
          Temei: art. 4 alin. (5) din Legea nr. 506/2004, care transpune Directiva 2002/58/CE
          modificată prin Directiva 2009/136/CE.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Cookie-uri esențiale">
        <p>
          Cookie-urile esențiale sunt necesare pentru funcționarea corectă a site-ului. Acestea
          pot include preferințele privind cookie bannerul, securitatea sesiunii sau funcții
          strict necesare ale aplicației.
        </p>
        <p>
          Aceste cookie-uri sunt mereu active și nu pot fi dezactivate din banner, deoarece
          site-ul nu poate funcționa corect fără ele. Nu necesită consimțământul tău.
        </p>
        <CookieTable
          rows={[
            {
              name: "asquared_cookie_consent",
              purpose: "salvează preferințele privind cookie-urile",
              duration: "3 luni / 1 an",
            },
            {
              name: "asquared_session_id",
              purpose: "identificator temporar de sesiune",
              duration: "sesiune",
            },
          ]}
        />
      </LegalSection>

      <LegalSection number="04" title="Cookie-uri de analiză">
        <p>
          Cookie-urile și datele de analiză ne ajută să înțelegem cum este folosit site-ul:
          pagini accesate, clickuri, surse UTM, interacțiuni cu studiile de caz și formularul.
        </p>
        <p>
          Acestea sunt activate doar după ce utilizatorul își exprimă consimțământul prin
          bannerul de cookies.
        </p>
        <CookieTable
          rows={[
            {
              name: "asquared_utm_data",
              purpose: "date despre sursa traficului",
              duration: "90 zile",
            },
          ]}
        />
      </LegalSection>

      <LegalSection number="05" title="Cookie-uri de marketing">
        <p>
          În prezent, site-ul nu folosește cookie-uri de marketing sau publicitate
          comportamentală. Dacă acest lucru se va schimba, politica va fi actualizată, iar
          utilizatorul va putea decide dacă acceptă sau nu această categorie, printr-un
          consimțământ separat, distinct de cel dat anterior.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Cum poți modifica opțiunile">
        <p>
          Poți modifica sau retrage consimțământul pentru cookie-urile opționale în orice
          moment, din secțiunea „Setări cookie-uri” de mai jos, disponibilă și în subsolul
          website-ului. Poți, de asemenea, șterge cookie-urile direct din setările browserului.
        </p>
        <p>
          Retragerea consimțământului este la fel de simplă ca acordarea lui și nu afectează
          legalitatea prelucrării efectuate înainte de retragere.
        </p>
        <CookiePreferences />
      </LegalSection>

      <LegalSection number="07" title="Ce chei pot fi salvate în browser">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <span className="text-[color:var(--color-ink)]">asquared_cookie_consent</span> —
            salvează preferințele privind cookie-urile.
          </li>
          <li>
            <span className="text-[color:var(--color-ink)]">asquared_session_id</span> —
            identificator temporar de sesiune, folosit doar dacă analytics este acceptat.
          </li>
          <li>
            <span className="text-[color:var(--color-ink)]">asquared_utm_data</span> — date
            despre sursa traficului, folosite doar dacă analytics este acceptat.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="08" title="Actualizarea politicii">
        <p>
          Această politică poate fi actualizată periodic. Orice modificare semnificativă (de
          exemplu, introducerea de cookie-uri de marketing) va fi comunicată printr-un nou
          banner de consimțământ.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Contact">
        <p>
          Pentru întrebări privind cookie-urile, ne poți contacta la{" "}
          <span className="text-[color:var(--color-ink)]">{companyEmail}</span>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default CookiePolicy;
