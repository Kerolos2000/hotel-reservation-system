import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "src/stores/authStore";

export function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDrawerOpen(false);
  };

  return (
    <nav className="bg-white shadow-md h-[70px] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            HotelHub
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Browse Rooms
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 text-sm">
                    Welcome, <span className="font-semibold">{user.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} aria-hidden="true" aria-label="Open menu" />
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-3/4 sm:w-2/3 h-full shadow-lg flex flex-col p-6 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-600">HotelHub</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition"
                aria-label="Close menu"
              >
                <X size={26} aria-hidden="true" aria-label="Close menu" />
              </button>
            </div>
            <Link
              to="/"
              onClick={() => setDrawerOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition text-lg"
            >
              Browse Rooms
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setDrawerOpen(false)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition text-lg"
                >
                  Dashboard
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-600 mb-3 text-sm">
                    Welcome, <span className="font-semibold">{user.name}</span>
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <Link
                  to="/login"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full text-center py-2 text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full text-center py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
