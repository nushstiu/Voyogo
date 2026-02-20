import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { tourService } from '../services/tour.service';
import { destinationService } from '../services/destination.service';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import type { Tour, Destination } from '../types';

export default function TourDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tour, setTour] = useState<Tour | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      const tourData = await tourService.getById(id);
      setTour(tourData);
      if (tourData) {
        const destData = await destinationService.getById(tourData.destination_id);
        setDestination(destData);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header transparent />
        <div className="pt-20">
          <LoadingSpinner fullScreen message={t('tourDetails.loading')} />
        </div>
        <Footer />
      </>
    );
  }

  if (!tour) {
    return (
      <>
        <Header transparent />
        <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tourDetails.notFound')}</h2>
          <Button onClick={() => navigate('/tours')}>{t('tourDetails.backToTours')}</Button>
        </div>
        <Footer />
      </>
    );
  }

  const priceNum = parseFloat(tour.price.replace(/[$,]/g, ''));
  const days = parseInt(tour.days, 10);

  return (
    <>
      <Header transparent />
      <main>
        {/* Hero */}
        <section
          className="relative h-[60vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${tour.image})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <p className="text-white text-lg mb-2">{tour.location}</p>
            <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-wider">
              {tour.name}
            </h1>
          </div>
        </section>

        {/* Content */}
        <div className="w-full px-6 md:px-16 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tourDetails.aboutTour')}</h2>
                <p className="text-gray-600 leading-relaxed">{tour.description}</p>
              </div>

              {destination && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">{t('tourDetails.aboutDest', { name: destination.name })}</h3>
                  <p className="text-gray-700">{destination.description}</p>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('tourDetails.highlights')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-bold">&#10003;</span>
                    <span>{t('tourDetails.professionalGuide')}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-bold">&#10003;</span>
                    <span>{t('tourDetails.hotelAccommodation')}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-bold">&#10003;</span>
                    <span>{t('tourDetails.airportTransfers')}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-bold">&#10003;</span>
                    <span>{t('tourDetails.breakfastIncluded')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar booking card */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-green-600">{tour.price}</p>
                  <p className="text-gray-500 text-sm">{t('tourDetails.perPerson')}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('tourDetails.duration')}</span>
                    <span className="font-semibold">{t('tourDetails.days', { count: days })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('tourDetails.location')}</span>
                    <span className="font-semibold">{tour.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('tourDetails.statusLabel')}</span>
                    <span className={`font-semibold ${tour.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {tour.status}
                    </span>
                  </div>
                  {destination && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('tourDetails.priceRangeLabel')}</span>
                      <span className="font-semibold">{destination.price_range}</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate('/booking')}
                >
                  {t('tourDetails.bookNow')}
                </Button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  {t('tourDetails.freeCancellation')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
