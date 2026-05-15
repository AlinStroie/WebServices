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

function Home() {
  const [legalModal, setLegalModal] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Standard");

  function openContact(plan = "Standard") {
    setSelectedPlan(plan);
    setContactOpen(true);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <Navbar
        onOpenContact={() => openContact("Standard")}
        onOpenPolicy={setLegalModal}
      />

      <main>
        <Hero onOpenContact={() => openContact("Standard")} />
        <Benefits />
        <Services />
        <Portfolio />
        <Process />
        <Pricing onSelectPlan={openContact} />
        <CTA onOpenContact={() => openContact("Standard")} />
      </main>

      <Footer
        onOpenContact={() => openContact("Standard")}
        onOpenPolicy={setLegalModal}
      />

      <CookieBanner onOpenPolicy={setLegalModal} />

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />

      <ContactDrawer
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        onOpenPolicy={setLegalModal}
      />
    </div>
  );
}

export default Home;