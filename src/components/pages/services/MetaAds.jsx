import ServiceLayout from "./ServiceLayout";
import socialMediaBg from "../../../assets/services/social_media.png";
import MetaAdsVideo from "../../../assets/videos/meta-ads.mp4";

import benefitImage from "../../../assets/meta-ads-benefit.png";

export default function MetaAds() {
  const deliverables = [
    {
      title: "Campaign Strategy & Planning",
      desc: "Architect a customized campaign funnel that aligns with your specific goals, whether it is lead captures or checkout sales.",
    },
    {
      title: "Audience Research & Targeting",
      desc: "Build custom and lookalike audiences based on pixel data, past buyers, list uploads, and granular interest profiles.",
    },
    {
      title: "Creative Design & Copywriting",
      desc: "Produce eye-catching image templates and scroll-stopping copywriting that increases click-through rates.",
    },
    {
      title: "Pixel Setup & Conversions API",
      desc: "Ensure 100% data tracking accuracy with full Meta Pixel configuration and server-side Conversions API integration.",
    },
    {
      title: "Video & Reels Advertising",
      desc: "Design vertical videos specifically optimized for Reels and Stories formats to capture maximum visual attention.",
    },
    {
      title: "Catalog & Shopping Ads",
      desc: "Sync your store catalog with Meta to run dynamic product ads (DPAs) that auto-display products visitors viewed.",
    },
    {
      title: "Retargeting & Remarketing",
      desc: "Remind cart abandoners and landing page visitors to complete their purchase with custom discount incentives.",
    },
    {
      title: "Optimization & Monthly Reports",
      desc: "Perform daily budget adjustments, refresh ad creatives to prevent fatigue, and send transparent monthly analytics reports.",
    },
  ];

  const benefits = [
    {
      title: "Ideal for Lead Generation and direct customer inquiries",
      desc: "Generate qualified inbound inquiries directly through Meta's native lead forms, reducing friction and sales cycle length."
    },
    {
      title: "Scales direct-to-consumer E-commerce checkout sales",
      desc: "Scale direct purchase volumes and average order value for your storefront using advanced Meta Pixel purchase tracking."
    },
    {
      title: "Builds massive Brand Awareness and community follower growth",
      desc: "Build long-term brand equity and community follower growth with engaging video and image ad creative formats."
    },
    {
      title: "Drives local foot traffic for service-based and physical stores",
      desc: "Reach hyper-local prospects to drive store visits and appointments for physical, service-based storefronts."
    },
    {
      title: "Highly cost-effective app install and event promotion campaigns",
      desc: "Promote software installs or event sign-ups with optimized custom-event tracking campaigns at the lowest possible cost."
    }
  ];

  const stats = [
    {
      value: "4.8x",
      label: "Average E-commerce ROAS",
      desc: "Direct return on Facebook and Instagram ad spend.",
    },
    {
      value: "-40%",
      label: "Cost Per Lead Reduction",
      desc: "Average reduction in lead cost within the first 60 days.",
    },
    {
      value: "3.5%",
      label: "Average Click-Through Rate",
      desc: "High visual click-through rate across Reels and Feed ads.",
    },
    {
      value: "10M+",
      label: "Ad Impressions Served",
      desc: "Granularly targeted brand exposures managed annually.",
    },
  ];

  const faqs = [
    {
      question: "How much ad budget do I need to start advertising on Meta?",
      answer: "We recommend starting with a minimum testing budget of $30 to $50 per day to gather initial pixel data. Once we identify winning audiences and high-converting creative copies, we can scale budget confidently.",
    },
    {
      question: "What is the Meta Pixel and why is it important?",
      answer: "The Meta Pixel is a tracking code placed on your website. It tracks visitor actions, letting us measure ad results, optimize ads for conversions (like purchases or signups), and build custom audiences for retargeting campaigns.",
    },
    {
      question: "Do you create the ad creatives and copywriting yourself?",
      answer: "Yes, we handle the entire process. This includes design, video editing for Reels, copywriting, setting up campaign funnels, and managing the live ads inside the Meta Business Manager.",
    },
  ];

  return (
    <ServiceLayout
      title="Meta Ads"
      desc="We create and manage high-performing advertising campaigns on Facebook and Instagram to reach your exact target audience and maximize your return on ad spend."
      accentColor="#f59e0b"
      bgImage={socialMediaBg}
      benefitImage={benefitImage}
      deliverables={deliverables}
      benefits={benefits}
      stats={stats}
      faqs={faqs}
      demoVideo={MetaAdsVideo}
    />
  );
}

