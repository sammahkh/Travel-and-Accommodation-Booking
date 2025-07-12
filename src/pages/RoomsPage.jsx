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
import RoomsTable from '../components/Admin/RoomsTable';
import { fetchRooms } from '../services/roomsService';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => setSearchQuery(query.toLowerCase());

  const loadRooms = async () => {
    setLoading(true);
    try {
      const data = await fetchRooms();
      const filtered = searchQuery
        ? data.filter(
            (room) =>
              room.roomNumber.toString().includes(searchQuery) ||
              room.roomType.toLowerCase().includes(searchQuery) ||
              room.roomAmenities?.some((am) =>
                am.name.toLowerCase().includes(searchQuery)
              )
          )
        : data;

      setRooms(filtered);
    } catch (err) {
      setError('Failed to fetch rooms.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, [searchQuery]);

  const handleDelete = () => {
    setRooms((prev) => prev.filter((r) => r.roomId !== deleteId));
    setSnackOpen(true);
    setDeleteId(null);
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
            Manage Rooms
          </Typography>
        </Box>

        <AdminSearchBar onSearch={handleSearch} />

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <RoomsTable rooms={rooms} onDelete={(id) => setDeleteId(id)} />
        )}

        <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this room?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          message="Room deleted successfully"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      </Container>
    </AdminLayout>
  );
};

export default RoomsPage;
