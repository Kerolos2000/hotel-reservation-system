import { MOCK_ROOMS } from "src/constants";
import type { Room, RoomFilters } from "src/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomStore {
  rooms: Room[];
  filters: RoomFilters;
  setRooms: (rooms: Room[]) => void;
  setFilters: (filters: Partial<RoomFilters>) => void;
  getFilteredRooms: () => Room[];
}

export const useRoomStore = create<RoomStore>()(
  persist(
    (set, get) => ({
      rooms: MOCK_ROOMS,
      filters: {
        priceMin: 50,
        priceMax: 500,
        roomType: null,
      },

      setRooms: (rooms) => set({ rooms }),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      getFilteredRooms: () => {
        const { rooms, filters } = get();
        return rooms.filter((room) => {
          const priceMatch =
            room.price >= filters.priceMin && room.price <= filters.priceMax;
          const typeMatch = !filters.roomType || room.type === filters.roomType;
          return priceMatch && typeMatch;
        });
      },
    }),
    {
      name: "room-storage",
      partialize: (state) => ({
        filters: state.filters,
      }),
    }
  )
);
