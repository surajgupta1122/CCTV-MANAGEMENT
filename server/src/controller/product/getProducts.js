import Product from "../../models/Product.js";
import User from "../../models/User.js";

const getProducts = async (req, res) => {
  try {
    // Get user info
    const user = await User.findById(req.user.id);
    
    console.log("=" .repeat(50));
    console.log("📋 PRODUCT LIST REQUEST");
    console.log("User:", user.email);
    console.log("Role:", user.role);
    console.log("=" .repeat(50));

    // ✅ If admin, get ALL products. If regular user, get only their products
    let filter = {};
    
    if (user.role !== "admin") {
      filter = { createdBy: req.user.id };
      console.log(`🔒 Regular user - fetching only their products`);
    } else {
      console.log("👑 Admin user - fetching ALL products");
    }
    
    const products = await Product.find(filter)
      .populate('createdBy', 'name email') // This shows who created each product
      .sort({ createdAt: -1 });
    
    console.log(`📦 Found ${products.length} products`);
    if (products.length > 0) {
      console.log("Products:", products.map(p => `${p.name} (by: ${p.createdBy?.email || 'unknown'})`).join(", "));
    }
    
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export default getProducts;