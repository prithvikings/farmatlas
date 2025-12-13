import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or loader

  if (user) {
    // Redirect logged-in user to correct dashboard
    if (user.role === "ADMIN") return <Navigate to="/admin" />;
    if (user.role === "WORKER") return <Navigate to="/worker" />;
    if (user.role === "VET") return <Navigate to="/vet" />;
  }

  return children;
};

export default PublicRoute;
