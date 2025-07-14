import { List, ListItem, ListItemText, Typography } from '@mui/material';

const navLinks = [
  { label: 'Home', href: 'home' },
  { label: 'Deals', href: 'deals' },
  { label: 'Destinations', href: 'destinations' },
  { label: 'Supports', href: 'supports' },
];

const NavList = ({ onItemClick, direction = 'column' }) => {
  return direction === 'row' ? (
    <>
      {navLinks.map(({ label, href }) => (
        <Typography
          key={label}
          variant="body2"
          component="a"
          href={`#${href}`}
          sx={{
            cursor: 'pointer',
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
          onClick={() => onItemClick?.(href)}
        >
          {label}
        </Typography>
      ))}
    </>
  ) : (
    <List>
      {navLinks.map(({ label, href }) => (
        <ListItem
          button
          key={label}
          component="a"
          href={`#${href}`}
          onClick={() => onItemClick?.(href)}
        >
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;
