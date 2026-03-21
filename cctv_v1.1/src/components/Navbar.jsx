import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // ✅ Role check
  const isAdmin = user?.role === "admin";

  return (
    <div className="bg-gradient-to-r from-white to-[#012471] flex justify-between shadow-2xl items-center px-8 py-5">
      
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img className="w-14 h-11" src="src/assets/camera.gif" alt="CCTV" />
        <h1 className="text-3xl font-bold text-blue-900">
          CCTV Manage
        </h1>
      </div>

      {/* Menu */}
      <ul className="flex text-white text-lg font-semibold space-x-6 items-center">
        
        {!user ? (
          <>
            {/* Login */}
            <li>
              <Link
                to="/login"
                className={`inline-block p-1 transition-all duration-300 transform 
                ${
                  location.pathname === "/login"
                    ? "border-b-2 border-white scale-110"
                    : "border-b-2 border-transparent text-gray-300 hover:text-white hover:border-white hover:scale-110"
                }`}
              >
                Login
              </Link>
            </li>

            {/* Register */}
            <li>
              <Link
                to="/register"
                className={`inline-block p-1 transition-all duration-300 transform 
                ${
                  location.pathname === "/register"
                    ? "border-b-2 border-white scale-110"
                    : "border-b-2 border-transparent text-gray-300 hover:text-white hover:border-white hover:scale-110"
                }`}
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* 👤 USER + TOOLTIP */}
            <li className="relative group text-white font-medium">
              <Link to="/dashboard" className="cursor-pointer">
                👤 {user.email || user.id}
              </Link>

              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full whitespace-nowrap bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300">
                {isAdmin
                  ? "Go to Admin Dashboard"
                  : "Go to Dashboard"}
              </span>
            </li>

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;