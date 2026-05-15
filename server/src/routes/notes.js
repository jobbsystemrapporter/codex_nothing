import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const notes = await db.all(
      "SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC",
      [req.user.id]
    );
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const { content } = req.body;
    const result = await db.run(
      "INSERT INTO notes (user_id, content) VALUES (?, ?)",
      [req.user.id, content]
    );
    const note = await db.get("SELECT * FROM notes WHERE id = ?", [result.lastID]);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const { content } = req.body;
    await db.run(
      "UPDATE notes SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?",
      [content, req.params.id, req.user.id]
    );
    const note = await db.get("SELECT * FROM notes WHERE id = ?", [req.params.id]);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    await db.run("DELETE FROM notes WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
