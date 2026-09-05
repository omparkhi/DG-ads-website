import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { apiGetStats } from "../../services/api";

const ease = [0.16, 1, 0.3, 1];

const fallbackStats = [
  {
    number: 15,
    suffix: "+",
    label: "Brands Built",
    caseStudy:
      "From local startups to D2C brands — we've built 50+ brand identities that actually convert.",
  },
  {
    number: 98,
    suffix: "%",
    label: "Client Satisfaction",
  },
  {
    number: 3.2,
    suffix: "×",
    decimals: 1,
    label: "Avg. ROI Boost",
    caseStudy:
      "Our performance ad campaigns average 3.2× return — tracked, optimised, and reported monthly.",
  },
  {
    number: 4,
    suffix: " yrs",
    label: "Years Active",
    caseStudy:
      "Since 2021, DGads has grown from a 2-person team to a full-stack digital powerhouse.",
  },
];

function useCountUp(target, decimals = 0, active = false, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, decimals, duration]);

  return value;
}

function StatCard({ stat, index, active, delay }) {
  const count = useCountUp(stat.number, stat.decimals || 0, active, 1600);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay: delay }}
      style={{
        flex: 1,
        minWidth: 0,
        background: "#f8fafc",
        border: "1px solid rgba(234, 88, 12, 0.15)",
        borderRadius: 20,
        padding: "clamp(18px, 3vw, 32px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          left: "50%",
          transform: "translateX(-50%)",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(15, 23, 42, 0.5)",
          marginBottom: 12,
          fontWeight: 500,
          textAlign: "left",
        }}
      >
        {stat.label}
      </div>

      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textAlign: "left",
        }}
      >
        <span style={{ color: "#ea580c" }}>
          {active
            ? stat.decimals
              ? count.toFixed(stat.decimals)
              : Math.round(count)
            : 0}
        </span>
        <span
          style={{
            fontSize: 32,
            color: "rgba(15, 23, 42, 0.4)",
            marginLeft: 2,
          }}
        >
          {stat.suffix}
        </span>
      </div>
    </motion.div>
  );
}

export default function StatsStrip() {
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState(fallbackStats);
  const ref = useRef(null);

  useEffect(() => {
    async function loadCMSData() {
      const res = await apiGetStats();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setStats(res.data);
      }
    }
    loadCMSData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        marginTop: "30px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(234, 88, 12, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label || i}
            stat={stat}
            index={i}
            active={visible}
            delay={i * 0.12}
          />
        ))}
      </div>
    </section>
  );
}
