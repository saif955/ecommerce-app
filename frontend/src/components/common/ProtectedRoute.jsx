import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
