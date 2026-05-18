import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TrueFocus from "../common/TrueFocus";
import ScrollStack, { ScrollStackItem } from "../common/ScrollStack";

const ease = [0.16, 1, 0.3, 1];

const services = [
  {
    number: "01",
    title: "Web Design & Development",
    desc: "Conversion-optimised websites and web apps built in React. Fast, responsive, and designed to turn visitors into paying customers.",
    tags: ["React", "Framer Motion", "Webflow", "UI/UX"],
    stat: "40% avg. conversion lift",
    emoji: "🌐",
    accentColor: "#6C8EFF",
    preview: null,
  },
  {
    number: "02",
    title: "Brand Identity",
    desc: "Logos, visual systems, brand guidelines, and everything that makes your brand instantly recognisable — and impossible to forget.",
    tags: ["Logo Design", "Typography", "Guidelines", "Brand Strategy"],
    stat: "50+ brands transformed",
    emoji: "✦",
    accentColor: "#9D95E8",
    preview: null,
  },
  {
    number: "03",
    title: "Performance Ads",
    desc: "Meta & Google ad campaigns engineered for ROAS. We handle creative, copy, targeting, and optimisation — you watch the numbers climb.",
    tags: ["Meta Ads", "Google Ads", "ROAS", "Creative Strategy"],
    stat: "3.2× avg. ROI boost",
    emoji: "📈",
    accentColor: "#4ECFAA",
    preview: null,
  },
  {
    number: "04",
    title: "Video Production",
    desc: "Brand films, product reels, ad creatives, and social content shot and edited to stop the scroll and spark action.",
    tags: ["Brand Films", "Reels", "Ad Creatives", "Editing"],
    stat: "3× more engagement",
    emoji: "🎬",
    accentColor: "#FF8C5A",
    preview: null,
  },
  {
    number: "05",
    title: "Social Media Management",
    desc: "Strategy, content, scheduling, and community management across Instagram, LinkedIn, and beyond. Consistent presence, real growth.",
    tags: ["Instagram", "LinkedIn", "Content Strategy", "Community"],
    stat: "10K+ avg. monthly reach",
    emoji: "📱",
    accentColor: "#F472B6",
    preview: null,
  },
];

