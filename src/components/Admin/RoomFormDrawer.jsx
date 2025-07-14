import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RoomFormDrawer = ({ open, onClose, onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      roomNumber: '',
      roomPhotoUrl: '',
      roomType: '',
      capacityOfAdults: '',
      capacityOfChildren: '',
      price: '',
      availability: true,
      roomAmenities: [],
    },
    validationSchema: Yup.object({
      roomNumber: Yup.number().required('Required'),
      roomPhotoUrl: Yup.string()
        .url('Must be a valid URL')
        .required('Required'),
      roomType: Yup.string().required('Required'),
      capacityOfAdults: Yup.number().min(0).required('Required'),
      capacityOfChildren: Yup.number().min(0).required('Required'),
      price: Yup.number().min(0).required('Required'),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      const newRoom = {
        ...values,
        roomNumber: +values.roomNumber,
        capacityOfAdults: +values.capacityOfAdults,
        capacityOfChildren: +values.capacityOfChildren,
        price: +values.price,
        roomAmenities: values.roomAmenities || [],
      };
      onSubmit(newRoom);
    },
  });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 300, sm: 400 }, p: 3 }}>
        <Typography variant="h6" mb={2}>
          {initialValues ? 'Edit Room' : 'Add Room'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Room Number"
              name="roomNumber"
              type="number"
              fullWidth
              value={formik.values.roomNumber}
              onChange={formik.handleChange}
              error={!!formik.errors.roomNumber && formik.touched.roomNumber}
              helperText={formik.touched.roomNumber && formik.errors.roomNumber}
            />
            <TextField
              label="Image URL"
              name="roomPhotoUrl"
              fullWidth
              value={formik.values.roomPhotoUrl}
              onChange={formik.handleChange}
              error={
                !!formik.errors.roomPhotoUrl && formik.touched.roomPhotoUrl
              }
              helperText={
                formik.touched.roomPhotoUrl && formik.errors.roomPhotoUrl
              }
            />
            <TextField
              label="Room Type"
              name="roomType"
              fullWidth
              value={formik.values.roomType}
              onChange={formik.handleChange}
              error={!!formik.errors.roomType && formik.touched.roomType}
              helperText={formik.touched.roomType && formik.errors.roomType}
            />
            <TextField
              label="Adult Capacity"
              name="capacityOfAdults"
              type="number"
              fullWidth
              value={formik.values.capacityOfAdults}
              onChange={formik.handleChange}
              error={
                !!formik.errors.capacityOfAdults &&
                formik.touched.capacityOfAdults
              }
              helperText={
                formik.touched.capacityOfAdults &&
                formik.errors.capacityOfAdults
              }
            />
            <TextField
              label="Children Capacity"
              name="capacityOfChildren"
              type="number"
              fullWidth
              value={formik.values.capacityOfChildren}
              onChange={formik.handleChange}
              error={
                !!formik.errors.capacityOfChildren &&
                formik.touched.capacityOfChildren
              }
              helperText={
                formik.touched.capacityOfChildren &&
                formik.errors.capacityOfChildren
              }
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={formik.values.price}
              onChange={formik.handleChange}
              error={!!formik.errors.price && formik.touched.price}
              helperText={formik.touched.price && formik.errors.price}
            />
            <FormControlLabel
              control={
                <Switch
                  name="availability"
                  checked={formik.values.availability}
                  onChange={formik.handleChange}
                />
              }
              label="Available"
            />
            <Button type="submit" variant="contained" fullWidth>
              {initialValues ? 'Update Room' : 'Create Room'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
};

export default RoomFormDrawer;
