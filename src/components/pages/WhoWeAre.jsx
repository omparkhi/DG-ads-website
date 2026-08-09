import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Gem, Goal } from "lucide-react";

export default function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const ease = [0.44, 0, 0.56, 1];

  const whoWeAre = {
    title: "Who we are",
    description:
      "At Mainframe, we combine expertise, creativity, and data-driven strategies to transform your digital presence into a powerful business asset.",
    video: "https://framerusercontent.com/assets/cOTgWTZvUDyGo8WiX94mIsko1gI.mp4",
    image: "/who-we-are-white.png",
    items: [
      {
        title: "Our Mission",
        description:
          "To empower businesses through innovative digital marketing strategies that deliver measurable results and foster sustainable growth and drive long-term success globally.",
      },
      {
        title: "Our Vision",
        description:
          "To empower businesses through innovative digital marketing strategies that deliver measurable results, and drive customer loyalty for sustainable growth.",
      },
      {
        title: "Core Values",
        description:
          "To help businesses thrive by creating innovative digital marketing strategies that produce measurable results and foster customer loyalty for long-term growth.",
      },
    ],
  };

  const icons = [Target, Lightbulb, Gem];

  return (
    <section className="w-full py-10 bg-white text-slate-900 overflow-hidden" ref={ref}>
      <div className="padding">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left — media */}
          <motion.div
            className="relative w-full flex-1"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease }}
          >
            <div className="relative rounded-[20px] overflow-hidden aspect-[0.95] mt-10 lg:mt-0 bg-black">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-100 contrast-[1.05] brightness-[1.02]">
                <source src={whoWeAre.video} type="video/mp4" />
              </video>
              <img src={whoWeAre.image} alt="Who we are" className="absolute inset-0 w-full h-full object-cover z-10" />
              {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-20" /> */}
            </div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            className="flex flex-col flex-1 w-full items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease }}
          >
            <p className="font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">

            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[60px] font-bold text-orange-600 uppercase leading-[1.1] tracking-tight mb-4 lg:mb-0">
              Who We Are
            </h2>
            <p className="text-[16px] leading-[1.7] text-slate-600 mb-10 max-w-2xl lg:max-w-none">
              {whoWeAre.description}
            </p>

            <div className="flex flex-col w-full">
              {whoWeAre.items.map((item, i) => {
                const IconComponent = icons[i] || Target;
                return (
                  <motion.div
                    key={i}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease }}
                  >
                    <div className="flex justify-center items-center shrink-0">
                      {i === 0 ? <Goal strokeWidth={2} className="w-12 h-12 lg:w-[50px] lg:h-[50px] text-orange-600" /> : null}
                      {i === 1 ? <Lightbulb strokeWidth={2} className="w-12 h-12 lg:w-[50px] lg:h-[50px] text-orange-600" /> : null}
                      {i === 2 ? <Gem strokeWidth={2} className="w-12 h-12 lg:w-[50px] lg:h-[50px] text-orange-600" /> : null}
                    </div>
                    <div className="hidden sm:block w-[2px] bg-gray-300 self-stretch my-2" />
                    <div className={`flex-1 flex flex-col items-center sm:items-start text-center sm:text-left ${i < whoWeAre.items.length - 1 ? "pb-10 sm:pb-8" : "pb-0"}`}>
                      <h4 className="text-[20px] sm:text-[22px] md:text-[25px] font-bold text-orange-600 mb-2 sm:mb-0">
                        {item.title}
                      </h4>
                      <p className="text-[15px] leading-[1.65] text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
