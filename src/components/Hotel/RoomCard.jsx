import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import DEFAULT_IMG from '../../assets/images/fallback_room.jpg';

const RoomCard = ({ room, showAddToCart = false }) => {
  const {
    roomPhotoUrl,
    roomType,
    roomNumber,
    capacityOfAdults,
    capacityOfChildren,
    price,
    roomAmenities,
    availability,
  } = room;

  const [imgSrc, setImgSrc] = useState(roomPhotoUrl || DEFAULT_IMG);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={imgSrc}
        alt={roomType}
        sx={{ objectFit: 'cover' }}
        onError={() => setImgSrc(DEFAULT_IMG)}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {roomType} - #{roomNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Adults: {capacityOfAdults}, Children: {capacityOfChildren}
        </Typography>

        <Stack direction="row" gap={1} flexWrap="wrap" mb={2}>
          {roomAmenities.map((a) => (
            <Chip key={a.name} label={a.name} size="small" />
          ))}
        </Stack>

        <Typography variant="h6" color="primary">
          ${price}
        </Typography>

        {showAddToCart && availability && (
          <Box mt={2}>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              size="small"
            >
              Add to Cart
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
