import { useParams } from 'react-router-dom';
import { CircularProgress, Alert, Container, Typography } from '@mui/material';
import { useState } from 'react';

import useHotelDetails from '../hooks/useHotelDetails';
// import useHotelGallery from '../hooks/useHotelGallery';

import MainLayout from '../layouts/MainLayout';
import HotelHeader from '../components/Hotel/HotelHeader';
// import HotelGallery from '../components/Hotel/HotelGallery';
import HotelMap from '../components/Hotel/HotelMap';

import useHotelRooms from '../hooks/useHotelRooms';
import RoomList from '../components/Hotel/RoomList';
import RoomFilterForm from '../components/Hotel/RoomFilterForm';

const HotelPage = () => {
  const { hotelId } = useParams();
  console.log(hotelId);
  const { hotel, loading, error } = useHotelDetails(hotelId);
  // const { images, loading: galleryLoading } = useHotelGallery(hotelId);

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const {
    rooms,
    loading: roomLoading,
    error: roomError,
  } = useHotelRooms(hotelId, checkInDate, checkOutDate);

  const handleFilterSubmit = ({ checkInDate, checkOutDate }) => {
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
  };
  // add this in the if (loading || galleryLoading)
  if (loading) {
    return (
      <MainLayout showNavLinks={false}>
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 6 }} />
      </MainLayout>
    );
  }
  if (error) {
    return (
      <MainLayout showNavLinks={false}>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </MainLayout>
    );
  }

  return (
    <MainLayout showNavLinks={false}>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <HotelHeader hotel={hotel} />
        {/* <HotelGallery images={images} /> */}
        <HotelMap latitude={hotel.latitude} longitude={hotel.longitude} />

        <Typography variant="h5" mt={6} mb={3}>
          Rooms
        </Typography>

        <RoomFilterForm onSubmit={handleFilterSubmit} />

        <RoomList
          rooms={rooms}
          isAvailableList={!!checkInDate && !!checkOutDate}
        />
      </Container>
    </MainLayout>
  );
};

export default HotelPage;
