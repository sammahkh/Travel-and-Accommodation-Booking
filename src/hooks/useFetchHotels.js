import { useEffect, useState } from 'react';
import { searchHotels } from '../services/searchService';

const useFetchHotels = (queryParams, sort) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        const data = await searchHotels({
          city: queryParams.get('city'),
          checkInDate: queryParams.get('checkInDate'),
          checkOutDate: queryParams.get('checkOutDate'),
          numberOfRooms: queryParams.get('numberOfRooms'),
          adults: queryParams.get('adults'),
          children: queryParams.get('children'),
          ...(sort && { sort }),
        });
        setResults(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [queryParams, sort]);

  return { results, isLoading, error };
};

export default useFetchHotels;
