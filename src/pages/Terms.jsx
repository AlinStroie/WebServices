import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import LegalLayout, { LegalSection } from "../components/replica/LegalLayout";

function Terms() {
  const company = siteConfig?.company || {};
  const companyName = company.name || "A Squared Studio";
  const fullLegalName = company.fullLegalName || companyName;
  const companyEmail = company.email || siteConfig?.contact?.email || "contact@example.com";
  const companyPhone = company.phone || siteConfig?.contact?.phone;

  return (
    <LegalLayout
      currentPath="/terms"
      title="Termeni și condiții"
      updated="august 2026"
      intro={`Acești termeni stabilesc regulile generale de utilizare a website-ului asquaredstudio.ro, operat de ${fullLegalName}.`}
    >
      <SEO
        title="Termeni și condiții"
        description="Termenii de utilizare ai website-ului și informații generale despre serviciile prezentate."
      />

      <LegalSection number="01" title="Informații despre furnizorul de servicii">
        <p>Website-ul asquaredstudio.ro este operat de:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Denumire: {companyName}</li>
          <li>Forma juridică: {company.legalForm || "PFA"}</li>
          <li>Sediul social: {company.address}</li>
          <li>Nr. de înregistrare Registrul Comerțului: {company.tradeRegisterNo}</li>
          <li>Cod unic de înregistrare (CUI/CIF): {company.fiscalCode}</li>
          <li>Telefon: {companyPhone}</li>
          <li>Email: {companyEmail}</li>
        </ul>
        <p>
          Temei: art. 5 din Legea nr. 365/2002 privind comerțul electronic, republicată —
          obligă orice furnizor de servicii ale societății informaționale să afișeze aceste date
          clar, vizibil și permanent. Lipsa lor expune la amendă contravențională (art. 22) și
          la riscul anulării contractelor la cererea clientului (art. 21).
        </p>
      </LegalSection>

      <LegalSection number="02" title="Informații generale">
        <p>
          Website-ul prezintă servicii de web design, web development, branding digital și
          servicii conexe. Informațiile de pe site au caracter general și pot fi actualizate
          periodic.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Servicii și oferte">
        <p>
          Prezentarea serviciilor și a pachetelor nu reprezintă o ofertă contractuală fermă. O
          ofertă finală se stabilește individual, în funcție de cerințele proiectului,
          complexitate, funcționalități și termen de livrare, și devine obligatorie doar în
          urma acceptării scrise de către ambele părți (contract sau confirmare de comandă).
        </p>
      </LegalSection>

      <LegalSection number="04" title="Încheierea contractelor prin mijloace electronice">
        <p>
          Dacă un contract de prestări servicii se încheie prin mijloace electronice (email,
          formular, semnătură electronică), acesta produce toate efectele juridice recunoscute
          de lege contractelor, fără a fi necesar consimțământul prealabil al părților asupra
          utilizării mijloacelor electronice.
        </p>
        <p>Temei: art. 7 din Legea nr. 365/2002.</p>
      </LegalSection>

      <LegalSection number="05" title="Dreptul de retragere (aplicabil consumatorilor)">
        <p>
          Conform OUG nr. 34/2014 privind drepturile consumatorilor în cadrul contractelor
          încheiate cu profesioniștii, clienții care au calitatea de consumatori (persoane
          fizice) beneficiază, ca regulă generală, de un termen de 14 zile pentru a se retrage
          dintr-un contract încheiat la distanță.
        </p>
        <p>
          Cu toate acestea, având în vedere natura serviciilor prestate (web design, web
          development, branding digital și alte materiale grafice realizate pe bază de
          comandă), se aplică excepția prevăzută la art. 16 lit. c) din OUG nr. 34/2014.
          Dreptul de retragere nu se aplică în cazul furnizării de produse sau servicii
          confecționate după specificațiile prezentate de consumator sau personalizate în mod
          clar. Astfel, prin acceptarea ofertei și agrearea începerii execuției unui proiect
          personalizat, clientul recunoaște și acceptă că își pierde dreptul de retragere din
          momentul în care prestarea serviciilor a început.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Drepturi de autor">
        <p>
          Textele, designul, elementele grafice și structura website-ului sunt protejate de
          drepturile de autor și nu pot fi copiate, reproduse sau folosite fără acordul scris al{" "}
          {fullLegalName}, cu excepția cazurilor permise de lege.
        </p>
        <p>Temei: Legea nr. 8/1996 privind dreptul de autor și drepturile conexe.</p>
      </LegalSection>

      <LegalSection number="07" title="Utilizarea website-ului">
        <p>Utilizatorii se obligă să nu folosească website-ul pentru:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>trimiterea de mesaje false, abuzive sau automate;</li>
          <li>încercări de acces neautorizat;</li>
          <li>afectarea securității sau funcționării site-ului;</li>
          <li>copierea neautorizată a conținutului.</li>
        </ul>
      </LegalSection>

      <LegalSection number="08" title="Limitarea răspunderii">
        <p>
          Depunem eforturi pentru ca informațiile de pe site să fie corecte și actualizate,
          însă nu garantăm lipsa completă a erorilor. Nu răspundem pentru întreruperi temporare
          cauzate de mentenanță, furnizori externi, probleme tehnice sau situații independente
          de controlul nostru.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Linkuri externe">
        <p>
          Website-ul poate conține linkuri către servicii externe, precum email, WhatsApp sau
          alte platforme. Nu suntem responsabili pentru politicile, conținutul sau funcționarea
          acestor servicii externe.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Protecția datelor">
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

      <LegalSection number="11" title="Legea aplicabilă și soluționarea litigiilor">
        <p>
          Prezentul document este guvernat de legea română. Orice litigiu care nu poate fi
          soluționat pe cale amiabilă va fi supus instanțelor competente din România.
        </p>
        <p>
          Dacă ești consumator, persoană fizică ce acționează în afara activității tale
          profesionale, ai dreptul de a sesiza Autoritatea Națională pentru Protecția
          Consumatorilor (ANPC), Bulevardul Aviatorilor nr. 72, Sector 1, București,
          www.anpc.ro, sau de a recurge la procedura de soluționare alternativă a litigiilor
          (SAL), reglementată de Ordonanța Guvernului nr. 38/2015 privind soluționarea
          alternativă a litigiilor dintre consumatori și comercianți.
        </p>
        <p>
          Temei: Ordonanța Guvernului nr. 21/1992 privind protecția consumatorilor și OG nr.
          38/2015.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Contact">
        <p>
          Pentru întrebări privind acești termeni, ne poți contacta la{" "}
          <span className="text-[color:var(--color-ink)]">{companyEmail}</span>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default Terms;
