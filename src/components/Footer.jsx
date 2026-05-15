import { siteConfig } from "../data/siteConfig";

function Footer({ onOpenPolicy }) {
  return (
    <footer className="border-t border-white/10 px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-black">
              {siteConfig.brand.logoLetter}
            </span>
            <span className="font-semibold">{siteConfig.brand.name}</span>
          </div>

          <p className="max-w-xs leading-7 text-white/45">
            {siteConfig.brand.tagline}
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Linkuri</h4>
          <div className="flex flex-col gap-3 text-white/45">
            <a href="#home" className="hover:text-white">Acasă</a>
            <a href="#servicii" className="hover:text-white">Servicii</a>
            <a href="#portofoliu" className="hover:text-white">Portofoliu</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <button
              type="button"
              onClick={() => onOpenPolicy("privacy")}
              className="text-left hover:text-white"
            >
              GDPR
            </button>

            <button
              type="button"
              onClick={() => onOpenPolicy("cookies")}
              className="text-left hover:text-white"
            > 
              Cookies
            </button>
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
            <span>{siteConfig.contact.email}</span>
            <span>{siteConfig.contact.phone}</span>
            <span>{siteConfig.contact.location}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/35">
        © 2026 {siteConfig.brand.name}. Toate drepturile rezervate.
      </div>
    </footer>
  );
}

export default Footer;