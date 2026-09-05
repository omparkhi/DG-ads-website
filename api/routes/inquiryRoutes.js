import express from "express";
import Inquiry from "../models/Inquiry.js";
import connectDB from "../config/db.js";
import requireAdmin from "../middleware/auth.js";

const router = express.Router();

// POST /api/inquiries (Public - Submit lead form)
router.post("/", async (req, res) => {
  try {
    await connectDB();
    const { name, phone, email, service, budget, message } = req.body;
    
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and Phone are required." });
    }

    const newInquiry = await Inquiry.create({ name, phone, email, service, budget, message });
    return res.status(201).json({ success: true, message: "Inquiry submitted successfully!", data: newInquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/inquiries (Admin - View leads)
router.get("/", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: inquiries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/inquiries/:id (Admin - Update lead status)
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const { status } = req.body;
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/inquiries/:id (Admin - Delete lead)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    await Inquiry.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
