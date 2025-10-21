import { Navigate } from "react-router-dom";
import { useAuthStore } from "src/stores/authStore";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  console.log("🚀 ~ ProtectedRoute ~ isAuthenticated:", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
