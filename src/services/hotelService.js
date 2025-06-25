import api from './api';

export const getHotelDetails = async (hotelId) => {
  const res = await api.get(`/api/hotels/${hotelId}?includeRooms=false`);
  return res.data;
};

export const getHotelGallery = async (hotelId) => {
  const res = await api.get(`/api/hotels/${hotelId}/gallery`);
  return res.data;
};

export const getAllRooms = async (hotelId, checkInDate, checkOutDate) => {
  const res = await api.get(`/api/hotels/${hotelId}/rooms`, {
    params: {
      checkInDate,
      CheckOutDate: checkOutDate,
    },
  });
  return res.data;
};

export const getAvailableRooms = async (hotelId, checkInDate, checkOutDate) => {
  const res = await api.get(`/api/hotels/${hotelId}/available-rooms`, {
    params: {
      checkInDate,
      CheckOutDate: checkOutDate,
    },
  });
  return res.data;
};
