import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// ✅ Replace these with your actual image imports
import BeforeImg from "../../assets/before.png";
import AfterImg from "../../assets/after.png";

const ease = [0.16, 1, 0.3, 1];

export default function SplitReveal() {
  const containerRef = useRef(null);
  const [dragX, setDragX] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [visible, setVisible] = useState(false);

  // scroll into view trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getPercent = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.min(Math.max((x / rect.width) * 100, 2), 98);
  };

  // Mouse events
  const onMouseMove = (e) => {
    if (isDragging) setDragX(getPercent(e.clientX));
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseDown = () => setIsDragging(true);

  // Touch events
  const onTouchMove = (e) => setDragX(getPercent(e.touches[0].clientX));

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <section
      style={{
        marginTop: "15px",
        position: "relative",
      }}
    >
      {/* Split container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.97 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onTouchMove={onTouchMove}
        style={{
          position: "relative",
          margin: "auto",
          width: "auto",
          aspectRatio: "16/9",
          borderRadius: 20,
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
          border: "1px solid rgba(127,119,221,0.2)",
          userSelect: "none",
          maxHeight: 300,
        }}
      >
        {/* AFTER image — full width base layer */}
        <img
          src={AfterImg}
          alt="After DGads"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            pointerEvents: "none",
          }}
        />

        {/* BEFORE image — clipped to left side */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${dragX}%`,
            overflow: "hidden",
          }}
        >
          <img
            src={BeforeImg}
            alt="Before DGads"
            style={{
              position: "absolute",
              inset: 0,
              width: containerRef.current
                ? `${containerRef.current.offsetWidth}px`
                : "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* BEFORE label */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.6)",
            textTransform: "uppercase",
            pointerEvents: "none",
            opacity: dragX > 15 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          Before
        </div>

        {/* AFTER label */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(83,74,183,0.45)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(127,119,221,0.4)",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "#c4bfff",
            textTransform: "uppercase",
            pointerEvents: "none",
            opacity: dragX < 85 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          ✦ After DGads
        </div>

        {/* Divider line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${dragX}%`,
            transform: "translateX(-50%)",
            width: 2,
            height: "100%",
            background: "rgba(127,119,221,0.9)",
            pointerEvents: "none",
          }}
        />

        {/* Drag handle */}
        <div
          onMouseDown={onMouseDown}
          style={{
            position: "absolute",
            top: "50%",
            left: `${dragX}%`,
            transform: "translate(-50%, -50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#534AB7",
            border: "3px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDragging ? "grabbing" : "grab",
            boxShadow: "0 0 0 6px rgba(83,74,183,0.25)",
            zIndex: 10,
          }}
        >
          {/* Arrow icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M5 9H13M5 9L8 6M5 9L8 12M13 9L10 6M13 9L10 12"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 12,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.04em",
        }}
      >
        ← drag to reveal →
      </motion.p>
    </section>
  );
}
