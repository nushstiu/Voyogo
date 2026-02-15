import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faChevronDown,
  faUser,
  faCalendarCheck,
  faSignOutAlt,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants';
import { UI_TEXT } from '../../constants/text';

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const isAdmin = user.role === 'admin';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-white hover:text-blue-500 transition-colors"
      >
        <FontAwesomeIcon icon={faUserCircle} className="text-lg" />
        <span className="text-sm font-medium hidden sm:inline">{user.username}</span>
        <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="font-semibold text-gray-800 text-sm">{user.username}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              to={isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="text-gray-500 w-4" />
              Dashboard
            </Link>

            {!isAdmin && (
              <>
                <Link
                  to={ROUTES.USER_BOOKINGS}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <FontAwesomeIcon icon={faCalendarCheck} className="text-gray-500 w-4" />
                  {UI_TEXT.USER_MY_BOOKINGS}
                </Link>

                <Link
                  to={ROUTES.USER_PROFILE}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <FontAwesomeIcon icon={faUser} className="text-gray-500 w-4" />
                  {UI_TEXT.USER_PROFILE}
                </Link>
              </>
            )}
          </div>

          <div className="border-t border-gray-200 py-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-4" />
              {UI_TEXT.LOGOUT_BUTTON}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
