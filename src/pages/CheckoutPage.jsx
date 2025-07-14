import {
  Container,
  Typography,
  Alert,
  Button,
  Box,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import CartItemList from '../components/Checkout/CartItemList';
import CheckoutForm from '../components/Checkout/CheckoutForm';
import { useCart } from '../context/CartContext';
import { createBooking } from '../services/bookingService';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const totalRooms = cart.length;
  const totalPrice = cart.reduce((sum, room) => sum + room.price, 0);
  const navigate = useNavigate();

  const handleBookingSubmit = async (bookingData) => {
    try {
      const res = await createBooking(bookingData);
      navigate('/confirmation', { state: { booking: res } });
      return res;
    } catch (err) {
      setError('Booking failed. Please try again.');
      throw err;
    } finally {
      clearCart();
      setShowForm(false);
    }
  };

  return (
    <MainLayout showNavLinks={false}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {cart.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="text.secondary">
            No items in cart.
          </Typography>
        ) : showForm ? (
          <>
            <Typography variant="h6" gutterBottom>
              Your Information
            </Typography>
            <CheckoutForm
              cart={cart}
              onSubmit={handleBookingSubmit}
              onCancel={() => setShowForm(false)}
            />
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Items
            </Typography>
            <CartItemList items={cart} onRemove={removeFromCart} />

            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              gap={2}
              mt={3}
              p={2}
              bgcolor="white"
              borderRadius={2}
              boxShadow={1}
            >
              <Typography variant="body1">
                <strong>Total Rooms:</strong> {totalRooms}
              </Typography>
              <Typography variant="body1">
                <strong>Total Price:</strong> ${totalPrice}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setShowForm(true)}
              >
                Checkout
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setShowDialog(true)}
              >
                Clear All
              </Button>
            </Stack>
          </>
        )}

        <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
          <DialogTitle>Clear Cart</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove all items from the cart?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button
              onClick={() => {
                clearCart();
                setShowDialog(false);
              }}
              variant="contained"
            >
              Clear All
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

export default CheckoutPage;
