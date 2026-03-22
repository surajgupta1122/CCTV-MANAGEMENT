import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import addProduct from "../controller/product/addProduct.js";
import getProducts from "../controller/product/getProducts.js";
import updateProduct from "../controller/product/updateProduct.js";
import deleteProduct from "../controller/product/deleteProduct.js";

const router = express.Router();

// All routes require authentication
router.post("/products", authMiddleware, addProduct);
router.get("/products", authMiddleware, getProducts);
router.put("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;