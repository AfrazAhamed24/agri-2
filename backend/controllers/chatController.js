import process from "process";
import OpenAI from "openai";

let openai;

const getOpenAIClient = () => {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not configured");
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });
  }
  return openai;
};

export const chatController = async (req, res) => {
  const { message, sensorContext } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log("📩 Received message:", message);

  try {
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are Zea, a smart Tamil agriculture assistant. User may type English, Tamil or Tanglish. Always reply naturally in Tamil.`
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
    
    // Provide more specific error messages
    let errorMessage = error.message || "AI service error";
    let statusCode = 500;
    
    if (error.message.includes('403')) {
      errorMessage = "API quota exceeded or invalid API key. Please check your Gemini API settings.";
      statusCode = 503;
    } else if (error.message.includes('API key')) {
      errorMessage = "API key not configured properly.";
      statusCode = 500;
    }
    
    res.status(statusCode).json({ error: errorMessage });
  }
};
