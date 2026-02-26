import process from "process";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

dotenv.config({ override: true });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "✅ Server is running",
    timestamp: new Date().toISOString(),
    apiKey: process.env.OPENAI_API_KEY ? "✅ Set" : "❌ Missing",
  });
});

// API Routes
app.use("/api/chat", chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    error: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Chat endpoint: POST http://localhost:${PORT}/api/chat`);
  console.log(`✅ Health check: GET http://localhost:${PORT}/health`);
});