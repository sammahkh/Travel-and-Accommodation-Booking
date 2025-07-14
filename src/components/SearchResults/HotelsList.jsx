import { Grid, Typography, CircularProgress } from '@mui/material';
import HotelCard from '../Common/HotelCard';

const HotelsList = ({ hotels, isLoading, error }) => {
  if (isLoading)
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error)
    return <Typography color="error">Failed to load hotels.</Typography>;
  if (hotels.length === 0)
    return (
      <Typography textAlign="center" mt={4}>
        No hotels found matching your search criteria.
      </Typography>
    );

  return (
    <Grid container spacing={2}>
      {hotels.map((hotel) => {
        const discountedPrice = Math.round(
          hotel.roomPrice * (1 - hotel.discount)
        );

        return (
          <Grid item xs={12} sm={6} md={4} key={hotel.hotelId}>
            <HotelCard
              hotelId={hotel.hotelId}
              name={hotel.hotelName}
              price={hotel.roomPrice}
              discountedPrice={discountedPrice}
              rating={hotel.starRating}
              image={hotel.roomPhotoUrl}
              location={hotel.cityName}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HotelsList;
