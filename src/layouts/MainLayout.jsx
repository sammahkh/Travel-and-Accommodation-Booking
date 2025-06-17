import { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutButton from '../components/Auth/LogoutButton';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSettings = () => {
    handleMenuClose();
    navigate('/settings');
  };

  const handleBookings = () => {
    handleMenuClose();
    navigate('/bookings');
  };

  const handleNav = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: '#6b9080',
          color: 'white',
          zIndex: 1000,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 72,
            px: { xs: 2, sm: 4, md: 8 },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: isMobile ? 36 : 48,
              width: 'auto',
              objectFit: 'contain',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => navigate('/home')}
          />

          {!isMobile && (
            <Box display="flex" gap={4}>
              <Typography
                variant="body2"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                onClick={() => navigate('/')}
              >
                Home
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                onClick={() => navigate('/#deals')}
              >
                Deals
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                onClick={() => navigate('/#destinations')}
              >
                Destinations
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                onClick={() => navigate('/#supports')}
              >
                Supports
              </Typography>
            </Box>
          )}

          <Box display="flex" alignItems="center" gap={1}>
            {isMobile && (
              <>
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ color: 'white' }}
                >
                  <MenuIcon />
                </IconButton>

                <Drawer
                  anchor="left"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                >
                  <Box width={200} role="presentation" p={2}>
                    <List>
                      <ListItem button onClick={() => handleNav('/')}>
                        <ListItemText primary="Home" />
                      </ListItem>
                      <ListItem button onClick={() => handleNav('/#deals')}>
                        <ListItemText primary="Deals" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => handleNav('/#destinations')}
                      >
                        <ListItemText primary="Destinations" />
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </>
            )}

            <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
              <AccountCircle sx={{ fontSize: isMobile ? 30 : 40 }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
              <MenuItem onClick={handleBookings}>My Bookings</MenuItem>
            </Menu>

            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" flex={1}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: 'center',
          mt: 'auto',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 BookNGo. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
