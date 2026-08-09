import ServiceLayout from "./ServiceLayout";
import digitalMarketingBg from "../../../assets/services/digital_marketing.png";
import digitalMarketingVideo from "../../../assets/videos/digtal-marketing.mp4"
import benefitImage from "../../../assets/digital-marketing-benefit.png";

export default function DigitalMarketing() {
  const deliverables = [
    {
      title: "Search Engine Optimization (SEO)",
      desc: "Rank higher on Google, capture organic search traffic, and build authority without paying per click.",
    },
    {
      title: "Social Media Marketing",
      desc: "Engage your core demographic, grow followers, and build a community on platforms like Instagram & LinkedIn.",
    },
    {
      title: "Content Marketing",
      desc: "Copywriting, blogs, guides, and visual content that answers customer questions and pushes them down the sales funnel.",
    },
    {
      title: "Email Marketing",
      desc: "Automated nurture sequences, newsletter broadcasts, and segmented sales campaigns to maximize customer lifetime value.",
    },
    {
      title: "Local SEO & GBP Optimization",
      desc: "Optimize your Google Business Profile and local citations to dominate search results in your geographical area.",
    },
    {
      title: "Online Reputation Management (ORM)",
      desc: "Monitor client feedback, generate positive reviews, and manage how your brand is perceived across the web.",
    },
    {
      title: "Marketing Strategy & Consultation",
      desc: "Tailored multi-channel roadmaps detailing exactly how to position your brand for sustainable growth.",
    },
    {
      title: "Analytics & Monthly Reporting",
      desc: "Transparent dashboard reporting tracking traffic sources, leads, customer acquisitions, and cost metrics.",
    },
  ];

  const benefits = [
    {
      title: "Increased online visibility and organic search reach",
      desc: "Enhance your organic presence across search engines to naturally attract pre-qualified prospects actively searching for your solutions."
    },
    {
      title: "Higher quality leads ready to convert",
      desc: "Connect with high-intent decision-makers and leads, filtering out vanity traffic to focus strictly on conversions."
    },
    {
      title: "Stronger brand recognition and customer engagement",
      desc: "Establish trust and authority in your industry, keeping your audience engaged and returning to your brand."
    },
    {
      title: "Sustainable long-term organic traffic growth",
      desc: "Build a compounding content asset library that keeps generating traffic and interest over time, without ongoing PPC costs."
    },
    {
      title: "Data-backed optimization based on transparent analytics",
      desc: "Make informed business growth decisions with transparent monthly reporting and dashboard tracking of customer acquisition cost."
    }
  ];

  const stats = [
    {
      value: "150%+",
      label: "Organic Traffic Growth",
      desc: "Average increase in search visibility within 6 months.",
    },
    {
      value: "3x",
      label: "Lead Generation Rate",
      desc: "Multiplication of quality inbound sales inquiries.",
    },
    {
      value: "84%",
      label: "GBP Engagement Lift",
      desc: "Average boost in phone calls and directions requests from Local search.",
    },
    {
      value: "4.8x",
      label: "Engagement Lift",
      desc: "Social media reach and click-through increases.",
    },
  ];

  const faqs = [
    {
      question: "What is your main approach to digital marketing?",
      answer: "We focus on a multi-channel strategy. By aligning Search Engine Optimization (SEO), high-quality Content Marketing, and targeted Social Media, we build a flywheel effect that brings sustainable, long-term traffic and sales.",
    },
    {
      question: "How long until we see noticeable improvements?",
      answer: "While channels like paid email campaigns or social outreach can show immediate responses, organic strategies like SEO and Content Marketing typically take 3 to 6 months to mature and start driving scalable compound results.",
    },
    {
      question: "How do you track success and report on marketing performance?",
      answer: "We set up comprehensive tracking using Google Analytics and custom dashboard portals. We send monthly transparent reports highlighting exact growth numbers, client acquisitions, and cost-per-lead updates.",
    },
  ];

  return (
    <ServiceLayout
      title="Digital Marketing"
      desc="Our digital marketing services are designed to increase brand awareness, generate quality leads, and improve sales through strategic multi-channel campaigns."
      accentColor="#ea580c"
      bgImage={digitalMarketingBg}
      benefitImage={benefitImage}
      deliverables={deliverables}
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      demoVideo={digitalMarketingVideo}
    />
  );
}
