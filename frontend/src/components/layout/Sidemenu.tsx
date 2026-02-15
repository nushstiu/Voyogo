import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faGlobe,
  faRoute,
  faCalendarCheck,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../constants';

const adminLinks = [
  { to: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: faTachometerAlt },
  { to: ROUTES.ADMIN_USERS, label: 'Users', icon: faUsers },
  { to: ROUTES.ADMIN_DESTINATIONS, label: 'Destinations', icon: faGlobe },
  { to: ROUTES.ADMIN_TOURS, label: 'Tours', icon: faRoute },
  { to: ROUTES.ADMIN_BOOKINGS, label: 'Bookings', icon: faCalendarCheck },
  { to: ROUTES.ADMIN_ANALYTICS, label: 'Analytics', icon: faChartBar },
];

export default function Sidemenu() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white shadow-lg min-h-[calc(100vh-80px)] pt-6 px-4">
      <nav className="flex flex-col gap-1">
        {adminLinks.map(link => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <FontAwesomeIcon icon={link.icon} className="w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
