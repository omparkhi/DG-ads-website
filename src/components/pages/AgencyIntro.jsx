import BlurText from "../common/BlurText";
import BookCallButton from "../common/BookCallButton";
import CurvedLoop from "../common/CurvedLoop";
import TextType from "../common/TextType";
import DarkVeil from "../common/DarkVeil";

export default function AgencyIntro() {
  return (
    <section className="relative overflow-hidden padding bg-black">
      {/* Background effect */}
      <div className="h-60 sm:h-auto pointer-events-none absolute inset-0 z-0">
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
        <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 mt-7">
          <div className="w-full md:max-w-[720px] md:min-h-[120px]">
            <TextType
              text={["We Build Brands That Dominate Digitally"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="|"
              deletingSpeed={50}
              className="block text-3xl sm:text-3xl md:text-5xl font-bold tracking-[-0.04em] text-white leading-tight"
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
          className="text-[16px] sm:text-xl mt-3 max-w-2xl text-slate-300"
        />

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="h-12 rounded-full bg-[var(--color-primary)] px-5 font-semibold text-white shadow-lg shadow-blue-600/25">
            Start Project
          </button>

          <button className="h-12 rounded-full border border-slate-300 bg-white px-5 font-semibold text-slate-900 backdrop-blur-xl">
            View Work
          </button>
        </div>
      </div>
    </section>
  );
}
