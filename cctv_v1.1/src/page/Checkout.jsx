import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "../utils/axios";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePayNow = async () => {
    setError("");
    setProcessing(true);

    try {
      const items = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      await axios.post("/orders", { items });

      setSuccess(true);
      clearCart();

      setTimeout(() => {
        navigate("/productlist");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          ✔ Order placed successfully!
        </h2>
        <p className="text-gray-600">Redirecting you back to products...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
        <button
          onClick={() => navigate("/productlist")}
          className="mt-4 bg-[#012471] text-white px-4 py-2 rounded-lg"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 space-y-3">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between text-sm sm:text-base">
            <span>{item.name} × {item.quantity}</span>
            <span className="font-semibold">₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="border-t pt-3 flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold">₹{totalPrice}</span>
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-3">{error}</p>
      )}

      <button
        onClick={handlePayNow}
        disabled={processing}
        className="mt-6 w-full bg-[#012471] text-white py-3 rounded-lg font-bold hover:bg-[#16213D] transition disabled:opacity-50"
      >
        {processing ? "Processing..." : `Pay Now — ₹${totalPrice}`}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        This is a mock payment for demo purposes. No real transaction will occur.
      </p>
    </div>
  );
}

export default Checkout;