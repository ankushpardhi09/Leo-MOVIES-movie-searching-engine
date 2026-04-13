# Movie Search Engine

Movie Search Engine is a full-stack web application inspired by IMDb-style discovery.
It lets users search movies, view detailed information, apply filters, and use authentication/watchlist features.

## Features

- Search movies by title keyword
- Auto-suggestions while typing
- Movie details page (plot, cast, rating, metadata)
- Filter endpoints (genres and years)
- User authentication (sign up, sign in, get profile)
- Watchlist support in frontend

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- External API: OMDb API

## Packages Used

### Root package.json

- dependencies
- lucide-react@^1.7.0
- devDependencies
- concurrently@^8.2.0

### backend/package.json

- dependencies
- axios@^1.7.2
- bcryptjs@^2.4.3
- cors@^2.8.5
- dotenv@^16.4.5
- express@^4.19.2
- express-rate-limit@^8.3.1
- jsonwebtoken@^9.0.0
- mongoose@^8.5.1
- devDependencies
- nodemon@^3.1.4

### frontend/package.json

- dependencies
- axios@^1.7.2
- react@^18.3.1
- react-dom@^18.3.1
- react-router-dom@^6.24.1
- devDependencies
- @types/react@^18.3.3
- @types/react-dom@^18.3.0
- @vitejs/plugin-react@^4.3.1
- autoprefixer@^10.4.19
- eslint@^8.57.0
- eslint-plugin-react@^7.34.3
- eslint-plugin-react-hooks@^4.6.2
- eslint-plugin-react-refresh@^0.4.7
- postcss@^8.4.39
- tailwindcss@^3.4.6
- vite@^5.3.3

## Package Commands (Name and Use)

Use these commands if you want to install packages manually by folder.

## Project Flow 

+-------------------+
|      User         |
+-------------------+
          |
          v
+-------------------+
|   Frontend (React)|
|  UI Interaction   |
+-------------------+
          |
          v
+-------------------+
| API Calls (Axios) |
+-------------------+
          |
          v
+---------------------------+
|   Backend (Node/Express)  |
+---------------------------+
   |        |         |
   v        v         v
+--------+ +--------+ +--------+
| Movies | | Auth   | |Filters |
| Routes | | Routes | | Routes |
+--------+ +--------+ +--------+
     |         |         |
     v         v         v
+----------------------------------+
| Controllers (Business Logic)     |
+----------------------------------+
          |
          v
+----------------------------------+
| Services (OMDb API + Cache)      |
+----------------------------------+
          |
          v
+-------------------+
| External OMDb API |
+-------------------+
          |
          v
+-------------------+
| MongoDB Database  |
| (Cache + Users)   |
+-------------------+
          |
          v
+-------------------+
| Backend Response  |
+-------------------+
          |
          v
+-------------------+
| Frontend Display  |
| (UI Update)       |
+-------------------+
          |
          v
+-------------------+
| Watchlist (Local) |
|  localStorage     |
+-------------------+

### Root packages

Install command:

```bash
npm install lucide-react
npm install -D concurrently
```

Names and use:

- lucide-react: icon library for React UI icons
- concurrently: run backend and frontend scripts in one terminal command

### Backend packages

Go to backend:

```bash
cd backend
```

Install command:

```bash
npm install axios bcryptjs cors dotenv express express-rate-limit jsonwebtoken mongoose
npm install -D nodemon
```

Names and use:

- axios: HTTP client for calling OMDb API
- bcryptjs: hash and verify user passwords
- cors: allow frontend origin to call backend API
- dotenv: load environment variables from .env
- express: backend server framework
- express-rate-limit: protect APIs from request abuse
- jsonwebtoken: create and verify JWT auth tokens
- mongoose: MongoDB object modeling and connection
- nodemon: auto-restart backend server during development

### Frontend packages

Go to frontend:

```bash
cd frontend
```

Install command:

```bash
npm install axios react react-dom react-router-dom
npm install -D @types/react @types/react-dom @vitejs/plugin-react autoprefixer eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh postcss tailwindcss vite
```

Names and use:

- axios: API calls from React app to backend
- react: UI library
- react-dom: render React app in browser DOM
- react-router-dom: page routing/navigation in frontend
- @types/react: TypeScript types for React tooling
- @types/react-dom: TypeScript types for React DOM tooling
- @vitejs/plugin-react: Vite plugin for React and fast refresh
- autoprefixer: add vendor prefixes to CSS
- eslint: linting for code quality
- eslint-plugin-react: React-specific lint rules
- eslint-plugin-react-hooks: lint rules for React hooks
- eslint-plugin-react-refresh: lint support for fast refresh patterns
- postcss: CSS transform pipeline
- tailwindcss: utility-first CSS framework
- vite: frontend build tool and dev server

