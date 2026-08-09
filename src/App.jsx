import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import DigitalMarketing from "./components/pages/services/DigitalMarketing";
import WebsiteDevelopment from "./components/pages/services/WebsiteDevelopment";
import PerformanceMarketing from "./components/pages/services/PerformanceMarketing";
import MetaAds from "./components/pages/services/MetaAds";
import GoogleAds from "./components/pages/services/GoogleAds";
import PortfolioDetails from "./components/pages/PortfolioDetails";
import PortfolioPage from "./components/pages/PortfolioPage";
import ContactPage from "./components/pages/ContactPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/services/website-development" element={<WebsiteDevelopment />} />
        <Route path="/services/performance-marketing" element={<PerformanceMarketing />} />
        <Route path="/services/meta-ads" element={<MetaAds />} />
        <Route path="/services/google-ads" element={<GoogleAds />} />
        <Route path="/portfolio/:id" element={<PortfolioDetails />} />
        <Route path="/work" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
