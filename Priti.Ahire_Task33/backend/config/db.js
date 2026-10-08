const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error('MONGODB_URI is missing. Set MONGODB_URI in your environment or .env file.');
  }

  try {
    const connection = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;
