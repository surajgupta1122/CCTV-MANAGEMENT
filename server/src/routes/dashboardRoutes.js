import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import getDashboardStats from "../controller/dashboard/getDashboardStats.js";

const router = express.Router();

router.get("/dashboard-stats", authMiddleware, getDashboardStats);

export default router;
