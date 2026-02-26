import express from "express";
import { chatController } from "../controllers/chatController.js";

const router = express.Router();

// GET /api/chat - Info endpoint
router.get("/", (req, res) => {
  res.json({
    endpoint: "POST /api/chat",
    description: "AI chatbot for agricultural assistance",
    requiredFields: ["message"],
    optionalFields: ["sensorContext"],
    example: {
      message: "என் வயலில் தண்ணீர் பாய்ச்ச வேண்டுமா?",
      sensorContext: {
        fieldName: "North Field",
        moisture: 45,
        temperature: 32,
        tankLevel: 75,
        pumpOn: false
      }
    }
  });
});

// POST /api/chat
router.post("/", chatController);

export default router;
