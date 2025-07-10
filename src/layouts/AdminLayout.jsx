import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';
import LogoutButton from '../components/Auth/LogoutButton';
import logo from '../assets/images/logo.jpg';

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleSettings = () => {
    handleMenuClose();
    navigate('/admin/settings');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#6b9080',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: 72,
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: isMobile ? 36 : 48,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/admin')}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
              <AccountCircle sx={{ fontSize: 32 }} />
            </IconButton>
            <LogoutButton />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleSettings}>Settings</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1, pt: '72px' }}>
        <AdminSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <Box
          component="main"
          flexGrow={1}
          sx={{
            bgcolor: '#f9f9f9',
            px: { xs: 2, sm: 3, md: 4 },
            py: 4,
            minHeight: 'calc(100vh - 72px - 48px)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
