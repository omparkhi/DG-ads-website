import ServiceLayout from "./ServiceLayout";
import strategyCallBg from "../../../assets/services/strategy_call.png";
import GoogleVideo from "../../../assets/videos/google-ads.mp4"

import benefitImage from "../../../assets/google-ads-benefit.png";

export default function GoogleAds() {
  const deliverables = [
    {
      title: "Google Search Ads",
      desc: "Text ads placed at the very top of Google search results when prospects are actively searching for your service keywords.",
    },
    {
      title: "Google Shopping & Merchant Sync",
      desc: "Setup and sync your store with Google Merchant Center to show direct product listings, prices, and reviews in search.",
    },
    {
      title: "Performance Max Campaigns",
      desc: "All-in-one AI-driven campaigns that scale ads across Search, YouTube, Gmail, Maps, and Display networks.",
    },
    {
      title: "YouTube & Video Ads",
      desc: "Engage prospects visually with high-impact pre-roll and skip-eligible video campaigns on YouTube.",
    },
    {
      title: "Display & Discovery Network",
      desc: "Banner ads displayed across Google partner websites and Gmail tabs to build brand trust and retarget warm prospects.",
    },
    {
      title: "Keyword Research & Negative Lists",
      desc: "Exhaustive audits to find high-traffic keywords and setup negative lists to filter out non-buying search phrases.",
    },
    {
      title: "Conversion Tracking Setup",
      desc: "Configure Google Tag Manager (GTM) to track phone calls, form fills, button clicks, and purchase transactions.",
    },
    {
      title: "Bidding & Campaign Optimization",
      desc: "Audit quality scores, rewrite ad copies, manage negative keywords, and optimize smart bidding (CPA/ROAS) weekly.",
    },
  ];

  const benefits = [
    {
      title: "Instant top-of-page visibility on Google search results",
      desc: "Capture top placements on Google search results immediately, driving instant visibility for high-priority keyword queries."
    },
    {
      title: "Capture high-intent traffic actively looking for your offerings",
      desc: "Place your products and services directly in front of buyers actively searching with intent to buy right now."
    },
    {
      title: "Acquire higher quality leads with shorter sales cycles",
      desc: "Engage high-quality commercial search prospects, resulting in faster sales cycles and reduced client acquisition costs."
    },
    {
      title: "Maximize return on ad spend (ROAS) using smart bidding algorithms",
      desc: "Harness Google's automated machine bidding rules to capture conversions at the highest possible efficiency."
    },
    {
      title: "Continuous search term optimization to prevent wasted ad budget",
      desc: "Continuously optimize campaign negative keywords and search queries to block non-converting traffic and save budget."
    }
  ];

  const stats = [
    {
      value: "5.2x",
      label: "Average Search ROAS",
      desc: "Direct return on high-intent transactional search campaigns.",
    },
    {
      value: "+180%",
      label: "Conversion Volume Lift",
      desc: "Increase in lead capture rates within 90 days of onboarding.",
    },
    {
      value: "100%",
      label: "High-Intent Search",
      desc: "Targeting users with active, immediate purchasing intent.",
    },
    {
      value: "10/10",
      label: "Quality Score Targets",
      desc: "Optimizing landing pages and ads to lower cost-per-click.",
    },
  ];

  const faqs = [
    {
      question: "What is Google Ads PPC and how does it work?",
      answer: "PPC stands for Pay-Per-Click. Unlike SEO which takes time to grow organically, Google Ads places your website at the top of Google instantly. You only pay a fee when a user actually clicks on your ad to visit your site.",
    },
    {
      question: "What is a Google Quality Score and why does it matter?",
      answer: "Google rates your ads on a scale of 1 to 10 based on ad relevance, click-through rate, and landing page quality. A higher Quality Score lowers your cost-per-click (CPC) and gives your ad better positioning at a lower cost.",
    },
    {
      question: "How do you prevent wasting ad budget on bad search queries?",
      answer: "We perform exhaustive negative keyword research before launch to prevent your ads showing up for queries like 'free,' 'jobs,' or unrelated services. We also review search terms daily to exclude poor phrases.",
    },
  ];

  return (
    <ServiceLayout
      title="Google Ads"
      desc="We manage Google Ads campaigns that help businesses appear in front of customers actively searching for their products or services, driving high-intent traffic and conversions."
      accentColor="#ec4899"
      bgImage={strategyCallBg}
      benefitImage={benefitImage}
      deliverables={deliverables}
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      demoVideo={GoogleVideo}
    />
  );
}

