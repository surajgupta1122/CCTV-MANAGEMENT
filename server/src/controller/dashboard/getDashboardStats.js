import Product from "../../models/Product.js";
import User from "../../models/User.js";

const getDashboardStats = async (req, res) => {
  try {
    // Get logged-in user
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("=" .repeat(50));
    console.log("📊 DASHBOARD REQUEST");
    console.log("Logged in user:", user.email);
    console.log("User ID:", user._id.toString());
    console.log("User Role:", user.role);
    console.log("=" .repeat(50));

    // ✅ CRITICAL: If admin, see ALL products. If regular user, see only their own
    let filter = {};
    
    if (user.role !== "admin") {
      filter = { createdBy: user._id };
      console.log(`🔒 Regular user - filtering by: ${user._id}`);
    } else {
      console.log("👑 Admin user - showing ALL products");
    }

    // Total products
    const totalProducts = await Product.countDocuments(filter);

    // Inventory value
    const inventoryValueAgg = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$price", "$quantity"] } }
        }
      }
    ]);

    const inventoryValue = inventoryValueAgg[0]?.totalValue || 0;

    // Today's products
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysNew = await Product.find({
      ...filter,
      createdAt: { $gte: today }
    }).sort({ createdAt: -1 });

    // Low stock
    const lowStock = await Product.countDocuments({
      ...filter,
      quantity: { $lt: 5 }
    });

    console.log(`✅ Found ${totalProducts} products`);
    if (todaysNew.length > 0) {
      console.log("Products found:", todaysNew.map(p => p.name).join(", "));
    }
    console.log("=" .repeat(50));

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      totalProducts,
      inventoryValue,
      todaysNewCount: todaysNew.length,
      lowStock,
      todaysNew
    });
  } catch (error) {
    console.error("❌ DASHBOARD ERROR:", error);
    res.status(500).json({
      message: "Failed to load dashboard data"
    });
  }
};

export default getDashboardStats;