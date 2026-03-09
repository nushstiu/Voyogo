import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function ServerError() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>500 - Server Error</h1>
      <p>Something went wrong. Please try again later.</p>
      <Link to={ROUTES.HOME}>Go Home</Link>
    </div>
  );
}