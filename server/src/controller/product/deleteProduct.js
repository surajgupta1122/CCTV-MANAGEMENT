import Product from "../../models/Product.js";
import User from "../../models/User.js";

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("=" .repeat(50));
    console.log("🗑️ DELETE PRODUCT REQUEST");
    console.log("Product ID:", id);
    console.log("User ID:", req.user.id);

    // Find the product
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    
    // Get user info
    const user = await User.findById(req.user.id);
    
    console.log("User Role:", user.role);
    console.log("Product Owner:", product.createdBy);
    console.log("Is Admin:", user.role === "admin");
    console.log("Is Owner:", product.createdBy.toString() === user._id.toString());
    
    // ✅ Check permission: Admin can delete any product, users can only delete their own
    if (user.role !== "admin" && product.createdBy.toString() !== user._id.toString()) {
      console.log("❌ Permission denied: User is not owner and not admin");
      return res.status(403).json({
        message: "You don't have permission to delete this product",
      });
    }

    await product.deleteOne();
    
    console.log("✅ Product deleted successfully");
    console.log("=" .repeat(50));

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("❌ DELETE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};

export default deleteProduct;