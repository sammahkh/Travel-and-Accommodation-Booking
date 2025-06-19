import { Box, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import InputField from '../../components/Form/InputField';
import LoadingButton from '../../components/Button/LoadingButton';

const SearchBar = () => {
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const formik = useFormik({
    initialValues: {
      query: '',
      checkIn: today,
      checkOut: tomorrow,
      adults: 1,
      children: 0,
      rooms: 1,
    },
    onSubmit: async (values, actions) => {
      const params = {
        city: values.query,
        checkInDate: values.checkIn,
        checkOutDate: values.checkOut,
        adults: values.adults,
        children: values.children,
        numberOfRooms: values.rooms,
      };

      try {
        const queryString = new URLSearchParams(params).toString();
        navigate(`/search-results?${queryString}`);
      } catch (err) {
        console.error('Failed to fetch search results', err);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 2,
        p: { xs: 1.5, md: 2 },
        mt: { xs: 2, md: 4 },
        mx: 'auto',
        maxWidth: 1080,
        boxShadow: 2,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={3}>
            <InputField
              label="Search hotels or cities"
              name="query"
              value={formik.values.query}
              onChange={formik.handleChange}
              size="small"
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <InputField
              label="Check-in"
              name="checkIn"
              type="date"
              value={formik.values.checkIn}
              onChange={formik.handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <InputField
              label="Check-out"
              name="checkOut"
              type="date"
              value={formik.values.checkOut}
              onChange={formik.handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={4} sm={2} md={1}>
            <InputField
              label="Adults"
              name="adults"
              type="number"
              size="small"
              value={formik.values.adults}
              onChange={formik.handleChange}
              inputProps={{ min: 1, max: 10 }}
              sx={{ maxWidth: 90 }}
            />
          </Grid>

          <Grid item xs={4} sm={2} md={1}>
            <InputField
              label="Children"
              name="children"
              type="number"
              size="small"
              value={formik.values.children}
              onChange={formik.handleChange}
              inputProps={{ min: 0, max: 10 }}
              sx={{ maxWidth: 90 }}
            />
          </Grid>

          <Grid item xs={4} sm={2} md={1}>
            <InputField
              label="Rooms"
              name="rooms"
              type="number"
              size="small"
              value={formik.values.rooms}
              onChange={formik.handleChange}
              inputProps={{ min: 1, max: 5 }}
              sx={{ maxWidth: 90 }}
            />
          </Grid>

          <Grid item xs={12} md={1.5}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              isLoading={formik.isSubmitting}
              sx={{
                height: '40px',
                mt: { xs: 1, md: 0 },
                fontSize: '1rem',
              }}
            >
              Search
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SearchBar;
