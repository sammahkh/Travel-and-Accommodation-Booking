import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TablePagination,
  Box,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const CitiesTable = ({ cities, onDelete, onEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  if (!cities || cities.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        No results found.
      </Typography>
    );
  }

  const paginated = cities.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f1f1f1' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.id}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.description}</TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => onEdit(city)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDelete(city.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ px: 2 }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
};

export default CitiesTable;
