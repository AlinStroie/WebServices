function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-black">
              W
            </span>
            <span className="font-semibold">WebNova Studio</span>
          </div>

          <p className="max-w-xs leading-7 text-white/45">
            Website-uri moderne, rapide și responsive pentru afaceri care vor o
            imagine premium online.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Linkuri</h4>
          <div className="flex flex-col gap-3 text-white/45">
            <a href="#home" className="hover:text-white">Acasă</a>
            <a href="#servicii" className="hover:text-white">Servicii</a>
            <a href="#portofoliu" className="hover:text-white">Portofoliu</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Servicii</h4>
          <div className="flex flex-col gap-3 text-white/45">
            <span>Site-uri de prezentare</span>
            <span>Landing page-uri</span>
            <span>Magazine online simple</span>
            <span>Mentenanță</span>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact</h4>
          <div className="flex flex-col gap-3 text-white/45">
            <span>contact@webnova.ro</span>
            <span>+40 700 000 000</span>
            <span>Brașov, România</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/35">
        © 2026 WebNova Studio. Toate drepturile rezervate.
      </div>
    </footer>
  );
}

export default Footer;