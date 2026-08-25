import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import LegalLayout, { LegalSection } from "../components/replica/LegalLayout";

function PrivacyPolicy() {
  const company = siteConfig?.company || {};
  const companyName = company.name || "A Squared Studio";
  const fullLegalName = company.fullLegalName || companyName;
  const companyEmail = company.email || siteConfig?.contact?.email || "contact@example.com";
  const companyPhone = company.phone || siteConfig?.contact?.phone;

  return (
    <LegalLayout
      currentPath="/privacy"
      title="Politica de confidențialitate / GDPR"
      updated="august 2026"
      intro={`Această politică explică modul în care ${fullLegalName} colectează, folosește, stochează și protejează datele cu caracter personal transmise prin acest website.`}
    >
      <SEO
        title="Politica de confidențialitate / GDPR"
        description="Informații despre modul în care colectăm, folosim și protejăm datele personale."
      />

      <p className="measure -mt-6 mb-10 text-sm text-[color:var(--color-copy-muted)]">
        Temei legal general: Regulamentul (UE) 2016/679 (GDPR) și Legea nr. 190/2018 privind
        măsuri de punere în aplicare a Regulamentului (UE) 2016/679.
      </p>

      <LegalSection number="01" title="Operatorul datelor">
        <p>
          Operatorul de date cu caracter personal este {fullLegalName}, cu sediul în{" "}
          {company.address}, înregistrată la Registrul Comerțului sub nr.{" "}
          {company.tradeRegisterNo}, cod unic de înregistrare {company.fiscalCode}, telefon{" "}
          {companyPhone}, email {companyEmail}.
        </p>
        <p>
          Conform art. 13 din GDPR, persoana vizată are dreptul de a cunoaște identitatea
          completă a operatorului — nu doar denumirea comercială a site-ului.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Ce date colectăm">
        <p>Prin formularul de contact putem colecta:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>nume și prenume;</li>
          <li>adresă de email;</li>
          <li>număr de telefon, dacă este completat;</li>
          <li>mesajul transmis prin formular;</li>
          <li>pachetul sau serviciul selectat;</li>
          <li>pagina de pe care a fost trimisă solicitarea.</li>
        </ul>
        <p>
          Pentru securitate, prevenirea spamului și diagnosticarea erorilor, putem colecta și
          date tehnice precum adresa IP, tipul browserului, dispozitivul folosit și
          user-agent-ul, dacă această funcție este activată în backend.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Scopul prelucrării">
        <p>Datele sunt folosite pentru:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>preluarea și analizarea cererilor trimise prin formular;</li>
          <li>contactarea persoanei care a solicitat o ofertă;</li>
          <li>pregătirea unei propuneri comerciale;</li>
          <li>administrarea solicitărilor primite;</li>
          <li>securitatea site-ului și prevenirea abuzurilor;</li>
          <li>
            analizarea performanței site-ului, doar dacă utilizatorul a acceptat cookie-urile de
            analiză.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="04" title="Temeiul legal al prelucrării">
        <p>Fiecare categorie de date este prelucrată pe un temei legal distinct:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            datele din formularul de contact sunt prelucrate pentru demersuri precontractuale,
            la cererea ta;
          </li>
          <li>
            datele tehnice strict necesare pot fi prelucrate în temeiul interesului legitim de a
            asigura securitatea site-ului și de a preveni abuzurile;
          </li>
          <li>
            datele de analiză (analytics) sunt prelucrate exclusiv pe baza consimțământului tău
            explicit, exprimat prin bannerul de cookie-uri.
          </li>
        </ul>
        <p>
          Temeiuri conform art. 6 alin. (1) lit. b) [demersuri precontractuale], lit. f) [interes
          legitim] și lit. a) [consimțământ] din GDPR.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Analytics și UTM">
        <p>
          Website-ul poate folosi analiză proprie pentru a înțelege cum este utilizat site-ul:
          pagini vizitate, clickuri pe butoane, interacțiuni cu studiile de caz, formularul și
          sursele de trafic UTM. Pe lângă analytics-ul propriu, folosim și Google Analytics 4,
          cu adresa IP anonimizată, pentru statistici de trafic și comportament al vizitatorilor.
        </p>
        <p>
          Aceste date sunt colectate doar dacă utilizatorul acceptă cookie-urile de analiză.
          Dacă utilizatorul refuză analiza, nu salvăm sessionId, UTM-uri sau evenimente de
          tracking asociate formularului, și nu se încarcă Google Analytics.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Destinatarii datelor și transferul acestora">
        <p>
          Datele tale pot fi transmise, strict în scopurile descrise mai sus, către următorii
          furnizori de servicii, care acționează în calitate de persoane împuternicite de
          operator (procesatori):
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Vercel Inc. — găzduire frontend;</li>
          <li>Railway / furnizorul bazei de date PostgreSQL — găzduire backend și bază de date;</li>
          <li>Brevo — trimiterea comunicărilor prin email;</li>
          <li>
            Google Ireland Limited / Google LLC (Google Analytics) — statistici de trafic și
            comportament al vizitatorilor, doar cu consimțământ pentru analytics.
          </li>
        </ul>
        <p>
          Vercel Inc., Railway și Google sunt furnizori cu sediul în (sau cu procesare inclusă
          în) Statele Unite, ceea ce implică transferul unor date (inclusiv adresa IP
          anonimizată și identificatori tehnici) în afara Spațiului Economic European. Acest
          transfer se realizează pe baza clauzelor contractuale standard (SCC) aprobate de
          Comisia Europeană, incluse în acordurile de procesare a datelor (DPA) semnate cu
          fiecare furnizor. Brevo procesează datele exclusiv prin infrastructura sa din Uniunea
          Europeană, fără transfer către țări terțe pentru fluxurile principale de date. Nu
          vindem și nu închiriem datele tale către terți în scop de marketing.
        </p>
        <p>
          Temei: art. 28 din GDPR (persoane împuternicite) și art. 44-46 din GDPR (transferuri
          internaționale).
        </p>
      </LegalSection>

      <LegalSection number="07" title="Unde sunt stocate datele">
        <p>
          Datele formularului sunt salvate în baza de date a aplicației și pot fi transmise
          prin email către adresa firmei. Pentru funcționarea site-ului putem folosi servicii
          precum Vercel pentru frontend, Railway/PostgreSQL pentru backend și baza de date, și
          Brevo pentru trimiterea emailurilor.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Durata de stocare">
        <p>
          Cererile trimise prin formular și care nu se finalizează printr-un contract sunt
          păstrate timp de 3 luni de la ultimul contact cu solicitantul, după care sunt șterse
          automat din baza de date.
        </p>
        <p>
          Dacă solicitarea se finalizează printr-un contract de prestări servicii, datele
          aferente sunt păstrate pe durata contractului, plus perioada impusă de legislația
          fiscală și contabilă aplicabilă (Legea contabilității nr. 82/1991), respectiv termenul
          general de prescripție prevăzut de Codul civil pentru eventuale pretenții
          contractuale.
        </p>
        <p>
          Temei: art. 5 alin. (1) lit. e) din GDPR — principiul limitării legate de stocare,
          conform căruia datele nu pot fi păstrate mai mult decât este necesar pentru scopul
          pentru care au fost colectate.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Drepturile tale">
        <p>Ai dreptul să soliciți:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>acces la datele personale;</li>
          <li>rectificarea datelor incorecte;</li>
          <li>ștergerea datelor, în condițiile legii;</li>
          <li>restricționarea prelucrării;</li>
          <li>opoziție față de anumite prelucrări;</li>
          <li>
            retragerea consimțământului pentru analytics, în orice moment, fără a afecta
            legalitatea prelucrării efectuate anterior retragerii;
          </li>
          <li>portabilitatea datelor, unde este aplicabil.</li>
        </ul>
        <p>
          Pentru exercitarea acestor drepturi, ne poți contacta la{" "}
          <span className="text-[color:var(--color-ink)]">{companyEmail}</span>. Îți vom
          răspunde în termen de cel mult o lună de la primirea cererii.
        </p>
        <p>
          Temei: art. 15-21 din GDPR (drepturile persoanei vizate) și art. 12 alin. (3) din
          GDPR (termenul de răspuns).
        </p>
      </LegalSection>

      <LegalSection number="10" title="Dreptul de a depune plângere">
        <p>
          Dacă apreciezi că datele tale sunt prelucrate necorespunzător, poți contacta
          Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal
          (ANSPDCP) — B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, București,
          anspdcp@dataprotection.ro, www.dataprotection.ro — sau te poți adresa direct instanței
          de judecată competente.
        </p>
        <p>Temei: art. 77-79 din GDPR.</p>
      </LegalSection>

      <LegalSection number="11" title="Securitatea datelor">
        <p>
          Am implementat măsuri tehnice și organizatorice rezonabile pentru protejarea datelor
          tale împotriva accesului neautorizat, pierderii sau distrugerii accidentale, printre
          care:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>criptarea conexiunii prin HTTPS/TLS pe tot website-ul;</li>
          <li>
            acces restricționat la baza de date, prin parole și roluri de acces separate pentru
            personalul autorizat.
          </li>
        </ul>
        <p>Temei: art. 32 din GDPR.</p>
      </LegalSection>

      <LegalSection number="12" title="Actualizarea politicii">
        <p>
          Această politică poate fi actualizată periodic, în funcție de modificările tehnice ale
          site-ului, de serviciile folosite sau de cerințele legale aplicabile. Data ultimei
          actualizări este afișată la începutul acestui document.
        </p>
      </LegalSection>

      <LegalSection number="13" title="Contact">
        <p>
          Pentru orice întrebare legată de această politică sau de datele tale personale, ne
          poți contacta la{" "}
          <span className="text-[color:var(--color-ink)]">{companyEmail}</span>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default PrivacyPolicy;
