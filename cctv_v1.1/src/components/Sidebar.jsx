import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";

import camera from "../assets/camera.gif";
import menuIcon from "../assets/icons/menu.png";
import addCartIcon from "../assets/icons/add-cart.png";
import userSettingIcon from "../assets/icons/user-setting.png";
import packingListIcon from "../assets/icons/packing-list.png";
import logoutIcon from "../assets/icons/logout.png";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
      setLoading(false);
    };

    loadUser();
  }, []);

  const isAdmin = user?.role === "admin";

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

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

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  // Optional: prevent flicker before user loads
  if (loading) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-90 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed h-screen bg-white border-r-2 border-gray-300 flex flex-col duration-300 ease-in-out z-50
        ${isOpen ? "w-[70%] sm:w-[50%] md:w-[22%]" : "w-[15%] sm:w-[12%] md:w-[9%]"}
        ${isOpen ? "left-0" : "-left-full md:left-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-gray-300 p-3 sm:p-4">
          <div className="flex items-center space-x-2">
            <img src={camera} alt="CCTV" className="h-8 w-10 sm:h-10 sm:w-12" />
            {isOpen && (
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#012471]">
                CCTV Manager
              </h1>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl sm:text-3xl font-bold text-[#012471] hover:scale-110 duration-300"
          >
            {isOpen ? "❮" : "❯"}
          </button>
        </div>

        {/* Navigation */}
        <ul className="mt-2 flex-1 p-2 sm:p-3 space-y-2 text-gray-700 overflow-y-auto">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={({ isActive }) =>
                  `flex items-center p-3 sm:p-4 rounded-xl hover:bg-blue-100 hover:text-blue-900 hover:scale-105 duration-300
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
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
                  />
                  {isOpen && (
                    <span className="ml-3 sm:ml-4 text-sm sm:text-base md:text-xl">
                      {item.name}
                    </span>
                  )}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          className="rounded-t-xl cursor-pointer p-3 sm:p-4 text-xl sm:text-2xl font-bold text-red-600 border-t-2 border-gray-300 flex items-center justify-center gap-2 hover:bg-red-200 hover:scale-110 duration-300"
          onClick={() => setIsLogoutOpen(true)}
        >
          <img className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" src={logoutIcon} alt="logout" />
          {isOpen && <span className="text-sm sm:text-base md:text-xl">Log out</span>}
        </button>
      </aside>

      {/* Mobile Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-2 top-4 md:hidden text-[#012471] p-3 rounded-full shadow-lg hover:scale-110 transition duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* LOGOUT CONFIRM MODAL */}
      {isLogoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-5 sm:p-6 w-[90%] sm:w-[380px]">
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-red-600">Log out</h2>

            <p className="text-sm sm:text-base text-gray-700 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsLogoutOpen(false)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg text-sm sm:text-base"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base"
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