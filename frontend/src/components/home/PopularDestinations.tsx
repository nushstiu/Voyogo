import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import destinations from '../../data/destinations.json';

const INITIAL_COUNT = 4;

export default function PopularDestinations() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? destinations : destinations.slice(0, INITIAL_COUNT);

  return (
    <section className="py-20 px-4 md:px-16 relative">
      <div className="text-center mb-20 relative">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl md:text-8xl font-bold text-gray-300 opacity-40 select-none pointer-events-none">
          Destinations
        </span>
        <p className="text-cyan-400 tracking-widest text-sm font-semibold uppercase relative z-10">
          Popular Destinations
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-6 md:px-16">
        {visible.map((dest) => (
          <Link
            key={dest.id}
            to={dest.link}
            className="w-full sm:w-[48%] lg:w-[23%] min-w-[250px] border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-3 group"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4 relative">
              <h3 className="text-lg font-semibold text-gray-800">{dest.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-cyan-400" />
                {dest.packages} packages
              </p>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="absolute bottom-2 right-2 text-cyan-400"
              />
            </div>
          </Link>
        ))}
      </div>

      {!showAll && destinations.length > INITIAL_COUNT && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="bg-white text-cyan-400 border border-cyan-400 px-6 py-2 rounded-lg hover:bg-cyan-400 hover:text-white transition-colors font-semibold"
          >
            Load more destinations
          </button>
        </div>
      )}
    </section>
  );
}