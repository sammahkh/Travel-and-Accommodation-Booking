import { useEffect, useState } from 'react';
import { Grid, CircularProgress, Alert } from '@mui/material';
import SectionWrapper from '../Common/SectionWrapper';
import HotelCard from '../Common/HotelCard';
import { getFeaturedDeals } from '../../services/dealService';

const FeaturedDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedDeals = async () => {
      try {
        const data = await getFeaturedDeals();
        setDeals(data);
      } catch (err) {
        setError('Failed to load featured deals.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedDeals();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <SectionWrapper title="Featured Deals" centerTitle id="deals">
      <Grid container spacing={3} justifyContent="center">
        {deals.map((deal) => (
          <Grid
            item
            key={deal.hotelId}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            display="flex"
          >
            <HotelCard
              hotelId={deal.hotelId}
              name={deal.hotelName}
              title={deal.title}
              price={deal.originalRoomPrice}
              discountedPrice={deal.finalPrice}
              location={deal.cityName}
              rating={deal.hotelStarRating}
              image={deal.roomPhotoUrl}
            />
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default FeaturedDeals;
