import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FilterButtons from '../components/destinations/FilterButtons';
import DestinationCard from '../components/destinations/DestinationCard';
import type { Destination } from '../types/destination';
import destinationsData from '../data/destinations.json';

const categories = ['all', 'best-seller', 'nature', 'city', 'seasonal'];

export default function Destinations() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = destinationsData as Destination[];
    if (activeFilter !== 'all') {
      result = result.filter((d) => d.category === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeFilter, search]);

  return (
    <>
      <Header transparent />
      <main>
        {/* Hero */}
        <section
          className="relative h-screen bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-3/4 flex flex-col items-center justify-center">
            <p className="text-white text-xl">{t('destinations.breadcrumb')}</p>
            <h1 className="text-white text-7xl md:text-9xl font-extrabold tracking-wider mt-4">
              {t('destinations.title')}
            </h1>
          </div>
        </section>

        {/* Filter & Search */}
        <div className="w-full px-6 md:px-16 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t('destinations.popular')}</h2>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('form.search')}
                className="border-b border-gray-400 bg-transparent py-2 pr-8 pl-2 outline-none text-gray-700"
                aria-label="Search destinations"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="mt-8">
            <FilterButtons
              categories={categories}
              active={activeFilter}
              onFilter={setActiveFilter}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="w-full px-6 md:px-16 mt-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 mt-10 text-lg">
              {t('destinations.noResults')}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}