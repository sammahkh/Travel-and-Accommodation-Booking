import { useEffect, useState } from 'react';
import { Grid, CircularProgress, Alert } from '@mui/material';
import { getTrendingDestinations } from '../../services/destinationService';
import DestinationCard from '../Common/DestinationCard';
import SectionWrapper from '../Common/SectionWrapper';

const TrendingDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getTrendingDestinations();
        setDestinations(data);
      } catch (err) {
        setError('Failed to load trending destinations.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <SectionWrapper title="Trending Destinations" centerTitle>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        sx={{ maxWidth: '1200PX', margin: '0 auto' }}
        id="destinations"
      >
        {destinations.map((dest) => (
          <Grid item key={dest.cityId} xs={12} sm={6} md={4} lg={4}>
            <DestinationCard
              cityName={dest.cityName}
              image={dest.thumbnailUrl}
            />
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default TrendingDestinations;
