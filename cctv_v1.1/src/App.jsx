import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import Addproduct from "./page/Addproduct";
import ProductList from "./page/ProductList";
import UserManagement from "./page/UserManagement";

function App() {
  return (
    <BrowserRouter>
  <Routes>

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/productlist" element={<ProductList />} />
      </Route>
    </Route>

    {/* Admin Only */}
    <Route element={<ProtectedRoute adminOnly />}>
      <Route element={<DashboardLayout />}>
        <Route path="/usermanagement" element={<UserManagement />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/login" />} />

  </Routes>
</BrowserRouter>

  );
}

export default App;
