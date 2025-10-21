import { Link } from "react-router-dom";
import type { Room } from "src/types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const { id, image, type, description, price, capacity, availability } = room;

  return (
    <Link to={`/room/${id}`} className="block h-full">
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative w-full h-40 md:h-48 overflow-hidden bg-gray-100">
          <img
            src={image || "/placeholder.svg"}
            alt={`${type} room`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!availability && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-white font-semibold text-sm md:text-base">
                Not Available
              </span>
            </div>
          )}
        </div>

        <CardHeader className="flex flex-row items-center justify-between px-4 pt-4 pb-2">
          <CardTitle className="text-base md:text-lg font-semibold">
            {type} Room
          </CardTitle>
          <Badge
            variant="secondary"
            className="text-xs font-medium px-2 py-0.5 whitespace-nowrap"
          >
            {capacity} guests
          </Badge>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-1 px-4 pb-4">
          <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-3">
            {description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-xl md:text-2xl font-bold text-neutral-600">
              ${price}
            </span>
            <span className="text-gray-500 text-xs md:text-sm">per night</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
