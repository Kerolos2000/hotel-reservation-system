import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "src/hooks/stores";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui";

export function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const AuthLinks = () => (
    <>
      {isAuthenticated && user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">
              Welcome, <span className="font-semibold">{user.name}</span>
            </span>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </div>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-md h-[70px] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-neutral-600">
          HotelHub
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/">Browse Rooms</Link>
          <AuthLinks />
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-3/4 sm:w-2/3 p-6">
              <SheetHeader>
                <SheetTitle className="text-neutral-600 text-xl font-bold">
                  HotelHub
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col space-y-4">
                <Link to="/" onClick={() => setOpen(false)}>
                  Browse Rooms
                </Link>

                {isAuthenticated && user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                      Dashboard
                    </Link>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-600 mb-3 text-sm">
                        Welcome,{" "}
                        <span className="font-semibold">{user.name}</span>
                      </p>
                      <Button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      <Button>Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
