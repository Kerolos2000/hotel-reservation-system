import { useState } from "react";
import { toast } from "sonner";
import { useReservationStore } from "src/hooks/stores";
import { formatDate } from "src/lib";
import type { Reservation } from "src/types";

interface ReservationCardProps {
  reservation: Reservation;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  const cancelReservation = useReservationStore(
    (state) => state.cancelReservation
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this reservation?"))
      return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      cancelReservation(reservation.id);
      toast.success("Reservation cancelled successfully");
    } catch {
      toast.error("Failed to cancel reservation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            {reservation.room?.type} Room
          </h3>
          <p className="text-gray-600 text-xs md:text-sm mt-1">
            {reservation.room?.description}
          </p>
        </div>
        <span
          className={`text-xs font-medium px-2 md:px-3 py-1 rounded-full whitespace-nowrap ${
            reservation.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {reservation.status === "active" ? "Active" : "Cancelled"}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-3 md:py-4 border-y border-gray-200">
        <div>
          <p className="text-gray-600 text-xs md:text-sm">Check-in</p>
          <p className="font-semibold text-gray-900 text-sm md:text-base">
            {formatDate(reservation.checkInDate)}
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-xs md:text-sm">Check-out</p>
          <p className="font-semibold text-gray-900 text-sm md:text-base">
            {formatDate(reservation.checkOutDate)}
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-xs md:text-sm">Guests</p>
          <p className="font-semibold text-gray-900 text-sm md:text-base">
            {reservation.room?.capacity}
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-xs md:text-sm">Total Price</p>
          <p className="font-semibold text-blue-600 text-sm md:text-base">
            ${reservation.totalPrice}
          </p>
        </div>
      </div>

      {reservation.status === "active" && (
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        >
          {isLoading ? "Cancelling..." : "Cancel Reservation"}
        </button>
      )}
    </div>
  );
}
