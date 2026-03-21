import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    // Fetch user from DB to get full info
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "Welcome to protected dashboard",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
