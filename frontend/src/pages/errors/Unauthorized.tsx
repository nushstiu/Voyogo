import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function Unauthorized() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>401 - Unauthorized</h1>
      <p>You need to log in to access this page.</p>
      <Link to={ROUTES.LOGIN}>Go to Login</Link>
    </div>
  );
}