function PreviewCard({ service }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(135deg, #0d0d1a, #1a103a)`,
        border: "1px solid rgba(127,119,221,0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      {/* bg glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 60% 40%, ${service.accentColor}22 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: 60,
          lineHeight: 1,
          filter: "drop-shadow(0 0 24px rgba(127,119,221,0.5))",
          position: "relative",
          zIndex: 1,
        }}
      >
        {service.emoji}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: service.accentColor,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {service.number}
        </div>
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.01em",
            marginBottom: 14,
            lineHeight: 1.2,
          }}
        >
          {service.title}
        </div>

        {/* stat pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 100,
            padding: "7px 16px",
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: service.accentColor,
              boxShadow: `0 0 8px ${service.accentColor}`,
              flexShrink: 0,
            }}
          />
          {service.stat}
        </div>
      </div>

      {/* tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          justifyContent: "center",
          padding: "0 16px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
              padding: "4px 10px",
              borderRadius: 100,
              background: `${service.accentColor}18`,
              border: `1px solid ${service.accentColor}40`,
              color: service.accentColor,
              fontWeight: 500,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: 14,
          fontSize: 10,
          color: "rgba(255,255,255,0.12)",
          letterSpacing: "0.08em",
        }}
      >
        ✦ DGads
      </div>
    </div>
  );
}

export default function Services() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="padding services-section"
        style={{
          background: "#000000",
          height: "100vh" /* ✅ full viewport height only */,
          overflow: "hidden" /* ✅ nothing bleeds out */,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* bg decoration */}
        {/* <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(83,74,183,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        /> */}

        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: 24 }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5227FF",
              fontWeight: 500,
              marginBottom: 14,
            }}
          >
            What We Do
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div className="sm:flex items-center sm:gap-6">
              <TrueFocus
                sentence="Services That Scale"
                manualMode={false}
                blurAmount={2}
                borderColor="#5227FF"
                animationDuration={0.5}
                pauseBetweenAnimations={1}
              />
              <div className="mt-6 sm:mt-0 flex items-center align-start">
                <TrueFocus
                  sentence="Your Brand"
                  manualMode={false}
                  blurAmount={2}
                  borderColor="#5227FF"
                  animationDuration={0.5}
                  pauseBetweenAnimations={1}
                />
              </div>
            </div>
            <p
              className="text-slate-200"
              style={{
                fontSize: 15,
                maxWidth: 300,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              End-to-end digital solutions — from first impression to final
              conversion.
            </p>
          </div>
        </motion.div>

        {/* ScrollStack — each card has left content + right preview */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <ScrollStack
            itemDistance={80}
            itemScale={0.04}
            itemStackDistance={28}
            stackPosition="18%"
            scaleEndPosition="8%"
            baseScale={0.86}
            rotationAmount={0}
            blurAmount={0}
          >
            {services.map((service, i) => (
              <ScrollStackItem key={service.number}>
                {/* card inner: left content | right preview */}
                <div className="services-card-inner">
                  {/* ── LEFT — ServiceRow style ── */}
                  <div
                    style={{
                      position: "relative",
                      borderRight: "1px solid rgba(255,255,255,0.07)",
                      overflow: "hidden",
                    }}
                  >
                    {/* accent left bar — always visible since card is "active" */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "12%",
                        height: "76%",
                        width: 3,
                        borderRadius: 2,
                        background: service.accentColor,
                        boxShadow: `0 0 14px ${service.accentColor}`,
                      }}
                    />

                    {/* subtle accent bg tint */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(90deg, ${service.accentColor}08 0%, transparent 55%)`,
                        pointerEvents: "none",
                      }}
                    />

                    {/* content */}
                    <div className="services-card-content">
                      {/* number */}
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: service.accentColor,
                          letterSpacing: "0.12em",
                        }}
                      >
                        {service.number}
                      </div>

                      {/* title */}
                      <div
                        className="services-title"
                        style={{
                          fontWeight: 700,
                          color: "#fff",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {service.title}
                      </div>

                      {/* desc */}
                      <p
                        className="services-desc"
                        style={{
                          color: "rgba(255,255,255,0.45)",
                          maxWidth: 440,
                          margin: 0,
                        }}
                      >
                        {service.desc}
                      </p>

                      {/* tags */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: "5px 13px",
                              borderRadius: 100,
                              border: "1px solid rgba(255,255,255,0.08)",
                              fontSize: 12,
                              color: "rgba(255,255,255,0.3)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* View Work CTA */}
                      <div>
                        <motion.button
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "transparent",
                            border: `1px solid ${service.accentColor}60`,
                            borderRadius: 10,
                            padding: "10px 22px",
                            fontSize: 13,
                            fontWeight: 500,
                            color: service.accentColor,
                            cursor: "pointer",
                            letterSpacing: "0.02em",
                          }}
                        >
                          View Work
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2 7H12M12 7L8 3M12 7L8 11"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* ── RIGHT — PreviewCard ── */}
                  <div className="services-preview" style={{ padding: 20 }}>
                    <PreviewCard service={service} />
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>
      {/* <div
            className="px-20"
            style={{
            background: "#0a0a0f",
            paddingTop: 40,
            paddingBottom: 60,
            }}
        >
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            style={{
                marginTop: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "28px 36px",
                borderRadius: 16,
                background: "rgba(127,119,221,0.06)",
                border: "1px solid rgba(127,119,221,0.15)",
                flexWrap: "wrap",
                gap: 20,
            }}
            >
            <div>
                <div
                style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 4,
                }}
                >
                Not sure which service fits?
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
                Book a free 30-min strategy call — we'll figure it out together.
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                background: "#534AB7",
                border: "none",
                borderRadius: 12,
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                cursor: "pointer",
                letterSpacing: "0.02em",
                boxShadow: "0 8px 24px rgba(83,74,183,0.35)",
                }}
            >
                Book Free Call ✦
            </motion.button>
            </motion.div>
        </div> */}
    </>
  );
}
