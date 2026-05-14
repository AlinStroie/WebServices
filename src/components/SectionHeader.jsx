function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-white/45">
        {eyebrow}
      </p>

      <h2 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
        {title}
      </h2>

      {text && (
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;