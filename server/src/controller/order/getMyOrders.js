import Order from "../../models/Order.js";

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Server error fetching orders" });
  }
};

export default getMyOrders;