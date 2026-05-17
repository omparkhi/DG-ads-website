import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../../data/navLinks";
import Button from "../common/Button";
import Logo from "../../assets/logo.png";

const ease = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-20 py-4">
      <motion.nav
        animate={
          scrolled
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
        <div className="flex items-center">
          <motion.img
            src={Logo}
            alt="logo"
            animate={
              scrolled ? { height: 44, width: 44 } : { height: 60, width: 60 }
            }
            transition={{ duration: 0.8, ease }}
            className="object-contain"
          />
          <AnimatePresence initial={false}>
            {!scrolled && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, maxWidth: 0, x: -10 }}
                animate={{ opacity: 1, maxWidth: 120, x: 0 }}
                exit={{ opacity: 0, maxWidth: 0, x: -10 }}
                transition={{ duration: 0.6, ease }}
                className="overflow-hidden whitespace-nowrap text-[22px] font-bold text-white"
              >
                DGads
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
                  gap: "32px",
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
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
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
                      // background: "rgba(241,245,249,1)",
                    }
              }
              transition={{ duration: 0.8, ease }}
              className="rounded-xl text-[16px] font-medium text-black hover:text-blue-600"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Button */}
        <motion.div
          animate={scrolled ? { scale: 0.95 } : { scale: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <Button className="p-2 rounded-xl">Contact Us</Button>
        </motion.div>
      </motion.nav>
    </header>
  );
}
