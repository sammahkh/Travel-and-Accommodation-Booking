import MainLayout from '../layouts/MainLayout';
import HeroCarousel from '../components/Home/HeroCarousel';
import FeaturedDeals from '../components/Home/FeaturedDeals';

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <HeroCarousel />
        <FeaturedDeals />
      </MainLayout>
    </>
  );
};

export default HomePage;
