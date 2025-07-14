import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

const AdminSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <TextField
        label="Search"
        size="small"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ whiteSpace: 'nowrap', minWidth: 100 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default AdminSearchBar;
