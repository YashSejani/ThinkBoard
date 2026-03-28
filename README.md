# ThinkBoard

A modern, full-stack **MERN** notes application for capturing your thoughts — featuring rate limiting, theming, and a clean responsive UI. Fully containerized with Docker for easy deployment.

---

## Table of Contents

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Option 1 — Run with Docker (Recommended)](#option-1--run-with-docker-recommended)
  - [Option 2 — Run Locally (Development)](#option-2--run-locally-development)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend-tech-stack)
  - [Backend](#backend-tech-stack)
- [Project Structure](#project-structure)
- [NPM Scripts](#npm-scripts)
- [Key Configurations](#key-configurations)
- [License](#license)

---

## Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React + Vite | Single Page Application (SPA) |
| **Backend** | Node.js + Express | REST API Server |
| **Database** | MongoDB (Mongoose) | NoSQL Document Database |
| **Rate Limiting** | Upstash Redis | API rate limiting (sliding window) |
| **Reverse Proxy** | Nginx | Serves frontend & proxies API requests |
| **Containerization** | Docker + Docker Compose | Multi-container orchestration |

> Frontend and Backend are **separate projects** with their own `package.json`. In production, Nginx serves the React build and proxies `/api` requests to the Express backend. In development, Vite handles the proxy instead.

---

## Prerequisites

Before setting up ThinkBoard, ensure the following tools are installed on your system:

### For Docker Setup (Recommended)

| Tool | Version | Installation |
|------|---------|-------------|
| **Docker** | 20.10+ | [docs.docker.com/get-docker](https://docs.docker.com/get-docker/) |
| **Docker Compose** | v2.0+ | Included with Docker Desktop |
| **Git** | 2.30+ | [git-scm.com](https://git-scm.com/) |

### For Local Development

| Tool | Version | Installation |
|------|---------|-------------|
| **Node.js** | 18.x or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x or higher | Included with Node.js |
| **Git** | 2.30+ | [git-scm.com](https://git-scm.com/) |

### External Services (Required for Both)

| Service | Purpose | Sign Up |
|---------|---------|---------|
| **MongoDB Atlas** | Cloud database | [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **Upstash Redis** | Rate limiting | [upstash.com](https://upstash.com/) |

---

## Getting Started

### Option 1 — Run with Docker (Recommended)

The fastest way to get ThinkBoard running. No need to install Node.js or npm.

**1. Clone the repository**

```bash
git clone https://github.com/YashSejworker/ThinkBoard.git
cd ThinkBoard
```

**2. Set up environment variables**

Create a `.env` file inside the `Backend/` directory:

```bash
touch Backend/.env
```

Add the following variables to `Backend/.env`:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

**3. Pull and start the containers**

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

**4. Open in browser**

Navigate to [http://localhost:3000](http://localhost:3000)

**5. Stop the application**

```bash
docker compose -f docker-compose.prod.yml down
```

#### Docker Commands Reference

| Command | Description |
|---------|-------------|
| `docker compose -f docker-compose.prod.yml pull` | Download latest images from Docker Hub |
| `docker compose -f docker-compose.prod.yml up -d` | Start all containers in background |
| `docker compose -f docker-compose.prod.yml down` | Stop and remove all containers |
| `docker compose -f docker-compose.prod.yml logs -f` | View live logs from all containers |
| `docker ps` | List running containers |

#### Build from Source with Docker

If you prefer to build the images yourself instead of pulling from Docker Hub:

```bash
docker compose up --build -d
```

This uses `docker-compose.yml` which builds directly from the local Dockerfiles.

---

### Option 2 — Run Locally (Development)

For active development with hot-reload enabled.

**1. Clone the repository**

```bash
git clone https://github.com/YashSejworker/ThinkBoard.git
cd ThinkBoard
```

**2. Set up environment variables**

Create a `.env` file inside the `Backend/` directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

**3. Start the Backend**

```bash
cd Backend
npm install
npm run dev
```

The API server will start on `http://localhost:5001`.

**4. Start the Frontend** (in a new terminal)

```bash
cd Frontend
npm install
npm run dev
```

The Vite dev server will start and proxy `/api` requests to the backend automatically.

---

## Environment Variables

All environment variables are stored in `Backend/.env`:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5001` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis endpoint | `https://your-instance.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis auth token | `AXxxxxxxxxxxxxxxxxxxxx` |

> **Note:** Never commit `.env` files to version control. The `.dockerignore` and `.gitignore` files are configured to exclude them.

---

## API Endpoints

All endpoints are prefixed with `/api/notes`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notes` | Fetch all notes (newest first) |
| `GET` | `/api/notes/:id` | Fetch a single note by ID |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id` | Update an existing note |
| `DELETE` | `/api/notes/:id` | Delete a note |

Rate limit: **5 requests per 20 seconds** per client (sliding window).

---

## Tech Stack

### Frontend Tech Stack

#### Core

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.1.0 | UI library (React 19) |
| `react-dom` | ^19.1.0 | React DOM renderer |
| `vite` | ^6.3.5 | Build tool & dev server |
| `@vitejs/plugin-react` | ^4.4.1 | Vite plugin for React (Fast Refresh, JSX) |

#### Styling

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^3.4.19 | Utility-first CSS framework |
| `daisyui` | ^4.12.24 | Tailwind component library |
| `autoprefixer` | ^10.4.27 | PostCSS vendor prefixes |
| `postcss` | ^8.5.8 | CSS transformation tool |

> **Theme**: DaisyUI `forest` (primary) and `halloween` (alternate), set via `data-theme` on `<html>`.

#### Routing, HTTP and UI

| Package | Version | Purpose |
|---------|---------|---------|
| `react-router` | ^7.13.1 | Client-side routing |
| `axios` | ^1.13.6 | HTTP client for API calls |
| `lucide-react` | ^0.577.0 | SVG icon library |
| `react-hot-toast` | ^2.6.0 | Toast notification system |

#### Linting

| Package | Version | Purpose |
|---------|---------|---------|
| `eslint` | ^9.25.0 | JavaScript linter (v9 flat config) |
| `eslint-plugin-react-hooks` | ^5.2.0 | React Hooks rules |
| `eslint-plugin-react-refresh` | ^0.4.19 | React Fast Refresh rules |

---

### Backend Tech Stack

#### Core

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.18.2 | Web framework for REST API |
| `mongoose` | ^8.14.3 | MongoDB ODM |
| `dotenv` | ^16.5.0 | Load `.env` variables |
| `cors` | ^2.8.6 | Cross-origin resource sharing |

#### Rate Limiting

| Package | Version | Purpose |
|---------|---------|---------|
| `@upstash/ratelimit` | ^2.0.5 | Sliding window rate limiter |
| `@upstash/redis` | ^1.34.9 | Serverless Redis client |

#### Dev Tools

| Package | Version | Purpose |
|---------|---------|---------|
| `nodemon` | ^3.1.14 | Auto-restart on file changes |

---

## Project Structure

```
ThinkBoard/
├── README.md
├── docker-compose.yml              # Dev: builds images from Dockerfiles
├── docker-compose.prod.yml         # Prod: pulls images from Docker Hub
│
├── Backend/
│   ├── Dockerfile                  # Node.js container configuration
│   ├── .dockerignore
│   ├── .env                        # Environment variables (not committed)
│   ├── package.json
│   └── src/
│       ├── server.js               # Express entry point
│       ├── config/
│       │   ├── db.js               # MongoDB connection
│       │   └── upstash.js          # Upstash Redis + Ratelimit setup
│       ├── controllers/
│       │   └── notesControllers.js # CRUD logic
│       ├── middleware/
│       │   └── rateLimiter.js      # Rate limiting middleware
│       ├── models/
│       │   └── Note.js             # Mongoose schema
│       └── routes/
│           └── notesRoutes.js      # Express router
│
└── Frontend/
    ├── Dockerfile                   # Multi-stage build (Node → Nginx)
    ├── .dockerignore
    ├── nginx.conf                   # Nginx reverse proxy configuration
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── eslint.config.js
    └── src/
        ├── main.jsx                 # App entry with Router and Toaster
        ├── App.jsx                  # Root component with Routes
        ├── index.css                # Global styles + Tailwind directives
        ├── components/
        │   ├── Navbar.jsx
        │   └── NoteCard.jsx
        └── pages/
            ├── HomePage.jsx         # List all notes
            ├── CreatePage.jsx       # Create new note
            └── NoteDetailPage.jsx   # View and edit a note
```

---

## NPM Scripts

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

## Key Configurations

- **Module System**: ES Modules (`"type": "module"`) in both frontend and backend
- **Vite Proxy**: `/api` → `http://localhost:5001` (development only)
- **Nginx Proxy**: `/api` → `http://backend:5001` (Docker production)
- **DaisyUI Themes**: `forest`, `halloween`
- **Rate Limiter**: 5 requests per 20 seconds (sliding window)
- **ESLint**: Flat config (v9) with React Hooks + React Refresh plugins

---

## Docker Images

Pre-built images are available on Docker Hub:

- [`yashsejani/thinkboard-backend`](https://hub.docker.com/r/yashsejani/thinkboard-backend)
- [`yashsejani/thinkboard-frontend`](https://hub.docker.com/r/yashsejani/thinkboard-frontend)

---

## License

ISC

**Made by Yash Sejani**
