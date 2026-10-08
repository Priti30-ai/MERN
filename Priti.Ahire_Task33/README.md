# TaskFlow

**Plan it. Track it. Finish it.**

TaskFlow is a full-stack MERN productivity application for managing daily tasks with persistent MongoDB storage.

## Features

- Create, view, edit, complete, reactivate, and delete tasks
- Search tasks by title or description
- Filter tasks by all, active, or completed status
- Dashboard statistics based on the current task list
- Responsive interface with loading, error, and empty states
- MongoDB Atlas persistence

## Tech Stack

- React, Vite, JavaScript, Axios, CSS
- Node.js, Express.js, Mongoose
- MongoDB Atlas
- GitHub Actions and GitHub Pages (frontend hosting)

## Architecture

```text
React Frontend
      ↓
     Axios
      ↓
 Express REST API
      ↓
   Mongoose
      ↓
 MongoDB Atlas
```

The backend is a separate service. GitHub Pages hosts only the static frontend; it does not run Express or connect directly to MongoDB.

## Project Structure

```text
Priti.Ahire_Task33/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    ├── .env.example
    ├── package.json
    └── vite.config.js
```

## Local Development

### Backend

Create `backend/.env` using the variables below, then start the API:

```bash
cd backend
npm install
npm start
```

The backend listens on `http://localhost:5000` by default.

### Frontend

Create `frontend/.env` using the variables below, then start Vite:

```bash
cd frontend
npm install
npm run dev
```

The development frontend is available at `http://localhost:5173`.

## Environment Variables

Create local `.env` files from the corresponding `.env.example` files. `.env` files can contain private connection information and must never be committed.

### `backend/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Use the connection string from your MongoDB Atlas cluster. Create a database user and allow the backend host in Atlas Network Access.

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

The frontend uses this variable for the REST API URL. In local development, it defaults to `http://localhost:5000/api`.

## API

The Express backend exposes:

- `GET /api/health`
- `GET /api/todos`
- `POST /api/todos`
- `GET /api/todos/:id`
- `PUT /api/todos/:id`
- `PATCH /api/todos/:id/status`
- `DELETE /api/todos/:id`

The list endpoint supports `search` and `status` query parameters.

## GitHub Pages Deployment

The repository has one Pages workflow at `.github/workflows/deploy.yml`. Pushes to `main` and manual workflow dispatch build the frontend from `Priti.Ahire_Task33/frontend` and publish only `Priti.Ahire_Task33/frontend/dist` through GitHub Actions. The previous shared Pages artifact (Task 30 plus Task 32 documentation) is replaced by TaskFlow; those project source files remain in the repository.

In the GitHub repository, select **Settings → Pages → Build and deployment → Source: GitHub Actions**. No `gh-pages` branch is used.

The Vite base is `/`, which supports a root-hosted site and a future custom domain. No custom domain or live URL is configured in this project.

GitHub Pages serves only static files. The backend must be deployed separately before the hosted frontend can use the full Todo API. When a backend URL is available, add a repository Actions variable named `VITE_API_URL` containing its API base URL, for example `https://your-api-host.example/api`. The deployment workflow passes that variable into the Vite build. If it is not configured, the production app uses the same-origin `/api` path rather than pointing at a developer's localhost.

To use a custom domain later:

1. Add the domain in the repository's **Settings → Pages → Custom domain** field.
2. Configure the DNS records required by GitHub Pages for the chosen domain type.
3. Wait for DNS verification and enable HTTPS in Pages settings when available.

Do not add a `CNAME` file until an actual domain has been chosen. No deployment is claimed until the GitHub Actions Pages deployment succeeds.

## Checks

Run the frontend checks before publishing:

```bash
cd frontend
npm run lint
npm run build
```

For API development, start MongoDB Atlas access and the backend, then test the endpoints with a REST client or `curl`.
