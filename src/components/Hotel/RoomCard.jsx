import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import DEFAULT_IMG from '../../assets/images/fallback_room.jpg';

const RoomCard = ({
  room,
  showAddToCart = false,
  hotelName,
  showDelete = false,
  onDelete,
  onAddToCart,
}) => {
  const {
    roomPhotoUrl,
    roomType,
    roomNumber,
    capacityOfAdults,
    capacityOfChildren,
    price,
    roomAmenities,
    availability,
    roomId,
  } = room;

  const [imgSrc, setImgSrc] = useState(roomPhotoUrl || DEFAULT_IMG);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { addToCart, cart } = useCart();

  const isInCart = cart.some((item) => item.roomId === roomId);

  const handleAdd = () => {
    if (!isInCart) {
      addToCart(room, hotelName);
      onAddToCart?.();
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          height: '100%',
          position: 'relative',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 4,
          },
        }}
      >
        {showDelete && (
          <IconButton
            onClick={() => setConfirmOpen(true)}
            sx={{ position: 'absolute', top: 8, right: 10, bgcolor: 'white' }}
            size="small"
          >
            <DeleteIcon color="error" />
          </IconButton>
        )}

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
                onClick={handleAdd}
                size="small"
                disabled={isInCart}
              >
                {isInCart ? 'Added' : 'Add to Cart'}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Remove Room</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this room from your cart?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setConfirmOpen(false);
              onDelete?.();
            }}
            color="error"
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoomCard;
