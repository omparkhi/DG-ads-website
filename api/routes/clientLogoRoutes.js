import express from "express";
import ClientLogo from "../models/ClientLogo.js";
import connectDB from "../config/db.js";
import requireAdmin from "../middleware/auth.js";

const router = express.Router();

// GET /api/client-logos (Public)
router.get("/", async (req, res) => {
  try {
    await connectDB();
    const logos = await ClientLogo.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, data: logos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/client-logos/all (Admin)
router.get("/all", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const logos = await ClientLogo.find().sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, data: logos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/client-logos (Admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const newLogo = await ClientLogo.create(req.body);
    return res.status(201).json({ success: true, data: newLogo });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/client-logos/:id (Admin)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    const updated = await ClientLogo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/client-logos/:id (Admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await connectDB();
    await ClientLogo.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
