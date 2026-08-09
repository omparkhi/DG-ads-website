import { useState } from "react";
import CurvedLoop from "../common/CurvedLoop";

const videoUrl = "https://framerusercontent.com/assets/O2cpAAgP59U7ubWhxbnGstRSDQ.mp4";

export default function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted plan request:", formData);
    alert(`Thank you ${formData.name}! We will analyze your website: ${formData.website || "N/A"} and contact you at ${formData.email}.`);
    setFormData({ name: "", email: "", website: "" });
  };

  return (
    <>
      <section
        id="home"
        className="relative w-full h-[43vh] sm:h-[50vh] md:h-[60vh] lg:h-screen flex items-center overflow-hidden bg-black text-white pt-28 lg:pt-16 pb-24 lg:pb-0"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full  w-full object-cover z-0"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Atmospheric Dark Overlays */}
        {/* Mobile: Solid overlay over video for centered text contrast */}
        <div className="absolute inset-0 bg-black/55 z-1 block xl:hidden" />
        {/* Desktop: Smooth gradient dark on left, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent z-1 hidden xl:block" />

        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col xl:flex-row items-start xl:items-center justify-between gap-12 xl:gap-8 padding">

          {/* Left Column: Heading & Tagline */}
          <div className="flex flex-col items-start text-left max-w-2xl xl:max-w-3xl flex-1 select-none">
            {/* <h5 className="text-[#bff747] font-bold text-sm tracking-[0.2em] uppercase mb-6 font-['Mona_Sans']">
              We’re Award Winning
            </h5> */}
            <h1 className="text-white text-[40px] sm:text-[50px] md:text-[90px] xl:text-[158px] font-black uppercase font-semibold tracking- leading-[0.95] font-['Mona_Sans']">
              Digital <br />
              Marketing <br />
              Agency
            </h1>
          </div>

          {/* Right Column: Lead Capture Plan Card (Hidden on Mobile/Tablet, visible on Desktop) */}
          {/* <div className="xl:flex hidden flex-col items-center justify-center w-full xl:w-[468px] shrink-0">
            <div className="bg-[#111111]/90 backdrop-blur-md border border-zinc-800 rounded-[10px] p-10 w-full shadow-2xl">
              <div className="mb-6 text-left">
                <span className="inline-block bg-[#bff747] text-black text-[12px] font-extrabold uppercase px-3 py-1 rounded-[4px] mb-4">
                  Absolutely Free!
                </span>
                <h3 className="text-white text-[24px] font-bold leading-snug font-['Mona_Sans']">
                  Get Your Personalized Digital Marketing Plan Today!
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    Your name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jhon Deh...."
                    className="bg-transparent border border-zinc-700 rounded-[30px] text-white text-sm py-3.5 px-5 outline-none focus:border-[#bff747] transition-all duration-300 w-full placeholder-zinc-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    Your email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mail@domainname.com"
                    className="bg-transparent border border-zinc-700 rounded-[30px] text-white text-sm py-3.5 px-5 outline-none focus:border-[#bff747] transition-all duration-300 w-full placeholder-zinc-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="bg-transparent border border-zinc-700 rounded-[30px] text-white text-sm py-3.5 px-5 outline-none focus:border-[#bff747] transition-all duration-300 w-full placeholder-zinc-600"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full bg-[#bff747] hover:bg-[#bff747]/90 text-black font-semibold text-lg py-3.5 px-6 rounded-[30px] uppercase transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-lg hover:shadow-[#bff747]/20"
                >
                  Claim My Free Plan
                </button>
              </form>
            </div>
          </div> */}

        </div>
      </section>

      {/* Curved loop/marquee at bottom overlay */}
      {/* <div className="-mt-50 relative z-20">
        <CurvedLoop
          marqueeText="Digital Marketing  ✦  Social Media  ✦  Branding  ✦  Performance Ads  ✦  Content Creation  ✦  Growth Strategy  ✦ Web Services  ✦ "
          speed={2}
          curveAmount={150}
          direction="right"
          interactive
          className="custom-text-style"
        />
      </div> */}
    </>
  );
}
