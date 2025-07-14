import api from './api';

export const createBooking = async (bookingData) => {
  const res = await api.post('/api/bookings', bookingData);
  return res.data;
};
