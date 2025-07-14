import { useState } from 'react';
import { Typography, Paper } from '@mui/material';
import AdminLayout from '../layouts/AdminLayout';
import AdminSearchBar from '../components/Admin/AdminSearchbar';

const AdminDashboard = () => {
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (query) => {
    console.log('Search:', query);
    setSearchResult([]);
  };

  return (
    <AdminLayout>
      <Typography variant="h5" mb={2}>
        Dashboard
      </Typography>
      <AdminSearchBar onSearch={handleSearch} />

      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography variant="subtitle1">Result:</Typography>
        <Typography color="text.secondary">
          {searchResult.length === 0 ? 'No results found.' : '...'}
        </Typography>
      </Paper>
    </AdminLayout>
  );
};

export default AdminDashboard;
