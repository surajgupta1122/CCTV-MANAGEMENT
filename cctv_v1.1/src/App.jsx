import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import Register from "./page/Register";
import Addproduct from "./page/Addproduct";
import ProductList from "./page/ProductList";
import UserManagement from "./page/UserManagement";

function App() {
  return (
    
    <Router>
    <div className="flex h-screen">
    {/* Sidebar can stay fixed if you want */}
    <Sidebar />
    <div className="flex flex-col flex-1">
    <Navbar />
    {/* Main content area */}
    <div className="overflow-y-auto flex-1 bg-gray-50">
    
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addproduct" element={<Addproduct />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/usermanagement" element={<UserManagement />} />
    </Routes>
    
    </div>
    </div>
    </div>
    </Router>
  );
}

export default App;
