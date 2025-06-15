import { Button, CircularProgress } from '@mui/material';

const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default LoadingButton;
