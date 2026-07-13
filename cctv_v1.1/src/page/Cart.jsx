import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// 🔥 In-memory flag – survives SPA navigation, resets on browser refresh
let hasLoadedOnce = false;

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  // Loading state for spinner (only on initial load)
  const [loading, setLoading] = useState(true);

  // Notification state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Track which item is being removed for smooth animation
  const [removingId, setRemovingId] = useState(null);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 1500);
  };

  // Handle remove with smooth animation
  const handleRemove = (id, name) => {
    setRemovingId(id);
    // Show notification immediately
    showMessage(`✖ Removed "${name}" from cart`, "error");
    // Remove after a short delay for smooth animation
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300);
  };

  // Handle quantity update with notification
  const handleUpdateQuantity = (id, newQuantity, name) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
    showMessage(`✔ Updated "${name}" quantity`, "success");
  };

  useEffect(() => {
    // If this is the first visit or browser refresh, show spinner
    if (!hasLoadedOnce) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        hasLoadedOnce = true;
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  // Show loading spinner on first load or refresh
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] transition-opacity duration-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#012471]"></div>
        <p className="mt-4 text-gray-500 text-sm">Loading cart...</p>
      </div>
    );
  }

  // Show empty state when cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 min-h-[95vh] transition-opacity duration-500">
        <span className="text-8xl mb-4">🛒</span>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Looks like you haven't added anything yet.
        </p>
        <button
          onClick={() => navigate("/productlist")}
          className="bg-[#012471] text-white text-lg px-6 py-2.5 rounded-xl font-semibold hover:bg-[#16213D] transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* 🔥 Smooth Notification (same as other pages) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          message ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`flex justify-end transition-all duration-500 ease-in-out ${
            message
              ? "max-h-40 opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
        >
          <div
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-lg text-sm sm:text-base
              ${messageType === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
              transition-all duration-500 ease-in-out
              ${message ? "opacity-100" : "opacity-0"}`}
          >
            {message}
          </div>
        </div>
      </div>

      {/* Cart Items with smooth transitions */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className={`flex items-center justify-between border rounded-lg p-4 shadow-sm transition-all duration-300 ease-in-out
              ${removingId === item._id ? "opacity-0 scale-95 -translate-x-4" : "opacity-100 scale-100 translate-x-0"}`}
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">₹{item.price} each</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleUpdateQuantity(item._id, item.quantity - 1, item.name)
                }
                className="w-8 h-8 border rounded-lg hover:bg-gray-100 transition duration-200"
              >
                -
              </button>
              <span className="min-w-[20px] text-center">{item.quantity}</span>
              <button
                onClick={() =>
                  handleUpdateQuantity(item._id, item.quantity + 1, item.name)
                }
                className="w-8 h-8 border rounded-lg hover:bg-gray-100 transition duration-200"
              >
                +
              </button>
            </div>

            <p className="font-semibold">₹{item.price * item.quantity}</p>

            <button
              onClick={() => handleRemove(item._id, item.name)}
              className="text-red-600 text-sm hover:underline transition duration-200"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total and Checkout with smooth entrance */}
      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-[#012471] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#16213D] transition duration-200"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;