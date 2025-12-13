import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ role, children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/signin" />;
  if (user.role !== role) return <Navigate to="/" />;

  return children;
};

export default RoleRoute;
