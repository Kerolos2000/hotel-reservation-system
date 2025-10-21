import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingSchema, type BookingFormData } from "src/validation/booking"
import { calculateNights, calculateTotalPrice } from "src/lib/utils"
import type { Room } from "src/types"

interface BookingFormProps {
  room: Room
  onSubmit: (data: BookingFormData) => void
  isLoading?: boolean
}

export function BookingForm({ room, onSubmit, isLoading = false }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const checkInDate = watch("checkInDate")
  const checkOutDate = watch("checkOutDate")

  const nights = checkInDate && checkOutDate ? calculateNights(checkInDate, checkOutDate) : 0
  const totalPrice = nights > 0 ? calculateTotalPrice(room.price, nights) : 0

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4 sticky top-24">
      <h3 className="text-lg md:text-xl font-bold text-gray-900">Book This Room</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label htmlFor="checkInDate" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Check-in Date
          </label>
          <input
            {...register("checkInDate")}
            type="date"
            id="checkInDate"
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.checkInDate && <p className="text-red-500 text-xs mt-1">{errors.checkInDate.message}</p>}
        </div>

        <div>
          <label htmlFor="checkOutDate" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Check-out Date
          </label>
          <input
            {...register("checkOutDate")}
            type="date"
            id="checkOutDate"
            min={checkInDate || new Date().toISOString().split("T")[0]}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.checkOutDate && <p className="text-red-500 text-xs mt-1">{errors.checkOutDate.message}</p>}
        </div>
      </div>

      {nights > 0 && (
        <div className="bg-blue-50 rounded-lg p-3 md:p-4 space-y-2">
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-gray-600">Number of nights:</span>
            <span className="font-semibold text-gray-900">{nights}</span>
          </div>
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-gray-600">Price per night:</span>
            <span className="font-semibold text-gray-900">${room.price}</span>
          </div>
          <div className="border-t border-blue-200 pt-2 flex justify-between">
            <span className="font-semibold text-gray-900 text-sm">Total Price:</span>
            <span className="text-lg md:text-2xl font-bold text-blue-600">${totalPrice}</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !room.availability}
        className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
      >
        {isLoading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  )
}
