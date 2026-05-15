import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const tasks = await db.all(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY completed, priority DESC, created_at DESC",
      [req.user.id]
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const { title, priority } = req.body;
    const result = await db.run(
      "INSERT INTO tasks (user_id, title, priority) VALUES (?, ?, ?)",
      [req.user.id, title, priority || "normal"]
    );
    const task = await db.get("SELECT * FROM tasks WHERE id = ?", [result.lastID]);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const { completed } = req.body;
    await db.run(
      "UPDATE tasks SET completed = ? WHERE id = ? AND user_id = ?",
      [completed ? 1 : 0, req.params.id, req.user.id]
    );
    const task = await db.get("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    await db.run("DELETE FROM tasks WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
