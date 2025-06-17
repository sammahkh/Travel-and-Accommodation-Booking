import { useState } from 'react';
import { Card, CardActionArea, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import DEFAULT_IMG from '../../assets/images/fallback.jpg';

const DestinationCard = ({ cityName, image }) => {
  const [imgSrc, setImgSrc] = useState(image || DEFAULT_IMG);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardActionArea onClick={() => navigate('')}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 180,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={imgSrc}
            alt={cityName}
            onError={(e) => {
              e.target.onerror = null;
              setImgSrc(DEFAULT_IMG);
            }}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        <Typography
          variant="h6"
          textAlign="center"
          fontWeight={600}
          sx={{ pb: 2, pt: 2 }}
        >
          {cityName}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default DestinationCard;
