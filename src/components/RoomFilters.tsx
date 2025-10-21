import type React from "react";
import { PRICE_RANGE, ROOM_TYPES } from "src/constants";
import { useRoomStore } from "src/stores/roomStore";

export function RoomFilters() {
  const filters = useRoomStore((state) => state.filters);
  const setFilters = useRoomStore((state) => state.setFilters);

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      priceMin: Number(e.target.value),
    });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      priceMax: Number(e.target.value),
    });
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      roomType: e.target.value || null,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-900">Filters</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Room Type
        </label>
        <select
          value={filters.roomType || ""}
          onChange={handleRoomTypeChange}
          className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
        >
          <option value="">All Types</option>
          {ROOM_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ${filters.priceMin} - ${filters.priceMax}
        </label>
        <div className="space-y-3">
          <div>
            <label htmlFor="priceMin" className="text-xs text-gray-600">
              Minimum
            </label>
            <input
              id="priceMin"
              type="range"
              min={PRICE_RANGE.MIN}
              max={PRICE_RANGE.MAX}
              value={filters.priceMin}
              onChange={handlePriceMinChange}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="priceMax" className="text-xs text-gray-600">
              Maximum
            </label>
            <input
              id="priceMax"
              type="range"
              min={PRICE_RANGE.MIN}
              max={PRICE_RANGE.MAX}
              value={filters.priceMax}
              onChange={handlePriceMaxChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          setFilters({
            priceMin: PRICE_RANGE.MIN,
            priceMax: PRICE_RANGE.MAX,
            roomType: null,
          })
        }
        className="w-full bg-gray-200 text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-300 transition text-sm md:text-base"
      >
        Reset Filters
      </button>
    </div>
  );
}
