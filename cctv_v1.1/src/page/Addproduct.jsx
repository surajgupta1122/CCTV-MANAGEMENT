import { useState } from "react";

function Addproduct({ isOpen }) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out bg-gray-50 font-sans min-h-screen
        ${isOpen ? "md:ml-[22%]" : "md:ml-[9%]"} 
        px-4 md:px-8 py-6`}
    >
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        CCTV Product Form
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-3 md:py-5 bg-blue-100 rounded-t-lg mb-6">
          <h1 className="flex gap-2 items-center text-lg md:text-xl font-medium">
            <img className="w-6 h-6" src="src/assets/icons/add-cart.png" alt="add" /> Add Product
          </h1>
          <div className="flex gap-3 mt-3 md:mt-0">
            <button className="bg-white flex gap-1 border-2 border-[#012471] px-3 py-1 rounded-lg text-sm md:text-base">
              <img className="w-3 h-3 mt-1" src="src/assets/icons/close.png" alt="clear" /> Clear
            </button>
            <button className="flex gap-1 bg-[#012471] text-white px-3 py-1 rounded-lg text-sm md:text-base">
              <img className="w-4 h-4 mt-1" src="src/assets/icons/bookmark.png" alt="save" /> Save
            </button>
          </div>
        </div>

        <form className="space-y-6">
          {/* Product Information */}
          <h2 className="font-medium flex items-center gap-2 text-base md:text-lg">
            <img className="w-6 h-6" src="src/assets/icons/box.png" alt="info" /> Product Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col text-sm md:text-base font-semibold">
              Product Name*
              <input
                type="text"
                placeholder="e.g., Hikvision 2MP Dome Camera"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col text-sm md:text-base font-semibold">
              Model Number*
              <input
                type="text"
                placeholder="e.g., DS-2CD2123G0-I"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          {/* Brand & Category */}
          <h2 className="font-medium flex items-center gap-2 text-base md:text-lg">
            <img className="w-5 h-5" src="src/assets/icons/new-poster.png" alt="brand" /> Brand & Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col text-sm md:text-base font-semibold">
              Brand*
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option>Select Brand...</option>
                <option>Hikvision</option>
                <option>Dahua Technology</option>
                <option>CP Plus</option>
                <option>Other</option>
              </select>
            </label>
            <label className="flex flex-col text-sm md:text-base font-semibold">
              Category*
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option>Select Category...</option>
                <option>Box Camera</option>
                <option>PTZ Camera</option>
                <option>Dome Camera</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          {/* Pricing & Inventory */}
          <h2 className="font-medium flex items-center gap-2 text-base md:text-lg">
            <img className="w-5 h-5" src="src/assets/icons/competitive.png" alt="pricing" /> Pricing & Inventory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col text-sm md:text-base font-semibold">
              Price (₹)*
              <input
                type="number"
                placeholder="₹ 0.00"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col text-sm md:text-base font-semibold">
              Quantity in Stock*
              <input
                type="number"
                placeholder="# 0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          {/* Technical Specification */}
          <h2 className="font-medium flex items-center gap-2 text-base md:text-lg">
            <img className="w-6 h-6" src="src/assets/icons/processor.png" alt="specs" /> Technical Specification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col text-sm md:text-base font-semibold">
              Resolution*
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option>Select Resolution...</option>
                <option>1920×1080</option>
                <option>1440×900</option>
                <option>1366×768</option>
                <option>Other</option>
              </select>
            </label>
            <label className="flex flex-col text-sm md:text-base font-semibold">
              Lens Specification*
              <input
                type="text"
                placeholder="eg., 2.8mm, varifocal"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          {/* Extra Features */}
          <div className="flex flex-col space-y-3">
            <label className="py-4 px-2 bg-blue-100 rounded-lg">
              <input type="checkbox" className="mr-2" /> Power over Ethernet (PoE) Support
            </label>
            <label className="py-4 px-2 bg-blue-100 rounded-lg">
              <input type="checkbox" className="mr-2" /> Night Vision Capability
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
