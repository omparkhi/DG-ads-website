import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "../../common/Button";

const ease = [0.16, 1, 0.3, 1];

const servicesList = [
  { name: "Digital Marketing", path: "/services/digital-marketing" },
  { name: "Website Development", path: "/services/website-development" },
  { name: "Performance Marketing", path: "/services/performance-marketing" },
  { name: "Meta Ads", path: "/services/meta-ads" },
  { name: "Google Ads", path: "/services/google-ads" }
];

const getBenefitDetails = (benefit) => {
  if (benefit && typeof benefit === "object") {
    return {
      title: benefit.title || "",
      desc: benefit.desc || ""
    };
  }
  return {
    title: benefit || "",
    desc: "We implement industry-standard best practices backed by rigorous analytics to ensure scalable long-term growth for your brand."
  };
};

export default function ServiceLayout({
  title,
  desc,
  accentColor,
  bgImage,
  benefitImage,
  deliverables = [],
  benefits = [],
  stats = [],
  faqs = [],
  demoVideo = "",
}) {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Vertical text transition cycle for deliverables
  useEffect(() => {
    if (deliverables.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % deliverables.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [deliverables]);

  const barWidths = ["w-[85%]", "w-[60%]", "w-[75%]", "w-[90%]", "w-[80%]"];

  const displayItems = deliverables && deliverables.length > 0
    ? [deliverables[deliverables.length - 1], ...deliverables, deliverables[0]]
    : [];

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative w-full h-[43vh] sm:h-[50vh] md:h-[60vh] lg:h-[75vh] flex items-center overflow-hidden text-white pt-24 lg:pt-16 pb-12 lg:pb-0 animate-fade-in bg-black"
      >
        {/* Background Video */}
        {demoVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover z-0"
          >
            <source src={demoVideo} type="video/mp4" />
          </video>
        )}

        {/* Atmospheric Dark Overlays */}
        {/* Solid gradient that provides good contrast on mobile while fading nicely on desktop */}
        <div className="absolute inset-0 h-full bg-gradient-to-r from-black/95 via-black/80 lg:via-black/40 to-black/40 lg:to-transparent z-1" />

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative z-10 w-full flex flex-col xl:flex-row items-start justify-between gap-6 xl:gap-8 padding mt-8 lg:mt-0"
        >
          {/* Left Column: Heading & Tagline */}
          <div className="flex flex-col items-start text-left max-w-2xl xl:max-w-4xl flex-1 select-none w-full">
            {/* Back Link */}
            <div className="mb-4 lg:mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft size={16} />
                Back
              </Link>
            </div>

            <h1 className="text-white text-[32px] sm:text-[38px] md:text-5xl lg:text-6xl font-black uppercase font-semibold tracking-[-0.03em] leading-[0.95]">
              {title}
            </h1>
            <p className="text-slate-300 text-sm md:text-md leading-relaxed mt-4 mb-6 lg:mt-8 lg:mb-8 font-medium max-w-2xl hidden sm:block">
              {desc}
            </p>
            <div className="flex flex-wrap gap-4 mt-2 sm:mt-0">
              <Link to="/contact">
                <Button className="px-4 py-2 text-xs sm:text-sm md:text-base md:px-6 md:py-3 rounded-sm md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="padding relative z-10">

        {/* Deliverables Section */}
        <div id="deliverables" className="mb-24 scroll-mt-28 mt-15">
          {/* Top Header Column Row (styled exact like OurServices title) */}
          <div className="max-w-7xl mx-auto items-start gap-8 lg:gap-16">
            {/* Left Column — Title */}
            <div className="w-full lg:w-[90%] flex flex-col gap-4 text-left">
              <span className="text-orange-600 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                What's Included
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-[60px] font-bold uppercase text-slate-900 leading-[1.05] tracking-tight ">
                What's Included<br />In Our {title} Service
              </h2>
            </div>

            {/* Right Column — Description & CTA */}
            <div className="w-full  flex flex-col gap-8 text-left lg:pt-5">
              <p className="text-[16px] sm:text-[17px] leading-[1.7] text-slate-600 font-medium font-sans">
                We cover every detail from strategy to analysis, ensuring your growth is fully covered. Explore our core deliverables below.
              </p>
              {/* <a href="#book-call" className="w-fit">
                <button className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-lg shadow-orange-600/20">
                  Free Consultation
                </button>
              </a> */}
            </div>
          </div>


          {/* <div className="relative overflow-hidden w-full h-[0.4px] bg-slate-200 mt-10" /> */}

          {/* Premium Animating Left-Right Section */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20 py-16 bg-white select-none relative">
            {/* Left Column — 3 Vertical Animating Titles (Middle Focused, Neighbors Faded) */}
            <div className="w-full lg:w-[50%] flex flex-col justify-center min-h-[350px] text-left select-none pr-4 relative z-10">
              {/* Active index indicator */}
              <span className="text-orange-600 font-bold text-lg font-mono mb-4 block">
                {String(activeIndex + 1).padStart(2, "0")} / {String(deliverables.length).padStart(2, "0")}
              </span>

              {/* Vertically Animating Title Box */}
              <div className="relative h-[240px] overflow-hidden mb-8 border-l-2 border-orange-500/20 pl-6">
                <div
                  className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translateY(${-activeIndex * 80}px)`
                  }}
                >
                  {displayItems.map((item, index) => {
                    const originalIndex = index === 0
                      ? deliverables.length - 1
                      : index === deliverables.length + 1
                        ? 0
                        : index - 1;

                    const isActive = originalIndex === activeIndex;
                    const isNeighbor =
                      originalIndex === (activeIndex - 1 + deliverables.length) % deliverables.length ||
                      originalIndex === (activeIndex + 1) % deliverables.length;

                    const opacity = isActive ? 1 : isNeighbor ? 0.35 : 0;
                    const scale = isActive ? 1 : isNeighbor ? 0.85 : 0.7;

                    return (
                      <div
                        key={index}
                        className="h-[80px] flex items-center justify-start transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left"
                        style={{
                          opacity,
                          transform: `scale(${scale})`
                        }}
                      >
                        <h3 className={`text-2xl sm:text-3xl md:text-[34px] font-bold uppercase ${isActive ? "text-slate-900" : "text-slate-400"}`}>
                          {item.title || item}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consultation Link */}
              <a
                href="#book-call"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-extrabold uppercase text-slate-900 hover:text-orange-600 tracking-wider transition-colors duration-300 group w-fit"
              >
                Free Consultation
                <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  ↗
                </span>
              </a>
            </div>

            {/* Right Column — Stack of Animating Orange Bars */}
            <div className="absolute inset-0 lg:relative lg:inset-auto w-full lg:w-[45%] flex flex-col justify-center select-none overflow-hidden min-h-[300px] z-0 opacity-15 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
              <div className="flex flex-col w-full items-end lg:items-end opacity-70 lg:opacity-100">
                {barWidths.map((width, index) => (
                  <motion.div
                    key={index}
                    className={`h-14 sm:h-16 ${width} bg-orange-600 border-b border-white last:border-b-0`}
                    style={{ originX: 1 }}
                    animate={{
                      scaleX: index % 2 === 0
                        ? [0.85, 1, 0.85]
                        : [0.75, 0.95, 0.75]
                    }}
                    transition={{
                      duration: 3.2 + (index * 0.5),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits with Sticky Navigation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24 relative">

          {/* Left Column — Sticky "Our Services" Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6 w-full text-left">
            <div className="hidden lg:block bg-black/90 backdrop-blur-sm text-white p-8 shadow-xl ">
              <h3 className="text-xl font-semibold mb-6 text-white tracking-widest uppercase">
                Our Services
              </h3>
              <div className="flex flex-col gap-2">
                {servicesList.map((service) => {
                  const isCurrent = service.name.toLowerCase() === title.toLowerCase();
                  return (
                    <Link
                      key={service.path}
                      to={service.path}
                      className={`relative flex items-center py-4 group transition-colors duration-[800ms] ease-[cubic-bezier(0.19,0.05,0.24,0.95)] ${isCurrent
                        ? "text-white font-extrabold"
                        : "text-slate-400 hover:text-white font-semibold"
                        }`}
                    >
                      <span className="text-base sm:text-lg tracking-wide z-10">
                        {service.name}
                      </span>

                      {/* Animated spacer to push the arrow to the right edge on hover */}
                      <span className={`flex-1 transition-all duration-[800ms] ease-[cubic-bezier(0.19,0.05,0.24,0.95)] ${isCurrent ? "max-w-full" : "max-w-0 group-hover:max-w-full"
                        }`} />

                      <span className={`transform transition-all duration-[800ms] ease-[cubic-bezier(0.19,0.05,0.24,0.95)] z-10 ml-2 ${isCurrent
                        ? "text-white"
                        : "text-slate-500 group-hover:text-white"
                        }`}>
                        →
                      </span>

                      {/* Premium Underline Hover Indicator (Slide left-to-right on enter, shrink right-to-left on leave) */}
                      <span className={`absolute bottom-0 left-0 h-[1.5px] bg-white w-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.19,0.05,0.24,0.95)] ${isCurrent ? "scale-x-100" : ""
                        }`} />

                      {/* Faint white static divider that starts short and expands on hover */}
                      <span className={`absolute bottom-0 left-0 h-[1px] bg-white/10 transition-all duration-[800ms] ease-[cubic-bezier(0.19,0.05,0.24,0.95)] origin-left ${isCurrent ? "w-full" : "w-[70%] group-hover:w-full"
                        }`} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column — Scrolling Key Benefits & Stats Grid */}
          <div className="lg:col-span-8 flex flex-col text-left mt-10">
            <h2 className="text-3xl sm:text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Key Benefits of Partnering with Us
            </h2>
            <p className="text-slate-600 font-semibold text-lg mb-12 leading-relaxed">
              We don't believe in generic vanity metrics. Our entire workflow is engineered around direct business value and scalable results.
            </p>

            {/* Key Benefits List with Image Insertion */}
            <div className="flex flex-col gap-10 mb-16">
              {benefits.map((benefit, i) => {
                const details = getBenefitDetails(benefit);
                return (
                  <div key={i} className="flex flex-col gap-5">
                    {/* Benefit Title and Description */}
                    <div className="flex flex-row items-start gap-4">
                      {/* Big Number */}
                      <span className="text-6xl sm:text-7xl md:text-[80px] font-black font-mono text-orange-600 leading-[0.85] shrink-0 mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="ml-3  flex flex-col gap-1">
                        <h3 className="text-xl sm:text-2xl font-semibold uppercase text-slate-900 tracking-wider leading-tight">
                          {details.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed">
                          {details.desc}
                        </p>
                      </div>
                    </div>

                    {/* Image from Unsplash after the second benefit (index 1) */}
                    {i === 1 && (
                      <div className="w-full h-[320px] sm:h-[400px] my-4 overflow-hidden rounded-3xl border border-slate-100 shadow-sm relative group">
                        <img
                          src={benefitImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"}
                          alt={`${title} Strategy Analysis`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Separator line (except for the last item) */}
                    {i < benefits.length - 1 && (
                      <div className="w-full h-[0.5px] bg-slate-200" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Stats Cards Grid below Benefits */}
            {stats.length > 0 && (
              <div className="pt-16 border-t border-slate-200">
                <h3 className="text-2xl font-black uppercase text-slate-900 tracking-wider mb-10">
                  Tangible Results We Deliver
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className="bg-white border border-slate-100 rounded-[28px] p-8 lg:p-10 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(234,88,12,0.15)] hover:-translate-y-2 hover:border-orange-200 transition-all duration-500 flex flex-col justify-start text-left relative overflow-hidden group"
                    >
                      {/* Ambient Orange Glow on hover */}
                      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-orange-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      <div className="relative z-10">
                        <span className="text-5xl md:text-6xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-orange-700 block mb-4">
                          {stat.value}
                        </span>
                        <span className="text-slate-900 font-bold text-lg block mb-2 tracking-wide">
                          {stat.label}
                        </span>
                        <span className="text-slate-500 font-medium text-sm leading-relaxed block">
                          {stat.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <div className="mb-24 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
              <p className="text-slate-500 font-medium">Quick answers to standard queries regarding our setup and process.</p>
            </div>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-slate-900 cursor-pointer focus:outline-none"
                    >
                      <span className="text-base pr-4">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      className="overflow-hidden"
                      transition={{ duration: 0.3, ease }}
                    >
                      <div className="p-5 pt-0 text-slate-500 text-[14px] leading-relaxed border-t border-slate-50 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Call to Action Section (Redesigned without SpotlightCard) */}
        <div id="book-call" className="mb-24">
          <div className="bg-slate-950 border border-slate-900 text-white rounded-[24px] p-10 md:p-20 shadow-2xl relative overflow-hidden text-center select-none">
            {/* Ambient Backlight Glow */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-30 bg-orange-600/30 blur-[80px]" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <span className="text-orange-500 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
                Let's Work Together
              </span>

              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6 leading-tight">
                Ready to Accelerate Your Growth?
              </h2>

              <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed font-semibold max-w-xl">
                Book a strategy session with our agency specialists. Let's discuss your current numbers and chart a strategic roadmap to achieve your sales goals.
              </p>

              <Link to="/contact" className="w-fit">
                <button className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase px-10 py-5 rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-lg shadow-orange-600/25">
                  Schedule Strategy Call
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
