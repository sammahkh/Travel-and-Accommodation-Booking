import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 210;

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navItems = [
    {
      path: '/admin/cities',
      label: 'Manage Cities',
      icon: <LocationCityIcon />,
    },
    { path: '/admin/hotels', label: 'Manage Hotels', icon: <HotelIcon /> },
    { path: '/admin/rooms', label: 'Manage Rooms', icon: <MeetingRoomIcon /> },
  ];

  const sidebarContent = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar />
      <List sx={{ pt: 2 }}>
        {navItems.map((item, index) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => {
              navigate(item.path);
              if (onClose) onClose();
            }}
            sx={{ mt: index === 0 ? 1 : 0 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default AdminSidebar;
