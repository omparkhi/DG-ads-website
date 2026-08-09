import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function OurServices() {
    const navigate = useNavigate();

    const services = [
        {
            number: "01",
            title1: "Digital",
            title2: "Marketing",
            desc: "Increase brand awareness, generate quality leads, and improve sales through strategic online campaigns.",
            path: "/services/digital-marketing",
        },
        {
            number: "02",
            title1: "Website",
            title2: "Development",
            desc: "Fast, responsive, and SEO-friendly websites that help businesses establish a strong online presence and generate leads.",
            path: "/services/website-development",
        },
        {
            number: "03",
            title1: "Performance",
            title2: "Marketing",
            desc: "A data-driven approach focused on achieving measurable business outcomes such as leads, sales, and ROI/ROAS optimization.",
            path: "/services/performance-marketing",
        },
        {
            number: "04",
            title1: "Meta",
            title2: "Ads",
            desc: "High-performing advertising campaigns on Facebook & Instagram to reach the right audience and maximize return on investment.",
            path: "/services/meta-ads",
        },
        {
            number: "05",
            title1: "Google",
            title2: "Ads",
            desc: "Google Ads (PPC) campaigns that help businesses appear in front of customers actively searching for their products or services.",
            path: "/services/google-ads",
        },
    ];

    return (
        <section className="w-full  bg-white select-none">

            {/* Top Header Column Row */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 pb-12 px-4">
                {/* Left Column — Title */}
                <div className="w-full lg:w-[60%] flex flex-col gap-4 text-left">
                    <span className="text-orange-600 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                        Our Services
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-[60px] font-bold uppercase text-slate-900 leading-[1.05] tracking-tight">
                        Results-Driven<br />Growth & Creative<br />Services
                    </h2>
                </div>

                {/* Right Column — Description & CTA */}
                <div className="w-full lg:w-[35%] flex flex-col gap-8 text-left lg:pt-10">
                    <p className="text-[16px] sm:text-[17px] leading-[1.7] text-slate-600 font-medium">
                        From SEO to social media ads, our tailored strategies help you reach, engage, and convert your audience effectively.
                    </p>
                    <button 
                        className="w-fit bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-lg shadow-orange-600/20"
                        onClick={() => navigate('/contact')}
                    >
                        Free Consultation
                    </button>
                </div>
            </div>

            <div className="w-full h-[0.4px] bg-slate-200 mt-5" />

            {/* Services List Rows */}
            <div className="w-full mx-auto flex flex-col">
                {services.map((service) => (
                    <motion.div
                        key={service.number}
                        onClick={() => navigate(service.path)}
                        initial="initial"
                        whileHover="hover"
                        className="relative group overflow-hidden border-b border-slate-200 py-10 lg:py-25 px-4 sm:px-8 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 transition-all duration-300 z-10"
                    >
                        <motion.div
                            className="absolute inset-0 bg-[#FF6B00] -z-10"
                            style={{ originX: 0 }}
                            variants={{
                                initial: { scaleX: 0 },
                                hover: { scaleX: 1 }
                            }}
                            transition={{ duration: 1, ease: [0.19, 0.05, 0.24, 0.95] }}
                        />

                        {/* Left side: Number & Title & Mobile Arrow */}
                        <div className="flex items-center justify-between lg:justify-start gap-4 sm:gap-8 lg:gap-12 lg:w-[40%] shrink-0 w-full">
                            <div className="flex items-center gap-4 sm:gap-8 lg:gap-12">
                                <span className="text-6xl sm:text-7xl lg:text-9xl font-semibold font-['Mona_Sans'] text-slate-900 group-hover:text-white transition-colors duration-300">
                                    {service.number}.
                                </span>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 group-hover:text-white transition-colors duration-300">
                                    {service.title1} <span className="lg:hidden"> </span><br className="hidden lg:block" />{service.title2}
                                </h3>
                            </div>

                            {/* Arrow for mobile/tablet */}
                            <div className="lg:hidden shrink-0 flex justify-end">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-slate-200 group-hover:border-white group-hover:bg-white flex items-center justify-center transition-all duration-300 shadow-sm">
                                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 group-hover:text-orange-600 transition-transform duration-300 rotate-45 group-hover:rotate-0" />
                                </div>
                            </div>
                        </div>

                        {/* Middle: Description */}
                        <div className="flex-1 lg:max-w-2xl w-full">
                            <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed group-hover:text-white transition-colors duration-300 lg:ml-5">
                                {service.desc}
                            </p>
                        </div>

                        {/* Right side: Circular Arrow Button (Desktop only) */}
                        <div className="hidden lg:flex shrink-0 justify-end">
                            <div className="w-14 h-14 rounded-full border border-slate-200 group-hover:border-white group-hover:bg-white flex items-center justify-center transition-all duration-300 shadow-sm">
                                <ArrowUpRight className="w-6 h-6 text-slate-700 group-hover:text-orange-600 transition-transform duration-300 rotate-45 group-hover:rotate-0" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}