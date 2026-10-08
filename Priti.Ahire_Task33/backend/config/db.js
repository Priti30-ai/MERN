const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error('MONGO_URI is missing. Add your MongoDB Atlas connection string to backend/.env.');
  }

  try {
    const connection = await mongoose.connect(mongoURI, {
      dbName: 'task33_db',
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;
