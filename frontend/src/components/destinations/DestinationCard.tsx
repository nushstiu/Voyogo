import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import type { Destination } from '../../types/destination';

type Props = {
  destination: Destination;
};

export default function DestinationCard({ destination }: Props) {
  return (
      <Link
          to={ROUTES.DESTINATION_DETAILS.replace(':id', destination.id)}
          className="relative rounded-2xl overflow-hidden group"
      >
        <div className="relative h-80">
          <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-3xl font-light">{destination.name}</h3>
            <p className="text-sm opacity-80 mt-1">
              {destination.packages} packages · {destination.priceRange}
            </p>
          </div>
        </div>
      </Link>
  );
}