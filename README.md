# 🧠 ThinkBoard

A simple and elegant **MERN stack** notes app to capture your thoughts — with rate limiting, theming, and a modern UI.

---

## 🏗️ Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React + Vite | Single Page Application (SPA) |
| **Backend** | Node.js + Express | REST API Server |
| **Database** | MongoDB (Mongoose) | NoSQL Document Database |
| **Rate Limiting** | Upstash Redis | API rate limiting (sliding window) |

> Frontend and Backend are **separate projects** with their own `package.json`. During development, Vite proxies `/api` requests to the Express backend on port `5001`.

---

## ⚛️ Frontend Tech Stack

### Core

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.1.0 | UI library (React 19) |
| `react-dom` | ^19.1.0 | React DOM renderer |
| `vite` | ^6.3.5 | Build tool & dev server (Vite 6) |
| `@vitejs/plugin-react` | ^4.4.1 | Vite plugin for React (Fast Refresh, JSX) |

### Styling

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^3.4.19 | Utility-first CSS framework (v3) |
| `daisyui` | ^4.12.24 | Tailwind component library (v4) |
| `autoprefixer` | ^10.4.27 | PostCSS vendor prefixes |
| `postcss` | ^8.5.8 | CSS transformation tool |

> **Theme**: DaisyUI `forest` (primary) and `halloween` (alternate), set via `data-theme` on `<html>`.

### Routing, HTTP & UI

| Package | Version | Purpose |
|---------|---------|---------|
| `react-router` | ^7.13.1 | Client-side routing (v7) |
| `axios` | ^1.13.6 | HTTP client for API calls |
| `lucide-react` | ^0.577.0 | SVG icon library |
| `react-hot-toast` | ^2.6.0 | Toast notification system |

### Linting

| Package | Version | Purpose |
|---------|---------|---------|
| `eslint` | ^9.25.0 | JavaScript linter (v9 flat config) |
| `eslint-plugin-react-hooks` | ^5.2.0 | React Hooks rules |
| `eslint-plugin-react-refresh` | ^0.4.19 | React Fast Refresh rules |

---

## 🖥️ Backend Tech Stack

### Core

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.18.2 | Web framework for REST API |
| `mongoose` | ^8.14.3 | MongoDB ODM |
| `dotenv` | ^16.5.0 | Load `.env` variables |

### Rate Limiting

| Package | Version | Purpose |
|---------|---------|---------|
| `@upstash/ratelimit` | ^2.0.5 | Sliding window rate limiter (5 req / 20s) |
| `@upstash/redis` | ^1.34.9 | Serverless Redis client |

### Dev Tools

| Package | Version | Purpose |
|---------|---------|---------|
| `nodemon` | ^3.1.14 | Auto-restart on file changes |

---

## 📁 Folder Structure

```
MERN_ThinkBoard/
├── README.md
├── Backend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── server.js                 # Express entry point
│       ├── config/
│       │   ├── db.js                 # MongoDB connection
│       │   └── upstash.js            # Upstash Redis + Ratelimit setup
│       ├── controllers/
│       │   └── notesControllers.js   # CRUD logic
│       ├── middleware/
│       │   └── rateLimiter.js        # Rate limiting middleware
│       ├── models/
│       │   └── Note.js               # Mongoose schema (title, content, timestamps)
│       └── routes/
│           └── notesRoutes.js        # Express router
│
├── Frontend/
│   ├── index.html                    # HTML entry (data-theme="forest")
│   ├── package.json
│   ├── vite.config.js                # Vite + API proxy config
│   ├── tailwind.config.js            # Tailwind + DaisyUI config
│   ├── postcss.config.js
│   ├── eslint.config.js
│   └── src/
│       ├── main.jsx                  # BrowserRouter, Toaster, StrictMode
│       ├── App.jsx                   # Root component with Routes
│       ├── index.css                 # Global styles + Tailwind directives
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── NoteCard.jsx
│       └── pages/
│           ├── HomePage.jsx          # List all notes
│           ├── CreatePage.jsx        # Create new note
│           └── NoteDetailPage.jsx    # View/edit single note
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notes` | Fetch all notes (newest first) |
| `GET` | `/api/notes/:id` | Fetch a single note |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id` | Update a note |
| `DELETE` | `/api/notes/:id` | Delete a note |

---

## ⚙️ Environment Variables

Create a `.env` file inside `Backend/`:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

---

## 🚀 Getting Started

### 1. Backend

```bash
cd Backend
npm install
npm run dev        # Starts with nodemon on port 5001
```

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev        # Starts Vite dev server (proxies /api to backend)
```

---

## 📜 NPM Scripts

### Frontend
| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start dev server with HMR |
| `build` | `vite build` | Production build |
| `lint` | `eslint .` | Run ESLint |
| `preview` | `vite preview` | Preview production build |

### Backend
| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nodemon src/server.js` | Dev server with auto-restart |
| `start` | `node src/server.js` | Production server |

---

## 🛠️ Key Configurations

- **Module System**: ES Modules (`"type": "module"`) in both frontend and backend
- **Vite Proxy**: `/api` → `http://localhost:5001` (dev only)
- **DaisyUI Themes**: `forest`, `halloween`
- **Rate Limiter**: 5 requests per 20 seconds (sliding window)
- **ESLint**: Flat config (v9) with React Hooks + React Refresh plugins

---

**Made by Yash Sejani** ✨
