import Product from "../../models/Product.js";
import User from "../../models/User.js";

const getDashboardStats = async (req, res) => {
  try {
    // ✅ Get logged-in user
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ✅ Total products
    const totalProducts = await Product.countDocuments();

    // ✅ Inventory value
    const inventoryValueAgg = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: { $multiply: ["$price", "$quantity"] },
          },
        },
      },
    ]);

    const inventoryValue = inventoryValueAgg[0]?.totalValue || 0;

    // ✅ Today's products
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysNew = await Product.find({
      createdAt: { $gte: today },
    });

    // ✅ Low stock
    const lowStock = await Product.countDocuments({
      quantity: { $lt: 5 },
    });

    // ✅ Final response (USER INCLUDED 🔥)
    res.status(200).json({
      message: "Dashboard data fetched successfully",
      user, // ⭐ THIS FIXES YOUR EMAIL ISSUE
      totalProducts,
      inventoryValue,
      todaysNewCount: todaysNew.length,
      lowStock,
      todaysNew,
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({
      message: "Failed to load dashboard data",
    });
  }
};

export default getDashboardStats;