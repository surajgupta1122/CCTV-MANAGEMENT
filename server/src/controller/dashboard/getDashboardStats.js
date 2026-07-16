import Product from "../../models/Product.js";
import User from "../../models/User.js";

const getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let filter = {};
    if (user.role !== "admin") {
      filter = { createdBy: user._id };
    }

    const totalProducts = await Product.countDocuments(filter);

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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysNew = await Product.find({
      ...filter,
      createdAt: { $gte: today }
    }).sort({ createdAt: -1 });

    const lowStock = await Product.countDocuments({
      ...filter,
      quantity: { $lt: 5 }
    });

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