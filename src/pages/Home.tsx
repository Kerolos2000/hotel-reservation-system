import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  RoomCard,
  RoomFilters,
  Separator,
} from "src/components";
import { useRoomStore } from "src/hooks";

export function Home() {
  const rooms = useRoomStore((state) => state.rooms);
  const filters = useRoomStore((state) => state.filters);
  const getFilteredRooms = useRoomStore((state) => state.getFilteredRooms);
  const [filteredRooms, setFilteredRooms] = useState<typeof rooms>([]);

  useEffect(() => {
    setFilteredRooms(getFilteredRooms());
  }, [filters, getFilteredRooms]);

  return (
    <div className="min-h-screen-header bg-gray-50">
      <div className="bg-gradient-to-r from-black via-gray-800 to-gray-700 text-white py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Perfect Room
          </h1>
          <p className="text-base md:text-xl text-neutral-100">
            Browse our collection of comfortable and luxurious rooms
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <RoomFilters />
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <Card className="p-8 md:p-12 text-center">
                <CardContent>
                  <p className="text-gray-600 text-base md:text-lg">
                    No rooms found matching your filters.
                  </p>
                  <Separator className="my-4" />
                  <p className="text-gray-500">
                    Try adjusting your search criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
