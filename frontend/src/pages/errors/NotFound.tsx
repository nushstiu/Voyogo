import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>404 - Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to={ROUTES.HOME}>Go Home</Link>
    </div>
  );
}