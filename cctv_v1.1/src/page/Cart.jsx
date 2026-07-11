import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-[#012471] text-white px-4 py-2 rounded-lg"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">₹{item.price} each</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="w-8 h-8 border rounded-lg"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-8 h-8 border rounded-lg"
              >
                +
              </button>
            </div>

            <p className="font-semibold">₹{item.price * item.quantity}</p>

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-[#012471] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#16213D]"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;