const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const DEFAULT_LOCAL_MONGO_URI = 'mongodb://127.0.0.1:27017/schema-reference';

function getMongoUri() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || DEFAULT_LOCAL_MONGO_URI;

  if (process.env.NODE_ENV === 'production' && !process.env.MONGO_URI && !process.env.MONGODB_URI) {
    throw new Error('MONGO_URI is required in production. Set it in the Render backend environment variables.');
  }

  return mongoUri;
}

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const productionFrontendOrigin = 'https://task34-frontend.onrender.com';
const localOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

const allowedOrigins = Array.from(
  new Set(
    [productionFrontendOrigin, process.env.FRONTEND_URL, process.env.CORS_ORIGIN, ...localOrigins]
      .flatMap((value) => (value ? value.split(',').map((item) => item.trim()).filter(Boolean) : []))
  )
);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());

app.get('/api/health', (req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;

  res.status(databaseReady ? 200 : 503).json({
    success: databaseReady,
    message: databaseReady ? 'Server and database are healthy.' : 'Server is running but the database is not ready.',
    database: {
      ready: databaseReady,
      state: mongoose.connection.readyState,
    },
  });
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
  });
});

app.use((error, req, res, next) => {
  console.error('Server error:', error.message);

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong on the server.';

  res.status(statusCode).json({
    success: false,
    message,
  });
});

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const mongoUri = getMongoUri();

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed. Check MONGO_URI configuration in the backend environment.');
    throw error;
  }
}

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Database initialization failed:', error.message);
      process.exit(1);
    });
}

module.exports = { app, connectDB };
