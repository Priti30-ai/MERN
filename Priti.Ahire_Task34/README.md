# Schema Reference

A beginner-friendly MERN app that demonstrates how one Mongoose schema can reference another using a MongoDB ObjectId.

## Objective

This project shows the relationship:

User
↑
│ referenced by ObjectId
│
Post

The `Post` document stores a `user` field that refers to a `User` document. The backend uses Mongoose `populate()` to return the full user information when fetching posts.

## Technologies Used

- MongoDB
- Express.js
- Mongoose
- React
- Vite
- Node.js
- Axios
- CSS

## Project Structure

```text
Priti.Ahire_Task34/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── postRoutes.js
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── tests/
│       └── api.test.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserForm.jsx
│   │   │   ├── PostForm.jsx
│   │   │   └── PostList.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── vite.config.js
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── README.md
└── .env.example
```

## MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas.
2. Create a database and note the connection string.
3. Keep the connection string in a local `.env` file. Do not add real credentials to the repository.
4. Example local MongoDB connection:

```env
MONGO_URI=mongodb://127.0.0.1:27017/schema-reference
```

For Atlas, use the exact connection string provided in MongoDB Atlas and store it in Render or your local `.env` file only.

## Environment Variables

At the backend root, create a `.env` file based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/schema-reference
```

Frontend environment variables:

```env
VITE_API_URL=http://localhost:5000/api
# For production deployment, set VITE_API_URL to your deployed backend URL, e.g.:
# VITE_API_URL=https://your-render-backend.onrender.com/api
```

## Backend Installation

```bash
cd Priti.Ahire_Task34/backend
npm install
cp .env.example .env
```

Update `.env` with your MongoDB URI.

## Frontend Installation

```bash
cd Priti.Ahire_Task34/frontend
npm install
cp .env.example .env
```

## How to Run the Project

Start MongoDB first.

### Backend

```bash
cd Priti.Ahire_Task34/backend
npm run dev
```

The backend runs at:

```text
http://localhost:5000
```

### Frontend

```bash
cd Priti.Ahire_Task34/frontend
npm run dev -- --host 0.0.0.0
```

The frontend runs at:

```text
http://localhost:5173
```

## API Endpoints

### User endpoints

- `POST /api/users` — create a user
- `GET /api/users` — list users

### Post endpoints

- `POST /api/posts` — create a post linked to a user
- `GET /api/posts` — fetch all posts with populated user details

## Example Request Bodies

### Create user

```json
{
  "name": "Priti",
  "email": "priti@example.com"
}
```

### Create post

```json
{
  "title": "My First Post",
  "content": "Learning MongoDB schema references",
  "user": "USER_OBJECT_ID"
}
```

## How the Relationship Works

The User and Post models are connected by ObjectId in the Post model:

```js
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
```

This means each post stores only the related user ID, not the full user object. The database can then resolve that reference to the actual user document when needed.

## How Mongoose populate() Works

`populate()` tells Mongoose to replace a stored ObjectId with the corresponding document from the referenced model.

```js
Post.find().populate('user', 'name email')
```

This returns each post with the actual user data, such as name and email, instead of showing a raw ObjectId only.

## Screenshots

Add screenshots here when the app is run locally or deployed.

## Deployment Instructions

1. Deploy the backend to a Node hosting service such as Render.
2. Deploy the frontend to a static hosting service or Vite-compatible platform.
3. Set environment variables in the deployment environment.
4. Update the frontend API URL to point to the deployed backend API.
5. Keep MongoDB credentials in environment variables only.

## Notes

- `.env` files are ignored by Git.
- No real credentials are included in this repository.
- This app is designed to demonstrate schema referencing and Mongoose population clearly.
