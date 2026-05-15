function DefaultSiteMockup({ project }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${project.gradient || "bg-gradient-to-br from-white/20 to-white/5"}`}
    >
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 p-5">
        <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/80 backdrop-blur">
          {project.category}
        </div>

        <h3 className="max-w-xs text-3xl font-black tracking-[-0.06em] text-white">
          {project.title}
        </h3>

        <p className="mt-4 max-w-sm text-xs leading-6 text-white/65">
          {project.text}
        </p>

        <div className="mt-6 flex gap-2">
          <div className="rounded-full bg-white px-4 py-2 text-[10px] font-semibold text-black">
            Vezi detalii
          </div>

          <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold text-white backdrop-blur">
            Contact
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/15 bg-black/35 p-5 backdrop-blur-md">
        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="h-16 rounded-2xl bg-white/20" />
          <div className="h-16 rounded-2xl bg-white/15" />
          <div className="h-16 rounded-2xl bg-white/10" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded-full bg-white/30" />
          <div className="h-2 w-full rounded-full bg-white/15" />
          <div className="h-2 w-2/3 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
}

export default DefaultSiteMockup;