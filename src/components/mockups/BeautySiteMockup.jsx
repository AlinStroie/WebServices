import { ArrowRight, CalendarCheck, Menu, Sparkles, Star } from "lucide-react";

function BeautySiteMockup() {
  return (
    <div className="h-full w-full overflow-hidden bg-[#f2ede7] text-[#35251f]">
      <div className="relative h-full overflow-hidden">
        {/* fundal decorativ */}
        <div className="absolute right-0 top-0 h-full w-[52%] bg-gradient-to-l from-[#eadbc3] via-[#f5efe4] to-transparent" />
        <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-[#e5c997]/50 blur-3xl" />
        <div className="absolute left-1/2 top-20 h-40 w-40 rounded-full border border-[#b89a5f]/20" />

        {/* header */}
        <div className="relative z-10 flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8bf8a] bg-[#fbf7ef] text-[#b99145] shadow-sm">
              <Sparkles size={17} />
            </div>

            <div>
              <p className="font-serif text-sm font-semibold tracking-[0.08em]">
                AURORA
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.24em] text-[#8a776d]">
                Beauty studio
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-5 text-[10px] font-medium text-[#7a6960] sm:flex">
            <span className="text-[#b99145]">Home</span>
            <span>Studio</span>
            <span>Services</span>
            <span>Gallery</span>
          </div>

          <div className="hidden sm:block">
            <span className="rounded-full border border-[#b99145] px-4 py-2 text-[10px] font-semibold text-[#5b463b]">
              Book a visit
            </span>
          </div>

          <Menu size={18} className="text-[#6f625d] sm:hidden" />
        </div>

        {/* hero */}
        <div className="relative z-10 grid gap-5 px-5 pb-5 pt-5 sm:grid-cols-[0.95fr_1.05fr] sm:px-7">
          {/* stânga */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-[10px] font-semibold text-[#8a6b35]">
              <Star size={12} className="fill-[#caa857] text-[#caa857]" />
              Premium beauty care
            </div>

            <h3 className="max-w-[17rem] font-serif text-[2rem] leading-[1.02] tracking-[-0.055em] text-[#35251f] sm:text-[2.35rem]">
              Beauty ritualuri create pentru un look rafinat.
            </h3>

            <p className="mt-4 max-w-[17rem] text-[11px] leading-5 text-[#7a6960]">
              Un website elegant pentru un salon modern, cu servicii clare,
              galerie vizuală și programări rapide.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#35251f] px-5 py-3 text-[10px] font-semibold text-white">
                Vezi serviciile
                <ArrowRight size={12} />
              </span>

              <span className="rounded-full border border-[#d8c6a3] bg-white/40 px-4 py-3 text-[10px] font-semibold text-[#5b463b]">
                Galerie
              </span>
            </div>
          </div>

          {/* dreapta */}
          <div className="relative flex min-h-[18rem] items-center justify-center">
            {/* card imagine principala stilizata */}
            <div className="relative h-[17rem] w-[13rem] overflow-hidden rounded-[7rem_7rem_1.8rem_1.8rem] bg-[#ddd4ca] shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ede7dd] via-[#d9cfc5] to-[#c9b8a6]" />

              {/* silueta abstracta, nu imagine copiata */}
              <div className="absolute left-1/2 top-[18%] h-20 w-16 -translate-x-1/2 rounded-full bg-[#dfb18b]" />
              <div className="absolute left-[44%] top-[12%] h-28 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#6e4a35] via-[#b7845d] to-[#e0b58a]" />
              <div className="absolute left-[57%] top-[35%] h-36 w-24 -translate-x-1/2 rounded-[3rem] bg-[#f6eee7]" />
              <div className="absolute left-[48%] top-[31%] h-28 w-10 -translate-x-1/2 rounded-full bg-[#d89f78]" />
              <div className="absolute right-7 top-12 h-16 w-6 rotate-12 rounded-full bg-[#c88f67]" />
            </div>

            {/* card booking */}
            <div className="absolute bottom-3 left-0 rounded-[1.3rem] border border-white/60 bg-white/75 p-3 shadow-xl backdrop-blur-md">
              <p className="text-[9px] font-semibold text-[#8a776d]">
                Programari azi
              </p>

              <div className="mt-2 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#35251f] text-white">
                  <CalendarCheck size={15} />
                </div>

                <div>
                  <p className="text-lg font-black leading-none">18</p>
                  <p className="mt-1 text-[9px] text-[#8a776d]">confirmate</p>
                </div>
              </div>
            </div>

            {/* card rating */}
            <div className="absolute right-0 top-5 rounded-[1.3rem] border border-white/50 bg-white/65 p-3 shadow-xl backdrop-blur-md">
              <p className="text-[9px] font-semibold text-[#8a776d]">
                Rating
              </p>

              <div className="mt-2 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    size={10}
                    className="fill-[#caa857] text-[#caa857]"
                  />
                ))}
              </div>

              <p className="mt-1 text-sm font-black">4.9</p>
            </div>
          </div>
        </div>

        {/* servicii jos */}
        <div className="relative z-10 grid grid-cols-3 gap-2 px-5 pb-5 sm:px-7">
          {["Make-up", "Brows", "Lashes"].map((service) => (
            <div
              key={service}
              className="rounded-2xl border border-white/50 bg-white/45 p-3 backdrop-blur-sm"
            >
              <div className="mb-2 h-6 w-6 rounded-full bg-[#d5b76e]/70" />
              <p className="text-[10px] font-semibold text-[#5f5048]">
                {service}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BeautySiteMockup;
