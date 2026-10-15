# Task 36 — JWT Authentication using Express.js and React

## Project Overview & Objectives
This project implements a secure, token-based authentication system using Express.js on the backend and React with Vite on the frontend. The objective of this assignment is to understand the fundamentals of JSON Web Tokens (JWT), password hashing using `bcryptjs`, protected routing with custom authentication middleware, and token persistence in the client browser.

---

## Technologies Used
- **Backend**:
  - Node.js & Express.js (REST API framework)
  - `jsonwebtoken` (JWT token generation & cryptographic verification)
  - `bcryptjs` (Salted password hashing and comparison)
  - `cors` (Cross-Origin Resource Sharing middleware)
  - `dotenv` (Environment variable configuration)
  - `nodemon` (Development server watcher)
- **Frontend**:
  - React 19 (Component-based user interface)
  - Vite (Fast development server and optimized build tool)
  - Native `fetch` API for HTTP communication
  - CSS3 (Clean, responsive layout)

---

## Project Structure
```text
Priti.Ahire_Task36/
├── backend/
│   ├── .env                  # Local environment configuration (gitignored)
│   ├── .env.example          # Environment variable template
│   ├── package.json          # Backend dependencies and scripts
│   ├── server.js             # Express API, in-memory store & auth routes
│   └── test-auth.js          # Automated HTTP test suite for auth endpoints
├── frontend/
│   ├── .env                  # Local frontend environment (gitignored)
│   ├── .env.example          # Frontend environment template
│   ├── index.html            # Vite entry point
│   ├── package.json          # Frontend dependencies and scripts
│   ├── vite.config.js        # Vite development server configuration
│   └── src/
│       ├── App.jsx           # Main React component (Forms, Token & Protected View)
│       ├── index.css         # Responsive styling
│       └── main.jsx          # React DOM root mounting
├── .gitignore                # Protects secrets, node_modules, and dist builds
└── README.md                 # Project documentation and verification report
```

---

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

---

## Environment Configuration

### Backend (`backend/.env`)
Create a `.env` file inside `backend/` based on `backend/.env.example`:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```
> [!IMPORTANT]
> The `JWT_SECRET` must remain strictly confidential and must never be committed to source control or exposed to the frontend.

### Frontend (`frontend/.env`)
Create a `.env` file inside `frontend/` based on `frontend/.env.example`:
```env
VITE_API_URL=http://localhost:5000
```

---

## Installation & Running Locally

### 1. Backend Setup
In a terminal, navigate to the `backend` directory:
```powershell
cd "D:\DYP DPU\MERN\Priti.Ahire_Task36\backend"
npm install
npm run dev
```
*The backend server will start on `http://localhost:5000`.*

### 2. Frontend Setup
In a second terminal, navigate to the `frontend` directory:
```powershell
cd "D:\DYP DPU\MERN\Priti.Ahire_Task36\frontend"
npm install
npm run dev
```
*The React application will be available at `http://localhost:5173`.*

---

## API Endpoints Documentation

| Method | Endpoint | Description | Auth Required | Expected Status Codes |
| :--- | :--- | :--- | :---: | :--- |
| `GET` | `/` | API Health Check | No | `200 OK` |
| `POST` | `/register` | Register new user with hashed password | No | `201 Created`, `400 Bad Request` |
| `POST` | `/login` | Authenticate user & issue signed JWT | No | `200 OK`, `400 Bad Request`, `401 Unauthorized` |
| `GET` | `/protected` | Retrieve confidential data | Yes (Bearer Token) | `200 OK`, `401 Unauthorized`, `403 Forbidden` |

---

## Authentication Flow

1. **Registration (`POST /register`)**:
   - The user submits `username` and `password`.
   - The backend checks for duplicate usernames in the in-memory array.
   - The password is salted and hashed using `bcrypt.hash(password, 10)` before storage.
   - The user record `{ id, username, password: hashedPassword }` is stored in RAM.
   - A `201 Created` status is returned without exposing the password or hash.

