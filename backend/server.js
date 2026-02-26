import process from "process";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ override: true });

const app = express();
app.use(cors());
app.use(express.json());

// Check API Key
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERROR: OPENAI_API_KEY not found in .env file");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "✅ Server is running", apiKey: process.env.OPENAI_API_KEY ? "✅ Set" : "❌ Missing" });
});

// Test OpenAI endpoint (for debugging)
app.get("/test-openai", async (req, res) => {
  try {
    console.log("Testing OpenAI API...");
    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: "Hello" }],
    });
    res.json({ success: true, message: completion.choices[0].message.content });
  } catch (error) {
    console.error("❌ OpenAI Test Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  const { message, sensorContext } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log("📩 Received message:", message);

  try {
    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are Majaa, a smart Tamil agriculture assistant. User may type English, Tamil or Tanglish. Always reply naturally in Tamil.`
        },
        {
          role: "user",
          content: `User message: ${message}\n\nField: ${sensorContext?.fieldName || "N/A"}\nMoisture: ${sensorContext?.moisture || 0}%\nTemperature: ${sensorContext?.temperature || 0}°C\nTank: ${sensorContext?.tankLevel || 0}%\nPump: ${sensorContext?.pumpOn ? "ON" : "OFF"}`
        }
      ],
    });

    const reply = completion.choices[0].message.content;
    console.log("✅ Reply sent:", reply);
    res.json({ reply });

  } catch (error) {
    console.error("❌ OpenAI Error:", error.message);
    res.status(500).json({ error: error.message || "AI service error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Chat endpoint: POST http://localhost:${PORT}/chat`);
  console.log(`✅ Health check: GET http://localhost:${PORT}/health`);
});