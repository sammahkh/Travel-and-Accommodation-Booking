import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CityFormDrawer = ({ open, onClose, onSubmit, initialValues }) => {
  const isEdit = Boolean(initialValues?.id);

  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit({ ...initialValues, ...values });
      resetForm();
    },
  });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: '100vw', sm: 400 }, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isEdit ? 'Edit City' : 'Add New City'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default CityFormDrawer;
