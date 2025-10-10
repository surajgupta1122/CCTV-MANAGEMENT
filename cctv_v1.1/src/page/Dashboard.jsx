import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  // State for sidebar toggle (optional)
  const [isOpen, setIsOpen] = useState( Sidebar.setIsOpen);

  return (
    <div
      className={`bg-gray-50 font-sans transition-all duration-300 ease-in-out p-6 overflow-y-auto 
        ${isOpen ? "ml-[20%] w-[80%]" : " ml-[8%]"}
      `}
    >
      <main className="">
        {/* Top Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            CCTV Inventory Dashboard
          </h2>
          <input
            type="text"
            placeholder=" 🔍 Search... "
            className="border border-gray-400 rounded-lg pr-[25%] pl-2 py-2 text-sm"
          />
          <button className="border-2 border-[#012471] font-semibold rounded-lg px-3 py-1 flex gap-1">
            <img
              className="w-5 h-5"
              src="src/assets/icons/refresh.png"
              alt="refresh"
            />
            Refresh
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-4 mt-6 font-sans">
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-500 flex items-center gap-2">
              <img className="h-10 w-10" src="src/assets/icons/boxes.png" alt="boxes" />
              Total Products
            </p>
            <h3 className="text-2xl font-bold">2</h3>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-500 flex items-center gap-2">
              <img className="h-10 w-10" src="src/assets/icons/bar-chart.png" alt="bar" />
              Inventory Value
            </p>
            <h3 className="text-2xl font-bold">₹76,230.00</h3>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-500 flex items-center gap-2">
              <img className="h-10 w-10" src="src/assets/icons/quality-control.png" alt="quality" />
              Today's New
            </p>
            <h3 className="text-2xl font-bold">2</h3>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-500 flex items-center gap-2">
              <img className="h-10 w-10" src="src/assets/icons/attention.png" alt="low-stock" />
              Low Stock
            </p>
            <h3 className="text-2xl font-bold">0</h3>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-lg rounded-lg mt-6">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-bold text-gray-700">Today's New Products (2)</h3>
            <div className="space-x-4 text-sm font-semibold text-gray-600 flex">
              <button className="border-2 border-[#012471] rounded-lg px-2 py-1 flex gap-1">
                <img
                  className="w-4 h-4"
                  src="src/assets/icons/export.png"
                  alt="export"
                />
                Export
              </button>
              <button className="bg-[#012471] text-white rounded-lg px-2 py-1 flex gap-1">
                <img
                  className="w-5 h-5"
                  src="src/assets/icons/filter.png"
                  alt="filter"
                />
                Filter
              </button>
            </div>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-3">Wireless CCTV C...</td>
                <td className="p-3">Bullet</td>
                <td className="p-3">₹2,030.00</td>
                <td className="p-3">
                  <span className="text-green-600 font-medium">In Stock</span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-3">2MP Dome Cam...</td>
                <td className="p-3">Dome</td>
                <td className="p-3">₹3,650.00</td>
                <td className="p-3">
                  <span className="text-green-600 font-medium">In Stock</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
