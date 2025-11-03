import express from "express";
import authController from "../controller/auth/index.js";

const router = express.Router();

// auth
router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
