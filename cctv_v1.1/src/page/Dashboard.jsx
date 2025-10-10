function Dashboard() {
  return (
    <div className="bg-gray-50 font-sans transition-all duration-300 ease-in-out w-full min-h-screen">
      <main className="space-y-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            CCTV Inventory Dashboard
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="🔍 Search..."
              className="border border-gray-400 rounded-lg w-full sm:w-[220px] lg:w-[280px] px-3 py-2 text-sm"
            />
            <button className="border-2 border-[#012471] font-semibold rounded-lg px-3 py-2 flex justify-center items-center gap-2 text-sm hover:bg-[#012471] hover:text-white duration-300">
              <img
                className="w-5 h-5"
                src="src/assets/icons/refresh.png"
                alt="refresh"
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Products", value: "2", icon: "boxes.png" },
            { label: "Inventory Value", value: "₹76,230.00", icon: "bar-chart.png" },
            { label: "Today's New", value: "2", icon: "quality-control.png" },
            { label: "Low Stock", value: "0", icon: "attention.png" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-500 flex items-center gap-2 text-sm sm:text-base">
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  src={`src/assets/icons/${item.icon}`}
                  alt={item.label}
                />
                {item.label}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold mt-2">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-3">
            <h3 className="font-bold text-gray-700 text-lg">
              Today's New Products (2)
            </h3>
            <div className="flex gap-3 text-sm font-semibold text-gray-600">
              <button className="border-2 border-[#012471] rounded-lg px-3 py-1 flex items-center gap-1 hover:bg-blue-100 duration-300">
                <img
                  className="w-4 h-4"
                  src="src/assets/icons/export.png"
                  alt="export"
                />
                Export
              </button>
              <button className="bg-[#012471] text-white rounded-lg px-3 py-1 flex items-center gap-1 hover:scale-105 duration-300">
                <img
                  className="w-4 h-4"
                  src="src/assets/icons/filter.png"
                  alt="filter"
                />
                Filter
              </button>
            </div>
          </div>

          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {[
                { product: "Wireless CCTV C...", category: "Bullet", price: "₹2,030.00", status: "In Stock" },
                { product: "2MP Dome Cam...", category: "Dome", price: "₹3,650.00", status: "In Stock" },
              ].map((item, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.product}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.price}</td>
                  <td className="p-3">
                    <span className="text-green-600 font-medium">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
