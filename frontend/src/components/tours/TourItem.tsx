import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import type { Tour } from '../../types/tour';

interface TourItemProps {
  tour: Tour;
}

export default function TourItem({ tour }: TourItemProps) {
  return (
    <div className="flex flex-col md:flex-row mb-8 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="w-full md:w-1/3">
        <img
          src={tour.img}
          alt={tour.name}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
      </div>

      <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <p className="text-blue-500 font-medium">
            <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
            {tour.location}
          </p>
          <h3 className="text-2xl font-bold mt-1">{tour.name}</h3>
          <p className="text-gray-600 mt-3 leading-relaxed">{tour.description}</p>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-6 text-gray-600 text-sm mb-4">
            <span>
              <FontAwesomeIcon icon={faClock} className="mr-1 text-cyan-400" />
              {tour.days} Days
            </span>
            <span>
              <FontAwesomeIcon icon={faDollarSign} className="mr-1 text-cyan-400" />
              Start from ${tour.price.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/tours/${tour.id}`}
              className="bg-blue-500 text-white px-5 py-2 rounded font-medium hover:bg-blue-600 transition-colors"
            >
              Book now
            </Link>
            <Link
              to={`/tours/${tour.id}`}
              className="border border-blue-500 text-blue-500 px-5 py-2 rounded font-medium hover:bg-blue-500 hover:text-white transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}