import Product from "../../models/Product.js";

const getProducts = async (req, res) => {
  try {
    console.log("=" .repeat(50));
    console.log("📋 PRODUCT LIST REQUEST");
    console.log("User ID:", req.user.id);
    console.log("=" .repeat(50));

    // ✅ Only get products created by this user
    const products = await Product.find({ 
      createdBy: req.user.id 
    }).sort({ createdAt: -1 });
    
    console.log(`📦 Found ${products.length} products for user ${req.user.id}`);
    if (products.length > 0) {
      console.log("Products:", products.map(p => p.name).join(", "));
    }
    
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export default getProducts;