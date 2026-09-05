import jwt from "jsonwebtoken";

export default function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "dgads_secret_jwt_key_2026";
    const decoded = jwt.verify(token, secret);

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
}
