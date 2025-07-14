import { Box, Grid } from '@mui/material';
import RoomCard from '../Hotel/RoomCard';

const CartItemList = ({ items, onRemove }) => {
  return (
    <Box p={1} mb={4}>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.roomId}>
            <RoomCard
              room={item}
              showDelete
              onDelete={() => onRemove(item.roomId)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CartItemList;
