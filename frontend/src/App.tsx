import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES } from './constants/routes';
import { UserRole } from './types';

import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';

import UserDashboard from './pages/user/Dashboard';
import UserBookings from './pages/user/Bookings';
import UserProfile from './pages/user/Profile';

import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminDestinations from './pages/admin/Destinations';
import AdminTours from './pages/admin/Tours';
import AdminBookings from './pages/admin/Bookings';
import AdminAnalytics from './pages/admin/Analytics';

import Unauthorized from './pages/errors/Unauthorized';
import Forbidden from './pages/errors/Forbidden';
import NotFound from './pages/errors/NotFound';
import ServerError from './pages/errors/ServerError';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.DESTINATIONS} element={<Destinations />} />
      <Route path={ROUTES.TOURS} element={<Tours />} />
      <Route path={ROUTES.TOUR_DETAILS} element={<TourDetails />} />
      <Route path={ROUTES.BOOKING} element={<Booking />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      {/* Error Pages */}
      <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path={ROUTES.FORBIDDEN} element={<Forbidden />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path={ROUTES.SERVER_ERROR} element={<ServerError />} />

      {/* User Routes - single guard */}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.USER_DASHBOARD} element={<UserDashboard />} />
        <Route path={ROUTES.USER_BOOKINGS} element={<UserBookings />} />
        <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
      </Route>

      {/* Admin Routes - single guard with role */}
      <Route element={<ProtectedRoute requiredRole={UserRole.Admin} />}>
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.ADMIN_USERS} element={<AdminUsers />} />
        <Route path={ROUTES.ADMIN_DESTINATIONS} element={<AdminDestinations />} />
        <Route path={ROUTES.ADMIN_TOURS} element={<AdminTours />} />
        <Route path={ROUTES.ADMIN_BOOKINGS} element={<AdminBookings />} />
        <Route path={ROUTES.ADMIN_ANALYTICS} element={<AdminAnalytics />} />
      </Route>

      {/* Catch-all - 404 */}
        
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
