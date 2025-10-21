import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "src/components/Navbar";

export function MainLayout() {
  return (
    <div className="h-screen-header bg-gray-50">
      <Navbar />
      <main className="pt-0">
        {" "}
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
