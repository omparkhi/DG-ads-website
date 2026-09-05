import express from "express";
import Testimonial from "../models/Testimonial.js";
import connectDB from "../config/db.js";
import requireAdmin from "../middleware/auth.js";

const router = express.Router();

// GET /api/testimonials (Public)
router.get("/", async (req, res) => {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, data: testimonials });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/testimonials (Admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const newTestimonial = await Testimonial.create(req.body);
    return res.status(201).json({ success: true, data: newTestimonial });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/testimonials/:id (Admin)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/testimonials/:id (Admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    await Testimonial.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
