import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_DESTINATIONS } from '../../data';
import { useTranslation } from 'react-i18next';

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
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 p-2.5 sm:p-3 rounded bg-gray-100 text-gray-700 outline-none text-sm sm:text-base"
          aria-label="Select destination"
        >
          <option value="">{t('search.destination')}</option>
          {PUBLIC_DESTINATIONS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 md:contents gap-2">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="flex-1 p-2.5 sm:p-3 rounded bg-gray-100 text-gray-700 outline-none text-sm sm:text-base"
            placeholder="Check-in Date"
            aria-label="Check-in date"
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="flex-1 p-2.5 sm:p-3 rounded bg-gray-100 text-gray-700 outline-none text-sm sm:text-base"
            placeholder="Check-out Date"
            aria-label="Check-out date"
          />
        </div>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="flex-1 p-2.5 sm:p-3 rounded bg-gray-100 text-gray-700 outline-none text-sm sm:text-base"
          aria-label="Price range"
        >
          <option value="">{t('search.priceRange')}</option>
          <option value="500-1000">$500 - $1,000</option>
          <option value="1000-2000">$1,000 - $2,000</option>
          <option value="2000-5000">$2,000 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
        </select>

        <button
          type="submit"
          className="bg-cyan-400 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded hover:bg-cyan-500 transition-colors whitespace-nowrap text-sm sm:text-base"
        >
          {t('search.search')}
        </button>
      </div>
    </form>
  );
}