import api from './api';

export const getTrendingDestinations = async () => {
  const response = await api.get('/api/home/destinations/trending');
  return response.data;
};
