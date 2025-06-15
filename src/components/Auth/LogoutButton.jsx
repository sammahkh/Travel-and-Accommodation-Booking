import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
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
        backgroundColor: '#eaf4f4',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
