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

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
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

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface RoomFilters {
  priceMin: number;
  priceMax: number;
  roomType: string | null;
}
