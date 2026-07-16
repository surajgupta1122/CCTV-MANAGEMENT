import Product from "../../models/Product.js";
import User from "../../models/User.js";

const updateProduct = async (req, res) => {
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
        message: "You can only edit your own products",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("❌ UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

export default updateProduct;