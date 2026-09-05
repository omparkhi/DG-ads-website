import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser.js";
import connectDB from "../config/db.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    await connectDB();

    const envUsername = process.env.ADMIN_USERNAME || "admin";
    const envPassword = process.env.ADMIN_PASSWORD || "admin123";
    const jwtSecret = process.env.JWT_SECRET || "dgads_secret_jwt_key_2026";

    // 1. Fallback environment variable authentication
    if (username === envUsername && password === envPassword) {
      const token = jwt.sign({ username: envUsername, role: "admin" }, jwtSecret, {
        expiresIn: "7d",
      });
      return res.json({ success: true, token, user: { username: envUsername } });
    }

    // 2. Check Database Admin User if created
    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username, role: "admin" }, jwtSecret, {
      expiresIn: "7d",
    });

    return res.json({ success: true, token, user: { username: admin.username } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false });
    }
    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET || "dgads_secret_jwt_key_2026";
    const decoded = jwt.verify(token, jwtSecret);
    return res.json({ success: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ success: false });
  }
});

export default router;
