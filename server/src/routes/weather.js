import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/forecast", authenticateToken, async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const latNum = parseFloat(lat) || 59.3293;
    const lonNum = parseFloat(lon) || 18.0686;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latNum}&longitude=${lonNum}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    const data = await response.json();

    const codeMap = {
      0: { label: "Clear", variant: "sunny" },
      1: { label: "Clear", variant: "sunny" },
      2: { label: "Cloudy", variant: "cloudy" },
      3: { label: "Cloudy", variant: "cloudy" },
      45: { label: "Fog", variant: "cloudy" },
      48: { label: "Fog", variant: "cloudy" },
      51: { label: "Drizzle", variant: "showers" },
      53: { label: "Drizzle", variant: "showers" },
      55: { label: "Drizzle", variant: "showers" },
      61: { label: "Rain", variant: "showers" },
      63: { label: "Rain", variant: "showers" },
      65: { label: "Rain", variant: "showers" },
      71: { label: "Snow", variant: "cloudy" },
      73: { label: "Snow", variant: "cloudy" },
      75: { label: "Snow", variant: "cloudy" },
      80: { label: "Showers", variant: "showers" },
      81: { label: "Showers", variant: "showers" },
      82: { label: "Showers", variant: "showers" },
      95: { label: "Storm", variant: "showers" },
      96: { label: "Storm", variant: "showers" },
      99: { label: "Storm", variant: "showers" },
    };

    const currentCode = data.current?.weather_code ?? 0;
    const mapped = codeMap[currentCode] || { label: "Weather", variant: "cloudy" };

    res.json({
      current: {
        temp: Math.round(data.current?.temperature_2m ?? 12),
        wind: Math.round(data.current?.wind_speed_10m ?? 0),
        code: currentCode,
        ...mapped,
      },
      daily: (data.daily?.time || []).slice(0, 5).map((time, i) => ({
        date: time,
        max: Math.round(data.daily.temperature_2m_max[i]),
        min: Math.round(data.daily.temperature_2m_min[i]),
        code: data.daily.weather_code[i],
        ...codeMap[data.daily.weather_code[i]],
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/locations", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const locations = await db.all(
      "SELECT * FROM weather_locations WHERE user_id = ?",
      [req.user.id]
    );
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/locations", authenticateToken, async (req, res) => {
  try {
    const db = req.app.get("db");
    const { city, lat, lon } = req.body;
    const result = await db.run(
      "INSERT INTO weather_locations (user_id, city, lat, lon) VALUES (?, ?, ?, ?)",
      [req.user.id, city, lat, lon]
    );
    const location = await db.get("SELECT * FROM weather_locations WHERE id = ?", [result.lastID]);
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
