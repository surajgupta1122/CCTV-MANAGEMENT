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

    // ✅ CRITICAL: Filter by the logged-in user's ID
    const filter = { createdBy: user._id };

    // Total products (only this user's products)
    const totalProducts = await Product.countDocuments(filter);
    console.log(`📦 Total products for ${user.email}: ${totalProducts}`);

    // Inventory value (only this user's products)
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

    // Today's products (only this user's products)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysNew = await Product.find({
      createdBy: user._id,
      createdAt: { $gte: today }
    }).sort({ createdAt: -1 });

    // Low stock (only this user's products)
    const lowStock = await Product.countDocuments({
      createdBy: user._id,
      quantity: { $lt: 5 }
    });

    console.log(`✅ Sending dashboard data for ${user.email}`);
    console.log(`📊 Products found: ${todaysNew.length}`);
    if (todaysNew.length > 0) {
      console.log("Product names:", todaysNew.map(p => p.name).join(", "));
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