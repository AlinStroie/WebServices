import AnimatedSection from "./AnimatedSection";

function LegalInfo() {
  return (
    <AnimatedSection className="px-5 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div id="gdpr" className="glass rounded-[2rem] p-8 scroll-mt-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/35">
            GDPR
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.04em]">
            Politica de confidențialitate
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-7 text-white/55">
            <p>
              Datele transmise prin formularul de contact, precum numele,
              adresa de email și mesajul, sunt folosite exclusiv pentru a
              răspunde solicitării trimise.
            </p>

            <p>
              Nu folosim datele pentru newsletter, reclame sau comunicări
              comerciale fără un acord separat.
            </p>

            <p>
              Datele pot fi păstrate doar pe durata necesară comunicării și
              gestionării solicitării. Utilizatorul poate cere accesul,
              rectificarea sau ștergerea datelor sale.
            </p>

            <p>
              Pentru solicitări legate de datele personale, ne poți contacta la:
              contact@asquaredstudio.ro.
            </p>
          </div>
        </div>

        <div id="politica-cookies" className="glass rounded-[2rem] p-8 scroll-mt-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/35">
            Cookies
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.04em]">
            Politica de cookies
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-7 text-white/55">
            <p>
              Site-ul poate folosi cookies necesare pentru funcționare și
              cookies opționale pentru analiză sau îmbunătățirea experienței.
            </p>

            <p>
              Cookies necesare ajută la funcționarea corectă a site-ului și nu
              pot fi dezactivate din sistemul site-ului.
            </p>

            <p>
              Cookies opționale sunt folosite doar dacă utilizatorul își exprimă
              acordul prin bannerul de cookies.
            </p>

            <p>
              Poți șterge sau bloca cookies din setările browserului tău.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default LegalInfo;