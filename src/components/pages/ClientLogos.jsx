import React from "react";

export default function ClientLogos() {
  const clientLogos = [
    "https://framerusercontent.com/images/MOBK0mKQQuMmtaAUUIMPsrZBlKs.svg",
    "https://framerusercontent.com/images/HsSlQ8Vh8wq9DQ25Ecd0STahdc.svg",
    "https://framerusercontent.com/images/gi8zgIuOzKVoK4gq2zvrGVLB28Y.svg",
    "https://framerusercontent.com/images/qErEULyo05GH1kt2HaYm5EsW4Ts.png",
    "https://framerusercontent.com/images/De8QHCYof3pppRSDd6CxD9giNqQ.svg",
    "https://framerusercontent.com/images/oFsIVRJX8V4LvjfaZlfHpDOS8g.svg",
    "https://framerusercontent.com/images/HT1otXjN3yQJe0JecKE8QAmmY2U.svg",
    "https://framerusercontent.com/images/EN7bkEX3Rm9MYMg46gmxqUhPs.svg",
    "https://framerusercontent.com/images/oPgn9OvdAyjp16g9upgCbG3wNHM.svg",
  ];

  // Duplicate the array to ensure smooth infinite loop scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="w-full py-10 bg-white border-y border-slate-100 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <p className="text-[11px] tracking-[0.2em] uppercase font-bold text-slate-400">
          Trusted By Industry Leaders
        </p>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* Infinite Scroll Track */}
        <div className="flex gap-16 items-center whitespace-nowrap animate-marquee">
          {duplicatedLogos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 w-32 sm:w-40 h-8 sm:h-10 flex items-center justify-center">
              <img
                src={logo}
                alt="Partner Brand Logo"
                className="max-h-full max-w-full object-contain opacity-30 hover:opacity-80 transition-all duration-300 filter grayscale"
              />
            </div>
          ))}
        </div>

        {/* Gradient overlays to blur the edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
