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
} from '@mui/material';
import AdminLayout from '../layouts/AdminLayout';
import AdminSearchBar from '../components/Admin/AdminSearchbar';
import HotelsTable from '../components/Admin/HotelsTable';
import { fetchHotels } from '../services/hotelsService';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const loadHotels = async () => {
    try {
      setLoading(true);
      const data = await fetchHotels();
      const filtered = searchQuery
        ? data.filter((h) => h.name.toLowerCase().includes(searchQuery))
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

  const confirmDelete = () => {
    setHotels((prev) => prev.filter((h) => h.id !== deleteId));
    setDeleteId(null);
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
        </Box>

        <AdminSearchBar onSearch={handleSearch} />

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <HotelsTable hotels={hotels} onDelete={(id) => setDeleteId(id)} />
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
          message="Hotel deleted successfully"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      </Container>
    </AdminLayout>
  );
};

export default HotelsPage;
