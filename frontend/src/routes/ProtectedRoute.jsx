import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

// requireAdmin=false -> Level 2 (any logged-in customer or admin)
// requireAdmin=true  -> Level 3 (admin role AND the separate admin access code)
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, adminVerified, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requireAdmin) {
    if (!isAdmin) return <Navigate to="/" replace />;
    if (!adminVerified) {
      return <Navigate to="/admin-access" replace state={{ from: location.pathname }} />;
    }
  }

  return children;
}
