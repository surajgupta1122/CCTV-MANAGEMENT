import express from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// Example route — GET all users
router.get("/", getAllUsers);

export default router;
