import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initDb() {
  const db = await open({
    filename: path.join(__dirname, "../db/nothingos.db"),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      display_name TEXT,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      theme TEXT DEFAULT 'dark',
      shadows TEXT DEFAULT 'on',
      sound_enabled INTEGER DEFAULT 1,
      notifications_enabled INTEGER DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      location TEXT,
      start_time DATETIME NOT NULL,
      end_time DATETIME,
      color TEXT DEFAULT 'default',
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      priority TEXT DEFAULT 'normal',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS weather_locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      city TEXT NOT NULL,
      lat REAL,
      lon REAL,
      is_default INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS system_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      type TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert demo user if not exists
  const demoUser = await db.get("SELECT * FROM users WHERE username = ?", ["demo"]);
  if (!demoUser) {
    const bcryptModule = await import("bcryptjs");
    const bcrypt = bcryptModule.default || bcryptModule;
    const hashed = await bcrypt.hash("demo123", 10);
    const result = await db.run(
      "INSERT INTO users (username, password, display_name) VALUES (?, ?, ?)",
      ["demo", hashed, "Demo User"]
    );
    const userId = result.lastID;

    await db.run(
      "INSERT INTO settings (user_id, theme, shadows) VALUES (?, ?, ?)",
      [userId, "dark", "on"]
    );

    await db.run(
      "INSERT INTO notes (user_id, content) VALUES (?, ?)",
      [userId, "Two roads diverged in a yellow wood and sorry I could not travel both."]
    );

    await db.run(
      `INSERT INTO events (user_id, title, location, start_time, end_time) VALUES 
        (?, ?, ?, datetime('now', '+1 day', '10:30'), datetime('now', '+1 day', '11:30')),
        (?, ?, ?, datetime('now', '+1 day', '15:30'), datetime('now', '+1 day', '16:00'))`,
      [userId, "Design session", "Meeting room A", userId, "Product meeting", "Video call"]
    );

    await db.run(
      `INSERT INTO tasks (user_id, title, priority) VALUES 
        (?, ?, ?), (?, ?, ?), (?, ?, ?)`,
      [userId, "Review PRs", "high", userId, "Update documentation", "normal", userId, "Team standup", "normal"]
    );

    await db.run(
      "INSERT INTO weather_locations (user_id, city, lat, lon, is_default) VALUES (?, ?, ?, ?, ?)",
      [userId, "Stockholm", 59.3293, 18.0686, 1]
    );
  }

  return db;
}
