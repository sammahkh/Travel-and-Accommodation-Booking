import api from './api';

export const searchHotels = async (params) => {
  const response = await api.get('/api/home/search', {
    params,
  });
  return response.data;
};
