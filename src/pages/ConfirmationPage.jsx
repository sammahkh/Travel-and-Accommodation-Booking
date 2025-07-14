import {
  Box,
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { generateBookingPDF } from '../utils/generateBookingPDF';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!booking) {
      navigate('/checkout');
    }
  }, [booking, navigate]);

  if (!booking) return null;

  const {
    customerName,
    hotelName,
    roomNumber,
    roomType,
    bookingDateTime,
    totalCost,
    paymentMethod,
    bookingStatus,
    confirmationNumber,
  } = booking;

  const formattedDate = new Date(bookingDateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <MainLayout showNavLinks={false}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Booking Confirmed!
          </Typography>
          <Typography variant="subtitle1">
            Thank you, <strong>{customerName}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Confirmation #: <strong>{confirmationNumber}</strong>
          </Typography>
        </Box>

        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" mb={2}>
            Booking Summary
          </Typography>

          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room No.</TableCell>
                  <TableCell>Room Type</TableCell>
                  <TableCell>Hotel</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{roomNumber}</TableCell>
                  <TableCell>{roomType}</TableCell>
                  <TableCell>{hotelName}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{paymentMethod}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems={isSmallScreen ? 'stretch' : 'center'}
            gap={2}
          >
            <Typography variant="body1">
              Total Cost: <strong>${totalCost}</strong>
            </Typography>

            <Button
              variant="contained"
              fullWidth={isSmallScreen}
              onClick={() => generateBookingPDF(booking)}
            >
              Download PDF
            </Button>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ConfirmationPage;
