import { useState } from "react";
import { toast } from "sonner";
import { useReservationStore } from "src/hooks/stores";
import { formatDate } from "src/lib";
import type { Reservation } from "src/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui";

interface ReservationCardProps {
  reservation: Reservation;
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  const cancelReservation = useReservationStore((s) => s.cancelReservation);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirmCancel = async () => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      cancelReservation(reservation.id);
      toast.success("Reservation cancelled successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to cancel reservation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg md:text-xl">
              {reservation.room?.type} Room
            </CardTitle>
            <p className="text-gray-600 text-xs md:text-sm mt-1">
              {reservation.room?.description}
            </p>
          </div>

          <Badge
            variant={reservation.status === "active" ? "outline" : "secondary"}
            className={`text-xs font-medium px-2 md:px-3 py-1 rounded-full whitespace-nowrap ${
              reservation.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {reservation.status === "active" ? "Active" : "Cancelled"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
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
            <p className="font-semibold text-neutral-600 text-sm md:text-base">
              ${reservation.totalPrice}
            </p>
          </div>
        </div>

        {reservation.status === "active" && (
          <div className="mt-4">
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition text-sm md:text-base"
                >
                  Cancel Reservation
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel reservation?</AlertDialogTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    This action will cancel the reservation. This cannot be
                    undone.
                  </p>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4 flex gap-2">
                  <AlertDialogCancel asChild>
                    <Button variant="outline">Keep Reservation</Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      onClick={handleConfirmCancel}
                      disabled={isLoading}
                      className="bg-red-600 text-white"
                    >
                      {isLoading ? "Cancelling..." : "Confirm Cancel"}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
