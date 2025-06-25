import { Button, Stack, TextField } from '@mui/material';
import { Formik, Form } from 'formik';

const RoomFilterForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ checkInDate: '', checkOutDate: '' }}
      onSubmit={onSubmit}
    >
      {({ values, handleChange }) => (
        <Form>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            mb={3}
            alignItems="flex-end"
          >
            <TextField
              label="Check-in Date"
              type="date"
              name="checkInDate"
              value={values.checkInDate}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Check-out Date"
              type="date"
              name="checkOutDate"
              value={values.checkOutDate}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: '60px',
                minWidth: '160px',
                fontSize: '0.875rem',
                textTransform: 'none',
              }}
            >
              Check Availability
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default RoomFilterForm;
