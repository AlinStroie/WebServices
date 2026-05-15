import { Activity, CalendarCheck, HeartPulse, Menu, MoveRight } from "lucide-react";

function MedicalSiteMockup() {
  return (
    <div className="h-full w-full overflow-hidden bg-[#f8fafc] text-slate-950">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <HeartPulse size={17} />
          </div>

          <div>
            <p className="text-xs font-bold leading-none">Kinetic Studio</p>
            <p className="mt-1 text-[9px] text-slate-500">Recuperare medicală</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 text-[10px] font-medium text-slate-500 sm:flex">
          <span>Servicii</span>
          <span>Programări</span>
          <span>Contact</span>
        </div>

        <Menu size={17} className="text-slate-500 sm:hidden" />
      </div>

      <div className="relative grid gap-4 p-4 sm:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
            Kinetoterapie • Recuperare • Masaj
          </div>

          <h3 className="max-w-[12rem] text-xl font-black tracking-[-0.06em] text-slate-950 sm:text-2xl">
            Recuperare personalizată pentru corpul tău.
          </h3>

          <p className="mt-3 max-w-[14rem] text-[11px] leading-5 text-slate-500">
            Programe adaptate pentru dureri, mobilitate și refacere după accidentări.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-950 px-3 py-2 text-[10px] font-semibold text-white">
              Programează-te
            </span>

            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-700">
              Servicii <MoveRight size={12} />
            </span>
          </div>
        </div>

        <div className="relative min-h-[10rem] overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-emerald-200 via-cyan-100 to-white p-3">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/50 blur-2xl" />
          <div className="absolute -bottom-10 left-3 h-28 w-28 rounded-full bg-cyan-300/60 blur-2xl" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="ml-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-lg backdrop-blur">
              <Activity size={22} className="text-emerald-600" />
            </div>

            <div className="rounded-2xl bg-white/80 p-3 shadow-xl backdrop-blur">
              <p className="text-[10px] font-semibold text-slate-500">
                Programări luna aceasta
              </p>

              <div className="mt-2 flex items-end justify-between">
                <p className="text-2xl font-black tracking-[-0.05em]">48</p>

                <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-semibold text-emerald-700">
                  <CalendarCheck size={11} />
                  +18%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 pb-4">
        {["Terapie manuală", "Postură", "Recuperare"].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-3"
          >
            <div className="mb-2 h-6 w-6 rounded-lg bg-emerald-100" />
            <p className="text-[10px] font-semibold text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalSiteMockup;