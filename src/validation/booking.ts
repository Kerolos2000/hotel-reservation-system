import { z } from "zod"

export const bookingSchema = z
  .object({
    checkInDate: z.string().min(1, "Check-in date is required"),
    checkOutDate: z.string().min(1, "Check-out date is required"),
  })
  .refine((data) => new Date(data.checkInDate) < new Date(data.checkOutDate), {
    message: "Check-out date must be after check-in date",
    path: ["checkOutDate"],
  })

export type BookingFormData = z.infer<typeof bookingSchema>
