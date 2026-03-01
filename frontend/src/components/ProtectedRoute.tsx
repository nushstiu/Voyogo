import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants';
import { UI_TEXT } from '../constants/text';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
}

export default function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        <span className="ml-3 text-text-secondary">{UI_TEXT.LOADING}</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />;
  }

  return <Outlet />;
}
