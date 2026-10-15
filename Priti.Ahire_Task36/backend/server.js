require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Fail safely if JWT_SECRET is not configured
if (!JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is missing from .env');
  process.exit(1);
}

// Core Middleware
app.use(cors());
app.use(express.json());

// In-Memory User Store (per assignment requirements: in-memory array, no MongoDB)
// User format: { id: string, username: string, password: hashedPassword }
const users = [];

// 1. Health-check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Task 36 Auth Server Running' });
});

// 2. User Registration
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body || {};

    // Input validation: ensure presence and non-whitespace
    if (
      !username ||
      !password ||
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !password.trim()
    ) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const trimmedUsername = username.trim();

    // Check for duplicate username (case-insensitive)
    const existingUser = users.find(
      (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase()
    );
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password securely with 10 salt rounds
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save to in-memory array
    const newUser = {
      id: Date.now().toString(),
      username: trimmedUsername,
      password: hashedPassword
    };
    users.push(newUser);

    // Respond with 201 Created (never return the password or hash)
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error during registration' });
  }
});

// 3. User Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};

    // Input validation
    if (
      !username ||
      !password ||
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !password.trim()
    ) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const trimmedUsername = username.trim();

    // Locate user in in-memory array
    const user = users.find(
      (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase()
    );
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify submitted password against stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Sign a JWT with 1 hour expiration
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error during login' });
  }
});

// 4. Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Format must be: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decodedUser;
    next();
  });
}

// 5. Protected Route
app.get('/protected', authenticateToken, (req, res) => {
  return res.status(200).json({
    message: 'Protected data accessed successfully',
    user: req.user,
    secretData: 'Confidential data accessible only with a valid JWT.',
    timestamp: new Date().toISOString()
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Task 36 backend server running on http://localhost:${PORT}`);
});

module.exports = { app, server, users };
