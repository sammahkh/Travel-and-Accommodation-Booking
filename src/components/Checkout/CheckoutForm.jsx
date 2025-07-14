import { Button, Stack, TextField, MenuItem } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const paymentOptions = ['Visa', 'PayPal'];

const CheckoutForm = ({ cart, onSubmit, onCancel }) => {
  const initialValues = {
    customerName: '',
    email: '',
    paymentMethod: '',
    creditCard: '',
  };

  const validationSchema = Yup.object({
    customerName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    paymentMethod: Yup.string().required('Required'),
    creditCard: Yup.string()
      .min(4, 'Too short')
      .matches(/^\d+$/, 'Must be numeric')
      .required('Required'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const payloads = cart.map((room) => ({
        customerName: values.customerName,
        paymentMethod: values.paymentMethod,
        hotelName: room.hotelName,
        roomNumber: room.roomNumber.toString(),
        roomType: room.roomType,
        totalCost: room.price,
        bookingDateTime: new Date().toISOString(),
      }));

      console.log('Booking payloads:', payloads);
      const responses = await Promise.all(payloads.map(onSubmit));
      console.log('Booking Responses:', responses);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, touched, errors, isSubmitting }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="customerName"
              value={values.customerName}
              onChange={handleChange}
              error={touched.customerName && Boolean(errors.customerName)}
              helperText={touched.customerName && errors.customerName}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
            />

            <TextField
              select
              label="Payment Method"
              name="paymentMethod"
              value={values.paymentMethod}
              onChange={handleChange}
              error={touched.paymentMethod && Boolean(errors.paymentMethod)}
              helperText={touched.paymentMethod && errors.paymentMethod}
              fullWidth
            >
              {paymentOptions.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Card Number"
              name="creditCard"
              placeholder="Enter your credit card number"
              value={values.creditCard}
              onChange={handleChange}
              error={touched.creditCard && Boolean(errors.creditCard)}
              helperText={touched.creditCard && errors.creditCard}
              fullWidth
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
