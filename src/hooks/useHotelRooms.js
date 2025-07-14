import { useState, useEffect } from 'react';
import { getAllRooms, getAvailableRooms } from '../services/hotelService';

const useHotelRooms = (hotelId, checkInDate, checkOutDate) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);

        const data =
          checkInDate && checkOutDate
            ? await getAvailableRooms(hotelId, checkInDate, checkOutDate)
            : await getAllRooms(hotelId, 'null', 'null');

        setRooms(data);
      } catch (err) {
        setError('Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId, checkInDate, checkOutDate]);

  return { rooms, loading, error };
};

export default useHotelRooms;
