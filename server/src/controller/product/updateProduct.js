import Product from "../../models/Product.js";
import User from "../../models/User.js";

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the product
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    
    // Get user info
    const user = await User.findById(req.user.id);
    
    // Check if user has permission to update
    if (user.role !== "admin" && product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You don't have permission to update this product",
      });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export default updateProduct;