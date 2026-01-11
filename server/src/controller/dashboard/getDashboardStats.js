import Product from "../../models/Product.js";

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const inventoryValueAgg = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
    ]);

    const inventoryValue = inventoryValueAgg[0]?.totalValue || 0;

    // Today's products
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysNew = await Product.find({
      createdAt: { $gte: today },
    });

    // Low stock (quantity < 5)
    const lowStock = await Product.countDocuments({ quantity: { $lt: 5 } });

    res.status(200).json({
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
