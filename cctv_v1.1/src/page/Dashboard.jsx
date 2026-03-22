import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import refreshIcon from "../assets/icons/refresh.png";
import boxesIcon from "../assets/icons/boxes.png";
import barChartIcon from "../assets/icons/bar-chart.png";
import qualityIcon from "../assets/icons/quality-control.png";
import attentionIcon from "../assets/icons/attention.png";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inventoryValue: 0,
    todaysNewCount: 0,
    lowStock: 0,
    todaysNew: [],
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  //  message
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 1000);
  };

  const fetchDashboard = async (fromRefresh = false) => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/dashboard-stats", {
        params: { t: Date.now() }, // cache buster
      });

      setStats(res.data);

      // 👇 after-load message
      showMessage(fromRefresh ? "✔ Dashboard refreshed" : "✔ Dashboard loaded");
    } catch (error) {
      showMessage("✖ Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    testProtected();
  }, []);

  const testProtected = async () => {
    try {
      const res = await axiosInstance.get("/dashboard");
      console.log(res.data);

      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = stats.todaysNew.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 px-1 py-2 mb-3">
          CCTV Inventory Dashboard
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-400 rounded-lg w-[280px] px-3 py-2 text-sm"
          />

          <button
            onClick={() => fetchDashboard(true)}
            disabled={loading}
            className="border-2 border-[#012471] font-semibold rounded-lg px-3 py-2 flex items-center gap-2 text-sm hover:bg-[#012471] hover:text-white transition"
          >
            <img
              className="w-5 h-5"
              src={refreshIcon}
              alt="refresh"
            />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* 🎮 message */}
      {message && (
        <div className="flex justify-end">
          <div
            className={`px-6 py-2 rounded-lg font-semibold shadow-lg text-white
           ${message.startsWith("✖") ? "bg-red-600" : "bg-green-600"}
          `}
          >
            {message}
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Total Products",
            value: stats.totalProducts,
            icon: boxesIcon,
          },
          {
            label: "Inventory Value",
            value: `₹${stats.inventoryValue.toLocaleString()}`,
            icon: barChartIcon,
          },
          {
            label: "Today's New",
            value: stats.todaysNewCount,
            icon: qualityIcon ,
          },
          { label: "Low Stock", value: stats.lowStock, icon: attentionIcon },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white shadow-md rounded-lg p-3 hover:scale-105 transition"
          >
            <img
              className="w-[47%]"
              src={item.icon}
              alt={item.label}
            />
            <p className="text-lg text-gray-600 font-bold">{item.label}</p>
            <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      {user && (
        <div className="bg-blue-100 p-3 rounded-lg">
          👤 Logged in as: {user.email || user.id}
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <div className="bg-blue-100 p-4 border-b">
          <h3 className="font-bold text-gray-700 text-lg">
            Today's New Products ({filteredProducts.length})
          </h3>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="pr-16 pl-3 py-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">₹{item.price}</td>
                <td className="p-3 text-green-600 font-medium">
                  {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No matching products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
