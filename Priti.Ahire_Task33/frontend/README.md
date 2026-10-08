# TaskFlow Frontend

React and Vite single-page application for TaskFlow. The frontend calls the Express API through Axios.

## Local Development

Set `VITE_API_URL` in `.env` if the API is not running at the default local address:

```env
VITE_API_URL=http://localhost:5000/api
```

Install dependencies and start Vite:

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## GitHub Pages

The repository-level workflow builds this frontend and publishes `dist/` with GitHub Pages Actions. Set the repository Actions variable `VITE_API_URL` to the separately hosted backend API base URL when one is available. Pages only hosts static frontend files; it does not run the backend.
