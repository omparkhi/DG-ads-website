import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import Button from "../common/Button";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/main-logo.png";
import LogoName from "../../assets/main-logo-name.png";
import { Megaphone, Code, Target, Sparkles, Search, ChevronDown, Menu, X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];
const MotionLink = motion(Link);

const dropdownServices = [
  {
    title: "Digital Marketing",
    desc: "SEO, Social Media, Content & Local SEO",
    icon: Megaphone,
    href: "/services/digital-marketing",
  },
  {
    title: "Website Development",
    desc: "E-commerce, Custom Apps, & Web Design",
    icon: Code,
    href: "/services/website-development",
  },
  {
    title: "Performance Marketing",
    desc: "Lead Gen, Conversion Ads & Analytics",
    icon: Target,
    href: "/services/performance-marketing",
  },
  {
    title: "Meta Ads",
    desc: "Facebook, Instagram & Retargeting Ads",
    icon: Sparkles,
    href: "/services/meta-ads",
  },
  {
    title: "Google Ads",
    desc: "Search, Display, Shopping & PMax PPC",
    icon: Search,
    href: "/services/google-ads",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 160);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full padding">
      <motion.nav
        animate={
          scrolled && !isMobile
            ? {
              width: "fit-content",
              gap: "40px",
              paddingLeft: "6px",
              paddingRight: "6px",
              paddingTop: "6px",
              paddingBottom: "6px",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              background: "rgba(255, 255, 255, 0.6)",
              boxShadow: "0 20px 80px rgba(15,23,42,0.07)",
              borderRadius: "16px",
            }
            : scrolled && isMobile
              ? {
                width: "100%",
                gap: "0px",
                paddingLeft: "0px",
                paddingRight: "0px",
                paddingTop: "0px",
                paddingBottom: "0px",
                boxShadow: "0 0px 0px rgba(15,23,42,0)",
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
                background: "rgba(255, 255, 255, 0)",
                borderRadius: "0px",
              }
              : {
                width: "100%",
                gap: "0px",
                paddingLeft: "0px",
                paddingRight: "0px",
                paddingTop: "0px",
                paddingBottom: "0px",
                boxShadow: "0 0px 0px rgba(15,23,42,0)",
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
                background: "rgba(255,255,255,0)",
                borderRadius: "16px",
              }
        }
        transition={{ duration: 0.8, ease }}
        className="mx-auto flex items-center justify-between"
      >
        {/* Logo + Brand */}
        <div className={`flex items-center ${scrolled ? "bg-transparent rounded-none" : "bg-white rounded-md"}`} >
          <motion.img
            src={Logo}
            alt="logo"
            animate={scrolled ? { height: 36, width: 36 } : { height: 44, width: 44 }}
            transition={{ duration: 0.8, ease }}
            className="object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />
          <AnimatePresence initial={false}>
            {!scrolled && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, maxWidth: 0, x: -10 }}
                animate={{ opacity: 1, maxWidth: 140, x: 0 }}
                exit={{ opacity: 0, maxWidth: 0, x: -10 }}
                transition={{ duration: 0.6, ease }}
                className="overflow-hidden whitespace-nowrap text-[16px] sm:text-[22px] font-bold text-white cursor-pointer flex items-center ml-1 sm:ml-2"
                onClick={() => navigate("/")}
              >
                <img src={LogoName} alt="logo" className="object-contain w-[100px] sm:w-[120px]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center Nav Links */}
        <motion.div
          animate={
            scrolled
              ? {
                gap: "8px",
                background: "rgba(255,255,255,0)",
                boxShadow: "none",
                paddingLeft: "0px",
                paddingRight: "0px",
                paddingTop: "0px",
                paddingBottom: "0px",
              }
              : {
                gap: "10px",
                background: "rgba(255,255,255,0.7)",
                boxShadow: "0 20px 80px rgba(15,23,42,0.07)",
                paddingLeft: "4px",
                paddingRight: "4px",
                paddingTop: "4px",
                paddingBottom: "4px",
              }
          }
          transition={{ duration: 0.8, ease }}
          className="hidden md:flex items-center rounded-xl"
        >
          {navLinks.map((link) => {
            if (link.label === "Services") {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <motion.button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    animate={
                      scrolled
                        ? {
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 6,
                          paddingBottom: 6,
                        }
                        : {
                          paddingLeft: 12,
                          paddingRight: 12,
                          paddingTop: 6,
                          paddingBottom: 6,
                        }
                    }
                    transition={{ duration: 0.8, ease }}
                    className="flex items-center gap-1 rounded-xl text-[16px] font-medium text-black hover:text-orange-600 cursor-pointer focus:outline-none"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[90vw] md:w-[650px] rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-2xl shadow-slate-900/5 backdrop-blur-xl z-50 grid grid-cols-1 md:grid-cols-2 gap-2"
                      >
                        {dropdownServices.map((service, index) => {
                          const Icon = service.icon;

                          return (
                            <Link
                              key={service.title}
                              to={service.href}
                              onClick={() => setIsServicesOpen(false)}
                              className="group flex items-start gap-4 rounded-2xl p-4 hover:bg-orange-50/50 transition-all duration-300 relative overflow-hidden"
                            >
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 group-hover:bg-orange-600 group-hover:border-orange-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                <Icon size={22} className="group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div className="flex flex-col text-left z-10">
                                <span className="text-[15px] font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                                  {service.title}
                                </span>
                                <span className="text-[13px] text-slate-500 font-medium leading-relaxed mt-1 group-hover:text-slate-600 transition-colors duration-300 pr-2">
                                  {service.desc}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <MotionLink
                key={link.label}
                to={link.href}
                animate={
                  scrolled
                    ? {
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingTop: 6,
                      paddingBottom: 6,
                      background: "rgba(0,0,0,0)",
                    }
                    : {
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 6,
                      paddingBottom: 6,
                    }
                }
                transition={{ duration: 0.8, ease }}
                className="rounded-xl text-[16px] font-medium text-black hover:text-orange-600"
              >
                {link.label}
              </MotionLink>
            );
          })}
        </motion.div>

        {/* Contact Button (Desktop) */}
        <motion.div
          animate={scrolled ? { scale: 0.95 } : { scale: 1 }}
          transition={{ duration: 0.8, ease }}
          className="hidden md:block cursor-pointer"
        >
          <Button
            className="p-2 rounded-xl"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
        </motion.div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <motion.button
          animate={
            scrolled
              ? {
                background: "rgba(255,255,255,0)",
                boxShadow: "none",
              }
              : {
                background: "rgba(255,255,255,0.7)",
                boxShadow: "0 20px 80px rgba(15,23,42,0.07)",
              }
          }
          transition={{ duration: 0.8, ease }}
          className="md:hidden p-2 rounded-xl text-slate-900 hover:text-orange-600 transition-colors focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={26} />
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <img src={Logo} alt="logo" className="h-10 w-10 object-contain" />
                <img src={LogoName} alt="logo-name" className="h-5 object-contain mt-1" />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-slate-100/80 hover:bg-slate-200 rounded-full text-slate-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <div key={link.label} className="flex flex-col gap-4">
                      <div className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                        {link.label}
                      </div>
                      <div className="flex flex-col gap-4 pl-2">
                        {dropdownServices.map(service => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.title}
                              to={service.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-4 text-base text-slate-600 hover:text-orange-600 font-medium group transition-colors"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200">
                                <Icon size={20} />
                              </div>
                              {service.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 hover:text-orange-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 mb-6">
              <Button
                className="w-full py-4 text-center rounded-xl text-[16px]"
                onClick={() => {
                  navigate("/contact");
                  setIsOpen(false);
                }}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
