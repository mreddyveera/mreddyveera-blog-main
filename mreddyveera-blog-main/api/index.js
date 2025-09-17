import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./Routes/userroute.js";
import authRoute from "./Routes/authroute.js";

dotenv.config();

// Connect to database
mongoose
  .connect(process.env.mongo_url)
  .then(() => console.log("Database connection established successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    errMessage,
  });
});

// Start server
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
