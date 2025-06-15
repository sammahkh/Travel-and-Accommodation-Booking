import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h2" color="error" gutterBottom>
          403
        </Typography>
        <Typography variant="h5" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          You do not have permission to view this page.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const role = localStorage.getItem('userType');

            if (role === 'User') {
              navigate('/home');
            } else if (role === 'Admin') {
              navigate('/admin');
            } else {
              navigate('/login');
            }
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
