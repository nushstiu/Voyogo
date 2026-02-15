import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCheck } from '@fortawesome/free-solid-svg-icons';
import type { Package } from '../../types/booking';
import packagesData from '../../data/packages.json';

interface PackageSelectorProps {
  destination: string;
  selectedPackages: string[];
  onToggle: (packageId: string) => void;
}

export default function PackageSelector({ destination, selectedPackages, onToggle }: PackageSelectorProps) {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    if (destination) {
      const filtered = (packagesData as Package[]).filter(
        (p) => p.destination === destination
      );
      setPackages(filtered);
    } else {
      setPackages([]);
    }
  }, [destination]);

  if (!destination || packages.length === 0) return null;

  return (
    <div className="mt-10 w-full px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">Package</h2>

      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {packages.map((pkg) => {
          const isSelected = selectedPackages.includes(pkg.id);
          return (
            <div
              key={pkg.id}
              onClick={() => onToggle(pkg.id)}
              className="relative h-96 w-full sm:w-80 bg-cover bg-center rounded-2xl overflow-hidden cursor-pointer group"
              style={{ backgroundImage: `url(${pkg.img})` }}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(pkg.id); }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-2xl font-medium">{pkg.name}</h3>
                <p className="text-sm font-light mt-1">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                  {pkg.location} &middot; ${pkg.price.toLocaleString()}
                </p>
              </div>

              <div
                className={`absolute top-5 right-5 w-8 h-8 rounded border-2 flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-cyan-400 border-cyan-400'
                    : 'border-white bg-transparent'
                }`}
              >
                {isSelected && <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}