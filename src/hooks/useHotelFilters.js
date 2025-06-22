import { useMemo, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

const useHotelFilters = (results) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    starRating: [],
    roomTypes: [],
    amenities: [],
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const debouncedSetFilters = debounce(() => {
      setDebouncedFilters(filters);
    }, 300);

    debouncedSetFilters();

    return () => {
      debouncedSetFilters.cancel();
    };
  }, [filters]);

  const toggleFilter = (filterCategory, value) => {
    setFilters((prev) => {
      const current = prev[filterCategory];
      const exists = current.includes(value);
      return {
        ...prev,
        [filterCategory]: exists
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const filteredResults = useMemo(() => {
    if (!results) return [];

    return results.filter((hotel) => {
      const price = hotel.roomPrice * (1 - hotel.discount);
      const matchesPrice =
        price >= debouncedFilters.priceRange[0] &&
        price <= debouncedFilters.priceRange[1];
      const matchesRating =
        debouncedFilters.starRating.length === 0 ||
        debouncedFilters.starRating.includes(hotel.starRating);
      const matchesRoomType =
        debouncedFilters.roomTypes.length === 0 ||
        debouncedFilters.roomTypes.includes(hotel.roomType);
      const matchesAmenities =
        debouncedFilters.amenities.length === 0 ||
        debouncedFilters.amenities.every((a) =>
          hotel.amenities.some(
            (am) => am.name.toLowerCase() === a.toLowerCase()
          )
        );

      return (
        matchesPrice && matchesRating && matchesRoomType && matchesAmenities
      );
    });
  }, [results, debouncedFilters]);

  return {
    filters,
    setFilters,
    toggleFilter,
    filteredResults,
  };
};

export default useHotelFilters;
