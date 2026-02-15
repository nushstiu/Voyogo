import { Link } from 'react-router-dom';
import type { Destination } from '../../types/destination';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      to={destination.link}
      className="relative h-96 rounded-2xl overflow-hidden cursor-pointer group"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Default content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-5xl font-light text-white">{destination.name}</h3>
        <p className="text-white/80 text-sm mt-2">
          {destination.packages} packages &middot; {destination.priceRange}
        </p>
      </div>

      {/* Hover content */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
        <h3 className="text-4xl font-bold text-white">{destination.name}</h3>
        <p className="text-white/80 text-sm mt-2">
          {destination.packages} packages &middot; {destination.priceRange}
        </p>
        <p className="text-white/70 text-sm text-center mt-4 px-4 leading-relaxed">
          {destination.description}
        </p>
        <span className="mt-6 border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition-colors font-medium">
          View Details
        </span>
      </div>
    </Link>
  );
}