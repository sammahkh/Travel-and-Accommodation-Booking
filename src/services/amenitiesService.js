import api from './api';

export const getAmenities = async () => {
  const response = await api.get('/api/search-results/amenities');
  return response.data;
};
