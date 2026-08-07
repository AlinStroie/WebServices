import Reveal from "./Reveal";
import { services } from "../../data/services";

/**
 * Three-up service cards.
 *
 * The highlighted (first) card carries the dual-speed conic glow from the
 * reference: two pseudo-elements rotating at 5s and 4s. Because the
 * periods differ they drift in and out of phase, so the glow never
 * visibly loops — a ~20s effective cycle from two cheap CSS animations.
 *
 * `h-full` on every card keeps the row even regardless of copy length.
 */
function ServiceCards() {
  return (
    <section
      id="servicii"
      className="isolate w-full bg-[color:var(--color-ink)] px-6 py-32 sm:px-8 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="flex flex-col items-center gap-4 text-center lg:gap-8">
          <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
            Servicii
          </p>

          <h2 className="display max-w-[20ch] text-[clamp(2rem,5vw,4rem)] text-white">
            Ce construim
          </h2>

          <p className="measure-tight text-[color:var(--color-copy-on-dark)]">
            De la un landing page pentru o campanie, până la un site complet de
            prezentare.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-3">
          {services.slice(0, 6).map((service, index) => {
            const Icon = service.icon;
            const highlighted = index === 0;

            return (
              <Reveal key={service.title} delay={index * 0.05}>
                <article
                  className={`h-full rounded-3xl p-px ${
                    highlighted ? "replica-glow" : ""
                  }`}
                >
                  <div className="flex h-full flex-col gap-6 rounded-3xl border border-[color:var(--color-divider-on-dark)] bg-[color:var(--color-ink-soft)] p-8">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[color:var(--color-accent)]">
                      <Icon size={22} />
                    </span>

                    <h3 className="text-xl font-semibold text-white">
                      {service.title}
                    </h3>

                    <p className="text-[15px] leading-relaxed text-[color:var(--color-copy-on-dark)]">
                      {service.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;
