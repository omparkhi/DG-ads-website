import express from "express";
import CaseStudy from "../models/CaseStudy.js";
import connectDB from "../config/db.js";
import requireAdmin from "../middleware/auth.js";

const router = express.Router();

// GET /api/case-studies (Public)
router.get("/", async (req, res) => {
  try {
    await connectDB();
    const caseStudies = await CaseStudy.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, data: caseStudies });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/case-studies/all (Admin)
router.get("/all", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const caseStudies = await CaseStudy.find().sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, data: caseStudies });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/case-studies/:id (Public / Detail View)
router.get("/:id", async (req, res) => {
  try {
    await connectDB();
    const item = await CaseStudy.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Case study not found" });
    }
    return res.json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/case-studies (Admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const newCaseStudy = await CaseStudy.create(req.body);
    return res.status(201).json({ success: true, data: newCaseStudy });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/case-studies/:id (Admin)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const updated = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/case-studies/:id (Admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    await CaseStudy.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
