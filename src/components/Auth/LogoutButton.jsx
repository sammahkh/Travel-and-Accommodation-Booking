import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('cartItems');
    navigate('/login');
  };

  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: '#ffffff',
        fontSize: '0.95rem',
        fontWeight: 500,
        padding: '6px 18px',
        backgroundColor: '#f6fff8',
        '&:hover': {
          backgroundColor: '#eaf4f4',
          borderColor: '#ffffff',
        },
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
