import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>404 - Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to={ROUTES.HOME}>Go Home</Link>
    </div>
  );
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <h1 className="text-4xl font-extrabold mb-3">404 — Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Pagina pe care o cauți nu există sau a fost mutată.
                </p>

                <Link
                    to="/"
                    className="inline-block px-5 py-2 rounded-lg bg-black text-white hover:opacity-90"
                >
                    Mergi la pagina principală
                </Link>
            </div>
        </div>
    );
}