import Product from "../../models/Product.js";

const getProducts = async (req, res) => {
  try {
    // 🔐 FILTER BY LOGGED-IN USER
    const products = await Product.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export default getProducts;