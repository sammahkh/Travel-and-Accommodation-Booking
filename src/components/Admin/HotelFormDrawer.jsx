import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  location: Yup.string().required('Location is required'),
  starRating: Yup.number()
    .required('Star rating is required')
    .min(1, 'Must be at least 1')
    .max(5, 'Maximum is 5'),
  rooms: Yup.number()
    .required('Number of rooms is required')
    .min(1, 'At least 1 room'),
  imageUrl: Yup.string()
    .url('Enter a valid URL')
    .required('Image URL is required'),
  description: Yup.string().required('Description is required'),
});

const HotelFormDrawer = ({ open, onClose, onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
      location: '',
      starRating: '',
      rooms: '',
      imageUrl: '',
      description: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        starRating: +values.starRating,
        rooms: +values.rooms,
      });
    },
  });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 300, sm: 400 }, p: 3 }}>
        <Typography variant="h6" mb={2}>
          {initialValues ? 'Edit Hotel' : 'Add Hotel'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
              label="Star Rating"
              name="starRating"
              fullWidth
              type="number"
              value={formik.values.starRating}
              onChange={formik.handleChange}
              error={
                formik.touched.starRating && Boolean(formik.errors.starRating)
              }
              helperText={formik.touched.starRating && formik.errors.starRating}
            />
            <TextField
              label="Rooms"
              name="rooms"
              fullWidth
              type="number"
              value={formik.values.rooms}
              onChange={formik.handleChange}
              error={formik.touched.rooms && Boolean(formik.errors.rooms)}
              helperText={formik.touched.rooms && formik.errors.rooms}
            />
            <TextField
              label="Image URL"
              name="imageUrl"
              fullWidth
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
              helperText={formik.touched.imageUrl && formik.errors.imageUrl}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <Button type="submit" variant="contained" fullWidth>
              {initialValues ? 'Update' : 'Create'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
};

export default HotelFormDrawer;
