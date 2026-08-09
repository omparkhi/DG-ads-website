import React, { useEffect } from "react";
import Portfolio from "./Portfolio";
import LetsWorkTogether from "./LetsWorkTogether";

export default function PortfolioPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" min-h-screen bg-white">
      <Portfolio />
      <LetsWorkTogether />
    </div>
  );
}
