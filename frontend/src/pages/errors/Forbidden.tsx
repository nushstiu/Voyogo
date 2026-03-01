import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function Forbidden() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>403 - Forbidden</h1>
      <p>You don't have permission to access this page.</p>
      <Link to={ROUTES.HOME}>Go Home</Link>
    </div>
  );
}