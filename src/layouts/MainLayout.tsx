import type React from "react";
import { Toaster } from "sonner";
import { Navbar } from "src/components/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen-header bg-gray-50">
      <Navbar />
      <main className="pt-0">{children}</main>
      <Toaster position="top-right" />
    </div>
  );
}
