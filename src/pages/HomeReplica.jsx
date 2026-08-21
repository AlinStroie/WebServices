import { useMemo } from "react";

import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";

import Nav from "../components/replica/Nav";
import SectionRail from "../components/replica/SectionRail";
import Hero from "../components/replica/Hero";
import ProblemStatement from "../components/replica/ProblemStatement";
import ServiceCards from "../components/replica/ServiceCards";
import VideoShowcase from "../components/replica/VideoShowcase";
import CaseStudy from "../components/replica/CaseStudy";
import Marquee from "../components/replica/Marquee";
import WhyUs from "../components/replica/WhyUs";
import Works from "../components/replica/Works";
import Timeline from "../components/replica/Timeline";
import Testimonials from "../components/replica/Testimonials";
import Faqs from "../components/replica/Faqs";
import SiteFooter from "../components/replica/SiteFooter";

import BackToTop from "../components/replica/BackToTop";
import ConsentBanner from "../components/replica/ConsentBanner";

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
 * All "book a call" CTAs route to /discovery rather than opening a modal,
 * matching the reference's dedicated consultation page.
 *
 * The previous design lives on untouched in src/pages/Home.jsx. Rolling
 * back is a one-line change to the "/" route in App.jsx.
 */
function HomeReplica() {
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

  return (
    <div className="replica relative min-h-screen">
      <SEO structuredData={structuredData} />

      <Nav />
      <SectionRail />

      <main id="top">
        <Hero />

        <ProblemStatement />

        <ServiceCards />

        <VideoShowcase />

        <CaseStudy />

        <Marquee />

        <WhyUs />

        <Works />

        <Timeline />

        <Testimonials />

        <Faqs />
      </main>

      <SiteFooter />

      <BackToTop />

      <ConsentBanner />
    </div>
  );
}

export default HomeReplica;
