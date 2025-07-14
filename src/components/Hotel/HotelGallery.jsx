import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Dialog,
} from '@mui/material';
import { useState } from 'react';

const HotelGallery = ({ images }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <Box my={4}>
      <Typography variant="h5" mb={2}>
        Gallery
      </Typography>
      <ImageList cols={3} gap={8}>
        {images.map((url, index) => (
          <ImageListItem key={index}>
            <Box
              component="img"
              src={url}
              alt={`Hotel image ${index + 1}`}
              sx={{ width: '100%', borderRadius: 1, cursor: 'pointer' }}
              onClick={() => setSelectedImg(url)}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog
        open={Boolean(selectedImg)}
        onClose={() => setSelectedImg(null)}
        maxWidth="lg"
      >
        <Box
          component="img"
          src={selectedImg}
          alt="Preview"
          sx={{ width: '100%', height: 'auto' }}
        />
      </Dialog>
    </Box>
  );
};

export default HotelGallery;
