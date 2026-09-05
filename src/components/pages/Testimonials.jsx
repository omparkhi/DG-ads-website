import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { User } from "lucide-react";
import { apiGetTestimonials } from "../../services/api";

const fallbackTestimonials = [
  {
    quote:
      "Partnering with Mainframe Solution has been one of the best decisions for our business. Within just two months, our Instagram page crossed 15,000+ followers, and we experienced a significant increase in customer inquiries and sales. Their team understands digital marketing and delivers real results. Highly recommended!",
    name: "Anil Katole",
    role: "Owner, Pushpraj Jewellers",
  },
  {
    quote:
      "We've been working with Mainframe Solution for the past 8 months, and the experience has been excellent. Their consistent marketing efforts have strengthened our online presence and helped us reach more customers. They are professional, responsive, and truly committed to our growth.",
    name: "Pankaj Chambole",
    role: "Owner, Chambole Jewellers",
  },
  {
    quote:
      "Mainframe Solution has helped us attract more families and increase our visibility online. The campaigns were creative, well-managed, and delivered amazing results. We are very happy with their services and would definitely recommend them to other businesses.",
    name: "Ashish Bagde",
    role: "Owner, Funfinity World Kids Play Zone",
  },
  {
    quote:
      "It's been over 6 months since we started working with Mainframe Solution, and we've seen consistent business growth through their digital marketing strategies. Their dedication, creative ideas, and regular support make them a reliable marketing partner.",
    name: "Sarthak Harad",
    role: "Owner, Renuka Jewellers",
  },
  {
    quote:
      "For the last 3 months, Mainframe Solution has delivered excellent results for our business. We've received great customer engagement and a positive response through their social media marketing. Their team is knowledgeable, supportive, and focused on achieving results.",
    name: "Pallavi Shahu",
    role: "Owner, Khwaish Jewellers",
  },
  {
    quote:
      "Within just 2 months of working with Mainframe Solution, we've seen an amazing response from our marketing campaigns. Our brand visibility has improved, customer inquiries have increased, and we're very satisfied with their services. We look forward to continuing this partnership.",
    name: "Madhuri Jadhav",
    role: "Owner, Shri Sainath Jewellers",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function loadCMSData() {
      const res = await apiGetTestimonials();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setTestimonials(
          res.data.map((t) => ({
            quote: t.quote,
            name: t.name,
            role: t.role,
            avatarUrl: t.avatarUrl,
          }))
        );
      }
    }
    loadCMSData();
  }, []);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [active, testimonials.length]);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 bg-[#f8fafc] text-slate-900 relative overflow-hidden select-none"
    >
      {/* Background Shapes */}
      <div className="absolute rounded-full opacity-8 bg-orange-600 w-[600px] h-[600px] -left-[200px] top-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute rounded-full opacity-8 bg-orange-600 w-[400px] h-[400px] -right-[100px] -bottom-[100px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <span className="text-orange-600 font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3 block">
            Testimonials
          </span>
          <h3 className=" text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase text-slate-900 tracking-tight leading-tight">
            Hear What Our Clients Say About Us
          </h3>
        </motion.div>

        {/* Slider */}
        <div className="w-full overflow-hidden max-w-5xl mx-auto">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="min-w-full w-full shrink-0 px-2 sm:px-8 md:px-16">
                <div className="max-w-3xl mx-auto text-center px-2 md:p-12 relative">
                  <div className="text-[80px] md:text-[120px] leading-none text-orange-600 opacity-20 font-serif -mb-4 md:-mb-8 select-none">
                    &ldquo;
                  </div>
                  <p className="text-[15px] sm:text-[18px] md:text-[22px] leading-[1.6] md:leading-[1.8] text-slate-700 font-light mb-6 md:mb-8 italic">
                    {t.quote}
                  </p>

                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100 flex items-center justify-center shadow-sm">
                      {t.avatarUrl ? (
                        <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 sm:w-7 sm:h-7 text-slate-400" />
                      )}
                    </div>
                    <div className="text-left">
                      <h6 className="text-[16px] sm:text-[18px] font-bold text-slate-900 leading-tight">
                        {t.name}
                      </h6>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 flex-wrap px-4">
            <button
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:border-orange-600 hover:text-orange-600 hover:scale-[1.03] transition-all duration-300 shadow-sm bg-white cursor-pointer"
              onClick={prev}
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === active ? "bg-orange-600 scale-[1.3]" : "bg-slate-200"
                  }`}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:border-orange-600 hover:text-orange-600 hover:scale-[1.03] transition-all duration-300 shadow-sm bg-white cursor-pointer"
              onClick={next}
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
