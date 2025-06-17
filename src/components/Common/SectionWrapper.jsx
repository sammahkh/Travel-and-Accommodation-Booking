import { Box, Typography } from '@mui/material';

const SectionWrapper = ({ title, children, centerTitle = false, id }) => {
  return (
    <Box id={id} sx={{ my: 10, px: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 6,
          textAlign: centerTitle ? 'center' : 'left',
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default SectionWrapper;
