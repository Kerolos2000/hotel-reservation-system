import { useReservationStore } from "src/stores/reservationStore"

export function useReservations() {
  const reservations = useReservationStore((state) => state.reservations)
  const addReservation = useReservationStore((state) => state.addReservation)
  const cancelReservation = useReservationStore((state) => state.cancelReservation)
  const setReservations = useReservationStore((state) => state.setReservations)
  const getUserReservations = useReservationStore((state) => state.getUserReservations)

  return {
    reservations,
    addReservation,
    cancelReservation,
    setReservations,
    getUserReservations,
  }
}
