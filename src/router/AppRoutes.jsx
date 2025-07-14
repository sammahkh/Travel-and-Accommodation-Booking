import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import SearchResultsPage from '../pages/SearchResultsPage';
import HotelPage from '../pages/HotelPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import CheckoutPage from '../pages/CheckoutPage';

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
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/hotels/:hotelId" element={<HotelPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
