import api from './api';

export const getRecentlyVisitedHotels = async (userId) => {
  const res = await api.get(`/api/home/users/${userId}/recent-hotels`);
  return res.data;
};
