import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Clock, DollarSign, User, CheckCircle2 } from "lucide-react";
import { apiGetCaseStudyById } from "../../services/api";

const defaultStudy = {
  title: "Digital Growth for a Nagpur-Based Business",
  client: "Confidential (Nagpur)",
  role: "Full-Stack Digital Marketing",
  duration: "3 Months",
  budget: "Confidential",
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80",
  contentImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  overview: "A Nagpur-based business was facing low online visibility, limited customer engagement, and inconsistent lead generation. They needed a holistic digital transformation to drive actual revenue and brand awareness.",
  challenges: [
    { title: "Low Visibility", desc: "The business struggled to get noticed in a crowded online market." },
    { title: "Limited Engagement", desc: "Customer interaction across social channels was minimal." },
    { title: "Inconsistent Leads", desc: "Lead generation was unpredictable, making growth difficult to forecast." }
  ],
  strategy: "Mainframe Solution implemented a complete digital marketing strategy including: Social Media Management, Web Development, Performance Marketing, Meta Ads (Instagram, Whatsapp & Facebook), Local SEO Optimization, and Creative Content & Reels.",
  resultsText: [
    "250% increase in social media reach",
    "3X growth in qualified leads",
    "70% increase in website traffic",
    "Improved local brand awareness and customer engagement"
  ],
  resultsSummary: "Through a data-driven marketing approach, Mainframe Solution helped the business strengthen its online presence, attract more customers, and achieve measurable growth."
};

const cleanCheckmark = (str) => {
  if (typeof str !== "string") return str;
  return str.replace(/^[✔️✔\s\-\*\•]+/, "").trim();
};

export default function PortfolioDetails() {
  const { id } = useParams();
  const [study, setStudy] = useState(defaultStudy);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadDynamicStudy() {
      if (!id || id === "1") return;
      try {
        const res = await apiGetCaseStudyById(id);
        if (res.success && res.data) {
          const d = res.data;

          let parsedChallenges = defaultStudy.challenges;
          if (d.challenges) {
            if (Array.isArray(d.challenges)) {
              parsedChallenges = d.challenges.map((ch) => {
                if (typeof ch === "object" && ch !== null) {
                  return { title: ch.title || "", desc: ch.desc || "" };
                }
                return { title: "Challenge", desc: String(ch) };
              });
            } else if (typeof d.challenges === "string" && d.challenges.trim()) {
              const lines = d.challenges.split("\n").filter(Boolean);
              parsedChallenges = lines.map((line) => {
                const parts = line.split(":");
                if (parts.length > 1) {
                  return { title: parts[0].trim(), desc: parts.slice(1).join(":").trim() };
                }
                return { title: "Challenge", desc: line.trim() };
              });
            }
          }

          let parsedResultsText = defaultStudy.resultsText;
          let parsedSummary = d.summary || defaultStudy.resultsSummary;
          if (d.results) {
            if (Array.isArray(d.results)) {
              parsedResultsText = d.results.map((r) => cleanCheckmark(String(r)));
            } else if (typeof d.results === "string" && d.results.trim()) {
              const lines = d.results.split("\n").filter(Boolean);
              parsedResultsText = lines.map((line) => cleanCheckmark(line));
            }
          }

          setStudy({
            title: d.title || defaultStudy.title,
            client: d.client || defaultStudy.client,
            role: d.role || defaultStudy.role,
            duration: d.duration || defaultStudy.duration,
            budget: d.budget || defaultStudy.budget,
            heroImage: d.image || defaultStudy.heroImage,
            contentImage: (d.contentImage && d.contentImage.trim()) ? d.contentImage : defaultStudy.contentImage,
            overview: d.overview || d.summary || defaultStudy.overview,
            challenges: parsedChallenges,
            strategy: d.strategy || defaultStudy.strategy,
            resultsText: parsedResultsText,
            resultsSummary: parsedSummary,
          });
        }
      } catch (err) {
        console.error("Error loading case study details:", err);
      }
    }

    loadDynamicStudy();
  }, [id]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={study.heroImage}
            alt={study.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-xs bg-slate-900/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mt-16">
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight leading-tight text-white mb-8"
          >
            {study.title}
          </motion.h1>
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
          {study.overview && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Mona_Sans']">Case Overview</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-line">{study.overview}</p>
            </motion.div>
          )}

          {/* Challenges Rendered as Separate Boxes */}
          {study.challenges && study.challenges.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 font-['Mona_Sans']">Challenges</h2>
              <div className="grid grid-cols-1 gap-4">
                {study.challenges.map((challenge, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CheckCircle2 className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      {challenge.title && <strong className="text-slate-900">{challenge.title}: </strong>}
                      {challenge.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {study.strategy && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Mona_Sans']">Our Strategy</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-line">{study.strategy}</p>
            </motion.div>
          )}

          {/* Results Achieved with Automatic Checkmarks */}
          {((study.resultsText && study.resultsText.length > 0) || study.contentImage) && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-['Mona_Sans']">Results Achieved</h2>
              <div className="flex flex-col gap-4 mb-8">
                {study.resultsText.map((resLine, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span className="text-slate-800 text-lg font-bold">{resLine}</span>
                  </div>
                ))}

                {study.resultsSummary && (
                  <p className="mt-4 text-slate-600 text-lg leading-relaxed font-medium">
                    {study.resultsSummary}
                  </p>
                )}
                <p className="mt-2 font-bold text-slate-900 text-lg">
                  Mainframe Solution – Your Partner for Digital Growth in Nagpur.
                </p>
              </div>

              {study.contentImage && (
                <div className="w-full rounded-[32px] overflow-hidden border border-slate-200 shadow-sm">
                  <img src={study.contentImage} alt="Results Dashboard" className="w-full h-auto object-cover" />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
