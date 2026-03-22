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

    // ✅ For admin users, show all products; for regular users, show only their products
    const filter = user.role === "admin" ? {} : { createdBy: req.user.id };

    // ✅ Total products (filtered by user role)
    const totalProducts = await Product.countDocuments(filter);

    // ✅ Inventory value (filtered by user role)
    const inventoryValueAgg = await Product.aggregate([
      {
        $match: filter // Apply filter based on user role
      },
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

    // ✅ Today's products (filtered by user role)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysNew = await Product.find({
      ...filter,
      createdAt: { $gte: today },
    }).sort({ createdAt: -1 });

    // ✅ Low stock (filtered by user role)
    const lowStock = await Product.countDocuments({
      ...filter,
      quantity: { $lt: 5 },
    });

    // ✅ Final response with filtered data
    res.status(200).json({
      message: "Dashboard data fetched successfully",
      user,
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