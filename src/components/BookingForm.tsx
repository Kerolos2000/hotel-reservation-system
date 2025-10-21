import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { calculateNights, calculateTotalPrice, cn } from "src/lib";
import { Room } from "src/types";
import { BookingFormData, bookingSchema } from "src/validation";
import {
  Button,
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui";

interface BookingFormProps {
  room: Room;
  onSubmit: (data: BookingFormData) => void;
  isLoading?: boolean;
}

export function BookingForm({
  room,
  onSubmit,
  isLoading = false,
}: BookingFormProps) {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");

  const nights =
    checkInDate && checkOutDate
      ? calculateNights(checkInDate, checkOutDate)
      : 0;
  const totalPrice = nights > 0 ? calculateTotalPrice(room.price, nights) : 0;

  const handleSelectDate = (
    field: "checkInDate" | "checkOutDate",
    date: Date | undefined
  ) => {
    if (date) setValue(field, format(date, "yyyy-MM-dd"));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4 sticky top-24"
    >
      <h3 className="text-lg md:text-xl font-bold text-gray-900">
        Book This Room
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="space-y-1">
          <Label
            htmlFor="checkInDate"
            className="text-sm font-medium text-gray-700"
          >
            Check-in Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkInDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate block w-full">
                  {checkInDate
                    ? format(new Date(checkInDate), "PPP")
                    : "Pick a date"}
                </span>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkInDate ? new Date(checkInDate) : undefined}
                onSelect={(date) => handleSelectDate("checkInDate", date)}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.checkInDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.checkInDate.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label
            htmlFor="checkOutDate"
            className="text-sm font-medium text-gray-700"
          >
            Check-out Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOutDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate block w-full">
                  {checkOutDate
                    ? format(new Date(checkOutDate), "PPP")
                    : "Pick a date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOutDate ? new Date(checkOutDate) : undefined}
                onSelect={(date) => handleSelectDate("checkOutDate", date)}
                disabled={(date) =>
                  date < (checkInDate ? new Date(checkInDate) : new Date())
                }
              />
            </PopoverContent>
          </Popover>

          {errors.checkOutDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.checkOutDate.message}
            </p>
          )}
        </div>
      </div>

      {nights > 0 && (
        <div className="bg-neutral-50 rounded-lg p-3 md:p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Number of nights:</span>
            <span className="font-semibold text-gray-900">{nights}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price per night:</span>
            <span className="font-semibold text-gray-900">${room.price}</span>
          </div>
          <div className="border-t border-neutral-200 pt-2 flex justify-between">
            <span className="font-semibold text-gray-900 text-sm">
              Total Price:
            </span>
            <span className="text-lg md:text-2xl font-bold text-neutral-600">
              ${totalPrice}
            </span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading || !room.availability}
        className="w-full"
      >
        {isLoading ? "Booking..." : "Confirm Booking"}
      </Button>
    </form>
  );
}
