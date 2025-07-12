# NLW Agents - Server

Backend API server for the NLW Agents project, built with modern Node.js technologies.

## 🛠️ Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Fastify
- **Database**: PostgreSQL with pgvector extension
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **AI Integration**: Google Gemini AI
- **Code Quality**: Biome (linter & formatter)
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── db/           # Database schema and migrations
├── http/         # API routes
├── services/     # Business logic services
├── env.ts        # Environment configuration
└── server.ts     # Application entry point
```

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Google Gemini API key

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
GEMINI_API_KEY=your_gemini_api_key_here
```

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the database:

```bash
docker-compose up -d
```

3. Run database migrations:

```bash
npm run db:migrate
```

4. (Optional) Seed the database:

```bash
npm run db:seed
```

5. Start the development server:

```bash
npm run dev
```

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data

## 🔧 Development

The server runs on `http://localhost:3333` by default. The API includes:

- Room management (create, list)
- Question handling (create, list by room)
- Audio upload and processing
- AI-powered responses via Gemini

## 🗄️ Database

Uses PostgreSQL with pgvector extension for vector operations. Database schema is managed through Drizzle ORM with automatic migrations.
