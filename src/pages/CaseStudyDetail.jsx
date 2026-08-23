import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import SEO from "../components/SEO";
import Nav from "../components/replica/Nav";
import SiteFooter from "../components/replica/SiteFooter";
import BackToTop from "../components/replica/BackToTop";
import ConsentBanner from "../components/replica/ConsentBanner";
import Reveal from "../components/replica/Reveal";
import MaskRevealVideo from "../components/replica/MaskRevealVideo";
import MagneticCta from "../components/replica/MagneticCta";
import { useEffect, useState } from "react";
import { portfolio } from "../data/portfolio";
import { apiFetch } from "../lib/api";

/**
 * /studii-de-caz/:slug — full case-study page for real, shipped work.
 * Layout follows dixieraizpacheco.com's own project pages (metadata row,
 * overview, challenge, approach, solution, gallery, live-site embed,
 * results) rebuilt with our own components and content: the mask-reveal
 * video is the same mechanism as the homepage spotlight (MaskRevealVideo),
 * sections use the site's existing Reveal fade, and there are no invented
 * metrics — only what's actually true about the build.
 */
function CaseStudyDetail() {
  const { slug } = useParams();
  const project = portfolio.find((item) => item.id === slug);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      try {
        const response = await apiFetch(`/case-studies/${slug}`);
        if (!active) return;
        setDetail(response.data);
      } catch {
        if (!active) return;
        setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDetail();

    return () => {
      active = false;
    };
  }, [slug]);

  if (!project || notFound) {
    return <Navigate to="/studii-de-caz" replace />;
  }

  if (loading || !detail) {
    return (
      <div className="replica flex min-h-screen items-center justify-center">
        <p className="text-sm text-[color:var(--color-copy-muted)]">
          Se încarcă studiul de caz...
        </p>
      </div>
    );
  }

  return (
    <div className="replica relative min-h-screen">
      <SEO
        title={`${project.title} — Studiu de caz`}
        description={project.text}
      />

      <Nav />

      <main id="top" className="grad-white pt-[88px]">
        <section className="mx-auto w-full max-w-[72rem] px-6 py-20 sm:px-8 lg:py-28">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[color:var(--color-copy-muted)]">
            <Link
              to="/#lucrari"
              className="flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--color-ink)]"
            >
              <ArrowLeft size={14} />
              Înapoi la portofoliu
            </Link>
          </div>

          <p className="eyebrow mt-10 text-[color:var(--color-copy-muted)]">
            {project.category}
          </p>

          <h1 className="display mt-4 text-[clamp(2.25rem,6vw,4rem)] text-[color:var(--color-ink)]">
            {project.title}
          </h1>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <dt className="text-[color:var(--color-copy-muted)]">Client</dt>
              <dd className="mt-1 font-medium text-[color:var(--color-ink)]">
                {project.client}
              </dd>
            </div>
            <div>
              <dt className="text-[color:var(--color-copy-muted)]">Rol</dt>
              <dd className="mt-1 font-medium text-[color:var(--color-ink)]">
                {detail.role}
              </dd>
            </div>
            <div>
              <dt className="text-[color:var(--color-copy-muted)]">Livrare</dt>
              <dd className="mt-1 font-medium text-[color:var(--color-ink)]">
                {detail.timeline}
              </dd>
            </div>
          </dl>

          <Reveal className="mt-16">
            <MaskRevealVideo src={project.video} />
          </Reveal>

          <Reveal className="mt-16 md:mt-20">
            <p className="measure text-lg leading-relaxed text-[color:var(--color-copy-muted)]">
              {detail.overview}
            </p>
          </Reveal>

          <Reveal className="mt-16 md:mt-20">
            <h2 className="display text-[clamp(1.5rem,3vw,2.25rem)] text-[color:var(--color-ink)]">
              Provocarea
            </h2>
            <p className="measure mt-5 text-[15px] leading-relaxed text-[color:var(--color-copy-muted)]">
              {detail.challengeIntro}
            </p>
            <ul className="mt-6 grid gap-3">
              {detail.challengePoints.map((point) => (
                <li
                  key={point}
                  className="rounded-xl border border-[color:var(--color-divider)] bg-white/60 p-4 text-[15px] leading-relaxed text-[color:var(--color-copy-muted)]"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-16 md:mt-20">
            <h2 className="display text-[clamp(1.5rem,3vw,2.25rem)] text-[color:var(--color-ink)]">
              Abordarea
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {detail.approach.map((item, index) => (
                <div key={item.title} className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--color-copy-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-[color:var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[color:var(--color-copy-muted)]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-16 md:mt-20">
            <h2 className="display text-[clamp(1.5rem,3vw,2.25rem)] text-[color:var(--color-ink)]">
              Soluția
            </h2>
            <p className="measure mt-5 text-[15px] leading-relaxed text-[color:var(--color-copy-muted)]">
              {detail.solution}
            </p>

            {project.features?.length > 0 && (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-xl border border-[color:var(--color-divider)] p-4 text-[15px] leading-relaxed text-[color:var(--color-copy-muted)]"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          {detail.gallery?.length > 0 && (
            <Reveal className="mt-16 md:mt-20">
              <div className="grid gap-6 sm:grid-cols-2">
                {detail.gallery.map((item, index) => (
                  <figure key={item.src} className="grid gap-3">
                    <div className="overflow-hidden rounded-2xl border border-[color:var(--color-divider)]">
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="text-sm text-[color:var(--color-copy-muted)]">
                      {String(index + 1).padStart(2, "0")} — {item.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          )}

          {project.liveUrl && (
            <Reveal className="mt-16 md:mt-20">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[color:var(--color-divider)] bg-white/60 p-6 transition-colors duration-300 hover:border-[color:var(--color-ink)]"
              >
                <span>
                  <span className="block text-sm text-[color:var(--color-copy-muted)]">
                    Site live
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-[color:var(--color-ink)]">
                    Deschide {project.title} într-un tab nou
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-[color:var(--color-ink)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </Reveal>
          )}

          <Reveal className="mt-16 md:mt-20">
            <h2 className="display text-[clamp(1.5rem,3vw,2.25rem)] text-[color:var(--color-ink)]">
              Rezultatul
            </h2>
            <p className="measure mt-5 text-[15px] leading-relaxed text-[color:var(--color-copy-muted)]">
              {detail.results}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {detail.stats.map((stat) => (
                <div key={stat.label} className="grid gap-1">
                  <span className="text-[clamp(2rem,1.5rem+2vw,3rem)] font-bold leading-none tracking-[-0.03em] text-[color:var(--color-ink)]">
                    {stat.value}
                  </span>
                  <span className="max-w-[22ch] text-sm leading-snug text-[color:var(--color-copy-muted)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-20 flex flex-col items-center gap-5 border-t border-[color:var(--color-divider)] pt-16 text-center md:mt-24">
            <h3 className="display text-[clamp(1.5rem,3vw,2rem)] text-[color:var(--color-ink)]">
              Vrei un site la fel de clar pentru afacerea ta?
            </h3>
            <p className="measure-tight text-[15px] leading-relaxed text-[color:var(--color-copy-muted)]">
              Programează o consultație gratuită, fără obligații.
            </p>
            <MagneticCta
              to="/discovery"
              className="mt-2 px-5 py-2.5 text-sm font-medium text-white sm:px-6 sm:py-3"
            >
              Consultanță gratuită
            </MagneticCta>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
      <BackToTop />
      <ConsentBanner />
    </div>
  );
}

export default CaseStudyDetail;
