import { createBrowserRouter } from "react-router-dom";
import { HydrateFallback } from "src/components/HydrateFallback";
import { MainLayout } from "src/layouts/MainLayout";
import { ProtectedRoute } from "src/routes/ProtectedRoute";

export const AppRoutes = createBrowserRouter([
  {
    Component: MainLayout,
    HydrateFallback,
    id: "root",
    children: [
      {
        index: true,
        async lazy() {
          const { Home } = await import("src/pages/Home");
          return { Component: Home };
        },
      },
      {
        path: "/login",
        async lazy() {
          const { Login } = await import("src/pages/Login");
          return { Component: Login };
        },
      },
      {
        path: "/signup",
        async lazy() {
          const { Signup } = await import("src/pages/Signup");
          return { Component: Signup };
        },
      },
      {
        path: "/room/:id",
        async lazy() {
          const { RoomDetails } = await import("src/pages/RoomDetails");
          return { Component: RoomDetails };
        },
      },
      {
        path: "/dashboard",
        async lazy() {
          const { Dashboard } = await import("src/pages/Dashboard");
          return {
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          };
        },
      },
    ],
  },
]);
