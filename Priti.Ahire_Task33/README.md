# Task 33 - TaskFlow MERN Application

**Plan it. Track it. Finish it.**

TaskFlow is a full-stack MERN (MongoDB, Express, React, Node.js) application developed for Task 33 to manage tasks with persistent local MongoDB storage.

## Features

- Create tasks with a title and optional description
- View task list with status badges and creation date
- Edit task details (title, description)
- Toggle task status (active / completed)
- Delete tasks with confirmation
- Filter tasks by status (All, Active, Completed)
- Search tasks by title or description
- Task summary counters (Total, Active, Completed)
- Responsive UI with loading, error, and empty states

## Tech Stack

- **Frontend**: React 19, Vite, Axios, Vanilla CSS
- **Backend**: Node.js, Express.js, Mongoose, CORS, dotenv
- **Database**: Local MongoDB (`mongodb://127.0.0.1:27017/task33`)
- **Frontend Hosting**: GitHub Pages (`https://priti30-ai.github.io/MERN/`)

## Architecture

```text
React Frontend (Vite)
       ↓
     Axios
       ↓
 Express REST API (Node.js)
       ↓
    Mongoose
       ↓
  Local MongoDB
```

## Project Structure

```text
Priti.Ahire_Task33/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   └── notFoundMiddleware.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── services/
│   │   └── todoService.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── TodoFilters.jsx
    │   │   ├── TodoForm.jsx
    │   │   ├── TodoItem.jsx
    │   │   └── TodoList.jsx
    │   ├── services/
    │   │   └── todoApi.js
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Local Development & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally on port `27017`

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd Priti.Ahire_Task33/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration file from `.env.example`:
   ```bash
   copy .env.example .env
   ```
   Ensure `.env` contains:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/task33
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The backend API will run on `http://localhost:5000`.

### 2. Frontend Setup

1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd Priti.Ahire_Task33/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration file from `.env.example`:
   ```bash
   copy .env.example .env
   ```
   Ensure `.env` contains:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The React application will be available at `http://localhost:5173`.

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend health check |
| `GET` | `/api/todos` | Get all tasks (supports `?search=` and `?status=` query params) |
| `POST` | `/api/todos` | Create a new task (`title`, `description`) |
| `GET` | `/api/todos/:id` | Get a specific task by ID |
| `PUT` | `/api/todos/:id` | Update task title and description |
| `PATCH` | `/api/todos/:id/status` | Update task status (`completed`: boolean) |
| `DELETE` | `/api/todos/:id` | Delete a task |

## Validation & Verification

### Backend Verification
- Ensure local MongoDB service is running (`MongoDB Server` on `mongodb://127.0.0.1:27017/task33`).
- Start the server: `npm start` in `backend/`.
- Verify health check: `GET http://localhost:5000/api/health`.

### Frontend Verification
- Lint check: `npm run lint` in `frontend/`.
- Production build: `npm run build` in `frontend/`.
- Assets build correctly with `/MERN/` base path for GitHub Pages compatibility.

## GitHub Pages Deployment

- **GitHub Pages URL**: `https://priti30-ai.github.io/MERN/`
- **Workflow**: `.github/workflows/deploy.yml` builds `Priti.Ahire_Task33/frontend` and deploys the static build artifact (`dist/`) to GitHub Pages with the `/MERN/` base path.
- **Architectural Note & Limitation**: GitHub Pages is a static hosting provider and only hosts the static frontend application. It does not run Node.js/Express and cannot directly communicate with a local MongoDB database. To test full dynamic CRUD operations, run the Express backend and MongoDB locally.
