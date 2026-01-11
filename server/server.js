import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import protectedRoutes from "./src/routes/protectedRoutes.js";

import authRoutes from "./src/routes/authRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config(); // MUST be before using process.env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);


// Start server after DB connection

const startServer = async () => {
  try {
    await connectDB(); // ⬅ wait for DB
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();
