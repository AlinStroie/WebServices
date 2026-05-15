import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import LegalModal from "../components/LegalModal";

function Home() {
  const [legalModal, setLegalModal] = useState(null);

  return (
    <div className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <Navbar onOpenPolicy={setLegalModal} />

      <main>
        <Hero />
        <Benefits />
        <Services />
        <Portfolio />
        <Process />
        <Pricing />
        <CTA />
        <Contact onOpenPolicy={setLegalModal} />
      </main>

      <Footer onOpenPolicy={setLegalModal} />

      <CookieBanner onOpenPolicy={setLegalModal} />

      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
}

export default Home;