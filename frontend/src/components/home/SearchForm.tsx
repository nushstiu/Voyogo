import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_DESTINATIONS } from '../../data';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const selectClass = 'appearance-none flex-1 p-2.5 sm:p-3 rounded bg-gray-100 text-gray-700 outline-none text-sm sm:text-base focus:ring-2 focus:ring-primary focus:bg-white transition-all cursor-pointer pr-8';
const dateClass = 'flex-1 p-2.5 sm:p-3 rounded bg-gray-100 text-gray-700 outline-none text-sm sm:text-base focus:ring-2 focus:ring-primary focus:bg-white transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:hover:opacity-100';

export default function SearchForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [price, setPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (price) params.set('price', price);
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-4 sm:p-6 md:p-10 rounded-lg max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-2 sm:gap-3 items-stretch">
        <div className="relative flex-1">
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`${selectClass} w-full`}
            aria-label="Select destination"
          >
            <option value="">{t('search.destination')}</option>
            {PUBLIC_DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:contents gap-2">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={dateClass}
            aria-label="Check-in date"
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={dateClass}
            aria-label="Check-out date"
          />
        </div>

        <div className="relative flex-1">
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`${selectClass} w-full`}
            aria-label="Price range"
          >
            <option value="">{t('search.priceRange')}</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2000">$1,000 - $2,000</option>
            <option value="2000-5000">$2,000 - $5,000</option>
            <option value="5000-10000">$5,000 - $10,000</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded transition-colors whitespace-nowrap text-sm sm:text-base"
        >
          {t('search.search')}
        </button>
      </div>
    </form>
  );
}