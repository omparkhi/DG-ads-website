import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CircularText from "../../assets/dg-ads-circular.png";
import MainLogo from "../../assets/main-logo.png";

export default function LetsWorkTogether() {
  return (
    <section className="w-full py-24 md:py-32 bg-white text-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center md:items-start w-full relative z-10">

          <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start w-full gap-4 md:gap-6 lg:gap-8">
            <h2 className="font-['Mona_Sans'] text-[60px] sm:text-[80px] md:text-[100px] lg:text-[140px] xl:text-[160px] font-bold tracking-tighter leading-[0.9] text-center md:text-left whitespace-nowrap uppercase">
              LET'S WORK
            </h2>

            {/* Logo Container */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-40 md:h-40 lg:w-48 lg:h-48 shrink-0 flex items-center justify-center cursor-pointer group">
              {/* Rotating Circular Text Background */}
              <motion.img
                src={CircularText}
                alt="Circular Text"
                className="absolute inset-0 w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* Fixed Center Logo with background */}
              <div className="relative z-10 w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-full flex items-center justify-center shadow-sm">
                <img
                  src={MainLogo}
                  alt="DG Ads Logo"
                  className="w-12 sm:w-14 md:w-16 lg:w-20 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center md:justify-end mt-4 md:mt-2 ">
            <h2 className="font-['Mona_Sans'] text-[60px] sm:text-[80px] md:text-[100px] lg:text-[140px] xl:text-[160px] font-bold tracking-tighter leading-[0.9] text-center md:text-right whitespace-nowrap uppercase md:pr-4 lg:pr-12">
              TOGETHER
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}
