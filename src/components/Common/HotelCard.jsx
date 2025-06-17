import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({
  name,
  price,
  discountedPrice,
  location,
  rating,
  image,
  hotelId,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/hotels/${hotelId}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 3,
        boxShadow: 2,
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={name}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent>
        <Typography variant="h6" fontWeight={600} noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
          {location}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} my={1}>
          <Rating value={rating} readOnly precision={0.5} size="small" />
          <Typography variant="body2">({rating})</Typography>
        </Box>

        <Box display="flex" gap={1} alignItems="baseline">
          <Typography
            variant="body2"
            sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
          >
            ${price}
          </Typography>
          <Typography variant="body1" fontWeight={600} color="primary">
            ${discountedPrice}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
