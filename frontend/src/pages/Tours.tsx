import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FilterButtons from '../components/destinations/FilterButtons';
import TourItem from '../components/tours/TourItem';
import type { Tour } from '../types/tour';
import { PUBLIC_TOURS } from '../data';

const categories = ['all', 'best-seller', 'nature', 'city', 'seasonal'];

export default function Tours() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result: Tour[] = PUBLIC_TOURS;
    if (activeFilter !== 'all') {
      result = result.filter((tour) => tour.category === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.name.toLowerCase().includes(q) ||
          tour.location.toLowerCase().includes(q) ||
          tour.description.toLowerCase().includes(q)
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
              'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-3/4 flex flex-col items-center justify-center">
            <p className="text-white text-xl">{t('tours.breadcrumb')}</p>
            <h1 className="text-white text-6xl md:text-8xl font-extrabold tracking-wider mt-4">
              {t('tours.title')}
            </h1>
          </div>
        </section>

        {/* Filter & Search */}
        <div className="w-full px-6 md:px-16 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t('tours.popular')}</h2>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('form.search')}
                className="border-b border-gray-400 bg-transparent py-2 pr-8 pl-2 outline-none text-gray-700"
                aria-label={t('form.search')}
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

        {/* Tour List */}
        <div className="w-full px-6 md:px-16 mt-10 mb-20">
          {filtered.map((tour) => (
            <TourItem key={tour.id} tour={tour} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 mt-10 text-lg">
              {t('tours.noResults')}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
