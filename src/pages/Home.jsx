import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import LegalModal from "../components/LegalModal";
import ContactDrawer from "../components/ContactDrawer";
import ThreeDotWaveBackground from "../components/ThreeDotWaveBackground";
import BlogPreview from "../components/BlogPreview";
import BlogCarousel from "../components/BlogCarousel";

function Home() {
  const [legalModal, setLegalModal] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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
      {/* Fundal general: negru + glow-uri subtile */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#030303]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_20%_75%,rgba(255,255,255,0.025),transparent_30%),radial-gradient(circle_at_85%_35%,rgba(255,255,255,0.035),transparent_32%)]" />

        <div className="absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute right-[-10rem] top-40 h-[30rem] w-[30rem] rounded-full bg-slate-300/[0.03] blur-[130px]" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-white/[0.02] blur-[140px]" />

        <div className="absolute left-[-10%] top-[20%] h-[18rem] w-[120%] rotate-[-8deg] rounded-[100%] bg-white/[0.014] blur-[80px]" />
        <div className="absolute left-[-10%] top-[48%] h-[16rem] w-[120%] rotate-[7deg] rounded-[100%] bg-white/[0.01] blur-[90px]" />
        <div className="absolute left-[-10%] top-[72%] h-[15rem] w-[120%] rotate-[-5deg] rounded-[100%] bg-white/[0.008] blur-[95px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.25)_68%,rgba(0,0,0,0.84)_100%)]" />
      </div>

      <ThreeDotWaveBackground paused={isOverlayOpen} />

      <div className="relative z-10">
        <Navbar
          onOpenContact={() => openContact("Standard")}
          onOpenPolicy={openLegalModal}
        />

        <main>
          <Hero onOpenContact={() => openContact("Standard")} />
          <Benefits />
          <Services />
          <Portfolio onOverlayChange={setIsOverlayOpen} />
          <Process />
          <BlogCarousel />
          <Pricing onSelectPlan={openContact} />
          <CTA onOpenContact={() => openContact("Standard")} />
        </main>

        <Footer
          onOpenContact={() => openContact("Standard")}
          onOpenPolicy={openLegalModal}
        />

        <CookieBanner onOpenPolicy={openLegalModal} />

        <LegalModal type={legalModal} onClose={closeLegalModal} />

        <ContactDrawer
          open={contactOpen}
          onClose={closeContact}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          onOpenPolicy={openLegalModal}
        />
      </div>
    </div>
  );
}

export default Home;