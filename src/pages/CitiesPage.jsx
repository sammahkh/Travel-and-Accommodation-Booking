import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import AdminLayout from '../layouts/AdminLayout';
import AdminSearchBar from '../components/Admin/AdminSearchbar';
import CitiesTable from '../components/Admin/CitiesTable';
import { fetchCities, deleteCity } from '../services/citiesService';

const CitiesPage = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
  };

  const loadCities = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCities({ name: searchQuery });
      setCities(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch cities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCities();
  }, [searchQuery]);

  const confirmDelete = async () => {
    try {
      await deleteCity(deleteId);
      setDeleteId(null);
      await loadCities();
      setSuccessAlert(true);
    } catch (err) {
      console.error(err);
      setError('Delete failed.');
    }
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
            Manage Cities
          </Typography>
        </Box>

        <AdminSearchBar onSearch={handleSearch} />

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <CitiesTable cities={cities} onDelete={(id) => setDeleteId(id)} />
        )}

        <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this city?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={successAlert}
          autoHideDuration={3000}
          onClose={() => setSuccessAlert(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            City deleted successfully!
          </Alert>
        </Snackbar>
      </Container>
    </AdminLayout>
  );
};

export default CitiesPage;
