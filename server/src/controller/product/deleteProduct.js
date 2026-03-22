import Product from "../../models/Product.js";
import User from "../../models/User.js";

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    
    // Get user info
    const user = await User.findById(req.user.id);
    
    // Check if user has permission to delete
    if (user.role !== "admin" && product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You don't have permission to delete this product",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};

export default deleteProduct;