import { Box, Typography } from '@mui/material';

const HotelMap = ({ latitude, longitude }) => {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <Box my={4}>
      <Typography variant="h5" mb={2}>
        Location on Map
      </Typography>
      <Box
        component="iframe"
        src={mapUrl}
        width="100%"
        height="300"
        style={{ border: 0, borderRadius: 8 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Hotel Location"
      />
    </Box>
  );
};

export default HotelMap;
