import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/settings", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const settings = await db.get("SELECT * FROM settings WHERE user_id = ?", [req.user.id]);
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/settings", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const { theme, shadows, sound_enabled, notifications_enabled } = req.body;

    const existing = await db.get("SELECT * FROM settings WHERE user_id = ?", [req.user.id]);
    if (existing) {
      await db.run(
        `UPDATE settings SET theme = COALESCE(?, theme), shadows = COALESCE(?, shadows),
         sound_enabled = COALESCE(?, sound_enabled), notifications_enabled = COALESCE(?, notifications_enabled)
         WHERE user_id = ?`,
        [theme, shadows, sound_enabled, notifications_enabled, req.user.id]
      );
    } else {
      await db.run(
        "INSERT INTO settings (user_id, theme, shadows, sound_enabled, notifications_enabled) VALUES (?, ?, ?, ?, ?)",
        [req.user.id, theme || "dark", shadows || "on", sound_enabled ?? 1, notifications_enabled ?? 1]
      );
    }

    const updated = await db.get("SELECT * FROM settings WHERE user_id = ?", [req.user.id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const user = await db.get(
      "SELECT id, username, display_name, avatar, created_at FROM users WHERE id = ?",
      [req.user.id]
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
