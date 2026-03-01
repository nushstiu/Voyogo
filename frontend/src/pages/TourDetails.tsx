import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
  faLocationDot,
  faClock,
  faUsers,
  faCompass,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../constants/routes';
import { MOCK_TOURS } from '../data/tours.data';
import { MOCK_DESTINATIONS } from '../data/destinations.data';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import type { Tour, Destination } from '../types';

export default function TourDetails() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const tour = MOCK_TOURS.find((t) => t.id === id) || null;
  const destination = tour
    ? MOCK_DESTINATIONS.find((d) => d.id === tour.destination_id) || null
    : null;

  if (!tour) {
    return (
      <>
        <Header transparent />
        <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tourDetails.notFound')}</h2>
          <Button onClick={() => navigate(ROUTES.TOURS)}>{t('tourDetails.backToTours')}</Button>
        </div>
        <Footer />
      </>
    );
  }

  if (tour.itinerary) {
    return <RichTourLayout tour={tour} destination={destination} />;
  }

  return <ClassicTourLayout tour={tour} destination={destination} />;
}

/* ─── Rich Vacasky-style layout (Thailand tours) ─── */

function RichTourLayout({ tour, destination }: { tour: Tour; destination: Destination | null }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const days = parseInt(tour.days, 10);

  const [openIdx, setOpenIdx] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    startingDate: '',
    leavingDate: '',
    facilities: 'standard',
  });

  const handleBooking = () => {
    const params = new URLSearchParams({
      tour_id: tour.id,
      tour_name: tour.name,
      starting_date: formData.startingDate,
      leaving_date: formData.leavingDate,
      facilities: formData.facilities,
      full_name: formData.fullName,
    });
    navigate(`${ROUTES.BOOKING}?${params.toString()}`);
  };

  return (
    <>
      <Header transparent />
      <main>
        {/* Hero */}
        <section
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${tour.image})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-3/4 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
              <Link to={ROUTES.HOME} className="hover:text-white transition-colors">
                {t('app.name')}
              </Link>
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              <Link to={ROUTES.TOURS} className="hover:text-white transition-colors">
                {t('nav.tours')}
              </Link>
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              <span className="text-white">{tour.name}</span>
            </div>
            <h1 className="text-white text-5xl sm:text-7xl lg:text-9xl font-extrabold tracking-wider uppercase">
              {tour.name}
            </h1>
          </div>
        </section>

        {/* Gallery Carousel */}
        {tour.gallery && tour.gallery.length > 0 && (
          <GalleryCarousel images={tour.gallery} />
        )}

        {/* Two-column content */}
        <div className="w-full px-6 md:px-16 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tourDetails.overview')}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{tour.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <InfoPill icon={faLocationDot} label={t('tourDetails.location')} value={tour.location} />
                  <InfoPill icon={faClock} label={t('tourDetails.duration')} value={t('tourDetails.days', { count: days })} />
                  <InfoPill icon={faUsers} label={t('tourDetails.groupSize')} value={t('tourDetails.groupSizeValue')} />
                  <InfoPill icon={faCompass} label={t('tourDetails.tourType')} value={t('tourDetails.tourTypeValue')} />
                </div>
              </section>

              {/* Included / Not Included */}
              {(tour.included || tour.notIncluded) && (
                <section>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tour.included && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{t('tourDetails.included')}</h3>
                        <ul className="space-y-3">
                          {tour.included.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00d3f31a' }}>
                                <FontAwesomeIcon icon={faCheck} className="text-xs" style={{ color: '#00d3f3' }} />
                              </span>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tour.notIncluded && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{t('tourDetails.notIncluded')}</h3>
                        <ul className="space-y-3">
                          {tour.notIncluded.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                                <FontAwesomeIcon icon={faXmark} className="text-red-500 text-xs" />
                              </span>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Itinerary */}
              {tour.itinerary && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('tourDetails.itinerary')}</h2>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

                    <div className="space-y-0">
                      {tour.itinerary.map((step, i) => {
                        const isOpen = openIdx === i;
                        return (
                          <div key={i} className="relative pl-14">
                            {/* Numbered circle */}
                            <div
                              className={`absolute left-2 top-3 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                                isOpen
                                  ? 'text-white'
                                  : 'bg-white border-2 border-gray-300 text-gray-500'
                              }`}
                              style={isOpen ? { backgroundColor: '#00d3f3' } : undefined}
                            >
                              {i + 1}
                            </div>

                            <button
                              onClick={() => setOpenIdx(isOpen ? -1 : i)}
                              className="w-full text-left py-3 flex items-center justify-between"
                            >
                              <span className="font-semibold text-gray-800">
                                Day {i + 1}: {step.title}
                              </span>
                              <FontAwesomeIcon
                                icon={isOpen ? faChevronUp : faChevronDown}
                                className="text-gray-400 text-sm"
                              />
                            </button>

                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                isOpen ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'
                              }`}
                            >
                              <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

              {/* Reviews */}
              {tour.reviews && tour.reviews.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('tourDetails.reviews')}</h2>
                  <div className="space-y-6">
                    {tour.reviews.map((review, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">{review.name}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right column — Sidebar */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg sticky top-24 overflow-hidden">
                {/* Card header */}
                <div className="text-white px-6 py-4" style={{ backgroundColor: '#00d3f3' }}>
                  <h3 className="text-lg font-bold">{t('tourDetails.joinTour')}</h3>
                  <p className="text-white/80 text-sm mt-1">{t('tourDetails.joinTourDesc')}</p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('tourDetails.fullName')}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d3f3] focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Starting Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('tourDetails.startingDate')}
                    </label>
                    <input
                      type="date"
                      value={formData.startingDate}
                      onChange={(e) => setFormData({ ...formData, startingDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d3f3] focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Leaving Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('tourDetails.leavingDate')}
                    </label>
                    <input
                      type="date"
                      value={formData.leavingDate}
                      onChange={(e) => setFormData({ ...formData, leavingDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d3f3] focus:border-transparent text-sm"
                    />
                  </div>

                  {/* User Facilities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('tourDetails.userFacilities')}
                    </label>
                    <select
                      value={formData.facilities}
                      onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d3f3] focus:border-transparent text-sm"
                    >
                      <option value="standard">{t('tourDetails.facilitiesStandard')}</option>
                      <option value="premium">{t('tourDetails.facilitiesPremium')}</option>
                      <option value="luxury">{t('tourDetails.facilitiesLuxury')}</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="text-center pt-2">
                    <p className="text-3xl font-bold" style={{ color: '#00d3f3' }}>{tour.price}</p>
                    <p className="text-gray-500 text-sm">{t('tourDetails.perPerson')}</p>
                  </div>

                  {/* Book Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleBooking}
                  >
                    {t('tourDetails.bookTheTour')}
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    {t('tourDetails.freeCancellation')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section
          className="relative bg-cover bg-center py-24"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-wider uppercase mb-4">
              {t('tourDetails.startAdventure')}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              {t('tourDetails.startAdventureDesc')}
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(ROUTES.BOOKING)}
            >
              {t('tourDetails.bookNow')}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ─── Gallery Carousel ─── */

function GalleryCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  const getIndex = (offset: number) =>
    (current + offset + images.length) % images.length;

  return (
    <section className="w-full py-8 overflow-hidden">
      <div className="relative flex items-center justify-center gap-4 px-4">
        {/* Far left (partially visible) */}
        <div className="hidden lg:block flex-shrink-0 w-[10%] h-48 rounded-xl overflow-hidden opacity-60">
          <img
            src={images[getIndex(-2)]}
            alt=""
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Left image */}
        <button
          onClick={prev}
          className="relative flex-shrink-0 w-[18%] md:w-[15%] h-48 rounded-xl overflow-hidden cursor-pointer"
        >
          <img
            src={images[getIndex(-1)]}
            alt=""
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
            <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700 text-2xl" />
          </div>
        </button>

        {/* Center active image */}
        <div className="relative flex-shrink-0 w-[50%] md:w-[40%] h-56 md:h-64 rounded-xl overflow-hidden shadow-lg">
          <img
            src={images[current]}
            alt={`Gallery ${current + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Dot indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#00d3f3' }} />
          </div>
        </div>

        {/* Right image */}
        <button
          onClick={next}
          className="relative flex-shrink-0 w-[18%] md:w-[15%] h-48 rounded-xl overflow-hidden cursor-pointer"
        >
          <img
            src={images[getIndex(1)]}
            alt=""
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-700 text-2xl" />
          </div>
        </button>

        {/* Far right (partially visible) */}
        <div className="hidden lg:block flex-shrink-0 w-[10%] h-48 rounded-xl overflow-hidden opacity-60">
          <img
            src={images[getIndex(2)]}
            alt=""
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Info pill component ─── */

function InfoPill({ icon, label, value }: { icon: typeof faLocationDot; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#00d3f31a' }}>
        <FontAwesomeIcon icon={icon} style={{ color: '#00d3f3' }} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

/* ─── Classic layout (non-Thailand tours) ─── */

function ClassicTourLayout({ tour, destination }: { tour: Tour; destination: Destination | null }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const days = parseInt(tour.days, 10);

  return (
    <>
      <Header transparent />
      <main>
        {/* Hero */}
        <section
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${tour.image})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-3/4 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
              <Link to={ROUTES.HOME} className="hover:text-white transition-colors">
                {t('app.name')}
              </Link>
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              <Link to={ROUTES.TOURS} className="hover:text-white transition-colors">
                {t('nav.tours')}
              </Link>
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              <span className="text-white">{tour.name}</span>
            </div>
            <h1 className="text-white text-4xl sm:text-7xl md:text-9xl font-extrabold tracking-wider uppercase">
              {tour.name}
            </h1>
          </div>
        </section>

        {/* Content */}
        <div className="w-full px-4 sm:px-6 md:px-16 py-12">
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
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold" style={{ color: '#00d3f3' }}>&#10003;</span>
                    <span>{t('tourDetails.professionalGuide')}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold" style={{ color: '#00d3f3' }}>&#10003;</span>
                    <span>{t('tourDetails.hotelAccommodation')}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold" style={{ color: '#00d3f3' }}>&#10003;</span>
                    <span>{t('tourDetails.airportTransfers')}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold" style={{ color: '#00d3f3' }}>&#10003;</span>
                    <span>{t('tourDetails.breakfastIncluded')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar booking card */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold" style={{ color: '#00d3f3' }}>{tour.price}</p>
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
                    <span className="font-semibold" style={{ color: tour.status === 'active' ? '#00d3f3' : '#dc2626' }}>
                      {tour.status}
                    </span>
                  </div>
                  {destination && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('tourDetails.priceRange')}</span>
                      <span className="font-semibold">{destination.price_range}</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate(ROUTES.BOOKING)}
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
