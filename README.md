# Product Catalog Website

Full-stack product catalog application with React frontend and Express backend.
<a href="https://productcatalogwebsite-4.onrender.com/">
<img width="1382" height="638" alt="Screenshot 2026-03-02 at 10 46 50 PM" src="https://github.com/user-attachments/assets/f3e36765-f157-4272-83f9-c68b7dc1a603" />
</a>

Live version: <a href="https://productcatalogwebsite-4.onrender.com/"> HERE </a>

## Project Structure

```
├── .env                    # Environment variables (not committed)
├── .env.example           # Example environment configuration
├── backend/               # Express API server
└── frontend/              # React + Vite application
```

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your MongoDB connection string

3. Install all dependencies:
   ```bash
   npm run install:all
   ```

## Development

**Option 1 - Run both services concurrently:**
```bash
npm run dev
```
Frontend: `http://localhost:5173`  
Backend: `http://localhost:3000`

**Option 2 - Run separately:**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

## Production Build & Test

```bash
npm run build    # Builds frontend
npm start        # Serves both on port 3000
```

Visit `http://localhost:3000`

Visit `http://localhost:3000`

## Deployment (Render)

### Setup Steps:
1. Push code to GitHub
2. Create new **Web Service** on Render
3. Connect your repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables** (from `.env.example`):
     - `MONGODB_URI` - Your MongoDB connection string
     - `PORT` - 3000 (or leave blank for Render default)
     - `NODE_ENV` - production
     - `VITE_API_URL` - /api

The backend will serve both the API (`/api/*`) and static frontend files.
