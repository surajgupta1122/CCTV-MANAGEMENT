import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import addProduct from "../controller/product/addProduct.js";
import getProducts from "../controller/product/getProducts.js";
import updateProduct from "../controller/product/updateProduct.js";
import deleteProduct from "../controller/product/deleteProduct.js";

const router = express.Router();

router.post("/products", authMiddleware, addProduct);
router.get("/products", authMiddleware, getProducts);

// ✏️ EDIT PRODUCT
router.put(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);

// ❌ DELETE PRODUCT
router.delete(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

export default router;
