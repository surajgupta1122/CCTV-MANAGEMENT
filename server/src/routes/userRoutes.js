import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import getUsers from "../controller/user/getUsers.js";
import deleteUser from "../controller/user/deleteUser.js";
import updateUser from "../controller/user/updateUser.js";

const router = express.Router();

// GET all users (protected)
router.get("/users", authMiddleware,adminMiddleware, getUsers);

// DELETE a user by ID (protected)
router.delete("/users/:id", authMiddleware,adminMiddleware, deleteUser);

// UPDATE a user by ID (protected)
router.put("/users/:id", authMiddleware,adminMiddleware, updateUser);

export default router;
