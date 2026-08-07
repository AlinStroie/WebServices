import Reveal from "./Reveal";

/**
 * Stat row — 4 columns -> 2 -> 1, with a deliberately tight 0.4rem gap
 * between each number and its label so the pair reads as one unit.
 *
 * No count-up animation, matching the reference. That restraint is a
 * feature: count-ups are also an accessibility nuisance, since some
 * screen readers announce every intermediate value.
 *
 * NOTE: these describe how we work, not performance claims. Swap in real
 * measured numbers before launch if you want metrics here instead.
 */
const stats = [
  { value: "100%", label: "Responsive pe mobil" },
  { value: "< 2s", label: "Țintă de încărcare" },
  { value: "6", label: "Etape de lucru" },
  { value: "1:1", label: "Discuție directă" },
];

function Stats() {
  return (
    <section className="w-full bg-[color:var(--color-ink)] px-6 py-32 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center">
        <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <div className="flex flex-col items-center gap-[0.4rem] text-center">
                <span className="display text-[clamp(3rem,6vw,4.5rem)] text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-[color:var(--color-copy-subtle-on-dark)]">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
