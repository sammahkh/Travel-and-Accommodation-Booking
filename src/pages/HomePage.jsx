import MainLayout from '../layouts/MainLayout';
import HeroCarousel from '../components/Home/HeroCarousel';
import FeaturedDeals from '../components/Home/FeaturedDeals';
import TrendingDestinations from '../components/Home/TrendingDestinations';

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <HeroCarousel />
        <FeaturedDeals />
        <TrendingDestinations />
      </MainLayout>
    </>
  );
};

export default HomePage;
