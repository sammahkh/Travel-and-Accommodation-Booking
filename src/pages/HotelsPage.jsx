import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminLayout from '../layouts/AdminLayout';
import AdminSearchBar from '../components/Admin/AdminSearchbar';
import HotelsTable from '../components/Admin/HotelsTable';
import HotelFormDrawer from '../components/Admin/HotelFormDrawer';
import { fetchHotels } from '../services/hotelsService';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadHotels = async () => {
    try {
      setLoading(true);
      const data = await fetchHotels();
      const filtered = searchQuery
        ? data.filter((h) =>
            h.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : data;
      setHotels(filtered);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, [searchQuery]);

  const handleSearch = (query) => setSearchQuery(query);

  const confirmDelete = () => {
    setHotels((prev) => prev.filter((h) => h.id !== deleteId));
    setDeleteId(null);
    setSnackbarOpen(true);
  };

  const handleSubmit = (hotel) => {
    if (editingHotel) {
      setHotels((prev) => prev.map((h) => (h.id === hotel.id ? hotel : h)));
    } else {
      const newHotel = { ...hotel, id: Math.floor(Math.random() * 10000) };
      setHotels((prev) => [newHotel, ...prev]);
    }
    setDrawerOpen(false);
    setEditingHotel(null);
    setSnackbarOpen(true);
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight="bold">
            Manage Hotels
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingHotel(null);
              setDrawerOpen(true);
            }}
          >
            Add Hotel
          </Button>
        </Box>

        <AdminSearchBar onSearch={handleSearch} />

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <HotelsTable
            hotels={hotels}
            onDelete={(id) => setDeleteId(id)}
            onEdit={(hotel) => {
              setEditingHotel(hotel);
              setDrawerOpen(true);
            }}
          />
        )}

        <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this hotel?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button onClick={confirmDelete} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Operation completed successfully"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />

        <HotelFormDrawer
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setEditingHotel(null);
          }}
          onSubmit={handleSubmit}
          initialValues={editingHotel}
        />
      </Container>
    </AdminLayout>
  );
};

export default HotelsPage;
