import { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import InputField from '../components/Form/InputField';
import LoadingButton from '../components/Button/LoadingButton';
import { login } from '../services/authService';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.userName) {
        errors.userName = 'Username is required';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      setSuccess(false);

      try {
        const response = await login(values);

        localStorage.setItem('token', response.data.authentication);
        localStorage.setItem('userType', response.data.userType);
        setSuccess(true);

        if (response.data.userType === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } catch (err) {
        setError('Invalid username or password');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card elevation={3} sx={{ width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome Back{' '}
          </Typography>
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={4000}
            onClose={() => setError('')}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert
              severity="error"
              variant="filled"
              onClose={() => setError('')}
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>

          <Snackbar
            open={success}
            autoHideDuration={4000}
            onClose={() => setSuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert
              severity="success"
              variant="filled"
              onClose={() => setSuccess(false)}
              sx={{ width: '100%' }}
            >
              Logged in successfully!
            </Alert>
          </Snackbar>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <InputField
              label="Username"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              isLoading={formik.isSubmitting}
              sx={{ mt: 2, fontSize: '1.2rem' }}
            >
              Login
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
