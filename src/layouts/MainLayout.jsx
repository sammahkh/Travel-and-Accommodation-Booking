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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutButton from '../components/Auth/LogoutButton';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import NavList from './NavList';

const MainLayout = ({ children, showNavLinks = true }) => {
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

  const handleCheckout = () => {
    handleMenuClose();
    navigate('/checkout');
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

          {!isMobile && showNavLinks && (
            <Box display="flex" gap={4}>
              <NavList direction="row" onItemClick={handleNav} />
            </Box>
          )}

          <Box display="flex" alignItems="center" gap={1}>
            {isMobile && showNavLinks && (
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
                    <NavList direction="column" onItemClick={handleNav} />
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
              <MenuItem onClick={handleCheckout}>My Cart</MenuItem>
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
            </Menu>

            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" flex={1} sx={{ pt: '60px' }}>
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
