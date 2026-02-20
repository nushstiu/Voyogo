import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import destinations from '../../data/destinations.json';

export default function SearchForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      className="bg-white p-6 md:p-10 rounded-lg max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-3 items-stretch">
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 p-3 rounded bg-gray-100 text-gray-700 outline-none"
          aria-label="Select destination"
        >
          <option value="">{t('search.destination')}</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="flex-1 p-3 rounded bg-gray-100 text-gray-700 outline-none"
          placeholder={t('search.checkIn')}
          aria-label="Check-in date"
        />

        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="flex-1 p-3 rounded bg-gray-100 text-gray-700 outline-none"
          placeholder={t('search.checkOut')}
          aria-label="Check-out date"
        />

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="flex-1 p-3 rounded bg-gray-100 text-gray-700 outline-none"
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
          className="bg-cyan-400 text-white font-semibold px-8 py-3 rounded hover:bg-cyan-500 transition-colors whitespace-nowrap"
        >
          {t('search.search')}
        </button>
      </div>
    </form>
  );
}