import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const events = await db.all(
      `SELECT * FROM events WHERE user_id = ? 
       AND start_time >= datetime('now', 'start of month')
       AND start_time < datetime('now', 'start of month', '+1 month')
       ORDER BY start_time`,
      [req.user.id]
    );
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const { title, location, start_time, end_time, color } = req.body;
    const result = await db.run(
      "INSERT INTO events (user_id, title, location, start_time, end_time, color) VALUES (?, ?, ?, ?, ?, ?)",
      [req.user.id, title, location, start_time, end_time, color || "default"]
    );
    const event = await db.get("SELECT * FROM events WHERE id = ?", [result.lastID]);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    await db.run("DELETE FROM events WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
