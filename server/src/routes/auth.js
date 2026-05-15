import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../middleware/auth.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const db = req.app.get("db");
    const { username, password, displayName } = req.body;

    const existing = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if (existing) return res.status(400).json({ error: "Username taken" });

    const hash = await bcrypt.hash(password, 10);
    const result = await db.run(
      "INSERT INTO users (username, password, display_name) VALUES (?, ?, ?)",
      [username, hash, displayName || username]
    );

    const userId = result.lastID;
    await db.run(
      "INSERT INTO settings (user_id, theme, shadows) VALUES (?, ?, ?)",
      [userId, "dark", "on"]
    );

    const token = jwt.sign({ id: userId, username }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: userId, username, displayName: displayName || username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
    res.json({
      token,
      user: { id: user.id, username: user.username, displayName: user.display_name },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const db = req.app.get("db");
    const user = await db.get("SELECT id, username, display_name, avatar FROM users WHERE id = ?", [decoded.id]);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
});

export default router;
