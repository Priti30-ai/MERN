# Task 33 - TaskFlow MERN Application

**Plan it. Track it. Finish it.**

TaskFlow is a full-stack MERN (MongoDB, Express, React, Node.js) task management application deployed across modern cloud services:
- **Frontend**: React + Vite on GitHub Pages
- **Backend**: Node.js + Express on Render Web Service
- **Database**: MongoDB Atlas cloud cluster

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
- **Database**: MongoDB Atlas
- **Cloud Hosting**:
  - Frontend: GitHub Pages (`https://priti30-ai.github.io/MERN/`)
  - Backend: Render Web Service (`taskflow-api`)

## Architecture

```text
GitHub Pages React Frontend (Vite)
              ↓
            Axios
              ↓
  Render Express API (Node.js)
              ↓
           Mongoose
              ↓
        MongoDB Atlas
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

## Local Development & Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Priti.Ahire_Task33/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env` from `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   FRONTEND_URL=https://priti30-ai.github.io
   ```
4. Start the backend:
   ```bash
   npm start
   ```
   The backend runs on `http://localhost:5000`.

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Priti.Ahire_Task33/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env` from `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

## Deployment Guide

### 1. MongoDB Atlas Configuration
1. In your MongoDB Atlas cluster dashboard, navigate to **Network Access**.
2. Add an IP Access List Entry allowing `0.0.0.0/0` (Allow access from anywhere) so Render can connect to your cluster.
3. In **Database Access**, verify your database user has read/write privileges.
4. Obtain your Atlas connection string:
   `mongodb+srv://<username>:<password>@<cluster-url>/task33_db?retryWrites=true&w=majority`

### 2. Render Backend Web Service
1. Connect your GitHub repository `https://github.com/Priti30-ai/MERN.git` on [Render](https://render.com).
2. Create a **New Web Service** pointing to the repository (or select from Blueprint via `render.yaml`).
3. Set the service properties:
   - **Root Directory**: `Priti.Ahire_Task33/backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In the **Environment Variables** tab, add:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `<Your MongoDB Atlas connection string>`
   - `FRONTEND_URL`: `https://priti30-ai.github.io`
5. Deploy the service and verify `https://<your-render-service>.onrender.com/api/health`.

### 3. GitHub Pages Frontend Deployment
1. Copy your deployed Render backend API URL (format: `https://<your-render-service>.onrender.com/api`).
2. In your GitHub repository:
   - Go to **Settings** → **Secrets and variables** → **Actions** → **Variables**.
   - Create or update the repository variable `VITE_API_URL` with your Render API URL (e.g. `https://<your-render-service>.onrender.com/api`).
3. Trigger the deployment workflow (`.github/workflows/deploy.yml`) under **Actions** tab by pushing to `main` or via **Run workflow**.
4. Access the live frontend application at:
   `https://priti30-ai.github.io/MERN/`
