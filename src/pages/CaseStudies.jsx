import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";

import SEO from "../components/SEO";
import Nav from "../components/replica/Nav";
import SiteFooter from "../components/replica/SiteFooter";
import BackToTop from "../components/replica/BackToTop";
import ConsentBanner from "../components/replica/ConsentBanner";
import Reveal from "../components/replica/Reveal";
import { apiFetch } from "../lib/api";

function CaseStudies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCaseStudies() {
      try {
        setLoading(true);
        setError("");

        const response = await apiFetch("/case-studies");

        if (!active) return;

        setItems(response.data || []);
      } catch (err) {
        if (!active) return;

        setError("Studiile de caz nu au putut fi încărcate momentan.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCaseStudies();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="replica relative min-h-screen">
      <SEO
        title="Studii de caz"
        description="Studiile de caz A Squared Studio — proiecte de web design livrate pentru afaceri din Brașov și din toată România, cu obiectiv, proces și rezultate concrete."
      />

      <Nav />

      <main id="top" className="grad-dark pt-[88px]">
        <section className="mx-auto w-full max-w-[72rem] px-6 py-20 sm:px-8 lg:py-28">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-[color:var(--color-accent)]">
            <Sparkles size={24} />
          </span>

          <h1 className="display title-gradient mt-6 text-[clamp(2.25rem,6vw,4rem)]">
            Studiile noastre de caz
          </h1>

          <p className="measure mt-5 text-[15px] leading-relaxed text-[color:var(--color-copy-on-dark)]">
            Obiectiv, proces și rezultate concrete, pentru fiecare proiect
            real, livrat.
          </p>

          {loading && (
            <p className="mt-16 text-sm text-[color:var(--color-copy-subtle-on-dark)]">
              Se încarcă studiile de caz...
            </p>
          )}

          {!loading && error && (
            <p className="mt-16 text-sm text-red-300">{error}</p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="mt-16 text-sm text-[color:var(--color-copy-subtle-on-dark)]">
              Nu există încă studii de caz publicate.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {items.map((item) => (
                <Reveal key={item.slug}>
                  <Link
                    to={`/studii-de-caz/${item.slug}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div>
                      <p className="eyebrow text-[color:var(--color-accent)]">
                        {item.kicker}
                      </p>

                      <h2 className="mt-4 text-xl font-semibold text-white">
                        {item.title}
                      </h2>

                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-copy-on-dark)]">
                        {item.description}
                      </p>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                      Vezi studiul de caz
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
      <BackToTop />
      <ConsentBanner />
    </div>
  );
}

export default CaseStudies;
