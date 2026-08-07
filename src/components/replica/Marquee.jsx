import { services } from "../../data/services";

/**
 * Infinite marquee band — two identical tracks so the loop seam is
 * invisible, 50s linear infinite (linear is mandatory: any easing on an
 * infinite marquee produces a visible pulse at each cycle boundary).
 *
 * The reference uses this slot for client logos. We do not have client
 * logo permissions, so we run our own service names through it instead —
 * same ambient-drift effect, nothing borrowed, nothing implied.
 */
function Marquee() {
  const items = services.map((service) => service.title);

  const track = (key) => (
    <div className="replica-marquee__track" aria-hidden={key !== "a"}>
      {items.map((label, i) => (
        <span
          key={`${key}-${i}`}
          className="flex shrink-0 items-center gap-5 whitespace-nowrap text-lg font-medium text-[color:var(--color-copy-on-dark)] sm:text-xl"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
          {label}
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative grid gap-20 bg-[color:var(--color-ink)] py-20">
      <div className="replica-marquee mx-auto w-full max-w-[1366px]">
        {track("a")}
        {track("b")}
      </div>
    </section>
  );
}

export default Marquee;
