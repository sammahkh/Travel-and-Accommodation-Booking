import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import SearchBar from './SearchBar';

import hero1 from '../../assets/images/hero1.jpg';
import hero2 from '../../assets/images/hero2.jpg';
import hero3 from '../../assets/images/hero3.jpg';
import hero4 from '../../assets/images/hero4.jpg';

const images = [hero1, hero2, hero3, hero4];

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '90vh', md: '100vh' },
        overflow: 'hidden',
        borderBottomRightRadius: { xs: 40, md: 80 },
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Slider {...settings}>
        {images.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img}
            alt={`Hero image ${i + 1}`}
            role="img"
            aria-label={`Showcase hotel image ${i + 1}`}
            sx={{
              width: '100%',
              height: { xs: '90vh', md: '100vh' },
              objectFit: 'cover',
            }}
          />
        ))}
      </Slider>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          px: 2,
          background: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1000px', mb: 4 }}>
          <SearchBar />
        </Box>

        <Typography
          variant="body1"
          color="white"
          textAlign="center"
          sx={{
            maxWidth: { xs: '90%', sm: '80%', md: 700 },
            px: 2,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Discover your perfect getaway – from luxury resorts to cozy city
          stays. Explore top-rated destinations and exclusive deals for every
          type of traveler.
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroCarousel;
