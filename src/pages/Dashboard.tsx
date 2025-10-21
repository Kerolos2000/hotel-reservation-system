import { useNavigate } from "react-router-dom";
import { ReservationCard } from "src/components";
import { useAuthStore, useReservationStore } from "src/hooks/stores";

export function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const reservations = useReservationStore((state) => state.reservations);

  if (!user) {
    navigate("/login");
    return null;
  }

  const activeReservations = reservations.filter(
    (r) => r.userId === user.id && r.status === "active"
  );

  const cancelledReservations = reservations.filter(
    (r) => r.userId === user.id && r.status === "cancelled"
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen-header bg-gray-50 py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* User Info Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                {user.email}
              </p>
            </div>
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-sm md:text-base"
              >
                Browse Rooms
              </button>
              <button
                onClick={handleLogout}
                className="px-4 md:px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition text-sm md:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Active Reservations */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Active Reservations
          </h2>

          {activeReservations.length > 0 ? (
            <div className="space-y-4 md:space-y-6">
              {activeReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
              <p className="text-gray-600 text-base md:text-lg mb-4">
                You don't have any active reservations.
              </p>
              <button
                onClick={() => navigate("/")}
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-sm md:text-base"
              >
                Browse Rooms
              </button>
            </div>
          )}
        </div>

        {/* Cancelled Reservations */}
        {cancelledReservations.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
              Cancelled Reservations
            </h2>
            <div className="space-y-4 md:space-y-6">
              {cancelledReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
