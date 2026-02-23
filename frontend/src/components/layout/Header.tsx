import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faXmark, faSignOutAlt, faShieldAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants';
import { UserRole } from '../../types';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ro' : 'en');
  };

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
    navigate(ROUTES.HOME);
  };

  const publicLinks = [
    { to: ROUTES.DESTINATIONS, label: t('nav.destinations') },
    { to: ROUTES.TOURS, label: t('nav.tours') },
    { to: ROUTES.BOOKING, label: t('nav.book') },
  ];

  const userLinks = [
    { to: ROUTES.USER_DASHBOARD, label: t('nav.dashboard') },
    { to: ROUTES.USER_BOOKINGS, label: t('nav.myBookings') },
    { to: ROUTES.USER_PROFILE, label: t('nav.profile') },
  ];

  const adminLinks = [
    { to: ROUTES.ADMIN_DASHBOARD, label: t('nav.dashboard') },
    { to: ROUTES.ADMIN_USERS, label: t('nav.users') },
    { to: ROUTES.ADMIN_DESTINATIONS, label: t('nav.destinations') },
    { to: ROUTES.ADMIN_TOURS, label: t('nav.tours') },
    { to: ROUTES.ADMIN_BOOKINGS, label: t('nav.bookings') },
    { to: ROUTES.ADMIN_ANALYTICS, label: t('nav.analytics') },
  ];

  const navLinks = user
    ? user.role === UserRole.Admin
      ? adminLinks
      : [...publicLinks, ...userLinks]
    : publicLinks;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
      <div className="w-full px-10 md:px-16 py-4 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center">
          <span className={`text-2xl font-extrabold tracking-wider ${textClass}`}>
            VOYAGO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg font-semibold hover:text-cyan-400 transition-colors ${textClass}`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleLanguage}
            className={`text-lg hover:text-cyan-400 transition-colors ${textClass}`}
            aria-label="Toggle language"
          >
            <FontAwesomeIcon icon={faGlobe} className="mr-1" />
            {i18n.language === 'en' ? 'RO' : 'EN'}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${textClass}`}>
                {user.role === UserRole.Admin && (
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
              to={ROUTES.LOGIN}
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

          <button
            onClick={toggleLanguage}
            className="text-lg font-semibold text-gray-800 hover:text-cyan-400 text-left"
          >
            <FontAwesomeIcon icon={faGlobe} className="mr-2" />
            {i18n.language === 'en' ? 'Romana' : 'English'}
          </button>

          {user ? (
            <button
              onClick={() => { handleLogout(); setMobileOpen(false); }}
              className="text-lg font-semibold text-red-500 hover:text-red-600 text-left"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              {t('nav.logout')}
            </button>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="text-lg font-semibold text-gray-800 hover:text-cyan-400"
              onClick={() => setMobileOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {t('nav.login')}
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
