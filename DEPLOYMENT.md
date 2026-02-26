# Deployment Guide for Agri Project

This guide will help you deploy both the frontend and backend to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git installed and repository pushed to GitHub
3. Your Gemini API key (OPENAI_API_KEY)

## Backend Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import Repository**
   - Select your GitHub repository `agri-2`
   - Click "Import"

3. **Configure Backend Project**
   - **Root Directory**: Set to `backend`
   - **Framework Preset**: Select "Other"
   - **Build Command**: Leave empty or set to `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add the following variables:
     ```
     OPENAI_API_KEY=AIzaSyDYUYbhIJfffZ78U3wFBXnRuJKc6cxCXuw
     NODE_ENV=production
     PORT=5000
     ```
   - Make sure to add them for "Production", "Preview", and "Development"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the production URL (e.g., `https://agri-project-backend.vercel.app`)

### Option 2: Deploy via CLI

```bash
cd backend
vercel
# Follow the prompts:
# - Set up and deploy: Yes
# - Which scope: Select your account
# - Link to existing project: No
# - Project name: agri-project-backend
# - Directory: ./
# - Override settings: No

# After first deployment, for production:
vercel --prod
```

After deployment, add environment variables:
```bash
vercel env add OPENAI_API_KEY production
vercel env add NODE_ENV production
vercel env add PORT production
```

## Frontend Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import Repository Again**
   - Select the same GitHub repository `agri-2`
   - Click "Import"

3. **Configure Frontend Project**
   - **Root Directory**: Set to `frontend`
   - **Framework Preset**: Select "Vite"
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add the following variable:
     ```
     VITE_API_URL=<YOUR_BACKEND_URL>
     ```
     Replace `<YOUR_BACKEND_URL>` with the URL from your backend deployment
     Example: `https://agri-project-backend.vercel.app`
   - Add for "Production", "Preview", and "Development"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at the provided URL

### Option 2: Deploy via CLI

First, create a `.env.production` file in the frontend directory:
```bash
cd frontend
echo "VITE_API_URL=<YOUR_BACKEND_URL>" > .env.production
```

Then deploy:
```bash
vercel
# Follow the prompts:
# - Set up and deploy: Yes
# - Which scope: Select your account
# - Link to existing project: No
# - Project name: agri-project-frontend
# - Directory: ./
# - Override settings: No

# For production:
vercel --prod
```

## Verify Deployment

### Test Backend
```bash
curl https://your-backend-url.vercel.app/health
```

Expected response:
```json
{
  "status": "✅ Server is running",
  "timestamp": "2026-02-26T...",
  "apiKey": "✅ Set"
}
```

### Test Frontend
1. Open your frontend URL in a browser
2. Check that the dashboard loads correctly
3. Open the chatbot and send a test message
4. Verify the chatbot responds (this confirms frontend-backend communication)

## Troubleshooting

### Backend Issues

1. **API Key Error**
   - Go to Vercel Dashboard → Your Backend Project → Settings → Environment Variables
   - Verify `OPENAI_API_KEY` is set correctly
   - Redeploy: Deployments tab → Click "Redeploy"

2. **500 Internal Server Error**
   - Check Function Logs in Vercel Dashboard
   - Verify all dependencies are in `package.json`

3. **CORS Errors**
   - Check that CORS is properly configured in `server.js`
   - Verify the frontend URL is allowed

### Frontend Issues

1. **Cannot Connect to Backend**
   - Verify `VITE_API_URL` is set correctly in environment variables
   - Make sure it points to your actual backend URL
   - Check browser console for CORS errors

2. **Build Fails**
   - Check build logs in Vercel Dashboard
   - Ensure all dependencies are listed in `package.json`
   - Try building locally: `npm run build`

3. **Environment Variable Not Working**
   - Remember: Vite env vars must start with `VITE_`
   - After changing env vars, redeploy the project

## Post-Deployment Checklist

- [ ] Backend health endpoint returns 200 OK
- [ ] Frontend loads without console errors
- [ ] Chatbot opens and accepts input
- [ ] Chatbot successfully communicates with backend (send test message)
- [ ] All sensor data displays correctly
- [ ] No CORS errors in browser console

## Updating Your Deployment

### For Backend Changes:
```bash
cd backend
git add .
git commit -m "Update backend"
git push origin main
```
Vercel will automatically redeploy if you have GitHub integration enabled.

### For Frontend Changes:
```bash
cd frontend
git add .
git commit -m "Update frontend"
git push origin main
```

## Environment Variables Summary

### Backend (.env)
```
OPENAI_API_KEY=your_gemini_api_key
NODE_ENV=production
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.vercel.app
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)

---

**Note**: Never commit `.env` files to Git. Always use `.env.example` files for documentation and set actual values in Vercel Dashboard.
