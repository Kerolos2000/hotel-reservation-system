import {
  ArrowLeft,
  Check,
  CheckCircle,
  DollarSign,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { BookingForm } from "src/components";
import { useAuthStore, useReservationStore, useRoomStore } from "src/hooks";
import { BookingFormData } from "src/validation";

export function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const rooms = useRoomStore((state) => state.rooms);
  const addReservation = useReservationStore((state) => state.addReservation);
  const [isLoading, setIsLoading] = useState(false);

  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="min-h-screen-header flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Room Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = async (data: BookingFormData) => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to book a room");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const reservation = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        roomId: room.id,
        room,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        totalPrice:
          room.price *
          Math.ceil(
            (new Date(data.checkOutDate).getTime() -
              new Date(data.checkInDate).getTime()) /
              (1000 * 60 * 60 * 24)
          ),
        status: "active" as const,
        createdAt: new Date().toISOString(),
      };

      addReservation(reservation);
      toast.success("Room booked successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen-header bg-gray-50 py-6 md:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:text-blue-700 font-medium mb-4 md:mb-6 flex items-center gap-2 text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Rooms
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-64 md:h-96 bg-gray-200">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.type}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                    {room.type} Room
                  </h1>
                  <p className="text-gray-600 text-base md:text-lg">
                    {room.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="bg-blue-50 rounded-xl p-3 md:p-4 flex flex-col">
                    <p className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      Capacity
                    </p>
                    <p className="text-xl md:text-2xl font-semibold text-blue-700">
                      {room.capacity}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-3 md:p-4 flex flex-col">
                    <p className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-blue-500" />
                      Price/Night
                    </p>
                    <p className="text-xl md:text-2xl font-semibold text-blue-700">
                      ${room.price}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl p-3 md:p-4 flex flex-col ${
                      room.availability ? "bg-emerald-50/60" : "bg-rose-50/60"
                    }`}
                  >
                    <p className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
                      {room.availability ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                      Status
                    </p>
                    <p
                      className={`text-lg md:text-xl font-semibold ${
                        room.availability ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {room.availability ? "Available" : "Booked"}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 text-gray-700 text-sm md:text-base"
                      >
                        <Check className="w-4 h-4 text-blue-600" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {isAuthenticated ? (
              <BookingForm
                room={room}
                onSubmit={handleBooking}
                isLoading={isLoading}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 text-center space-y-4">
                <p className="text-gray-600 text-sm md:text-base">
                  Please log in to book this room
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm md:text-base"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
