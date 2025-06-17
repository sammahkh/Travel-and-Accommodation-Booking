import { useState } from 'react';
import {
  AppBar,
  Box,
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

  const handleNav = (href) => {
    setDrawerOpen(false);
    const target = document.getElementById(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
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
            }}
            onClick={() => navigate('/home')}
          />

          {!isMobile && (
            <Box display="flex" gap={4}>
              {[
                { label: 'Home', href: '#home' },
                { label: 'Deals', href: '#deals' },
                { label: 'Destinations', href: '#destinations' },
                { label: 'Supports', href: '#supports' },
              ].map(({ label, href }) => (
                <Typography
                  key={label}
                  variant="body2"
                  component="a"
                  href={href}
                  sx={{
                    cursor: 'pointer',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {label}
                </Typography>
              ))}
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
                      {[
                        { label: 'Home', href: 'home' },
                        { label: 'Deals', href: 'deals' },
                        { label: 'Destinations', href: 'destinations' },
                        { label: 'Supports', href: 'supports' },
                      ].map(({ label, href }) => (
                        <ListItem
                          key={label}
                          component="a"
                          href={`#${href}`}
                          onClick={() => handleNav(href)}
                        >
                          <ListItemText primary={label} />
                        </ListItem>
                      ))}
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

      <Box component="main" flex={1} sx={{ pt: '50px' }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: 'center',
          mt: 'auto',
          backgroundColor: '#6b9080',
        }}
      >
        <Typography variant="body2" color="#f6fff8">
          © 2025 BookNGo. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
