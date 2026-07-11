import express from "express";
import createOrder from "../controller/order/createOrder.js";
import getMyOrders from "../controller/order/getMyOrders.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/orders", authMiddleware, createOrder);
router.get("/orders/my", authMiddleware, getMyOrders);

export default router;