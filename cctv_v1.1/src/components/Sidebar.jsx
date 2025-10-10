import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: "menu.png", path: "/dashboard" },
    { name: "Add Product", icon: "add-cart.png", path: "/addproduct" },
    { name: "User Management", icon: "user-setting.png", path: "/usermanagement" },
    { name: "Product List", icon: "packing-list.png", path: "/productlist" },
  ];

  const handleLogout = () => navigate("/login");

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r-2 border-gray-300 flex flex-col transition-all duration-300 ease-in-out 
        ${isOpen ? "w-[22%]" : "w-[9%]"} 
        sm:z-50 z-40
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-gray-300 p-4">
        <div className="flex items-center space-x-2">
          <img src="src/assets/camera.gif" alt="CCTV" className="h-10 w-12" />
          {isOpen && (
            <h1 className="text-2xl font-bold text-[#012471]">CCTV Manager</h1>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl font-bold text-[#012471] hover:scale-110 duration-300"
        >
          {isOpen ? "❮" : "❯"}
        </button>
      </div>

      {/* Navigation */}
      <ul className="mt-2 flex-1 p-3 space-y-2 text-gray-700 overflow-y-auto">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-4 rounded-xl hover:bg-blue-100 hover:text-blue-900 hover:scale-105 duration-300
                ${
                  isActive
                    ? "bg-blue-100 font-bold text-blue-900"
                    : "text-gray-500 font-medium"
                }`
              }
            >
              <div
                className={`flex items-center ${
                  isOpen ? "" : "justify-center w-full"
                }`}
              >
                <img
                  src={`src/assets/icons/${item.icon}`}
                  alt={item.name}
                  className="w-9 h-9"
                />
                {isOpen && <span className="ml-4 text-xl">{item.name}</span>}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button
        className="rounded-t-xl cursor-pointer p-4 text-2xl font-bold text-red-600 border-t-2 border-gray-300 flex items-center justify-center gap-2 hover:bg-red-200 hover:scale-110 duration-300"
        onClick={handleLogout}
      >
        <img className="w-9 h-9" src="src/assets/icons/logout.png" alt="logout" />
        {isOpen && <span>Log out</span>}
      </button>
    </aside>
  );
}

export default Sidebar;
