import { useEffect, useState } from 'react';
import { getHotelDetails } from '../services/hotelService';

const useHotelDetails = (hotelId) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHotelDetails(hotelId);
        setHotel(data);
      } catch (err) {
        setError('Failed to load hotel details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [hotelId]);

  return { hotel, loading, error };
};

export default useHotelDetails;
