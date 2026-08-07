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
            />
          ) : (
            client.label
          )}
        </span>
      ))}
    </div>
  );

  return (
    <section className="grad-dark relative grid gap-20 py-20">
      <div className="replica-marquee mx-auto w-full max-w-[1366px]">
        {track("a")}
        {track("b")}
      </div>
    </section>
  );
}

export default Marquee;
