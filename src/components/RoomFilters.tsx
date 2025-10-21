import { PRICE_RANGE, ROOM_TYPES } from "src/constants";
import { useRoomStore } from "src/hooks/stores";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
} from "./ui";

export function RoomFilters() {
  const filters = useRoomStore((state) => state.filters);
  const setFilters = useRoomStore((state) => state.setFilters);

  const handleRoomTypeChange = (value: string) => {
    setFilters({ roomType: value === "all" ? null : value });
  };

  const handleSortChange = (value: string) => {
    const val = value as "asc" | "desc" | "none";
    setFilters({ sortOrder: val });
  };

  const handlePriceChange = (values: number[]) => {
    const [min, max] = values;
    setFilters({ priceMin: min, priceMax: max });
  };

  const resetFilters = () => {
    setFilters({
      priceMin: PRICE_RANGE.MIN,
      priceMax: PRICE_RANGE.MAX,
      roomType: null,
      sortOrder: "none",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-900">Filters</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Room Type</label>
        <Select
          value={filters.roomType || ""}
          onValueChange={handleRoomTypeChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {ROOM_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Price Range: ${filters.priceMin} – ${filters.priceMax}
        </label>
        <Slider
          min={PRICE_RANGE.MIN}
          max={PRICE_RANGE.MAX}
          step={10}
          value={[filters.priceMin, filters.priceMax]}
          onValueChange={handlePriceChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Sort by Price
        </label>
        <Select value={filters.sortOrder} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sort by Price</SelectItem>
            <SelectItem value="asc">Low to High</SelectItem>
            <SelectItem value="desc">High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );
}
