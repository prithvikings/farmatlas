import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ SUPPORT ARRAY OR STRING
  if (Array.isArray(role)) {
    if (!role.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  } else {
    if (user.role !== role) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default RoleRoute;
