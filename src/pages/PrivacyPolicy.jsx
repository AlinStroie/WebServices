import { Link } from "react-router-dom";

import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";

function Section({ title, children }) {
  return (
    <section className="border-b border-white/10 py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>

      <div className="mt-5 space-y-4 text-base leading-8 text-white/60">
        {children}
      </div>
    </section>
  );
}

function PrivacyPolicy() {
  const companyName = siteConfig?.brand?.name || "A Squared Studio";
  const email =
    siteConfig?.contact?.email ||
    siteConfig?.company?.email ||
    "contact@example.com";

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title={`Politica de confidențialitate | ${companyName}`}
        description="Informații despre modul în care colectăm, folosim și protejăm datele personale și preferințele privind cookie-urile."
      />

      <main className="mx-auto max-w-4xl px-5 py-24 lg:px-8">
        <Link
          to="/"
          className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition hover:bg-white hover:text-black"
        >
          Înapoi pe site
        </Link>

        <div className="mt-10">
          <p className="text-sm uppercase tracking-[0.28em] text-white/35">
            Privacy Policy
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Politica de confidențialitate
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/55">
            Ultima actualizare: 20 mai 2026
          </p>
        </div>

        <Section title="1. Cine suntem">
          <p>
            Această politică explică modul în care {companyName} colectează și
            folosește datele atunci când vizitezi website-ul, completezi
            formularul de contact sau interacționezi cu serviciile noastre.
          </p>

          <p>
            Pentru întrebări legate de datele personale, ne poți contacta la{" "}
            <a
              href={`mailto:${email}`}
              className="text-white underline underline-offset-4"
            >
              {email}
            </a>
            .
          </p>
        </Section>

        <Section title="2. Ce date colectăm">
          <p>
            Putem colecta date pe care ni le oferi direct, precum nume, email,
            telefon, mesajul trimis prin formular și pachetul selectat.
          </p>

          <p>
            Putem colecta și date tehnice limitate, precum pagina vizitată,
            referrer, UTM-uri, tip de dispozitiv, browser, evenimente de
            navigare și identificatori pseudonimizați ai sesiunii.
          </p>
        </Section>

        <Section title="3. De ce folosim datele">
          <p>Folosim datele pentru:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>a răspunde cererilor trimise prin formular;</li>
            <li>a pregăti oferte și discuții comerciale;</li>
            <li>a trimite notificări legate de solicitarea ta;</li>
            <li>a proteja website-ul împotriva abuzurilor și spamului;</li>
            <li>a înțelege, cu acordul tău, cum este folosit website-ul;</li>
            <li>a îmbunătăți conținutul, experiența și campaniile.</li>
          </ul>
        </Section>

        <Section title="4. Cookie-uri și tehnologii similare">
          <p>
            Folosim cookie-uri esențiale pentru funcționarea website-ului și
            pentru salvarea preferințelor tale de confidențialitate.
          </p>

          <p>
            Cookie-urile sau tehnologiile de analytics și marketing sunt
            folosite doar dacă alegi să le accepți din bannerul de cookies sau
            din Privacy Settings.
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-white/[0.05] text-white">
                <tr>
                  <th className="p-4">Categorie</th>
                  <th className="p-4">Scop</th>
                  <th className="p-4">Necesare?</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10 text-white/60">
                <tr>
                  <td className="p-4">Essential</td>
                  <td className="p-4">
                    Funcționarea website-ului, securitate, salvarea
                    preferințelor.
                  </td>
                  <td className="p-4">Da</td>
                </tr>

                <tr>
                  <td className="p-4">Analytics and Marketing</td>
                  <td className="p-4">
                    Măsurarea performanței paginilor, CTA-urilor, campaniilor
                    și conversiilor.
                  </td>
                  <td className="p-4">Nu, doar cu acord</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="5. Analytics și tracking">
          <p>
            Pentru analytics folosim o sesiune anonimă/pseudonimizată. Aceasta
            poate include pagina de intrare, ultima pagină vizitată, UTM-uri,
            tipul dispozitivului, browserul, evenimente precum vizualizări de
            pagină, clickuri pe CTA și trimiterea formularului.
          </p>

          <p>
            Evenimentele avansate, precum scroll depth, time on page și
            metadata suplimentară, sunt folosite doar dacă ai acceptat categoria
            Analytics and Marketing.
          </p>

          <p>
            Datele personale din formular, precum nume, email, telefon și mesaj,
            sunt păstrate separat de evenimentele de analytics.
          </p>
        </Section>

        <Section title="6. Furnizori și servicii terțe">
          <p>
            Putem folosi furnizori terți pentru hosting, baze de date,
            trimiterea emailurilor, analytics, securitate și servicii tehnice.
            Acești furnizori procesează datele în scopul furnizării
            serviciilor necesare website-ului.
          </p>

          <p>
            Exemple de servicii care pot fi folosite: hosting web, PostgreSQL,
            Brevo pentru trimiterea emailurilor, servicii de securitate,
            servicii de analytics sau platforme de reclame, dacă sunt activate
            ulterior.
          </p>
        </Section>

        <Section title="7. Cât timp păstrăm datele">
          <p>
            Datele din formular sunt păstrate atât timp cât este necesar pentru
            gestionarea cererii și pentru evidențe comerciale rezonabile.
          </p>

          <p>
            Datele de analytics sunt folosite pentru analiză internă și pot fi
            șterse sau agregate periodic. Preferințele de cookies rămân salvate
            în browser până când le modifici sau le ștergi.
          </p>
        </Section>

        <Section title="8. Drepturile tale">
          <p>
            Poți solicita acces la datele tale, corectarea lor, ștergerea lor,
            restricționarea prelucrării sau retragerea consimțământului, acolo
            unde este cazul.
          </p>

          <p>
            Pentru orice cerere, ne poți scrie la{" "}
            <a
              href={`mailto:${email}`}
              className="text-white underline underline-offset-4"
            >
              {email}
            </a>
            .
          </p>
        </Section>

        <Section title="9. Securitate">
          <p>
            Folosim măsuri tehnice și organizatorice rezonabile pentru a proteja
            datele, inclusiv validare server-side, limitare requesturi,
            protecții anti-spam, configurări de securitate HTTP și separarea
            datelor personale de analytics.
          </p>
        </Section>

        <Section title="10. Modificări ale politicii">
          <p>
            Putem actualiza această politică atunci când modificăm website-ul,
            serviciile, furnizorii sau modul de prelucrare a datelor. Data
            ultimei actualizări va fi afișată în partea de sus a paginii.
          </p>
        </Section>
      </main>
    </div>
  );
}

export default PrivacyPolicy;