import { lazy, Suspense, useMemo, useState } from "react";

import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";
import { trackContactOpen, trackCtaClick } from "../lib/analytics";

import Nav from "../components/replica/Nav";
import Hero from "../components/replica/Hero";
import ProblemStatement from "../components/replica/ProblemStatement";
import ServiceCards from "../components/replica/ServiceCards";
import Stats from "../components/replica/Stats";
import Marquee from "../components/replica/Marquee";
import BenefitsAccordion from "../components/replica/BenefitsAccordion";
import Works from "../components/replica/Works";
import Timeline from "../components/replica/Timeline";
import Principles from "../components/replica/Principles";
import Pricing from "../components/replica/Pricing";
import Faqs from "../components/replica/Faqs";
import SiteFooter from "../components/replica/SiteFooter";
import BookingModal from "../components/replica/BookingModal";

const CookieBanner = lazy(() => import("../components/CookieBanner"));
const LegalModal = lazy(() => import("../components/LegalModal"));

/**
 * Home, rebuilt on the reference site's architecture.
 *
 * Two structural rules this page has to honour, both discovered during
 * the Phase 1 research and documented in docs/research/components/:
 *
 *   1. NO `overflow-hidden` anywhere in the ancestor chain. An ancestor
 *      with overflow:hidden becomes the scroll container and silently
 *      kills every `position: sticky` below it — which would break both
 *      the hero pin and the timeline sidebar.
 *
 *   2. Sections are opaque and alternate light/dark slabs. The hero wipe
 *      only works because #despre genuinely covers the pinned hero
 *      (opaque background + z-20), rather than blending with it.
 *
 * The previous design (fixed atmospheric background + Three.js wave)
 * lives on untouched in src/pages/Home.jsx. Rolling back is a one-line
 * change to the "/" route in App.jsx.
 */
function HomeReplica() {
  const [booking, setBooking] = useState(false);
  const [plan, setPlan] = useState(null);
  const [legalModal, setLegalModal] = useState(null);

  const structuredData = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.brand.name,
        description: siteConfig.seo.description,
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.brand.name,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.contact.location,
        },
        sameAs: Object.values(siteConfig.social).filter(Boolean),
      },
    ],
    []
  );

  function openBooking(source = "unknown", selectedPlan = null) {
    setPlan(selectedPlan);
    setBooking(true);

    trackContactOpen(source);
    trackCtaClick(`Programare - ${source}`, selectedPlan || "Consultanță");
  }

  function openLegalModal(type) {
    if (type === "privacy" || type === "cookies") {
      window.location.href = "/privacy";
      return;
    }

    setLegalModal(type);
  }

  return (
    <div className="replica relative min-h-screen">
      <SEO structuredData={structuredData} />

      <Nav onBook={() => openBooking("navbar")} />

      <main id="top">
        <Hero onBook={() => openBooking("hero")} />

        <ProblemStatement />

        <ServiceCards />

        <Stats />

        <Marquee />

        <BenefitsAccordion />

        <Works onBook={() => openBooking("works")} />

        <Timeline />

        <Principles />

        <Pricing
          onSelectPlan={(selectedPlan) =>
            openBooking(`pricing_${String(selectedPlan).toLowerCase()}`, selectedPlan)
          }
        />

        <Faqs />
      </main>

      <SiteFooter
        onBook={() => openBooking("footer")}
        onOpenPolicy={openLegalModal}
      />

      {booking && (
        <BookingModal plan={plan} onClose={() => setBooking(false)} />
      )}

      <Suspense fallback={null}>
        <CookieBanner onOpenPolicy={openLegalModal} />
      </Suspense>

      {legalModal && (
        <Suspense fallback={null}>
          <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
        </Suspense>
      )}
    </div>
  );
}

export default HomeReplica;
