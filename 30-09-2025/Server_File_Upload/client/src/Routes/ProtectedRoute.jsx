import { Navigate } from "react-router-dom";
import { useAuth } from "../customHook/useAuth";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
