import type { Reservation } from "src/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReservationStore {
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  cancelReservation: (reservationId: string) => void;
  setReservations: (reservations: Reservation[]) => void;
  getUserReservations: (userId: string) => Reservation[];
}

export const useReservationStore = create<ReservationStore>()(
  persist(
    (set, get) => ({
      reservations: [],

      addReservation: (reservation) =>
        set((state) => {
          const exists = state.reservations.some(
            (r) => r.id === reservation.id
          );
          if (exists) return state;
          return { reservations: [...state.reservations, reservation] };
        }),

      cancelReservation: (reservationId) =>
        set((state) => ({
          reservations: state.reservations.map((res) =>
            res.id === reservationId ? { ...res, status: "cancelled" } : res
          ),
        })),

      setReservations: (reservations) => set({ reservations }),

      getUserReservations: (userId) =>
        get().reservations.filter(
          (res) => res.userId === userId && res.status === "active"
        ),
    }),
    {
      name: "reservation-storage",
    }
  )
);
