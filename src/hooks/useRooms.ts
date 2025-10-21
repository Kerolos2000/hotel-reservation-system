import { useRoomStore } from "src/stores/roomStore"

export function useRooms() {
  const rooms = useRoomStore((state) => state.rooms)
  const filters = useRoomStore((state) => state.filters)
  const setRooms = useRoomStore((state) => state.setRooms)
  const setFilters = useRoomStore((state) => state.setFilters)
  const getFilteredRooms = useRoomStore((state) => state.getFilteredRooms)

  return {
    rooms,
    filters,
    setRooms,
    setFilters,
    getFilteredRooms,
  }
}
