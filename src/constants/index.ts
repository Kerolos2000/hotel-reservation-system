export const ROOM_TYPES = ["Single", "Double", "Suite"] as const;

export const PRICE_RANGE = {
  MIN: 50,
  MAX: 500,
} as const;

export const MOCK_ROOMS: Array<{
  id: string;
  type: "Single" | "Double" | "Suite";
  price: number;
  availability: boolean;
  description: string;
  amenities: string[];
  capacity: number;
  image: string;
}> = [
  {
    id: "1",
    type: "Single",
    price: 89,
    availability: true,
    description: "Cozy single room perfect for solo travelers",
    amenities: ["WiFi", "TV", "Air Conditioning", "Private Bathroom"],
    capacity: 1,
    image: "/hotel1.webp",
  },
  {
    id: "2",
    type: "Double",
    price: 129,
    availability: true,
    description: "Spacious double room with queen bed",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
    ],
    capacity: 2,
    image: "/hotel2.webp",
  },
  {
    id: "3",
    type: "Suite",
    price: 249,
    availability: true,
    description: "Luxurious suite with separate living area",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Jacuzzi",
    ],
    capacity: 4,
    image: "/hotel3.webp",
  },
  {
    id: "4",
    type: "Single",
    price: 79,
    availability: true,
    description: "Budget-friendly single room",
    amenities: ["WiFi", "TV", "Private Bathroom"],
    capacity: 1,
    image: "/hotel4.webp",
  },
  {
    id: "5",
    type: "Double",
    price: 159,
    availability: false,
    description: "Premium double room with city view",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Balcony",
    ],
    capacity: 2,
    image: "/hotel5.webp",
  },
  {
    id: "6",
    type: "Suite",
    price: 299,
    availability: true,
    description: "Presidential suite with premium amenities",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Jacuzzi",
      "Concierge",
    ],
    capacity: 4,
    image: "/hotel6.webp",
  },
];
