import SEO from "../components/SEO";

import Nav from "../components/replica/Nav";
import ServiciiHero from "../components/replica/ServiciiHero";
import ServiciiSection from "../components/replica/ServiciiSection";
import SiteFooter from "../components/replica/SiteFooter";
import BackToTop from "../components/replica/BackToTop";
import WhatsAppButton from "../components/replica/WhatsAppButton";
import ConsentBanner from "../components/replica/ConsentBanner";

/**
 * /servicii — real services list pulled out into its own route, the same
 * treatment /preturi already got: a dedicated light sticky hero followed by
 * a dark content section, reachable from Nav's "Servicii" entry.
 */
function ServiciiPage() {
  return (
    <div className="replica relative min-h-screen">
      <SEO
        title="Servicii web design Brașov"
        description="Site-uri de prezentare, landing page-uri, magazine online, redesign și mentenanță — A Squared Studio, agenție web design din Brașov, cu clienți din toată România."
      />

      <Nav />

      <main id="top">
        <ServiciiHero />

        <ServiciiSection />
      </main>

      <SiteFooter />

      <BackToTop />
      <WhatsAppButton />

      <ConsentBanner />
    </div>
  );
}

export default ServiciiPage;
