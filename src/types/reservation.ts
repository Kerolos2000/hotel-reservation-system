export interface Room {
  id: string;
  type: "Single" | "Double" | "Suite";
  price: number;
  availability: boolean;
  description: string;
  amenities: string[];
  capacity: number;
  image: string;
}

export interface Reservation {
  id: string;
  userId: string;
  roomId: string;
  room?: Room;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: "active" | "cancelled";
  createdAt: string;
}

export interface RoomFilters {
  priceMin: number;
  priceMax: number;
  roomType: string | null;
}
