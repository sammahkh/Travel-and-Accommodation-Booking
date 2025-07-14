import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      px={2}
    >
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" mb={3}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" component={Link} to="/login">
        Go to Login
      </Button>
    </Box>
  );
};

export default NotFoundPage;
