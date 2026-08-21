import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

import SEO from "../components/SEO";
import MagneticCta from "../components/replica/MagneticCta";
import { siteConfig } from "../data/siteConfig";
import { portfolio } from "../data/portfolio";

/**
 * /project/:slug — placeholder landing for a single project's future case
 * study, same pattern as /studii-de-caz: the Works cards already route
 * here, this just needs to exist and not 404 until each project gets its
 * own documented page.
 */
function ProjectDetail() {
  const { slug } = useParams();
  const project = portfolio.find((item) => item.id === slug);
  const title = project?.title || "Acest proiect";

  return (
    <div className="grad-dark replica flex min-h-dvh w-full flex-col items-center justify-center gap-6 px-6 text-center">
      <SEO
        title={title}
        description={`Studiul de caz pentru ${title} — în lucru.`}
      />

      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-[color:var(--color-accent)]">
        <Sparkles size={24} />
      </span>

      <h1 className="display title-gradient text-[clamp(2rem,4vw,3rem)]">
        {title} vine în curând
      </h1>

      <p className="max-w-[46ch] text-[15px] leading-relaxed text-[color:var(--color-copy-on-dark)]">
        Lucrăm la pagina dedicată acestui proiect: obiectiv, proces și
        rezultate concrete. Până atunci, poți vedea celelalte proiecte în
        secțiunea Lucrări sau ne poți scrie direct.
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <MagneticCta to="/discovery" className="px-5 py-2.5 text-sm font-medium text-white sm:px-6 sm:py-3">
          Consultanță gratuită
        </MagneticCta>

        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-[color:var(--color-copy-subtle-on-dark)] transition-colors hover:text-white"
        >
          <ArrowLeft size={15} />
          Înapoi la site
        </Link>
      </div>

      <p className="text-xs text-[color:var(--color-copy-subtle-on-dark)]">
        {siteConfig.contact.email}
      </p>
    </div>
  );
}

export default ProjectDetail;
