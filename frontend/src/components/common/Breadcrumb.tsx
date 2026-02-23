import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../constants/routes';

const LABELS: Record<string, string> = {
  admin: 'Admin',
  user: 'Account',
  dashboard: 'Dashboard',
  users: 'Users',
  destinations: 'Destinations',
  tours: 'Tours',
  bookings: 'Bookings',
  analytics: 'Analytics',
  profile: 'Profile',
  login: 'Login',
  register: 'Register',
};

export default function Breadcrumb() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => ({
    label: LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
    path: '/' + segments.slice(0, i + 1).join('/'),
    isLast: i === segments.length - 1,
  }));

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link to={ROUTES.HOME} className="hover:text-blue-500 transition-colors">
        <FontAwesomeIcon icon={faHome} className="text-xs" />
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.path} className="flex items-center gap-2">
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-gray-300" />
          {crumb.isLast ? (
            <span className="text-gray-900 font-semibold">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-blue-500 transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
