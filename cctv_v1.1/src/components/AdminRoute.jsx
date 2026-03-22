import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const AdminRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;