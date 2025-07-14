import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import SearchResultsPage from '../pages/SearchResultsPage';
import HotelPage from '../pages/HotelPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import CheckoutPage from '../pages/CheckoutPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import CitiesPage from '../pages/CitiesPage';
import HotelsPage from '../pages/HotelsPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={['User']}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/hotels/:hotelId" element={<HotelPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin/cities" element={<CitiesPage />} />
        <Route path="/admin/hotels" element={<HotelsPage />} />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
