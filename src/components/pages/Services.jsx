import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Background image assets
import digitalMarketingBg from "../../assets/services/digital_marketing.png";
import webDevBg from "../../assets/services/web_dev.png";
import performanceAdsBg from "../../assets/services/performance_ads.png";
import socialMediaBg from "../../assets/services/social_media.png";
import strategyCallBg from "../../assets/services/strategy_call.png";

const ease = [0.16, 1, 0.3, 1];

const services = [
  {
    number: "01",
    title: "Digital Marketing",
    desc: "Increase brand awareness, generate quality leads, and improve sales through strategic online campaigns.",
    tags: ["SEO", "Social Media", "Content Marketing", "Email Marketing", "Local SEO"],
    stat: "Increased online visibility",
    accentColor: "#ea580c", // Brand Orange
    bgImage: digitalMarketingBg,
    path: "/services/digital-marketing",
  },
  {
    number: "02",
    title: "Website Development",
    desc: "Fast, responsive, and SEO-friendly websites that help businesses establish a strong online presence and generate leads.",
    tags: ["E-commerce", "Custom Web Apps", "WordPress", "Speed Optimization", "Mobile-Responsive"],
    stat: "Fast & mobile-friendly",
    accentColor: "#6366f1", // Indigo
    bgImage: webDevBg,
    path: "/services/website-development",
  },
  {
    number: "03",
    title: "Performance Marketing",
    desc: "A data-driven approach focused on achieving measurable business outcomes such as leads, sales, and ROI/ROAS optimization.",
    tags: ["Lead Generation", "Conversion Ads", "Retargeting", "A/B Testing", "Analytics"],
    stat: "Data-driven ROI optimization",
    accentColor: "#10b981", // Emerald
    bgImage: performanceAdsBg,
    path: "/services/performance-marketing",
  },
  {
    number: "04",
    title: "Meta Ads",
    desc: "High-performing advertising campaigns on Facebook & Instagram to reach the right audience and maximize return on investment.",
    tags: ["Facebook Ads", "Instagram Ads", "Audience Targeting", "Pixel Tracking", "Retargeting"],
    stat: "Maximized ad spend return",
    accentColor: "#f59e0b", // Amber
    bgImage: socialMediaBg,
    path: "/services/meta-ads",
  },
  {
    number: "05",
    title: "Google Ads",
    desc: "Google Ads (PPC) campaigns that help businesses appear in front of customers actively searching for their products or services.",
    tags: ["Search Ads", "Display Ads", "PMax Campaigns", "YouTube Ads", "Keyword Research"],
    stat: "Instant high-intent visibility",
    accentColor: "#ec4899", // Pink
    bgImage: strategyCallBg,
    path: "/services/google-ads",
  },
];

