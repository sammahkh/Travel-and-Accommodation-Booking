import { useEffect, useState } from 'react';
import { getHotelGallery } from '../services/hotelService';

const useHotelGallery = (hotelId) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getHotelGallery(hotelId);
        setImages(data.map((img) => img.url));
      } catch (err) {
        setError('Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [hotelId]);

  return { images, loading, error };
};

export default useHotelGallery;
