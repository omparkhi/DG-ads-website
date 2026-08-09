import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

export default function Portfolio() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const caseStudies = [
    {
      id: "1",
      title: "Driving 300% Organic Traffic Growth for an E-Commerce Giant",
      category: "SEO Optimization",
      metric: "+300% Traffic",
      image: "https://framerusercontent.com/images/CZsPHjlGSsOXek9qQ6kO2F74.png",
      link: "/portfolio/1",
    },
    {
      id: "2",
      title: "How Targeted PPC Ads Boosted a Startup's Revenue by 150%",
      category: "Paid Acquisition",
      metric: "+150% Revenue",
      image: "https://framerusercontent.com/images/kza2HfI8ZzmM1rCS88ItPqNbf0k.png",
      link: "/portfolio/2",
    },
    {
      id: "3",
      title: "Achieving a 5X ROI with PPC for a SaaS Company",
      category: "Performance Ads",
      metric: "5.2× ROI Boost",
      image: "https://framerusercontent.com/images/ysolbP7YxPZVjCE241Isof6j78.png",
      link: "/portfolio/3",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="w-full py-20 md:py-32 bg-white select-none relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="text-left">
            <span className="text-orange-600 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 block">
              Case Studies
            </span>
            <h2 className="text-3xl sm:text-[45px] md:text-[60px] font-bold uppercase text-slate-900">
              Discover Our Latest<br />Client Successes
            </h2>
          </div>

        </motion.div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <MotionLink
              to={study.link}
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[24px] overflow-hidden group bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full cursor-pointer block"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-200">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Result Tag Badge */}
                <div className="absolute top-4 left-4 bg-orange-600 text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-full z-10 uppercase tracking-widest flex items-center gap-1 shadow-md">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {study.metric}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 text-left flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-3 block">
                    {study.category}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-300 leading-snug mb-6">
                    {study.title}
                  </h4>
                </div>

                <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 group-hover:text-orange-600 transition-colors duration-300 mt-auto select-none">
                  Read Case Study
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
