import { useNavigate } from "react-router-dom";
import BlurText from "../common/BlurText";
import BookCallButton from "../common/BookCallButton";
import CurvedLoop from "../common/CurvedLoop";
import TextType from "../common/TextType";
import DarkVeil from "../common/DarkVeil";

export default function AgencyIntro() {
  const navigate = useNavigate();

  return (
    <>
      <div className="ribbon">
        <div className="marquee-track">
          <div className="marquee-item">
            <span className="marquee-text">Digital Marketing</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Social Media</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Branding</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Performance Ads</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Content Creation</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Growth Strategy</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Web Services</span>
            <span className="marquee-dot"></span>
          </div>
          <div className="marquee-item">
            <span className="marquee-text">Digital Marketing</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Social Media</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Branding</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Performance Ads</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Content Creation</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Growth Strategy</span>
            <span className="marquee-dot"></span>
            <span className="marquee-text">Web Services</span>
            <span className="marquee-dot"></span>
          </div>
        </div>
      </div>
      <section className="relative overflow-hidden padding bg-white  pt-10">

        {/* Background effect */}
        <div className="h-60 sm:h-auto pointer-events-none absolute inset-0 z-0">
          <DarkVeil
            hueShift={225}
            noiseIntensity={0}
            scanlineIntensity={0.1}
            speed={2}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 mt-7">
            <div className="w-full md:max-w-[720px] md:min-h-[120px]">
              <TextType
                text={["We Build Brands That Dominate Digitally"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="|"
                deletingSpeed={50}
                className="block text-3xl sm:text-3xl md:text-5xl font-bold tracking-[-0.04em] text-slate-900 leading-tight"
              />
            </div>

            <div className="shrink-0 md:pt-2">
              <BookCallButton />
            </div>
          </div>

          <BlurText
            text="Premium websites, apps, branding, video production and performance marketing systems for modern businesses."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-[16px] sm:text-xl mt-3 max-w-2xl text-slate-600"
          />

          <div className="mt-8 flex flex-wrap gap-4">
            <button 
              className="h-12 rounded-full bg-[var(--color-primary)] px-5 font-semibold text-white shadow-lg shadow-orange-600/25 hover:bg-orange-700 transition duration-300 cursor-pointer"
              onClick={() => navigate('/contact')}
            >
              Start Project
            </button>

            <button 
              className="h-12 rounded-full border border-slate-300 bg-white px-5 font-semibold text-slate-900 backdrop-blur-xl hover:bg-slate-50 transition duration-300 cursor-pointer"
              onClick={() => navigate('/work')}
            >
              View Work
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
