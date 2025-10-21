import { RouterProvider } from "react-router-dom";
import "src/styles/globals.css";
import { AppRoutes } from "./routes";

export function App() {
  return <RouterProvider router={AppRoutes} />;
}
