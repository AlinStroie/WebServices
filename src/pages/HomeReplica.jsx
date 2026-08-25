import { lazy, Suspense } from "react";

import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";

import Nav from "../components/replica/Nav";
import SectionRail from "../components/replica/SectionRail";
import Hero from "../components/replica/Hero";
import ProblemStatement from "../components/replica/ProblemStatement";

// Everything below is off-screen on first paint (scrolled well past the
// pinned hero) — lazy-loading it keeps it out of the bundle Home needs for
// its initial render, which was ~86 KiB of "unused JS" on that first load
// per PageSpeed. fallback={null} matches the pattern App.jsx already uses
// for route-level code-splitting: nothing renders until the chunk lands,
// no loading-state flash.
const ServiceCards = lazy(() => import("../components/replica/ServiceCards"));
const VideoShowcase = lazy(() => import("../components/replica/VideoShowcase"));
const CaseStudy = lazy(() => import("../components/replica/CaseStudy"));
const Marquee = lazy(() => import("../components/replica/Marquee"));
const WhyUs = lazy(() => import("../components/replica/WhyUs"));
const Works = lazy(() => import("../components/replica/Works"));
const Timeline = lazy(() => import("../components/replica/Timeline"));
const Testimonials = lazy(() => import("../components/replica/Testimonials"));
const Faqs = lazy(() => import("../components/replica/Faqs"));
const SiteFooter = lazy(() => import("../components/replica/SiteFooter"));

import BackToTop from "../components/replica/BackToTop";
import WhatsAppButton from "../components/replica/WhatsAppButton";
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
  return (
    <div className="replica relative min-h-screen">
      <SEO
        structuredData={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "A Squared Studio — Agenție Web Design Brașov",
          description:
            "Prezentare A Squared Studio: site-uri web personalizate, construite pentru conversii, viteză și rezultate reale.",
          thumbnailUrl: [`${siteConfig.siteUrl}/hero/hero-poster.webp`],
          uploadDate: "2026-08-18",
          contentUrl: `${siteConfig.siteUrl}/hero/hero-video.mp4`,
        }}
      />

      <Nav />
      <SectionRail />

      <main id="top">
        <Hero />

        <ProblemStatement />

        <Suspense fallback={null}>
          <ServiceCards />

          <VideoShowcase />

          <CaseStudy />

          <Marquee />

          <WhyUs />

          <Works />

          <Timeline />

          <Testimonials />

          <Faqs />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <SiteFooter />
      </Suspense>

      <BackToTop />
      <WhatsAppButton />

      <ConsentBanner />
    </div>
  );
}

export default HomeReplica;
