import Product from "../../models/Product.js";

const getProducts = async (req, res) => {
  try {
    // Get logged-in user from middleware
    const user = await User.findById(req.user.id);
    
    // Filter products based on user role
    const filter = user.role === "admin" ? {} : { createdBy: req.user.id };
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export default getProducts;