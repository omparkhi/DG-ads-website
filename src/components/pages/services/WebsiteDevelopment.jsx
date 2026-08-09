import ServiceLayout from "./ServiceLayout";
import webDevBg from "../../../assets/services/web_dev.png";
import WebsiteVideo from "../../../assets/videos/website.mp4";

import benefitImage from "../../../assets/web-dev-benefit.png";

export default function WebsiteDevelopment() {
  const deliverables = [
    {
      title: "Business & Corporate Websites",
      desc: "Establish authority with responsive, clean, and highly secure corporate platforms that reflect your premium branding.",
    },
    {
      title: "E-commerce Websites",
      desc: "Custom Shopify or WooCommerce digital storefronts optimized to streamline checkouts and maximize sales value.",
    },
    {
      title: "Landing Pages",
      desc: "High-converting single-page sales funnels engineered to convert paid traffic into direct leads and calls.",
    },
    {
      title: "Custom Web Applications",
      desc: "Interactive dashboards, databases, and bespoke software built in React, Node, and Tailwind CSS.",
    },
    {
      title: "WordPress Development",
      desc: "Content-driven business websites built with lightweight builders to ensure easy internal editing and management.",
    },
    {
      title: "Speed Optimization",
      desc: "Minimize loading times, eliminate code bloat, and align with Google Core Web Vitals to pass ranking checks.",
    },
    {
      title: "Website Redesign & Maintenance",
      desc: "Audit your current layout, update visuals, fix structural bugs, and secure databases against vulnerabilities.",
    },
    {
      title: "Basic On-Page SEO Setup",
      desc: "Setup index headers, meta tags, image alt texts, schema structures, and URL mappings during development.",
    },
  ];

  const benefits = [
    {
      title: "Professional, award-winning brand presence",
      desc: "Differentiate your brand with a visually stunning, custom-designed interface that builds instant authority and credibility with visitors."
    },
    {
      title: "Flawless mobile-responsive design across all devices",
      desc: "Ensure a seamless experience on smartphones, tablets, and desktops alike, preventing user loss and maximizing responsive interaction."
    },
    {
      title: "Faster loading speeds resulting in lower bounce rates",
      desc: "Optimize code and media delivery to achieve ultra-fast paint times, keeping bounce rates low and retaining search traffic."
    },
    {
      title: "Clean, SEO-ready code structure built for search indexing",
      desc: "Construct clean semantic markup and structural schema data to guarantee search engines can index your site efficiently from day one."
    },
    {
      title: "Secure, scalable, and custom database development",
      desc: "Deploy highly secure backends, scale database queries, and integrate custom APIs to power complex dynamic business operations."
    }
  ];

  const stats = [
    {
      value: "95+",
      label: "PageSpeed Index",
      desc: "Average performance score on mobile and desktop tests.",
    },
    {
      value: "40%+",
      label: "Conversion Lift",
      desc: "Average increase in client inquiries after layout relaunch.",
    },
    {
      value: "100%",
      label: "Responsive Design",
      desc: "Perfect layouts across phone, tablet, and ultra-wide screens.",
    },
    {
      value: "99.9%",
      label: "Server Uptime",
      desc: "Maximum reliability and security protocols on hosting.",
    },
  ];

  const faqs = [
    {
      question: "Which technologies and frameworks do you use?",
      answer: "For design-heavy marketing and corporate websites, we prefer React/Vite, Tailwind CSS, Webflow, or custom WordPress setups. For complex app dashboards and databases, we use custom MERN/Next.js stacks.",
    },
    {
      question: "Will I be able to update my own website content post-launch?",
      answer: "Absolutely. We build user-friendly dashboard panels and provide custom walkthrough videos showing you exactly how to edit copy, update products, post blogs, and manage inquiries.",
    },
    {
      question: "How long does it take to design and launch a custom website?",
      answer: "Standard landing pages and basic corporate sites take 2 to 4 weeks. Complex e-commerce stores or custom web applications take 6 to 10 weeks depending on custom features, databases, and third-party API integrations.",
    },
  ];

  return (
    <ServiceLayout
      title="Website Development"
      desc="We build fast, responsive, and SEO-friendly websites that help businesses establish a strong online presence, build authority, and generate leads."
      accentColor="#6366f1"
      bgImage={webDevBg}
      benefitImage={benefitImage}
      deliverables={deliverables}
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      demoVideo={WebsiteVideo}
    />
  );
}

