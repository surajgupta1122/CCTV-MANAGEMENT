import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import camera from "../assets/camera.gif";
import menuIcon from "../assets/icons/menu.png";
import addCartIcon from "../assets/icons/add-cart.png";
import userSettingIcon from "../assets/icons/user-setting.png";
import packingListIcon from "../assets/icons/packing-list.png";
import logoutIcon from "../assets/icons/logout.png";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  // ✅ Safe user state (fix crash)
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    } catch (err) {
      console.error("User parse error:", err);
      setUser(null);
    }
  }, []);

  const isAdmin = user?.role === "admin";

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // ✅ Use imported icons (NO require)
  const menuItems = [
    { name: "Dashboard", icon: menuIcon, path: "/dashboard" },
    { name: "Add Product", icon: addCartIcon, path: "/addproduct" },
    ...(isAdmin
      ? [
          {
            name: "User Management",
            icon: userSettingIcon,
            path: "/usermanagement",
          },
        ]
      : []),
    { name: "Product List", icon: packingListIcon, path: "/productlist" },
  ];

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // ensure UI resets
  };

  return (
    <>
      <aside
        className={`fixed h-screen bg-white border-r-2 border-gray-300 flex flex-col duration-300 ease-in-out 
        ${isOpen ? "w-[22%]" : "w-[9%]"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-gray-300 p-4">
          <div className="flex items-center space-x-2">
            <img src={camera} alt="CCTV" className="h-10 w-12" />
            {isOpen && (
              <h1 className="text-2xl font-bold text-[#012471]">
                CCTV Manager
              </h1>
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
                    src={item.icon}
                    alt={item.name}
                    className="w-9 h-9"
                  />
                  {isOpen && (
                    <span className="ml-4 text-xl">{item.name}</span>
                  )}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          className="rounded-t-xl cursor-pointer p-4 text-2xl font-bold text-red-600 border-t-2 border-gray-300 flex items-center justify-center gap-2 hover:bg-red-200 hover:scale-110 duration-300"
          onClick={() => setIsLogoutOpen(true)}
        >
          <img className="w-9 h-9" src={logoutIcon} alt="logout" />
          {isOpen && <span>Log out</span>}
        </button>
      </aside>

      {/* 🔴 LOGOUT CONFIRM MODAL */}
      {isLogoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[380px]">
            <h2 className="text-xl font-bold mb-3 text-red-600">Log out</h2>

            <p className="text-gray-700 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsLogoutOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;