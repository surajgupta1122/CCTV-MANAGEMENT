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

    const user = await User.findById(req.user.id);

    const isAdmin = user.role === "admin";
    const isOwner = product.createdBy.toString() === user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        message: "You can only delete your own products",
      });
    }

    await product.deleteOne();

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