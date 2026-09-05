import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import clientLogoRoutes from "./routes/clientLogoRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/healthcheck", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/client-logos", clientLogoRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Export for Vercel serverless functions
export default app;
