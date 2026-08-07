import Reveal from "./Reveal";

const points = [
  "Site-uri care arată bine, dar nu explică nimic despre ce faci.",
  "Structură încâlcită, în care vizitatorul nu găsește ce caută.",
  "Pagini lente, care se încarcă greu pe telefon.",
  "Formulare care nu funcționează sau ajung în spam.",
];

/**
 * The section that performs the hero wipe.
 *
 * `z-20` + a fully opaque background are the two properties that make it
 * work — it has to genuinely cover the pinned hero, not blend with it.
 * The hard light -> dark switch does most of the visual work here; the
 * section itself has no entrance animation at all.
 */
function ProblemStatement() {
  return (
    <section
      id="despre"
      className="relative z-20 w-full shrink-0 overflow-clip bg-[color:var(--color-ink)]"
    >
      <div className="mx-auto w-full max-w-[1366px] px-6 py-32 sm:px-8 lg:py-40">
        <div className="relative grid gap-8 md:gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-between">
            <div className="measure grid gap-12">
              <p className="eyebrow text-[color:var(--color-copy-subtle-on-dark)]">
                Problema
              </p>

              <h2 className="display text-[clamp(2rem,5vw,4rem)] text-white">
                Majoritatea site-urilor nu pierd clienți din design.
              </h2>
            </div>
          </div>

          <div className="grid gap-8 self-center">
            <p className="measure-tight text-lg text-[color:var(--color-copy-on-dark)]">
              Le pierd din structură. Informația e acolo, dar nu în ordinea în
              care omul o caută — așa că închide pagina înainte să ajungă la
              partea care conta.
            </p>

            <ul className="grid gap-4">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex gap-4 border-t border-[color:var(--color-divider-on-dark)] pt-4 text-[color:var(--color-copy-on-dark)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Reveal>
              <p className="text-lg font-medium text-white">
                Noi începem de la structură, nu de la decor.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemStatement;
