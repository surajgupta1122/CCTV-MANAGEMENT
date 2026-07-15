import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// 🔥 In-memory flag – survives SPA navigation, resets on browser refresh
let hasLoadedOnce = false;

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [removingId, setRemovingId] = useState(null);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 1500);
  };

  const handleRemove = (id, name) => {
    setRemovingId(id);
    showMessage(`✖ Removed "${name}" from cart`, "error");
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300);
  };

  const handleUpdateQuantity = (id, newQuantity, name) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
    showMessage(`✔ Updated "${name}" quantity`, "success");
  };

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] transition-opacity duration-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#012471]"></div>
        <p className="mt-4 text-gray-500 text-sm">Loading cart...</p>
      </div>
    );
  }

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
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-3 sm:space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className={`border rounded-lg p-3 sm:p-4 shadow-sm transition-all duration-300 ease-in-out
              ${removingId === item._id ? "opacity-0 scale-95 -translate-x-4" : "opacity-100 scale-100 translate-x-0"}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base sm:text-lg truncate">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price} each</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-center">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item._id, item.quantity - 1, item.name)
                  }
                  className="w-9 h-9 sm:w-8 sm:h-8 border rounded-lg hover:bg-gray-100 transition duration-200 flex items-center justify-center text-lg font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="min-w-[24px] text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item._id, item.quantity + 1, item.name)
                  }
                  className="w-9 h-9 sm:w-8 sm:h-8 border rounded-lg hover:bg-gray-100 transition duration-200 flex items-center justify-center text-lg font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
                <span className="font-semibold text-base sm:text-lg">
                  ₹{item.price * item.quantity}
                </span>
                <button
                  onClick={() => handleRemove(item._id, item.name)}
                  className="text-red-600 text-sm sm:text-base font-medium hover:underline transition duration-200 px-2 py-1 sm:px-0 sm:py-0"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 NOTIFICATION – placed here, just above total */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out mt-4 ${
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

      {/* Total and Checkout */}
      <div className="mt-6 sm:mt-8 border-t pt-4 sm:pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold">Total: ₹{totalPrice}</h2>
        <button
          onClick={() => navigate("/checkout")}
          className="w-full sm:w-auto bg-[#012471] text-white px-6 py-3 sm:py-2.5 rounded-lg font-bold hover:bg-[#16213D] transition duration-200 text-base sm:text-lg"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;