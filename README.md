# 🌾 Agricultural IoT Dashboard

A full-stack smart agriculture monitoring system with AI-powered chatbot assistance in Tamil.

## 📁 Project Structure

```
agri-project/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── components/    # UI components (Chatbot, MoistureGauge, etc.)
│   │   ├── utils/         # Utility functions (API, alerts, recommendations)
│   │   ├── constants/     # Application constants
│   │   ├── hooks/         # Custom React hooks
│   │   └── pages/         # Page components
│   ├── public/           # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json       # Frontend deployment config
│
├── backend/          # Express.js API server
│   ├── routes/           # API route definitions
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── config/           # Configuration files
│   ├── server.js         # Main server file
│   └── vercel.json       # Backend deployment config
│
└── README.md

```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- OpenAI API Key (Gemini)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd agri-project
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
OPENAI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
```

Create `.env` file in frontend folder (optional):
```env
VITE_API_URL=http://localhost:5000
```

### Running the Application

**Option 1: Run separately**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

**Option 2: Run both with root scripts** (coming soon)

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔌 API Endpoints

### Backend Routes

- `GET /health` - Health check endpoint
- `POST /api/chat` - AI chatbot endpoint

Example chat request:
```json
POST /api/chat
{
  "message": "என் வயலில் தண்ணீர் பாய்ச்ச வேண்டுமா?",
  "sensorContext": {
    "fieldName": "North Field – Wheat",
    "moisture": 45,
    "temperature": 32,
    "tankLevel": 75,
    "pumpOn": false
  }
}
```

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Backend (Vercel)
```bash
cd backend
vercel deploy
```

Set environment variables in Vercel dashboard:
- `OPENAI_API_KEY` - Your API key
- `VITE_API_URL` - Your backend URL (for frontend)

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite 7
- Tailwind CSS 4
- Recharts (data visualization)
- Lucide React (icons)

**Backend:**
- Node.js
- Express 5
- OpenAI SDK (Gemini API)
- CORS, dotenv

## 📝 Features

- ✅ Real-time sensor monitoring (moisture, temperature, humidity)
- ✅ Water tank level tracking
- ✅ Smart pump control
- ✅ Historical data charts
- ✅ AI-powered recommendations
- ✅ Tamil language chatbot (Majaa)
- ✅ Multi-field management
- ✅ Alert system

## 📄 License

MIT License
