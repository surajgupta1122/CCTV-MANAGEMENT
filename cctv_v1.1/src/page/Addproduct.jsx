import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import addProductIcon from "../assets/icons/add product.png";
import closeIcon from "../assets/icons/close.png";
import bookmarkIcon from "../assets/icons/bookmark.png";
import boxIcon from "../assets/icons/box.png";
import brandIcon from "../assets/icons/new-poster.png";
import pricingIcon from "../assets/icons/competitive.png";

// 🔥 In-memory flag – survives SPA navigation, resets on browser refresh
let hasLoadedOnce = false;

function Addproduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    modelNumber: "",
    brand: "",
    category: "",
    price: "",
    quantity: "",
    resolution: "",
    lens: "",
    poe: false,
    nightVision: false,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [submitting, setSubmitting] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    // Clear after 1500ms to allow exit animation to finish
    setTimeout(() => setMessage(""), 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleClear = () => {
    setForm({
      name: "",
      modelNumber: "",
      brand: "",
      category: "",
      price: "",
      quantity: "",
      resolution: "",
      lens: "",
      poe: false,
      nightVision: false,
    });
    showMessage("✔ Form cleared");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await axios.post("/products", form);
      sessionStorage.setItem("productAdded", "true");
      showMessage("✔ Product added");

      setTimeout(() => {
        navigate("/productlist");
      }, 800);
    } catch (error) {
      showMessage(
        error.response?.data?.message || "✖ Failed to add product",
        "error"
      );
    } finally {
      setSubmitting(false);
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

  return (
    <div className="transition-all duration-300 ease-in-out bg-gray-50 font-sans min-h-screen px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
        CCTV Product Form
      </h1>

      {/* 🔥 Smooth Slide + Fade Notification (same as Dashboard) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          message ? "max-h-40 opacity-100 mb-0" : "max-h-0 opacity-0 -mb-4"
        }`}
      >
        <div
          className={`flex justify-end transition-all duration-500 ease-in-out ${
            message
              ? "max-h-40 opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
        >
          {message && (
            <div
              className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-lg text-sm sm:text-base
                ${messageType === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
              `}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 md:mt-10 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 bg-blue-100 rounded-t-xl gap-3">
          <h1 className="flex gap-2 items-center text-lg sm:text-xl font-medium">
            <img
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7"
              src={addProductIcon}
              alt="add"
            />
            Add Product
          </h1>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleClear}
              disabled={submitting || pageLoading}
              className="bg-white flex gap-1 border-2 border-[#012471] px-3 py-1.5 rounded-lg text-sm hover:shadow-md hover:bg-gray-100 transform transition duration-150 active:scale-95 flex-1 sm:flex-none justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              <img
                className="w-4 h-4 mt-0.5"
                src={closeIcon}
                alt="clear"
              />
              Clear
            </button>

            <button
              type="submit"
              form="add-product-form"
              disabled={submitting || pageLoading}
              className="flex gap-1 bg-[#012471] text-white px-3 py-1.5 rounded-lg text-sm hover:opacity-90 hover:shadow-md transform transition duration-150 active:scale-95 flex-1 sm:flex-none justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <img
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5"
                    src={bookmarkIcon}
                    alt="save"
                  />
                  Save
                </>
              )}
            </button>
          </div>
        </div>

        {/* 🦴 Skeleton OR Form */}
        {pageLoading ? (
          <div className="space-y-4 sm:space-y-5 md:space-y-6 p-4 sm:p-5 md:p-6">
            {/* Product Information Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>

            {/* Brand & Category Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>

            {/* Pricing & Inventory Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded w-full animate-pulse" />
              ))}
            </div>

            {/* Technical Specs Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded w-full animate-pulse" />
              ))}
            </div>

            {/* Checkboxes Skeleton */}
            <div className="flex flex-col space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="py-3 sm:py-4 px-3 sm:px-4 bg-gray-200 rounded-lg animate-pulse h-12" />
              ))}
            </div>
          </div>
        ) : (
          /* ✅ Actual Form */
          <form
            id="add-product-form"
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5 md:space-y-6 p-4 sm:p-5 md:p-6"
          >
            {/* Product Information */}
            <h2 className="font-medium flex items-center gap-2 text-sm sm:text-base md:text-lg">
              <img
                className="w-5 h-5 sm:w-6 sm:h-6"
                src={boxIcon}
                alt="info"
              />
              Product Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <label className="flex flex-col text-sm sm:text-base font-semibold">
                Product Name*
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="e.g., Hikvision 2MP Dome Camera"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                />
              </label>

              <label className="flex flex-col text-sm sm:text-base font-semibold">
                Model Number*
                <input
                  type="text"
                  name="modelNumber"
                  value={form.modelNumber}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="e.g., DS-2CD2123G0-I"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                />
              </label>
            </div>

            {/* Brand & Category */}
            <h2 className="font-medium flex items-center gap-2 text-sm sm:text-base md:text-lg">
              <img
                className="w-5 h-5 sm:w-6 sm:h-6"
                src={brandIcon}
                alt="brand"
              />
              Brand & Category
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <label className="flex flex-col text-sm sm:text-base font-semibold">
                Brand*
                <select
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select Brand...</option>
                  <option>Hikvision</option>
                  <option>Dahua Technology</option>
                  <option>CP Plus</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="flex flex-col text-sm sm:text-base font-semibold">
                Category*
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select Category...</option>
                  <option>Box Camera</option>
                  <option>PTZ Camera</option>
                  <option>Dome Camera</option>
                  <option>Other</option>
                </select>
              </label>
            </div>

            {/* Pricing & Inventory */}
            <h2 className="font-medium flex items-center gap-2 text-sm sm:text-base md:text-lg">
              <img
                className="w-5 h-5 sm:w-6 sm:h-6"
                src={pricingIcon}
                alt="pricing"
              />
              Pricing & Inventory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                disabled={submitting}
                placeholder="₹ 0.00"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />

              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                disabled={submitting}
                placeholder="# 0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>

            {/* Technical Specification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <select
                name="resolution"
                value={form.resolution}
                onChange={handleChange}
                disabled={submitting}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select Resolution...</option>
                <option>1920×1080</option>
                <option>1440×900</option>
                <option>1366×768</option>
                <option>Other</option>
              </select>

              <input
                type="text"
                name="lens"
                value={form.lens}
                onChange={handleChange}
                disabled={submitting}
                placeholder="eg., 2.8mm, varifocal"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Extra Features */}
            <div className="flex flex-col space-y-3">
              <label className={`py-3 sm:py-4 px-3 sm:px-4 bg-blue-100 rounded-lg text-sm sm:text-base cursor-pointer ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                <input
                  type="checkbox"
                  name="poe"
                  checked={form.poe}
                  onChange={handleChange}
                  disabled={submitting}
                  className="mr-2 w-4 h-4"
                />
                Power over Ethernet (PoE) Support
              </label>

              <label className={`py-3 sm:py-4 px-3 sm:px-4 bg-blue-100 rounded-lg text-sm sm:text-base cursor-pointer ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                <input
                  type="checkbox"
                  name="nightVision"
                  checked={form.nightVision}
                  onChange={handleChange}
                  disabled={submitting}
                  className="mr-2 w-4 h-4"
                />
                Night Vision Capability
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Addproduct;