2. **Login (`POST /login`)**:
   - The user submits credentials.
   - The backend locates the user record and calls `bcrypt.compare(password, user.password)`.
   - On match, a JWT is signed with payload `{ id, username }`, `JWT_SECRET`, and an expiration time of `1h`.
   - The client receives `{ message: "Login successful", token }`.

3. **Protected Request (`GET /protected`)**:
   - The client includes the token in the HTTP request headers:
     `Authorization: Bearer <token>`
   - The `authenticateToken` middleware checks:
     - Is the header present? If missing $\rightarrow$ `401 Unauthorized`.
     - Is the token valid and unexpired via `jwt.verify()`? If invalid/expired $\rightarrow$ `403 Forbidden`.
   - If valid, the decoded user payload is attached to `req.user` and access is granted.

4. **Logout**:
   - The frontend clears the token from `localStorage` and resets the session state.

---

## Security Considerations

1. **Password Hashing**: Passwords are never stored in plaintext. `bcryptjs` adds a unique cryptographic salt and applies 10 hashing rounds to resist brute-force and dictionary attacks.
2. **JWT Secret Protection**: The signing secret is maintained exclusively in server-side environment variables and excluded from Git commits via `.gitignore`.
3. **Token Expiration**: Tokens are issued with a limited lifespan (`1h`) to reduce the impact of token interception.
4. **Token Storage Risks**: The assignment requires storing the token in `localStorage` for client-side state. Note that tokens stored in `localStorage` are accessible to scripts on the page and can be vulnerable to Cross-Site Scripting (XSS). In high-security production environments, `httpOnly` secure cookies are preferred.
5. **Generic Error Responses**: Failed login attempts return generic messages ("Invalid credentials") to prevent username enumeration.

---

## Known Constraints & Limitations

- **In-Memory Storage**: Per assignment requirements, user data is stored in a JavaScript in-memory array (`const users = []`) rather than a database (such as MongoDB). Consequently, **all registered users are cleared whenever the Node.js server process restarts**.
- **GitHub Pages Hosting Limitation**: GitHub Pages serves only static client-side files and cannot run the dynamic Node.js/Express backend runtime. The existing repository's deployment workflow for Task 33 remains active and untouched.

---

## Testing & Verification Checklist

*(Automated tests executed against live server on localhost:5000)*

| Test Case | Method & Endpoint | Payload / Header | Expected Status | Verified Result |
| :--- | :--- | :--- | :---: | :---: |
| 1. API Health Check | `GET /` | None | `200 OK` | **PASS (Verified)** |
| 2. Register Missing Fields | `POST /register` | `{}` | `400 Bad Request` | **PASS (Verified)** |
| 3. Register Whitespace Input | `POST /register` | `{ username: "   ", password: "   " }` | `400 Bad Request` | **PASS (Verified)** |
| 4. Register Valid User | `POST /register` | `{ username, password }` | `201 Created` | **PASS (Verified)** |
| 5. Register Duplicate Username | `POST /register` | Duplicate username (case-insensitive) | `400 Bad Request` | **PASS (Verified)** |
| 6. Login Missing Fields | `POST /login` | `{}` | `400 Bad Request` | **PASS (Verified)** |
| 7. Login Non-existent User | `POST /login` | Unknown username | `401 Unauthorized` | **PASS (Verified)** |
| 8. Login Incorrect Password | `POST /login` | Wrong password | `401 Unauthorized` | **PASS (Verified)** |
| 9. Login Valid Credentials | `POST /login` | Correct credentials | `200 OK` + Signed JWT | **PASS (Verified)** |
| 10. Protected Without Token | `GET /protected` | Missing Authorization Header | `401 Unauthorized` | **PASS (Verified)** |
| 11. Protected Malformed Token | `GET /protected` | `Bearer fake.invalid.jwt` | `403 Forbidden` | **PASS (Verified)** |
| 12. Protected Expired Token | `GET /protected` | `Bearer <expired_jwt>` | `403 Forbidden` | **PASS (Verified)** |
| 13. Protected Valid Token | `GET /protected` | `Bearer <valid_jwt>` | `200 OK` + Decoded User | **PASS (Verified)** |
| 14. Frontend Production Build | `npm run build` | Frontend directory | Exit code `0` | **PASS (Verified - 0 errors)** |
