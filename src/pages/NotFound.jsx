import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function NotFound() {
  return (
    <>
      <SEO
        title="Pagina nu a fost găsită | A Squared Studio"
        description="Pagina pe care o cauți nu există sau a fost mutată."
        noindex
      />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_45%)]" />

        <section className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.38em] text-white/35">
            404
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            Pagina nu a fost găsită.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/50">
            Linkul accesat nu mai există, pagina a fost mutată sau adresa a
            fost introdusă greșit.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Înapoi la homepage
            </Link>

            <Link
              to="/blog"
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-black"
            >
              Vezi blogul
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default NotFound;
