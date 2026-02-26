import process from "process";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

dotenv.config({ override: true });

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "Agricultural IoT API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "GET /health",
      chat: "POST /api/chat"
    }
  });
});

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
  console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    error: "Route not found",
    path: req.path,
    method: req.method,
    availableEndpoints: {
      root: "GET /",
      health: "GET /health",
      chat: "POST /api/chat"
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    error: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

// For Vercel serverless
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Chat endpoint: POST http://localhost:${PORT}/api/chat`);
    console.log(`✅ Health check: GET http://localhost:${PORT}/health`);
  });
}