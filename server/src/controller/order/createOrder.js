import Order from "../../models/Order.js";
import Product from "../../models/Product.js";

const createOrder = async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;

      product.quantity -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      buyer: req.user.id,
      items: orderItems,
      totalAmount,
    });

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("CREATE ORDER ERROR", error);
    return res.status(500).json({ message: "Server error placing order" });
  }
};

export default createOrder;