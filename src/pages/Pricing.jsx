import SEO from "../components/SEO";

import Nav from "../components/replica/Nav";
import PricingHero from "../components/replica/PricingHero";
import PricingSection from "../components/replica/Pricing";
import SiteFooter from "../components/replica/SiteFooter";
import BackToTop from "../components/replica/BackToTop";
import ConsentBanner from "../components/replica/ConsentBanner";

/**
 * /preturi — Pricing pulled out of the homepage scroll and given its own
 * route, reachable from Nav's "Prețuri" entry. Gets its own light sticky
 * hero (PricingHero, matching the reference's dedicated pricing-page hero)
 * so the gap under the fixed Nav is absorbed the same way HomeReplica's
 * Hero absorbs it, rather than a flat top padding.
 */
function PricingPage() {
  return (
    <div className="replica relative min-h-screen">
      <SEO
        title="Prețuri site web Brașov"
        description="Pachete și prețuri pentru site-uri de prezentare, landing page-uri și portofolii — A Squared Studio, agenție web design din Brașov, cu clienți din toată România."
      />

      <Nav />

      <main id="top">
        <PricingHero />

        <PricingSection />
      </main>

      <SiteFooter />

      <BackToTop />

      <ConsentBanner />
    </div>
  );
}

export default PricingPage;
