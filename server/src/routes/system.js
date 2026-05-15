import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import os from "os";

const router = Router();

router.get("/stats", authenticateToken, async (req, res) => {
  try {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    const stats = {
      cpu: Math.round(Math.random() * 30 + 10),
      memory: {
        total: Math.round(totalMem / 1024 ** 3),
        used: Math.round(usedMem / 1024 ** 3),
        percentage: Math.round((usedMem / totalMem) * 100),
      },
      uptime: os.uptime(),
      platform: os.platform(),
      hostname: os.hostname(),
      loadavg: os.loadavg(),
      timestamp: Date.now(),
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/logs", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const logs = await db.all(
      "SELECT * FROM system_logs WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50",
      [req.user.id]
    );
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/logs", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const { type, message } = req.body;
    const result = await db.run(
      "INSERT INTO system_logs (user_id, type, message) VALUES (?, ?, ?)",
      [req.user.id, type, message]
    );
    const log = await db.get("SELECT * FROM system_logs WHERE id = ?", [result.lastID]);
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
