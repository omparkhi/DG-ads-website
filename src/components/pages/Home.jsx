import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import ClientLogos from "./ClientLogos";
import AgencyIntro from "./AgencyIntro";
import StatsStrip from "./StatsStrip";
import WhoWeAre from "./WhoWeAre";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Portfolio from "./Portfolio";
import OurServices from "./OurServices";

import LetsWorkTogether from "./LetsWorkTogether";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        // Subtle delay to allow Lenis smooth scroll and elements to mount
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [hash]);

  return (
    <main>
      <Hero />
      {/* <ClientLogos /> */}
      <AgencyIntro />
      {/* <StatsStrip /> */}
      <WhoWeAre />
      <About />
      <OurServices />
      {/* <Services /> */}
      <Testimonials />
      <Portfolio />
      <LetsWorkTogether />
    </main>
  );
}
