import BlurText from "../common/BlurText";
import BookCallButton from "../common/BookCallButton";
import CurvedLoop from "../common/CurvedLoop";
import TextType from "../common/TextType";
import DarkVeil from "../common/DarkVeil";

export default function AgencyIntro() {
  return (
    <section className="relative overflow-hidden px-20 py-24">
      {/* Background effect */}
      <div className="pointer-events-none absolute inset-0 z-0 mt-4">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={2}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="w-full flex justify-between mt-4">
          <TextType
            text={["We Build Brands That Dominate Digitally"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            deletingSpeed={50}
            className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-white"
          />

          <BookCallButton />
        </div>

        <BlurText
          text="Premium websites, apps, branding, video production and performance marketing systems for modern businesses."
          delay={50}
          animateBy="words"
          direction="top"
          className="text-xl mt-3 max-w-2xl text-slate-300"
        />

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-full bg-[var(--color-primary)] px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/25">
            Start Project
          </button>

          <button className="rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-900 backdrop-blur-xl">
            View Work
          </button>
        </div>
      </div>
    </section>
  );
}
