# NLW Agents

Web application developed during Rocketseat's NLW (Next Level Week), focused on intelligent agents with audio and AI functionalities.

## 🚀 Technologies

- **React 19** - Library for building interfaces
- **TypeScript** - Typed programming language
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility CSS framework
- **React Router DOM** - Routing for React
- **TanStack Query** - State management and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **shadcn/ui** - Accessible components
- **Lucide React** - Icons
- **Day.js** - Date manipulation
- **Web Speech API** - Voice recognition
- **Biome** - Linter and formatter

## 📁 Project Structure

```
src/
├── components/     # Reusable components
│   └── ui/        # Base UI components
├── pages/         # Application pages
├── http/          # API hooks and types
│   └── types/     # TypeScript types
├── lib/           # Utilities and configurations
├── app.tsx        # Main component
└── main.tsx       # Entry point
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd web
```

2. Install dependencies

```bash
npm install
```

3. Run the project in development mode

```bash
npm run dev
```

4. Access `http://localhost:5173`

### Backend

The project requires a backend running on port `3333`. Make sure the backend server is running for the API functionalities to work correctly.

## 📜 Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Generates production build
- `npm run preview` - Previews production build

## 🎨 Project Patterns

- **Components**: Structure based on reusable components
- **Routing**: React Router for page navigation
- **Styling**: Tailwind CSS with utility classes
- **Typing**: TypeScript for type safety
- **Linting**: Biome for automatic formatting and linting
- **Aliases**: Path mapping with `@/` for clean imports
- **Forms**: React Hook Form with Zod validation
- **State**: TanStack Query for caching and synchronization
- **API**: Custom hooks for HTTP operations

## 🔧 Configurations

- **Vite**: Configured with React plugin and Tailwind CSS
- **TypeScript**: Strict mode enabled
- **Biome**: Configured with Ultracite preset
- **Path Mapping**: `@/` alias pointing to `./src/`
- **Query Client**: Configured for automatic cache invalidation
