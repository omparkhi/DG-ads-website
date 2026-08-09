import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Logo from "../../assets/main-logo.png";
import LogoName from "../../assets/main-logo-name.png";
import Avatar from "../../assets/dg-ads-avatar.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const textRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const services = [
    { name: "Digital Marketing", path: "/services/digital-marketing" },
    { name: "Website Development", path: "/services/website-development" },
    { name: "Performance Marketing", path: "/services/performance-marketing" },
    { name: "Meta Ads", path: "/services/meta-ads" },
    { name: "Google Ads", path: "/services/google-ads" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Contact", path: "/contact" },
  ];

  const socials = [
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      ),
      url: "#",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      url: "https://www.instagram.com/dgads.official?igsh=Zzl1emlzYXJ6YXps",
    },
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: "#",
    },
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: "#",
    },
  ];

  return (
    <footer className="w-full bg-[#FDFCFB] text-slate-600 border-t border-slate-200 pt-20 pb-10 select-none relative overflow-hidden">

      {/* Subtle background mesh glow */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(234, 88, 12, 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 pb-16 border-b border-slate-200">

          {/* Brand Info (Full on mobile, 4 cols on lg) */}
          <div className="col-span-2 lg:col-span-4 flex flex-col gap-6 text-left">
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="DG Ads Logo"
                className="h-10 w-10 object-contain"
              />
              <div className="overflow-hidden flex items-center ml-2">
                <img src={LogoName} alt="DG Ads" className="object-contain w-[120px]" />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 max-w-sm font-medium">
              We design premium websites, build scalable custom apps, and orchestrate high-yielding performance acquisition campaigns for modern businesses.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className="w-9 h-9 rounded-full border border-slate-200 hover:border-orange-600 hover:bg-orange-600 hover:text-white flex items-center justify-center transition-all duration-300 bg-white text-slate-500 hover:scale-[1.05] shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Half on mobile, 2 cols on lg) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-6 text-left">
            <h4 className="text-slate-900 font-['Mona_Sans'] text-sm font-bold uppercase tracking-wider">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services (Half on mobile, 3 cols on lg) */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-6 text-left">
            <h4 className="text-slate-900 font-['Mona_Sans'] text-sm font-bold uppercase tracking-wider">
              Services
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              {services.map((service, i) => (
                <li key={i}>
                  <Link
                    to={service.path}
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Avatar / Branding Logo (Full on mobile, 3 cols on lg) */}
          <div className="col-span-2 lg:col-span-3 flex flex-col justify-end items-start text-left pt-4 lg:pt-0">
            <div className="relative group overflow-hidden rounded-3xl  p-6  w-full flex items-center justify-center">
              <div className="absolute inset-0" />
              <img
                src={Avatar}
                alt="DG Ads Avatar"
                className="w-32 h-32 object-contain relative z-10 "
              />
            </div>
          </div>

        </div>

        {/* Interactive MAINFRAME Text */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex flex-col items-center justify-center select-none w-[100vw] left-1/2 -translate-x-1/2 py-16 md:py-24 overflow-hidden border-b border-slate-200"
        >
          <span className="text-slate-900 font-['Mona_Sans'] font-bold text-sm sm:text-lg tracking-[0.4em] sm:tracking-[0.6em] uppercase mb-4 z-10 pointer-events-none">THE</span>

          <div className="relative inline-block">
            {/* Base Layer: thin outline, fill with background color to hide overlapping inner strokes */}
            <h1
              className="text-[11vw] md:text-[110px] lg:text-[140px] xl:text-[160px] font-['Mona_Sans'] font-black leading-none tracking-[4px] sm:tracking-[8px] z-0 select-none pointer-events-none"
              style={{
                color: '#FDFCFB',
                textShadow: '1.5px 1.5px 0 #cbd5e1, -1.5px 1.5px 0 #cbd5e1, 1.5px -1.5px 0 #cbd5e1, -1.5px -1.5px 0 #cbd5e1, 0px 1.5px 0 #cbd5e1, 0px -1.5px 0 #cbd5e1, 1.5px 0px 0 #cbd5e1, -1.5px 0px 0 #cbd5e1'
              }}
            >
              MAINFRAME
            </h1>

            {/* Top Layer: spotlight gradient fill, no outline */}
            <h1
              ref={textRef}
              className={`absolute inset-0 flex items-center justify-center text-[11vw] md:text-[110px] lg:text-[140px] xl:text-[160px] font-['Mona_Sans'] font-black leading-none tracking-[4px] sm:tracking-[8px] z-20 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              style={{
                '--mouse-x': `${mousePos.x}%`,
                '--mouse-y': `${mousePos.y}%`,
                backgroundImage: `radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), #ea580c 0%, transparent 80%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >
              MAINFRAME
            </h1>
          </div>

          <span className="text-slate-900 font-['Mona_Sans'] font-bold text-sm sm:text-lg tracking-[0.4em] sm:tracking-[0.6em] uppercase mt-4 z-10 pointer-events-none">SOLUTIONS</span>
        </div>

        {/* Copyright Row */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold select-none text-slate-500">
          <p>© {currentYear} DGads. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
