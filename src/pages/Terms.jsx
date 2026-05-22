import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";

function Terms() {
  const companyName =
    siteConfig?.company?.name || "A Squared Studio";

  const companyEmail =
    siteConfig?.contact?.email ||
    siteConfig?.company?.email ||
    "contact@example.com";

  return (
    <main className="min-h-screen bg-black px-5 py-28 text-white lg:px-8">
      <SEO
        title="Termeni și condiții"
        description="Termenii de utilizare ai website-ului și informații generale despre serviciile prezentate."
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
          Termeni și condiții
        </h1>

        <p className="mt-6 text-lg leading-8 text-white/55">
          Acești termeni stabilesc regulile generale de utilizare a website-ului
          {companyName}.
        </p>

        <div className="mt-12 space-y-8 text-white/60">
          <LegalSection title="1. Informații generale">
            <p>
              Website-ul prezintă servicii de web design, web development,
              branding digital și servicii conexe. Informațiile de pe site au
              caracter general și pot fi actualizate periodic.
            </p>
          </LegalSection>

          <LegalSection title="2. Servicii și oferte">
            <p>
              Prezentarea serviciilor și a pachetelor nu reprezintă o ofertă
              contractuală fermă. O ofertă finală se stabilește individual, în
              funcție de cerințele proiectului, complexitate, funcționalități și
              termen de livrare.
            </p>
          </LegalSection>

          <LegalSection title="3. Drepturi de autor">
            <p>
              Textele, designul, elementele grafice și structura website-ului
              sunt protejate de drepturile de autor și nu pot fi copiate,
              reproduse sau folosite fără acordul scris al {companyName}, cu
              excepția cazurilor permise de lege.
            </p>
          </LegalSection>

          <LegalSection title="4. Utilizarea website-ului">
            <p>Utilizatorii se obligă să nu folosească website-ul pentru:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>trimiterea de mesaje false, abuzive sau automate;</li>
              <li>încercări de acces neautorizat;</li>
              <li>afectarea securității sau funcționării site-ului;</li>
              <li>copierea neautorizată a conținutului.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Limitarea răspunderii">
            <p>
              Depunem eforturi pentru ca informațiile de pe site să fie corecte
              și actualizate, însă nu garantăm lipsa completă a erorilor. Nu
              răspundem pentru întreruperi temporare cauzate de mentenanță,
              furnizori externi, probleme tehnice sau situații independente de
              controlul nostru.
            </p>
          </LegalSection>

          <LegalSection title="6. Linkuri externe">
            <p>
              Website-ul poate conține linkuri către servicii externe, precum
              email, WhatsApp sau alte platforme. Nu suntem responsabili pentru
              politicile, conținutul sau funcționarea acestor servicii externe.
            </p>
          </LegalSection>

          <LegalSection title="7. Protecția datelor">
            <p>
              Prelucrarea datelor personale este explicată în{" "}
              <Link
                to="/privacy"
                className="text-white underline underline-offset-4"
              >
                Politica de confidențialitate / GDPR
              </Link>
              , iar folosirea cookie-urilor este explicată în{" "}
              <Link
                to="/cookies"
                className="text-white underline underline-offset-4"
              >
                Politica de cookies
              </Link>
              .
            </p>
          </LegalSection>

          <LegalSection title="8. Contact">
            <p>
              Pentru întrebări privind acești termeni, ne poți contacta la{" "}
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

export default Terms;