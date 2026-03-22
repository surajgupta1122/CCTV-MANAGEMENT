import Product from "../../models/Product.js";
import User from "../../models/User.js";

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("✏️ UPDATE PRODUCT REQUEST");
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
    
    // ✅ Permission check: Admin OR Product Owner
    const isAdmin = user.role === "admin";
    const isOwner = product.createdBy.toString() === user._id.toString();
    
    if (!isAdmin && !isOwner) {
      console.log("❌ Permission denied");
      return res.status(403).json({
        message: "You can only edit your own products",
      });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    console.log("✅ Product updated successfully");
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("❌ UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export default updateProduct;