### Install all at once (recommended)

From project root:

```bash
npm run install-all
```

## Project Structure

```text
movie-search-engine/
	backend/          # Express API + MongoDB integration
	frontend/         # React app (Vite)
	start.bat         # Interactive startup script (Windows)
	start.sh          # Interactive startup script (Linux/macOS)
	start-separate.bat# Opens backend/frontend in separate terminals (Windows)
```

## Prerequisites

Install these on any device where you want to run the project:

- Node.js 18+ (Node.js 20 LTS recommended)
- npm 9+
- MongoDB (local service) OR MongoDB Atlas connection string
- OMDb API key (from http://www.omdbapi.com/apikey.aspx)

## Environment Variables

### backend/.env

Use this format in backend/.env:

```env
PORT=5000
JWT_SECRET=replace-with-strong-secret
MONGODB_URI=mongodb://localhost:27017/movie-search-engine
OMDB_API_KEY=replace-with-your-omdb-key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### frontend/.env

Use this format in frontend/.env:

```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Connection

Backend reads MongoDB connection string from MONGODB_URI in backend/.env.

Default local connection:

```env
MONGODB_URI=mongodb://localhost:27017/movie-search-engine
```

MongoDB Atlas connection example:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/movie-search-engine?retryWrites=true&w=majority
```

Connection code location:

- backend/config/db.js

Quick check after starting backend:

- Terminal should print: MongoDB connected: <host>
- API health endpoint should work: http://localhost:5000/health

If local MongoDB is not running, start it first.
On Windows (service install):

```powershell
net start MongoDB
```

Then run app:

```bash
npm run dev
```

## First-Time Setup (Current Device)

From project root:

```bash
npm run install-all
```

This installs:

- root dependencies
- backend dependencies
- frontend dependencies

## Run the Project

### Option 1: Combined mode (recommended)

```bash
npm run dev
```

Runs backend and frontend together in one terminal.

### Option 2: Separate terminals (Windows)

```bash
npm run dev:separate
```

or

```bat
start-separate.bat
```

### Option 3: Backend only

```bash
npm run dev:backend
```

### Option 4: Frontend only

```bash
npm run dev:frontend
```

### Interactive launcher scripts

Windows:

```bat
start.bat
```

Linux/macOS:

```bash
chmod +x start.sh
./start.sh
```

## URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

## Build for Production (Frontend)

```bash
cd frontend
npm run build
npm run preview
```

## How to Move and Run on Another Device (Portable Guide)

Follow these exact steps on the new device.

### 1. Copy or clone the project

Using Git:

```bash
git clone <your-repository-url>
cd movie-search-engine
```

Or copy the project folder manually (ZIP/USB/cloud), then open it in terminal.

### 2. Install software requirements

- Install Node.js
- Install MongoDB (or prepare Atlas URI)

Verify:

```bash
node -v
npm -v
```

### 3. Install dependencies

```bash
npm run install-all
```

### 4. Configure environment variables

Create/update:

- backend/.env
- frontend/.env

Use the templates from the Environment Variables section above.

### 5. Start MongoDB

If using local MongoDB, ensure the MongoDB service is running before starting backend.

### 6. Start app

```bash
npm run dev
```

### 7. Open app

Go to:

- http://localhost:3000

## Useful Commands

From project root:

```bash
npm run dev
npm run dev:backend
npm run dev:frontend
npm run dev:separate
npm run start
npm run install-all
```

Backend only:

```bash
cd backend
npm run dev
npm start
```

Frontend only:

```bash
cd frontend
npm run dev
npm run build
npm run preview
npm run lint
```

## Troubleshooting

### Port already in use

- Change PORT in backend/.env
- Update frontend/.env VITE_API_URL to match backend port

### CORS error

- Set FRONTEND_URL in backend/.env to your frontend URL
- Restart backend server

### MongoDB connection error

- Ensure MongoDB is running
- Verify MONGODB_URI is correct

### OMDb request fails

- Check OMDB_API_KEY in backend/.env
- Confirm key is active and valid

## Notes

- Do not commit real secrets in .env files.
- Use different secrets/keys for production.
