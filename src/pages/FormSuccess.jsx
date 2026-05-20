import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Home } from "lucide-react";

import SEO from "../components/SEO";

function FormSuccess() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 text-white">
      <SEO
        title="Cerere trimisă"
        description="Cererea ta a fost trimisă cu succes. Te vom contacta în cel mai scurt timp."
        path="/succes"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.09),transparent_35%)]" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
          <CheckCircle2 size={34} />
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
          Cererea a fost trimisă.
        </h1>

        <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
          Am primit mesajul tău. Te vom contacta în cel mai scurt timp pentru a
          discuta detaliile proiectului.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90"
          >
            <Home size={17} />
            Înapoi pe site
          </Link>

          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-white/70 transition hover:bg-white hover:text-black"
          >
            Citește blogul
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormSuccess;