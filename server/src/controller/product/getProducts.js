import Product from "../../models/Product.js";
import User from "../../models/User.js";

const getProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    let filter = {};
    if (user.role !== "admin") {
      filter = { createdBy: req.user.id };
    }

    const products = await Product.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export default getProducts;