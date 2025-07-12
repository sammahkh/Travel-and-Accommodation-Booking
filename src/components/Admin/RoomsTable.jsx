import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
  TablePagination,
  Box,
  Chip,
  Typography,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const RoomsTable = ({ rooms, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginated = rooms.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f1f1f1' }}>
            <TableRow>
              <TableCell>Room #</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Adults</TableCell>
              <TableCell>Children</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Amenities</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((room) => (
              <TableRow key={room.roomId}>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={room.roomPhotoUrl}
                    alt="room"
                    sx={{ width: 80, height: 60 }}
                  />
                </TableCell>
                <TableCell>{room.roomType}</TableCell>
                <TableCell>{room.capacityOfAdults}</TableCell>
                <TableCell>{room.capacityOfChildren}</TableCell>
                <TableCell>
                  <Chip
                    label={room.availability ? 'Yes' : 'No'}
                    color={room.availability ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>${room.price}</TableCell>
                <TableCell>
                  <Stack direction="column" spacing={0.5}>
                    {room.roomAmenities?.map((am, index) => (
                      <Typography variant="caption" key={index}>
                        {am.name}
                      </Typography>
                    ))}
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(room.roomId)}
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
          count={rooms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
};

export default RoomsTable;
