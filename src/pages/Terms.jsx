import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import LegalLayout, { LegalSection } from "../components/replica/LegalLayout";

function Terms() {
  const companyName = siteConfig?.company?.name || "A Squared Studio";

  const companyEmail =
    siteConfig?.contact?.email || siteConfig?.company?.email || "contact@example.com";

  return (
    <LegalLayout
      currentPath="/terms"
      title="Termeni și condiții"
      updated="mai 2026"
      intro={`Acești termeni stabilesc regulile generale de utilizare a website-ului ${companyName}.`}
    >
      <SEO
        title="Termeni și condiții"
        description="Termenii de utilizare ai website-ului și informații generale despre serviciile prezentate."
      />

      <LegalSection number="01" title="Informații generale">
        <p>
          Website-ul prezintă servicii de web design, web development, branding
          digital și servicii conexe. Informațiile de pe site au caracter general
          și pot fi actualizate periodic.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Servicii și oferte">
        <p>
          Prezentarea serviciilor și a pachetelor nu reprezintă o ofertă
          contractuală fermă. O ofertă finală se stabilește individual, în funcție
          de cerințele proiectului, complexitate, funcționalități și termen de
          livrare.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Drepturi de autor">
        <p>
          Textele, designul, elementele grafice și structura website-ului sunt
          protejate de drepturile de autor și nu pot fi copiate, reproduse sau
          folosite fără acordul scris al {companyName}, cu excepția cazurilor
          permise de lege.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Utilizarea website-ului">
        <p>Utilizatorii se obligă să nu folosească website-ul pentru:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>trimiterea de mesaje false, abuzive sau automate;</li>
          <li>încercări de acces neautorizat;</li>
          <li>afectarea securității sau funcționării site-ului;</li>
          <li>copierea neautorizată a conținutului.</li>
        </ul>
      </LegalSection>

      <LegalSection number="05" title="Limitarea răspunderii">
        <p>
          Depunem eforturi pentru ca informațiile de pe site să fie corecte și
          actualizate, însă nu garantăm lipsa completă a erorilor. Nu răspundem
          pentru întreruperi temporare cauzate de mentenanță, furnizori externi,
          probleme tehnice sau situații independente de controlul nostru.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Linkuri externe">
        <p>
          Website-ul poate conține linkuri către servicii externe, precum email,
          WhatsApp sau alte platforme. Nu suntem responsabili pentru politicile,
          conținutul sau funcționarea acestor servicii externe.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Protecția datelor">
        <p>
          Prelucrarea datelor personale este explicată în{" "}
          <Link
            to="/privacy"
            className="text-[color:var(--color-ink)] underline underline-offset-4"
          >
            Politica de confidențialitate / GDPR
          </Link>
          , iar folosirea cookie-urilor este explicată în{" "}
          <Link
            to="/cookies"
            className="text-[color:var(--color-ink)] underline underline-offset-4"
          >
            Politica de cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection number="08" title="Contact">
        <p>
          Pentru întrebări privind acești termeni, ne poți contacta la{" "}
          <span className="text-[color:var(--color-ink)]">{companyEmail}</span>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default Terms;
