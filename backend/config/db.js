import mongoose from "mongoose";

export default async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set. Copy .env.example to .env and fill it in.");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    console.error("Check that MONGO_URI in .env is correct and reachable (local mongod running, or Atlas IP allowlist includes your machine).");
    process.exit(1);
  }
}
