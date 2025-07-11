import api from './api';

export const fetchCities = async ({ name, searchQuery }) => {
  const params = {};
  if (name) params.name = name;
  if (searchQuery) params.searchQuery = searchQuery;

  const res = await api.get('/api/cities', { params });
  return res.data;
};

export const deleteCity = async (cityId) => {
  return api.delete(`/api/cities/${cityId}`);
};
