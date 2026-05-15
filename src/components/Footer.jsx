import { siteConfig } from "../data/siteConfig";

function Footer({ onOpenPolicy, onOpenContact }) {
  return (
    <footer className="border-t border-white/10 px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center">
            <img src="/banner site.svg"
              alt={siteConfig.brand.name}
              className="h-20 w-auto"
            />
          </div>
          <p className="max-w-xs leading-7 text-white/45">
            {siteConfig.brand.tagline}
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Linkuri</h4>

          <div className="flex flex-col gap-3 text-white/45">
            <a href="#home" className="hover:text-white">
              Acasă
            </a>

            <a href="#servicii" className="hover:text-white">
              Servicii
            </a>

            <a href="#portofoliu" className="hover:text-white">
              Portofoliu
            </a>

            <a href="#proces" className="hover:text-white">
              Proces
            </a>

            <a href="#preturi" className="hover:text-white">
              Prețuri
            </a>

            <button
              type="button"
              onClick={onOpenContact}
              className="text-left hover:text-white"
            >
              Contact
            </button>

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
            <span>Optimizare SEO basic</span>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact</h4>

          <div className="flex flex-col gap-3 text-white/45">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-white"
            >
              {siteConfig.contact.email}
            </a>

            <a
              href={`tel:${siteConfig.contact.phone.replaceAll(" ", "")}`}
              className="hover:text-white"
            >
              {siteConfig.contact.phone}
            </a>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              WhatsApp
            </a>

            <span>{siteConfig.contact.location}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
        <p>
          © 2026 {siteConfig.brand.name}. Toate drepturile rezervate.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => onOpenPolicy("privacy")}
            className="hover:text-white"
          >
            Politica de confidențialitate
          </button>

          <button
            type="button"
            onClick={() => onOpenPolicy("cookies")}
            className="hover:text-white"
          >
            Politica de cookies
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;