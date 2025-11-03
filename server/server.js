import express from "express";
import router from "./src/routes/router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Data route
app.use("/api", router);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cctv_db";

mongoose
  .connect(MONGO_URI, {
    // options can be left empty for modern mongoose
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Backend is running successfully 🚀 on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });