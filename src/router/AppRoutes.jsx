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
import RoomsPage from '../pages/RoomsPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
          path="/search-results"
          element={
            <ProtectedRoute allowedRoles={['User']}>
              <SearchResultsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotels/:hotelId"
          element={
            <ProtectedRoute allowedRoles={['User']}>
              <HotelPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={['User']}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirmation"
          element={
            <ProtectedRoute allowedRoles={['User']}>
              <ConfirmationPage />
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

        <Route
          path="/admin/cities"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <CitiesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/hotels"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <HotelsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <RoomsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
