# NLW Agents

An AI-powered application that allows users to create rooms, record audio questions, and receive AI-generated responses using Google Gemini.

## 📁 Project Structure

```
agents/
├── server/     # Backend API (Fastify + PostgreSQL)
└── web/        # Frontend (React + Vite)
```

## 🛠️ Tech Stack

### Backend (`/server`)

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL with pgvector
- **ORM**: Drizzle ORM
- **AI**: Google Gemini API
- **Validation**: Zod

### Frontend (`/web`)

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Google Gemini API key

### Backend Setup

```bash
cd server
npm install
# Create .env file with DATABASE_URL and GEMINI_API_KEY
docker-compose up -d
npm run db:migrate
npm run dev
```

### Frontend Setup

```bash
cd web
npm install
npm run dev
```

## 🎯 Features

- **Room Management**: Create and manage conversation rooms
- **Audio Recording**: Record audio questions directly in the browser
- **AI Responses**: Get intelligent responses from Google Gemini AI
- **Real-time Interface**: Modern React-based user interface
- **Type Safety**: Full TypeScript support across the stack

## 🔧 Development

- Backend runs on `http://localhost:3333`
- Frontend runs on `http://localhost:5173`
- Database runs on `localhost:5432`

Both projects use Biome for code formatting and linting.
