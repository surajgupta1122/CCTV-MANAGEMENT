import Product from "../../models/Product.js";
import User from "../../models/User.js";

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("=" .repeat(50));
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
    console.log("Is Admin:", user.role === "admin");
    console.log("Is Owner:", product.createdBy.toString() === user._id.toString());
    
    // ✅ Check permission: Admin can edit any product, users can only edit their own
    if (user.role !== "admin" && product.createdBy.toString() !== user._id.toString()) {
      console.log("❌ Permission denied: User is not owner and not admin");
      return res.status(403).json({
        message: "You don't have permission to edit this product",
      });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    console.log("✅ Product updated successfully");
    console.log("=" .repeat(50));

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("❌ UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export default updateProduct;