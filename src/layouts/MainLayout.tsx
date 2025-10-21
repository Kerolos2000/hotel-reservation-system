import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "src/components";

export function MainLayout() {
  return (
    <div className="min-h-screen-header bg-gray-50">
      <Navbar />
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
}
