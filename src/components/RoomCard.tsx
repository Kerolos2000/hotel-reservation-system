import { Link } from "react-router-dom"
import type { Room } from "src/types"

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Link to={`/room/${room.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
        <div className="relative w-full h-40 md:h-48 bg-gray-200 overflow-hidden">
          <img
            src={room.image || "/placeholder.svg"}
            alt={room.type}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {!room.availability && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">Not Available</span>
            </div>
          )}
        </div>

        <div className="p-3 md:p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2 gap-2">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">{room.type} Room</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap">
              {room.capacity} guests
            </span>
          </div>

          <p className="text-gray-600 text-xs md:text-sm mb-3 flex-1 line-clamp-2">{room.description}</p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-xl md:text-2xl font-bold text-blue-600">${room.price}</span>
            <span className="text-gray-500 text-xs md:text-sm">per night</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
