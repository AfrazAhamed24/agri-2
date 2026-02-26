import process from "process";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERROR: OPENAI_API_KEY not found in .env file");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const chatController = async (req, res) => {
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
};
