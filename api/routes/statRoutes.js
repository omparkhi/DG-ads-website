import express from "express";
import Stat from "../models/Stat.js";
import connectDB from "../config/db.js";
import requireAdmin from "../middleware/auth.js";

const router = express.Router();

// GET /api/stats (Public)
router.get("/", async (req, res) => {
  try {
    await connectDB();
    const stats = await Stat.find().sort({ order: 1 });
    return res.json({ success: true, data: stats });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/stats (Admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const newStat = await Stat.create(req.body);
    return res.status(201).json({ success: true, data: newStat });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/stats/:id (Admin)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const updated = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/stats/:id (Admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    await Stat.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
