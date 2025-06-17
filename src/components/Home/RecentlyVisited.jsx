import { useEffect, useState } from 'react';
import { Grid, CircularProgress, Alert } from '@mui/material';
import { getRecentlyVisitedHotels } from '../../services/userService';
import SectionWrapper from '../Common/SectionWrapper';
import HotelCard from '../Common/HotelCard';

const RecentlyVisited = ({ userId }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVisited = async () => {
      try {
        const data = await getRecentlyVisitedHotels(userId);
        setHotels(data.slice(0, 5));
      } catch (err) {
        setError('Failed to load recently visited hotels.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchVisited();
  }, [userId]);

  if (loading)
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <SectionWrapper title="Recently Visited Hotels" centerTitle>
      <Grid
        container
        spacing={8}
        justifyContent="center"
        sx={{ maxWidth: '1200PX', margin: '0 auto' }}
      >
        {hotels.map((hotel) => (
          <Grid item key={hotel.hotelId} xs={12} sm={6} md={4} lg={4}>
            <HotelCard
              name={hotel.hotelName}
              price={hotel.priceUpperBound}
              discountedPrice={hotel.priceLowerBound}
              location={hotel.cityName}
              rating={hotel.starRating}
              image={hotel.thumbnailUrl}
              hotelId={hotel.hotelId}
            />
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default RecentlyVisited;
