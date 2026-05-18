import BlurText from "../common/BlurText";
import ScrollReveal from "../common/ScrollReveal";
import TextType from "../common/TextType";
import TrueFocus from "../common/TrueFocus";
import SplitReveal from "./SplitReveal";
import StatsStrip from "./StatsStrip";

const desktopVideo =
  "https://res.cloudinary.com/dn56jtwoq/video/upload/f_auto,q_auto,w_1600/mp__kwdswk.mp4";

const mobileVideo =
  "https://res.cloudinary.com/dn56jtwoq/video/upload/f_auto,q_auto,w_800/mp__kwdswk.mp4";

export default function About() {
  return (
    <section className="bg-[#000] min-h-screen w-full px-20 pt-5">
      {/* <TrueFocus
        sentence="Building Brands For Digital-Era"
        manualMode={false}
        blurAmount={5}
        borderColor="#5227FF"
        animationDuration={0.5}
        pauseBetweenAnimations={1}
      /> */}
      <div className="flex w-full items-center justify-center">
        <h1 className="text-5xl font-bold text-white">
          Building Brands For Digital-Era
        </h1>
      </div>

      {/* ✅ Two column row — text left, split reveal right */}
      <div className="w-full max-w-6xl mx-auto flex items-center mt-10">
        {/* Left — text content */}
        <div className="flex-1 min-w-0">
          <BlurText
            text="DGads is a modern digital agency built for brands that want to stand out, scale faster, and dominate online. Founded in 2025, we blend strategy, creativity, content, design, and performance marketing to craft high-impact digital experiences that drive attention, engagement, and real business growth."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-[17px] text-slate-300 leading-relaxed"
          />
        </div>

        {/* Right — split reveal, takes more space */}
        <div className="w-[55%] flex-shrink-0">
          <SplitReveal />
        </div>
      </div>

      {/* Stats below full width */}
      <div className="w-full max-w-6xl mx-auto mt-12 pb-10">
        <StatsStrip />
      </div>
    </section>
  );
}
