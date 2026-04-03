import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import camera from "/src/assets/camera.gif";
import { getCurrentUser } from "../utils/auth";

function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
    };
    loadUser();
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isAdmin = user?.role === "admin";

  const linkClass = (path) =>
    `inline-block p-1 transition-all duration-300 transform 
    ${
      location.pathname === path
        ? "border-b-2 border-white scale-110"
        : "border-b-2 border-transparent text-gray-300 hover:text-white hover:border-white hover:scale-110"
    }`;

  return (
    <div className="bg-gradient-to-r from-white via-white to-[#012471]/95 sm:bg-gradient-to-r sm:from-white sm:to-[#012471]/95 shadow-2xl">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3 sm:py-5">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="w-17 h-14 sm:w-14 sm:h-11" src={camera} alt="CCTV" />
          <h1 className="text-3xl sm:text-3xl font-bold text-blue-900">CCTV Manage</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-white text-lg font-semibold space-x-6 items-center">
          {!user ? (
            <>
              <li><Link to="/login" className={linkClass("/login")}>Login</Link></li>
              <li><Link to="/register" className={linkClass("/register")}>Register</Link></li>
            </>
          ) : (
            <>
              <li className="relative group text-white font-medium">
                <Link to="/dashboard" className="cursor-pointer">
                  👤 {user.email || user.id}
                </Link>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full whitespace-nowrap bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {isAdmin ? "Go to Admin Dashboard" : "Go to Dashboard"}
                </span>
              </li>
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

        {/* Hamburger Button (mobile only) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 space-y-1.5 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col text-lg font-semibold px-6 sm:px-8 py-2 pb-6 space-y-3">
          {!user ? (
            <>
              <li>
                <Link 
                  to="/login" 
                  className={`block px-6 py-3 rounded-xl transition ${
                    location.pathname === "/login" ? "bg-blue-200" : "hover:bg-blue-200"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className={`block px-6 py-3 rounded-xl transition ${
                    location.pathname === "/register" ? "bg-blue-200" : "hover:bg-blue-200"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard" className="cursor-pointer text-blue-600 block px-6 py-3">
                  👤 {user.email || user.id}
                </Link>
                <p className="text-xs text-gray-500 mt-0.5 px-6">
                  {isAdmin ? "Admin Dashboard" : "Dashboard"}
                </p>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-6 py-3 rounded-xl hover:bg-red-600 transition text-white w-full text-left"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;