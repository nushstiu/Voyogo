import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';



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

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - Alina's pages (untouched) */}
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/bookings"
        element={
          <ProtectedRoute>
            <UserBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/destinations"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDestinations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tours"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminTours />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminAnalytics />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
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
