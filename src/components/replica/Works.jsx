import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import Reveal from "./Reveal";
import { StaticCardPreview } from "../PortfolioBrowserFrame";
import { portfolio } from "../../data/portfolio";
import useInViewVideo from "../../hooks/useInViewVideo";

// Portfolio project ids that have a real, published case study reachable at
// /studii-de-caz/:slug (Case Study CMS — see server/prisma/seedCaseStudies.js).
// Everything else still routes to the generic /project/:id stub. Kept as a
// small local constant rather than a data fetch here: this only gates a
// same-page link choice, so it isn't worth the async complexity of calling
// the case-studies API from inside the homepage's Works grid.
const CASE_STUDY_SLUGS = new Set(["prolinen"]);

// Featured slice — only the first 3 case studies show here; the rest stay
// in the data file (still reachable at /project/:id) until real client
// work replaces the mockup set.
const featured = portfolio.slice(0, 3);

/**
 * Featured projects — rebuilt on dixieraizpacheco.com's own project list
 * (`.project` / `.img-mask`, read from its live computed styles).
 *
 * Two separate layers, and only one of them moves:
 *   - the "window" — the bordered, rounded, overflow-hidden frame — never
 *     animates. It just sits in normal scroll flow like any other element.
 *   - the image inside it is the only thing with motion: a continuous,
 *     scroll-linked scale from 1 -> 1.13 as the window travels through the
 *     viewport (not a one-shot reveal), so it keeps slowly zooming in the
 *     whole time it's on screen — the "immersive" Ken-Burns-ish effect.
 *
 * Every project stays in the same left-image/right-copy order down the
 * page (the reference doesn't alternate sides either), and the whole
 * image is the link into `/project/:id` — a stub page (same pattern as
 * `/studii-de-caz`) until each project gets its own documented write-up.
 *
 * Right column is deliberately minimal: title, a client "logo" (placeholder
 * wordmark — no real client logos exist yet), then up to 3 tags. No eyebrow
 * category label and no description paragraph — just enough to identify
 * the project.
 */
function Works() {
  return (
    <section id="lucrari" className="grad-dark w-full">
      <div className="mx-auto grid w-full max-w-[1366px] gap-24 px-6 pb-40 pt-40 sm:px-8 md:gap-40">
        <Reveal>
          <h2 className="title-gradient max-w-[20ch] text-[clamp(2.5rem,1.8932rem+2.589vw,4rem)] font-bold leading-[1.05]">
            Proiecte și <span className="accent-serif">concepte</span>
          </h2>
        </Reveal>

        <div className="grid gap-20 md:gap-40">
          {featured.map((project) => (
            <article
              key={project.id}
              className="grid justify-between gap-10 md:gap-20 lg:grid-cols-[2fr_1fr]"
            >
              <ProjectThumbnail project={project} />

              <div className="grid content-center gap-10 lg:gap-16">
                <h3 className="max-w-[20ch] text-[clamp(1.75rem,3vw,2.5rem)] font-normal capitalize leading-[1.15] text-white/70">
                  {project.title}
                </h3>

                {project.client && (
                  <p className="text-lg font-semibold uppercase tracking-[0.08em] text-white/50">
                    {project.client}
                  </p>
                )}

                {project.tags?.length > 0 && (
                  <ul className="flex flex-wrap gap-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className="shrink-0 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <Reveal className="flex flex-col items-center gap-5 text-center">
          <h3 className="display text-[clamp(1.75rem,3vw,2.5rem)] text-white">
            Vrei un site ca acesta?
          </h3>

          <p className="max-w-[46ch] text-[15px] leading-relaxed text-[color:var(--color-copy-on-dark)]">
            Hai să vorbim despre proiectul tău — programează o consultație
            gratuită, fără obligații.
          </p>

          <Link
            to="/discovery"
            className="mt-3 rounded-full border-2 border-white px-4 py-2 text-sm text-white transition-colors duration-300 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            Programează o consultație
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectThumbnail({ project }) {
  const windowRef = useRef(null);
  const videoRef = useInViewVideo();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: windowRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.13]);

  const hasCaseStudy = CASE_STUDY_SLUGS.has(project.id);
  const to = hasCaseStudy
    ? `/studii-de-caz/${project.id}`
    : `/project/${project.id}`;

  return (
    <Link
      to={to}
      className="relative block"
      aria-label={`Vezi proiectul ${project.title}`}
    >
      <div
        ref={windowRef}
        className="relative z-10 aspect-[1.6/1] w-full overflow-hidden rounded-xl border border-white/15 bg-white/60 backdrop-blur-md md:rounded-3xl"
      >
        <motion.div
          className="h-full w-full origin-center will-change-transform"
          style={{ scale: reduceMotion ? 1 : scale }}
        >
          {project.video ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover object-top"
              src={project.video}
              poster={project.poster}
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <StaticCardPreview project={project} />
          )}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-[-6%] z-0 h-20 w-full rounded-full bg-[#0b0d13] blur-lg" />
      <div className="absolute inset-x-0 bottom-[-8%] z-0 h-20 w-full rounded-full bg-[#0b0d13] blur-3xl" />
    </Link>
  );
}

export default Works;
