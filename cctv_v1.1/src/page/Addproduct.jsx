import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import addCartIcon from "../assets/icons/add-cart.png";
import closeIcon from "../assets/icons/close.png";
import bookmarkIcon from "../assets/icons/bookmark.png";
import boxIcon from "../assets/icons/box.png";
import brandIcon from "../assets/icons/new-poster.png";
import pricingIcon from "../assets/icons/competitive.png";

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

  // 🎮 achievement-style message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 1000);
  };

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // clear form
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

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/products", form);
      showMessage("✔ Product added");

      setTimeout(() => {
        navigate("/productlist");
      }, 800);
    } catch (error) {
      showMessage(
        error.response?.data?.message || "✖ Failed to add product",
        "error"
      );
    }
  };

  return (
    <div className="transition-all duration-300 ease-in-out bg-gray-50 font-sans min-h-screen px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
        CCTV Product Form
      </h1>

      {/* 🎮 message */}
      {message && (
        <div className="flex justify-end mt-3">
          <div
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-lg text-sm sm:text-base
              ${
                messageType === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
          >
            {message}
          </div>
        </div>
      )}

      <div className="mt-4 sm:mt-6 md:mt-10 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 bg-blue-100 rounded-t-xl gap-3">
          <h1 className="flex gap-2 items-center text-lg sm:text-xl font-medium">
            <img
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              src={addCartIcon}
              alt="add"
            />
            Add Product
          </h1>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleClear}
              className="bg-white flex gap-1 border-2 border-[#012471] px-3 py-1.5 rounded-lg text-sm hover:shadow-md hover:bg-gray-100 transform transition duration-150 active:scale-95 flex-1 sm:flex-none justify-center"
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
              className="flex gap-1 bg-[#012471] text-white px-3 py-1.5 rounded-lg text-sm hover:opacity-90 hover:shadow-md transform transition duration-150 active:scale-95 flex-1 sm:flex-none justify-center"
            >
              <img
                className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5"
                src={bookmarkIcon}
                alt="save"
              />
              Save
            </button>
          </div>
        </div>

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
                placeholder="e.g., Hikvision 2MP Dome Camera"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="e.g., DS-2CD2123G0-I"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm sm:text-base"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm sm:text-base"
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
              placeholder="₹ 0.00"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
              required
            />

            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="# 0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
              required
            />
          </div>

          {/* Technical Specification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <select
              name="resolution"
              value={form.resolution}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
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
              placeholder="eg., 2.8mm, varifocal"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
            />
          </div>

          {/* Extra Features */}
          <div className="flex flex-col space-y-3">
            <label className="py-3 sm:py-4 px-3 sm:px-4 bg-blue-100 rounded-lg text-sm sm:text-base cursor-pointer">
              <input
                type="checkbox"
                name="poe"
                checked={form.poe}
                onChange={handleChange}
                className="mr-2 w-4 h-4"
              />
              Power over Ethernet (PoE) Support
            </label>

            <label className="py-3 sm:py-4 px-3 sm:px-4 bg-blue-100 rounded-lg text-sm sm:text-base cursor-pointer">
              <input
                type="checkbox"
                name="nightVision"
                checked={form.nightVision}
                onChange={handleChange}
                className="mr-2 w-4 h-4"
              />
              Night Vision Capability
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;