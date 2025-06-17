import api from './api';

export const getFeaturedDeals = async () => {
  const response = await api.get('api/home/featured-deals');
  return response.data;
};
