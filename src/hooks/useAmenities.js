import { useEffect, useState } from 'react';
import { getAmenities } from '../services/amenitiesService';

const useAmenities = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAmenities();
        setAmenities(data.map((item) => item.name));
      } catch (err) {
        setError('Failed to fetch amenities');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { amenities, loading, error };
};

export default useAmenities;
