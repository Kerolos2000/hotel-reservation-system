import type React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { MainLayout } from "src/layouts/MainLayout";
import { Dashboard } from "src/pages/Dashboard";
import { Home } from "src/pages/Home";
import { Login } from "src/pages/Login";
import { RoomDetails } from "src/pages/RoomDetails";
import { Signup } from "src/pages/Signup";
import { useAuthStore } from "src/stores/authStore";
import "src/styles/globals.css";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  console.log("🚀 ~ ProtectedRoute ~ isAuthenticated:", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}
