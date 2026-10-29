import mongoose from "mongoose";

// This starter scaffold uses MongoDB. Add a PostgreSQL adapter here if needed.
export default async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing. Set it in your local .env file.");
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}