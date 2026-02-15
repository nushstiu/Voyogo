import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
      <div className="w-full px-10 md:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-extrabold tracking-wider ${textClass}`}>
            VOYAGO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/destinations"
            className={`text-xl font-semibold hover:text-cyan-400 transition-colors ${textClass}`}
          >
            Destinations
          </Link>
          <Link
            to="/tours"
            className={`text-xl font-semibold hover:text-cyan-400 transition-colors ${textClass}`}
          >
            Tours
          </Link>
          <Link
            to="/booking"
            className={`text-xl font-semibold hover:text-cyan-400 transition-colors ${textClass}`}
          >
            Book
          </Link>
          <Link
            to="/login"
            className={`text-xl hover:text-cyan-400 transition-colors ${textClass}`}
            aria-label="User profile"
          >
            <FontAwesomeIcon icon={faUser} />
          </Link>
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
          <Link
            to="/destinations"
            className="text-lg font-semibold text-gray-800 hover:text-cyan-400"
            onClick={() => setMobileOpen(false)}
          >
            Destinations
          </Link>
          <Link
            to="/tours"
            className="text-lg font-semibold text-gray-800 hover:text-cyan-400"
            onClick={() => setMobileOpen(false)}
          >
            Tours
          </Link>
          <Link
            to="/booking"
            className="text-lg font-semibold text-gray-800 hover:text-cyan-400"
            onClick={() => setMobileOpen(false)}
          >
            Book
          </Link>
          <Link
            to="/login"
            className="text-lg font-semibold text-gray-800 hover:text-cyan-400"
            onClick={() => setMobileOpen(false)}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>
        </nav>
      )}
    </header>
  );
}