import { createBrowserRouter } from "react-router-dom";
import { HydrateFallback } from "src/components";
import { MainLayout } from "src/layouts";
import { ProtectedRoute } from "src/routes";

export const AppRoutes = createBrowserRouter([
  {
    Component: MainLayout,
    HydrateFallback,
    id: "root",
    children: [
      {
        index: true,
        async lazy() {
          const { Home } = await import("src/pages");
          return { Component: Home };
        },
      },
      {
        path: "/login",
        async lazy() {
          const { Login } = await import("src/pages");
          return { Component: Login };
        },
      },
      {
        path: "/signup",
        async lazy() {
          const { Signup } = await import("src/pages");
          return { Component: Signup };
        },
      },
      {
        path: "/room/:id",
        async lazy() {
          const { RoomDetails } = await import("src/pages");
          return { Component: RoomDetails };
        },
      },
      {
        path: "/dashboard",
        async lazy() {
          const { Dashboard } = await import("src/pages");
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