export default function Services() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="padding section-padding relative overflow-hidden bg-white"
    >
      {/* Background soft glow decoration */}
      {/* <div
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(234,88,12,0.03) 0%, transparent 70%)",
        }}
      /> */}
      {/* <div
        className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)",
        }}
      /> */}

      <div className="container-main relative z-10">

        {/* Section Header (Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3 block">
              What We Do
            </span>

            <div className="mb-6 flex justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
                Services That Scale Your Brand
              </h1>
            </div>

            <p className="text-slate-600 text-base md:text-[17px] leading-relaxed max-w-2xl mx-auto font-medium">
              End-to-end digital solutions engineered to boost brand visibility, drive high-intent attention, and scale conversions from first impression to final purchase.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout (3 Columns on Desktop/Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {services.map((service, i) => {
            const isLarge = i === 0 || i === 3 || i === 4;

            if (isLarge) {
              return (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  whileHover={{ boxShadow: "0px 20px 40px rgba(15, 23, 42, 0.08)" }}
                  style={{
                    boxShadow: "0px 0px 0px 0px rgba(15, 23, 42, 0)",
                    transform: "translate3d(0, 0, 0)",
                    WebkitTransform: "translate3d(0, 0, 0)",
                    WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                  onClick={() => navigate(service.path)}
                  className="bg-white p-8 transition-colors duration-300 relative overflow-hidden group flex flex-col justify-between h-full cursor-pointer md:col-span-2 min-h-[360px] md:min-h-[320px]"
                >
                  {/* Background image overlay layer */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={service.bgImage}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                      style={{
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                      }}
                    />
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] transition-all duration-300" />
                  </div>

                  {/* Inner grid for layout split */}
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-6 h-full w-full">
                    {/* Left Column: Emoji, Title, Description */}
                    <div className="md:col-span-3 flex flex-col justify-between h-full">
                      <div>

                        <h3 className="text-xl md:text-2xl font-semibold font-black text-slate-900 mb-3 transition-colors duration-300 group-hover:text-orange-600">
                          {service.title}
                        </h3>


                        <p className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed font-semibold">
                          {service.desc}
                        </p>
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/70 shadow-sm border border-slate-100 mt-5"
                          style={{ color: service.accentColor }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.accentColor }} />
                          {service.stat}
                        </div>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-5">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold text-slate-500 bg-white/70 border border-slate-100 px-2.5 py-1 rounded-full transition-colors duration-300 group-hover:text-slate-700 group-hover:border-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* View Work (desktop only) */}
                      <div className="hidden md:flex pt-4  items-center justify-between mt-6">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-slate-900 transition-colors duration-300">
                          View Work
                        </span>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                          style={{
                            backgroundColor: "rgba(15, 23, 42, 0.03)",
                            color: "rgba(15, 23, 42, 0.4)",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2 7H12M12 7L8 3M12 7L8 11"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Stats, Tags, CTA (stacked) */}
                    <div className="md:col-span-2 flex flex-col justify-between h-full pt-6 md:pt-0 md:pl-45">
                      <div className="flex justify-between items-end mb-6">

                        <span
                          className="text-4xl font-extrabold font-black tracking-tight font-mono opacity-[0.15] transition-opacity duration-300"

                        >
                          {service.number}
                        </span>
                      </div>

                      <div>


                        {/* View Work (mobile only) */}
                        <div className="md:hidden pt-4  flex items-center justify-between">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-slate-900 transition-colors duration-300">
                            View Work
                          </span>
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                            style={{
                              backgroundColor: "rgba(15, 23, 42, 0.03)",
                              color: "rgba(15, 23, 42, 0.4)",
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                d="M2 7H12M12 7L8 3M12 7L8 11"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                whileHover={{ boxShadow: "0px 20px 40px rgba(15, 23, 42, 0.08)" }}
                style={{
                  boxShadow: "0px 0px 0px 0px rgba(15, 23, 42, 0)",
                  transform: "translate3d(0, 0, 0)",
                  WebkitTransform: "translate3d(0, 0, 0)",
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
                onClick={() => navigate(service.path)}
                className="bg-white p-8 transition-colors duration-300 relative overflow-hidden group flex flex-col justify-between h-full cursor-pointer md:col-span-1 min-h-[360px]"
              >
                {/* Background image overlay layer */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={service.bgImage}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                    style={{
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                  />
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] transition-all duration-300" />
                </div>

                {/* Header info row */}
                <div className="relative z-10">


                  {/* Title & Desc */}

                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl md:text-2xl font-semibold font-black text-slate-900 mb-3 transition-colors duration-300 group-hover:text-orange-600">
                      {service.title}
                    </h3>
                    <span
                      className="text-4xl font-extrabold font-black tracking-tight font-mono opacity-[0.15] transition-opacity duration-300"

                    >
                      {service.number}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-5 font-semibold">
                    {service.desc}
                  </p>
                </div>

                {/* Tags and Stats Footer section */}
                <div className="relative z-10">
                  {/* Stat Badges */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold mb-4 bg-white/70 shadow-sm border border-slate-100"
                    style={{
                      color: service.accentColor,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.accentColor }} />
                    {service.stat}
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold text-slate-500 bg-white/70 border border-slate-100 px-2.5 py-1 rounded-full transition-colors duration-300 group-hover:text-slate-700 group-hover:border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card CTA row */}
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-slate-900 transition-colors duration-300">
                      View Work
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                      style={{
                        backgroundColor: "rgba(15, 23, 42, 0.03)",
                        color: "rgba(15, 23, 42, 0.4)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M2 7H12M12 7L8 3M12 7L8 11"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}


        </div>

      </div>
    </section>
  );
}
