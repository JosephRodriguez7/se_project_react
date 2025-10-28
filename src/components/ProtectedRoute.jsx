import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
  children,
  anonymous = false,
}) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}
