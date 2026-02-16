import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faXmark, faSignOutAlt, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!transparent) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);

  const bgClass = transparent && !scrolled
    ? 'bg-transparent'
    : 'bg-white shadow-md';

  const textClass = transparent && !scrolled
    ? 'text-white'
    : 'text-gray-800';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const publicLinks = [
    { to: '/destinations', label: 'Destinations' },
    { to: '/tours', label: 'Tours' },
    { to: '/booking', label: 'Book' },
  ];

  const userLinks = [
    { to: ROUTES.USER_DASHBOARD, label: 'Dashboard' },
    { to: ROUTES.USER_BOOKINGS, label: 'My Bookings' },
    { to: ROUTES.USER_PROFILE, label: 'Profile' },
  ];

  const adminLinks = [
    { to: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard' },
    { to: ROUTES.ADMIN_USERS, label: 'Users' },
    { to: ROUTES.ADMIN_DESTINATIONS, label: 'Destinations' },
    { to: ROUTES.ADMIN_TOURS, label: 'Tours' },
    { to: ROUTES.ADMIN_BOOKINGS, label: 'Bookings' },
    { to: ROUTES.ADMIN_ANALYTICS, label: 'Analytics' },
  ];

  const navLinks = user
    ? user.role === 'admin'
      ? adminLinks
      : [...publicLinks, ...userLinks]
    : publicLinks;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
      <div className="w-full px-10 md:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-extrabold tracking-wider ${textClass}`}>
            VOYAGO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg font-semibold hover:text-cyan-400 transition-colors ${textClass}`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium ${textClass}`}>
                {user.role === 'admin' && (
                  <FontAwesomeIcon icon={faShieldAlt} className="mr-1 text-cyan-400" />
                )}
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className={`text-lg hover:text-red-400 transition-colors ${textClass}`}
                aria-label="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`text-xl hover:text-cyan-400 transition-colors ${textClass}`}
              aria-label="Login"
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
        </nav>

        <button
          className={`md:hidden text-2xl ${textClass}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-lg px-6 pb-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-lg font-semibold text-gray-800 hover:text-cyan-400"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => { handleLogout(); setMobileOpen(false); }}
              className="text-lg font-semibold text-red-500 hover:text-red-600 text-left"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg font-semibold text-gray-800 hover:text-cyan-400"
              onClick={() => setMobileOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
