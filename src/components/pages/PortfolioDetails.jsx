import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Target, Clock, DollarSign, User, CheckCircle2 } from "lucide-react";

export default function PortfolioDetails() {
  const { id } = useParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock Data for the case study
  const study = {
    title: "Enhancing Local Visibility for a Healthcare Provider",
    client: "Luna Tech",
    role: "SEO Optimization",
    duration: "2 Months",
    budget: "$200,000",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80",
    contentImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    overview: "In an increasingly competitive landscape, our client faced challenges with organic traffic stagnation. Despite offering a vast range of services, their website struggled to rank for competitive keywords, resulting in reduced visibility and sales. We stepped in with a tailored SEO strategy that delivered remarkable results—a 300% increase in organic traffic within 12 months.",
    challenges: [
      { title: "Low Keyword Rankings", desc: "The website ranked poorly for high-value industry keywords, limiting visibility." },
      { title: "Technical SEO Issues", desc: "Slow page loading speed, broken links, and crawl errors hindered search engine indexing." },
      { title: "Content Gaps", desc: "Lack of optimized content for targeted product categories and long-tail keywords." },
      { title: "Fierce Competition", desc: "The space was dominated by established players with robust SEO strategies." }
    ],
    strategy: "Keywords are the bridge between your content and your audience. Effective keyword research identifies the terms and phrases your potential customers are searching for. This involves analyzing search volume, competition, and relevance. By targeting the right keywords, businesses can attract the right audience and improve conversion rates.",
    results: "Through our comprehensive SEO overhaul, the client experienced a massive surge in organic visibility. Traffic grew by 300%, leading to a proportional increase in qualified leads and a significant boost in overall ROI. The improved technical health of the site also reduced bounce rates by 45%."
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">

      {/* Hero Section */}
      <section className="relative w-full h-[65vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={study.heroImage}
            alt={study.title}
            className="w-full h-full object-cover"
          />
          {/* Light Overlay */}
          <div className="absolute inset-0  backdrop-blur-xs" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mt-16">
          {/* Main Title */}
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight leading-tight text-white mb-8"
          >
            {study.title}
          </motion.h1>

          {/* Breadcrumbs */}
          {/* <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-slate-500 uppercase tracking-widest"
          >
            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-orange-500" />
            <Link to="/#portfolio" className="hover:text-orange-600 transition-colors">Portfolio</Link>
            <ChevronRight className="w-4 h-4 text-orange-500" />
            <span className="text-slate-900">Portfolio Details</span>
          </motion.div> */}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative w-full px-4 sm:px-6 md:px-12 -mt-16 z-20 max-w-6xl mx-auto pb-24">

        {/* Meta Stats Card */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-xl shadow-slate-200/50 mb-20 mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <span className="block text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Project Name</span>
                <span className="block text-slate-900 font-bold">{study.role}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <span className="block text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Client</span>
                <span className="block text-slate-900 font-bold">{study.client}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <span className="block text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Duration</span>
                <span className="block text-slate-900 font-bold">{study.duration}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <span className="block text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Budget</span>
                <span className="block text-slate-900 font-bold">{study.budget}</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Text Content Sections */}
        <div className="max-w-4xl mx-auto flex flex-col gap-16 text-left">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Mona_Sans']">Case Overview</h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">{study.overview}</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 font-['Mona_Sans']">Challenges</h2>
            <div className="flex flex-col gap-4">
              {study.challenges.map((challenge, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    <strong className="text-slate-900">{challenge.title}: </strong>
                    {challenge.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Mona_Sans']">Our Strategy</h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">{study.strategy}</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Mona_Sans']">Results Achieved</h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium mb-12">{study.results}</p>

            <div className="w-full rounded-[32px] overflow-hidden border border-slate-200 shadow-sm">
              <img src={study.contentImage} alt="Results Dashboard" className="w-full h-auto object-cover" />
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
