import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { initDb } from "./db.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import notesRouter from "./routes/notes.js";
import eventsRouter from "./routes/events.js";
import tasksRouter from "./routes/tasks.js";
import systemRouter from "./routes/system.js";
import weatherRouter from "./routes/weather.js";

const __dirname = import.meta.dirname;

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/system", systemRouter);
app.use("/api/weather", weatherRouter);

// Socket.IO for real-time updates
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("subscribe", (channel) => {
    socket.join(channel);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Make io accessible to routes
app.set("io", io);

const PORT = process.env.PORT || 3001;

async function start() {
  const db = await initDb();
  app.set("db", db);

  // Real-time system stats broadcast
  setInterval(() => {
    const stats = {
      cpu: Math.round(Math.random() * 30 + 10),
      memory: Math.round(Math.random() * 40 + 30),
      network: {
        down: Math.round(Math.random() * 100 + 50),
        up: Math.round(Math.random() * 30 + 10),
      },
      battery: {
        level: Math.round(Math.random() * 20 + 70),
        charging: Math.random() > 0.5,
      },
      timestamp: Date.now(),
    };
    io.to("system").emit("stats", stats);
  }, 2000);

  httpServer.listen(PORT, () => {
    console.log(`Nothing OS API running on port ${PORT}`);
  });
}

start().catch(console.error);
