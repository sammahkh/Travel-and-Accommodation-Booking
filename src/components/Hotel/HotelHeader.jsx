import { Box, Typography, Rating, Chip, Stack, Divider } from '@mui/material';

const HotelHeader = ({ hotel }) => {
  return (
    <Box mb={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {hotel.hotelName}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <Rating value={hotel.starRating} readOnly />
        <Typography variant="body2">({hotel.starRating} stars)</Typography>
      </Stack>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {hotel.description}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Amenities
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {hotel.amenities.map((item) => (
          <Chip key={item.name} label={item.name} />
        ))}
      </Stack>
    </Box>
  );
};

export default HotelHeader;
