import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import Register from "./page/Register";
import Addproduct from "./page/Addproduct";
import ProductList from "./page/ProductList";
import UserManagement from "./page/UserManagement";

// Layout for Dashboard & other pages with Sidebar
function ProtectedLayout({ isOpen, setIsOpen }) {
  return (
    // Sidebar
    <div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ease-in-out flex-1 min-h-screen bg-gray-50 
    ${isOpen ? "md:ml-[22%]" : "md:ml-[9%]"}`}
      >
        <div className="p-4 md:p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproduct" element={<Addproduct />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/usermanagement" element={<UserManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Main App wrapper
function AppWrapper() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Show Navbar ONLY on login & register
  const showNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* All other pages go to protected layout */}
        <Route
          path="/*"
          element={<ProtectedLayout isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
      </Routes>
    </div>
  );
}

// Root component
export default function App() {
  return (
    <Router>
      <AppWrap per />
    </Router>
  );
}
