import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "../utils/axios";

// 🔥 In-memory flag – survives SPA navigation, resets on browser refresh
let hasLoadedOnce = false;

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Notification state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 1500);
  };

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
      showMessage("✔ Order placed successfully!", "success");
      clearCart();

      setTimeout(() => {
        navigate("/productlist");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Payment failed. Try again.";
      setError(errorMsg);
      showMessage("✖ " + errorMsg, "error");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (!hasLoadedOnce) {
      const timer = setTimeout(() => {
        setPageLoading(false);
        hasLoadedOnce = true;
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setPageLoading(false);
    }
  }, []);

  // 🔄 Loading spinner
  if (pageLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#012471]"></div>
        <p className="mt-4 text-gray-500 text-sm">Loading checkout...</p>
      </div>
    );
  }

  // ✅ Success state
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 min-h-[80vh] animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
          ✔ Order placed successfully!
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Redirecting you back to products...
        </p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#012471] mx-auto"></div>
        </div>
      </div>
    );
  }

  // 🛒 Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 min-h-[80vh]">
        <span className="text-8xl mb-4">🛒</span>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Looks like you haven't added anything yet.
        </p>
        <button
          onClick={() => navigate("/productlist")}
          className="bg-[#012471] text-white text-base sm:text-lg px-6 py-2.5 rounded-xl font-semibold hover:bg-[#16213D] transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Checkout</h1>

      {/* 🔥 Smooth Notification – stays at top */}
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

      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-3">
        <h2 className="font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider mb-2">
          Order Summary
        </h2>

        <div className="divide-y divide-gray-100">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center py-2 sm:py-3 text-sm sm:text-base"
            >
              <span className="text-gray-700 flex-1">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-400 ml-1">× {item.quantity}</span>
              </span>
              <span className="font-semibold ml-4">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-3 mt-2 flex justify-between items-center">
          <span className="text-base sm:text-lg font-bold">Total</span>
          <span className="text-base sm:text-lg font-bold text-[#012471]">
            ₹{totalPrice}
          </span>
        </div>
      </div>

      {/* Error fallback */}
      {error && !message && (
        <p className="text-red-600 text-sm mt-3 bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </p>
      )}

      {/* Pay Button – full width on mobile */}
      <button
        onClick={handlePayNow}
        disabled={processing}
        className="mt-6 w-full bg-[#012471] text-white py-3 sm:py-3.5 rounded-lg font-bold hover:bg-[#16213D] transition disabled:opacity-50 disabled:cursor-not-allowed relative text-base sm:text-lg"
      >
        {processing ? (
          <span className="flex items-center justify-center gap-3">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          `Pay Now — ₹${totalPrice}`
        )}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        This is a mock payment for demo purposes. No real transaction will occur.
      </p>

      {/* CSS for fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Checkout;