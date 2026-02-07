import { Link } from 'react-router-dom';

export interface Package {
    id: string;
    name: string;
    packages: number;
    image: string;
    link: string;
}

interface DestinationCardProps {
    destination: Package;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
    return (
        <div className="w-full sm:w-[48%] lg:w-[23%] min-w-[250px] p-3 border border-gray-200 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
            <div className="overflow-hidden rounded-2xl">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-[350px] object-cover rounded-2xl transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                />
            </div>
            <div className="mt-3 text-left">
                <h5 className="text-lg font-semibold text-gray-800">{destination.name}</h5>
                <span className="text-sm text-gray-600 flex items-center mt-1">
          <i className="fa-solid fa-location-dot text-cyan-400 mr-2"></i>
                    {destination.packages} packages
        </span>
            </div>
            <Link
                to={destination.link}
                className="absolute bottom-5 right-5 text-cyan-400 hover:text-cyan-600 transition-colors duration-200"
                aria-label={`View ${destination.name} packages`}
            >
                <i className="fa-solid fa-circle-chevron-right text-3xl"></i>
            </Link>
        </div>
    );
};

export default DestinationCard;
