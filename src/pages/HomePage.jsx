import MainLayout from '../layouts/MainLayout';
import HeroCarousel from '../components/Home/HeroCarousel';
import FeaturedDeals from '../components/Home/FeaturedDeals';
import TrendingDestinations from '../components/Home/TrendingDestinations';
import RecentlyVisited from '../components/Home/RecentlyVisited';
import { getUserFromToken } from '../utils/auth';

const HomePage = () => {
  const user = getUserFromToken();
  console.log(user);
  const userId = user?.user_id;
  return (
    <>
      <MainLayout showNavLinks={true}>
        <HeroCarousel />
        <FeaturedDeals />
        <RecentlyVisited userId={userId} />
        <TrendingDestinations />
      </MainLayout>
    </>
  );
};

export default HomePage;
