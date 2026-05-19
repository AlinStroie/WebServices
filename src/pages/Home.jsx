import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SEO from "../components/SEO";
import { siteConfig } from "../data/siteConfig";

const Benefits = lazy(() => import("../components/Benefits"));
const Services = lazy(() => import("../components/Services"));
const Portfolio = lazy(() => import("../components/Portfolio"));
const Process = lazy(() => import("../components/Process"));
const BlogCarousel = lazy(() => import("../components/BlogCarousel"));
const Pricing = lazy(() => import("../components/Pricing"));
const CTA = lazy(() => import("../components/CTA"));
const Footer = lazy(() => import("../components/Footer"));
const CookieBanner = lazy(() => import("../components/CookieBanner"));
const LegalModal = lazy(() => import("../components/LegalModal"));
const ContactDrawer = lazy(() => import("../components/ContactDrawer"));
const ThreeDotWaveBackground = lazy(() =>
  import("../components/ThreeDotWaveBackground")
);

function SectionLoader({ minHeight = 280 }) {
  return <div aria-hidden="true" style={{ minHeight }} />;
}

function LazyOnView({ children, minHeight = 280, rootMargin = "520px 0px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref}>
      {visible ? (
        <Suspense fallback={<SectionLoader minHeight={minHeight} />}>
          {children}
        </Suspense>
      ) : (
        <SectionLoader minHeight={minHeight} />
      )}
    </div>
  );
}



function FloatingQuickActions({ onOpenContact, hidden }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 720);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hidden || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[180] flex items-center gap-2 md:bottom-6 md:right-6">
      <button
        type="button"
        onClick={onOpenContact}
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black shadow-[0_18px_70px_rgba(0,0,0,0.45)] transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <MessageCircle size={16} />
        Ofertă
      </button>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Înapoi sus"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/75 text-white shadow-[0_18px_70px_rgba(0,0,0,0.45)] transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <ArrowUp size={17} />
      </button>
    </div>
  );
}

function Home() {
  const [legalModal, setLegalModal] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [cookieReady, setCookieReady] = useState(false);
  const [showDesktopWave, setShowDesktopWave] = useState(false);

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

  useEffect(() => {
    const timer = window.setTimeout(() => setCookieReady(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canShowWave =
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !navigator.connection?.saveData;

    if (!canShowWave) return;

    const show = () => setShowDesktopWave(true);
    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(show, { timeout: 1600 })
      : window.setTimeout(show, 900);

    return () => {
      if ("cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  function openContact(plan = "Standard") {
    setSelectedPlan(plan);
    setContactOpen(true);
    setIsOverlayOpen(true);
  }

  function closeContact() {
    setContactOpen(false);
    setIsOverlayOpen(false);
  }

  function openLegalModal(type) {
    setLegalModal(type);
    setIsOverlayOpen(true);
  }

  function closeLegalModal() {
    setLegalModal(null);

    if (!contactOpen) {
      setIsOverlayOpen(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <SEO structuredData={structuredData} />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),transparent_34%),radial-gradient(circle_at_20%_75%,rgba(255,255,255,0.022),transparent_30%)]" />
        <div className="absolute -left-40 top-20 h-[24rem] w-[24rem] rounded-full bg-white/[0.022] blur-[54px] md:h-[28rem] md:w-[28rem] md:blur-[120px]" />
        <div className="absolute right-[-10rem] top-40 hidden h-[30rem] w-[30rem] rounded-full bg-slate-300/[0.03] blur-[130px] md:block" />
        <div className="absolute bottom-[-12rem] left-1/3 hidden h-[34rem] w-[34rem] rounded-full bg-white/[0.02] blur-[140px] md:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.22)_68%,rgba(0,0,0,0.84)_100%)]" />
      </div>

      {showDesktopWave && (
        <Suspense fallback={null}>
          <ThreeDotWaveBackground paused={isOverlayOpen} />
        </Suspense>
      )}

      <div className="relative z-10">
        <Navbar
          onOpenContact={() => openContact("Standard")}
          onOpenPolicy={openLegalModal}
        />

        <main>
          <Hero onOpenContact={() => openContact("Standard")} />

          <LazyOnView minHeight={300}>
            <Benefits />
          </LazyOnView>

          <LazyOnView minHeight={340}>
            <Services />
          </LazyOnView>

          <LazyOnView minHeight={460}>
            <Portfolio
              onOverlayChange={setIsOverlayOpen}
              onOpenContact={openContact}
            />
          </LazyOnView>

          <LazyOnView minHeight={440}>
            <Process />
          </LazyOnView>

          <LazyOnView minHeight={500}>
            <BlogCarousel />
          </LazyOnView>

          <LazyOnView minHeight={520}>
            <Pricing onSelectPlan={openContact} />
          </LazyOnView>

          <LazyOnView minHeight={360}>
            <CTA onOpenContact={() => openContact("Standard")} />
          </LazyOnView>
        </main>

        <LazyOnView minHeight={360} rootMargin="320px 0px">
          <Footer
            onOpenContact={() => openContact("Standard")}
            onOpenPolicy={openLegalModal}
          />
        </LazyOnView>

        <FloatingQuickActions
          hidden={isOverlayOpen}
          onOpenContact={() => openContact("Standard")}
        />

        {cookieReady && (
          <Suspense fallback={null}>
            <CookieBanner onOpenPolicy={openLegalModal} />
          </Suspense>
        )}

        {legalModal && (
          <Suspense fallback={null}>
            <LegalModal type={legalModal} onClose={closeLegalModal} />
          </Suspense>
        )}

        <Suspense fallback={null}>
          <ContactDrawer
            open={contactOpen}
            onClose={closeContact}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            onOpenPolicy={openLegalModal}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
