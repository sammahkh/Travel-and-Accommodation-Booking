import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#6b9080',
    },

    secondary: {
      main: '#a4c3b2',
    },

    background: {
      default: '#f6fff8',
      paper: '#eaf4f4',
    },

    text: {
      primary: '#2e3d36',
      secondary: '#55675f',
    },
  },

  typography: {
    fontFamily: '"Manrope", "Roboto", sans-serif',

    h1: {
      fontSize: '3rem',
      fontWeight: 800,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },

    body1: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: 9999,
          padding: '10px 22px',
          textTransform: 'none',
          backgroundColor: '#6b9080',
          '&:hover': {
            backgroundColor: '#557060',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#6b9080',
          color: '#2e3d36',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1rem',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: '12px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '12px',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#eaf4f4',
          borderRadius: 16,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;
