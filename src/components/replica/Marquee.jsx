import { clients } from "../../data/clients";

/**
 * Infinite marquee band — two identical tracks so the loop seam is
 * invisible, 50s linear infinite (linear is mandatory: any easing on an
 * infinite marquee produces a visible pulse at each cycle boundary).
 *
 * The reference uses this slot for client logos. Content lives in
 * src/data/clients.js: entries with a `logo` path render as an <img>,
 * entries without one render as their text `label`. Default placeholders
 * are text-only — nothing borrowed, nothing implied.
 *
 * Edge fade is `.replica-marquee`'s mask-image in index.css, not here —
 * it has to live on the overflow:hidden element itself.
 */
function Marquee() {
  const track = (key) => (
    <div className="replica-marquee__track" aria-hidden={key !== "a"}>
      {clients.map((client, i) => (
        <span
          key={`${key}-${i}`}
          className="flex shrink-0 items-center gap-5 whitespace-nowrap text-lg font-medium text-[color:var(--color-copy-on-dark)] sm:text-xl"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
          {client.logo ? (
            <img
              src={client.logo}
              alt={client.label}
              className="h-8 w-auto object-contain opacity-80"
              loading="lazy"
              decoding="async"
            />
          ) : (
            client.label
          )}
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative grid gap-20 bg-[color:var(--color-ink)] py-20">
      <h2 className="title-gradient mx-auto max-w-[24ch] px-6 text-center text-[clamp(1.25rem,0.9545rem+1.2727vw,2rem)] font-normal leading-[1.2]">
        Web Design Premium în România: Soluții Complete, Livrate de o Echipă Dedicată
      </h2>

      <div className="replica-marquee mx-auto w-full max-w-[1600px]">
        {track("a")}
        {track("b")}
      </div>
    </section>
  );
}

export default Marquee;
