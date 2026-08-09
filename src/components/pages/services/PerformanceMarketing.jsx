import ServiceLayout from "./ServiceLayout";
import performanceAdsBg from "../../../assets/services/performance_ads.png";
import PerformanceVideo from "../../../assets/videos/performance.mp4";

import benefitImage from "../../../assets/performance-marketing-benefit.png";

export default function PerformanceMarketing() {
  const deliverables = [
    {
      title: "Lead Generation Campaigns",
      desc: "Drive high-intent inquiries, form submissions, and direct phone calls from customers ready to hire your services.",
    },
    {
      title: "Sales & Conversion Campaigns",
      desc: "Engineered specifically to push direct retail and service purchases using optimized user-flow channels.",
    },
    {
      title: "E-commerce Performance",
      desc: "Scale digital sales, increase cart-add actions, and lower customer acquisition costs (CAC) for e-commerce platforms.",
    },
    {
      title: "Funnel Strategy & Optimization",
      desc: "Chart the customer journey from first cold impression down to educational nurture and final check-out purchase.",
    },
    {
      title: "Conversion Rate Optimization (CRO)",
      desc: "Audit website layout elements to resolve visual friction points and encourage higher action-completion rates.",
    },
    {
      title: "Audience Research & Segmentation",
      desc: "Group customers based on interest profiles, browsing behaviors, and demographics to personalize messaging.",
    },
    {
      title: "Retargeting & Remarketing",
      desc: "Re-engage past website visitors who bounced with tailored incentives to pull them back and finish purchasing.",
    },
    {
      title: "ROI & ROAS Optimization",
      desc: "Continuous bidding audits, script optimization, and creative iterations to ensure ad budgets generate maximum profit.",
    },
  ];

  const benefits = [
    {
      title: "Pay only for measurable business outcomes and conversions",
      desc: "Eliminate marketing waste by tying every advertising dollar directly to tangible outcomes, acquisitions, and leads."
    },
    {
      title: "Acquire higher quality leads with real buying intent",
      desc: "Target and convert buyers who have shown clear, immediate interest in your specific services or product lines."
    },
    {
      title: "Consistently achieve higher return on ad spend (ROAS)",
      desc: "Improve your bottom-line profitability with optimized smart campaigns that maximize direct return on ad spend."
    },
    {
      title: "Continuous automated and manual campaign optimizations",
      desc: "Benefit from continuous A/B testing, creative iterations, and weekly copy audits to keep conversion performance high."
    },
    {
      title: "Data-driven decisions backed by robust dashboard analytics",
      desc: "Stay fully informed with custom dashboards tracking exact client acquisition cost (CAC) and performance campaign metrics."
    }
  ];

  const stats = [
    {
      value: "3.2x",
      label: "Average ROI Boost",
      desc: "Overall compound increase in sales revenue across client portfolios.",
    },
    {
      value: "4.5x",
      label: "Average ROAS",
      desc: "Return on advertising spend across active Google & Meta channels.",
    },
    {
      value: "-35%",
      label: "Acquisition Cost Reduction",
      desc: "Average decrease in cost-per-acquisition (CPA) within 90 days.",
    },
    {
      value: "400k+",
      label: "Conversions Managed",
      desc: "Total leads and direct sales generated for our clients.",
    },
  ];

  const faqs = [
    {
      question: "What makes Performance Marketing different from traditional marketing?",
      answer: "Traditional marketing focuses on impressions and general brand awareness. Performance Marketing is entirely action-focused. You spend budget to drive specific, measurable events—like email signups, lead forms, or checkout sales—allowing you to measure your exact ROI.",
    },
    {
      question: "How do you define a qualified lead?",
      answer: "We define qualified leads by analyzing demographics, budget confirmations, and response metrics in the lead form. We build filter questions into the funnel to filter out low-intent users, ensuring your sales team only talks to real buyers.",
    },
    {
      question: "How do you optimize campaigns continuously?",
      answer: "We perform daily bidding adjustments, budget re-allocations to high-performing campaigns, and weekly A/B testing of ad creatives. We also review search terms and placement data to eliminate ad spend waste.",
    },
  ];

  return (
    <ServiceLayout
      title="Performance Marketing"
      desc="Performance marketing is a data-driven approach focused on achieving measurable business outcomes such as leads, sales, and app installs. We optimize campaigns continuously to maximize your ROI."
      accentColor="#10b981"
      bgImage={performanceAdsBg}
      benefitImage={benefitImage}
      deliverables={deliverables}
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      demoVideo={PerformanceVideo}
    />
  );
}

