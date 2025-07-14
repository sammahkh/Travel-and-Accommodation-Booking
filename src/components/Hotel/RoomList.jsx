import { Grid, Typography } from '@mui/material';
import RoomCard from './RoomCard';

const RoomList = ({ rooms, isAvailableList = false }) => {
  if (!rooms || rooms.length === 0) {
    return (
      <Typography textAlign="center" mt={4}>
        No rooms available.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} mt={5}>
      {rooms.map((room) => (
        <Grid key={room.roomId} item xs={12} sm={6} md={4}>
          <RoomCard room={room} showAddToCart={isAvailableList} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomList;
