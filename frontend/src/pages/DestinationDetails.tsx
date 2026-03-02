import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faClock,
  faGlobe,
  faCalendarDays,
  faLanguage,
  faCoins,
  faTemperatureHigh,
  faUtensils,
  faLandmark,
  faWater,
  faMountainSun,
  faHeart,
  faChevronRight,
  faVolcano,
  faTree,
  faPersonHiking,
  faUmbrellaBeach,
  faSpa,
} from '@fortawesome/free-solid-svg-icons';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ROUTES } from '../constants/routes';
import { MOCK_TOURS } from '../data/tours.data';

// ---------- THAILAND ----------
const THAILAND_GALLERY = [
  'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
  'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
  'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800',
  'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800',
];

const THAILAND_HIGHLIGHTS = [
  {
    icon: faLandmark,
    title: 'Ancient Temples',
    desc: 'Over 40,000 Buddhist temples including the famous Wat Phra Kaew and Wat Arun',
  },
  {
    icon: faUtensils,
    title: 'World-Class Cuisine',
    desc: 'From Pad Thai to Tom Yum, experience the bold flavors of Thai street food and fine dining',
  },
  {
    icon: faWater,
    title: 'Pristine Beaches',
    desc: 'Crystal-clear waters and white sand beaches across Phuket, Koh Phi Phi, and Koh Samui',
  },
  {
    icon: faMountainSun,
    title: 'Lush Jungles',
    desc: 'Trek through northern highlands, visit elephant sanctuaries, and explore national parks',
  },
  {
    icon: faHeart,
    title: 'Warm Hospitality',
    desc: 'Known as the "Land of Smiles" for its welcoming culture and friendly locals',
  },
  {
    icon: faGlobe,
    title: 'Rich Culture',
    desc: 'Floating markets, traditional dance, Muay Thai, and vibrant night markets',
  },
];

const THAILAND_FACTS = [
  { icon: faLocationDot, label: 'Capital', value: 'Bangkok' },
  { icon: faLanguage, label: 'Language', value: 'Thai' },
  { icon: faCoins, label: 'Currency', value: 'Thai Baht (THB)' },
  { icon: faCalendarDays, label: 'Best Time', value: 'Nov - Feb' },
  { icon: faTemperatureHigh, label: 'Climate', value: 'Tropical, 25-35°C' },
  { icon: faGlobe, label: 'Time Zone', value: 'GMT+7' },
];

// ---------- INDONESIA ----------
const INDONESIA_GALLERY = [
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
  'https://images.unsplash.com/photo-1518183214770-9cffbec72538?w=800',
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
  'https://images.unsplash.com/photo-1541417904950-b855846fe074?w=800',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
];

const INDONESIA_HIGHLIGHTS = [
  {
    icon: faUmbrellaBeach,
    title: 'Island Paradise',
    desc: 'Explore Indonesia’s stunning islands — Bali, Lombok, Gili, and hidden beach coves.',
  },
  {
    icon: faVolcano,
    title: 'Volcano Adventures',
    desc: 'Chase sunrise at Mount Bromo, hike Mount Rinjani, and witness volcanic landscapes.',
  },
  {
    icon: faTree,
    title: 'Tropical Nature',
    desc: 'Rice terraces, waterfalls, jungle trails, and unique wildlife across the archipelago.',
  },
  {
    icon: faLandmark,
    title: 'Sacred Temples',
    desc: 'Discover iconic temples like Tanah Lot and Uluwatu, plus cultural villages in Ubud.',
  },
  {
    icon: faSpa,
    title: 'Wellness & Relax',
    desc: 'World-famous spa culture, yoga retreats, and slow living in the heart of Bali.',
  },
  {
    icon: faPersonHiking,
    title: 'Culture & Local Life',
    desc: 'Traditional ceremonies, crafts, night markets, and warm local hospitality.',
  },
];

const INDONESIA_FACTS = [
  { icon: faLocationDot, label: 'Capital', value: 'Jakarta' },
  { icon: faLanguage, label: 'Language', value: 'Indonesian' },
  { icon: faCoins, label: 'Currency', value: 'Indonesian Rupiah (IDR)' },
  { icon: faCalendarDays, label: 'Best Time', value: 'Apr - Oct' },
  { icon: faTemperatureHigh, label: 'Climate', value: 'Tropical, 24-32°C' },
  { icon: faGlobe, label: 'Time Zone', value: 'GMT+7 to GMT+9' },
];

type DestinationKey = 'thailand' | 'indonesia';

type Highlight = { icon: any; title: string; desc: string };
type Fact = { icon: any; label: string; value: string };

const DESTINATION_CONFIG: Record<
    DestinationKey,
    {
      title: string;
      hero: string;
      gallery: string[];
      highlights: Highlight[];
      facts: Fact[];
      toursDestinationId: number;
      desc1: string;
      desc2: string;
    }
> = {
  thailand: {
    title: 'Thailand',
    hero: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=80',
    gallery: THAILAND_GALLERY,
    highlights: THAILAND_HIGHLIGHTS,
    facts: THAILAND_FACTS,
    toursDestinationId: 3,
    desc1:
        'Thailand is a vibrant destination where ancient traditions meet modern energy. From Bangkok’s temples and street food to the calm mountains of Chiang Mai, every region offers a different story.',
    desc2:
        'Whether you want beaches, nightlife, culture, or adventure, Thailand delivers an unforgettable experience with warm hospitality and rich local life.',
  },
  indonesia: {
    title: 'Indonesia',
    hero: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80',
    gallery: INDONESIA_GALLERY,
    highlights: INDONESIA_HIGHLIGHTS,
    facts: INDONESIA_FACTS,
    toursDestinationId: 1,
    desc1:
        'Indonezia este un arhipelag spectaculos, unde vulcanii activi, plajele tropicale și terasele de orez creează peisaje de poveste.',
    desc2:
        'De la cultura și atmosfera spirituală din Bali, până la aventurile din Komodo, Indonezia este ideală pentru cei care vor și relaxare, și explorare.',
  },
};

export default function DestinationDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();


  // ✅ verificăm sigur dacă există în config
  const destination =
      id && (id in DESTINATION_CONFIG)
          ? DESTINATION_CONFIG[id as DestinationKey]
          : null;

  if (!destination) {
    return (
        <>
          <Header transparent />
          <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t('destinations.noResults')}
            </h2>
            <button
                onClick={() => navigate(ROUTES.DESTINATIONS)}
                className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
            >
              {t('actions.back')}
            </button>
          </div>
          <Footer />
        </>
    );
  }

  const destinationTours = MOCK_TOURS.filter(
      (tour) => tour.destination_id === destination.toursDestinationId
  );

  return (
      <>
        <Header transparent />
        <main>
          {/* Hero */}
          <section
              className="relative h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${destination.hero})` }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 h-3/4 flex flex-col items-center justify-center text-center px-4">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                <Link to={ROUTES.HOME} className="hover:text-white transition-colors">
                  {t('app.name')}
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                <Link
                    to={ROUTES.DESTINATIONS}
                    className="hover:text-white transition-colors"
                >
                  {t('nav.destinations')}
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                <span className="text-white">{destination.title}</span>
              </div>

              <h1 className="text-white text-7xl md:text-9xl font-extrabold tracking-wider">
                {destination.title.toUpperCase()}
              </h1>
            </div>
          </section>

          {/* Overview + Facts */}
          <section className="w-full px-6 md:px-16 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <p className="text-cyan-500 tracking-widest font-semibold text-sm uppercase mb-2">
                  {t('destinationDetails.overview')}
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  {destination.title === 'Thailand'
                      ? t('destinationDetails.discoverThailand')
                      : 'Descoperă Indonesia'}
                </h2>

                <p className="text-gray-600 leading-relaxed text-lg mb-4">
                  {destination.desc1}
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {destination.desc2}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
                <h3 className="text-xl font-bold text-gray-800 mb-5">
                  {t('destinationDetails.keyFacts')}
                </h3>

                <div className="space-y-4">
                  {destination.facts.map((fact) => (
                      <div key={fact.label} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={fact.icon} className="text-cyan-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">
                            {fact.label}
                          </p>
                          <p className="text-gray-800 font-semibold">{fact.value}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="w-full px-6 md:px-16 pb-16">
            <p className="text-cyan-500 tracking-widest font-semibold text-sm uppercase mb-2">
              {t('destinationDetails.gallery')}
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {destination.title === 'Thailand'
                  ? t('destinationDetails.galleryTitle')
                  : 'Explorează Indonezia în imagini'}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destination.gallery.map((img, i) => (
                  <div
                      key={i}
                      className={`overflow-hidden rounded-2xl ${
                          i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                      }`}
                  >
                    <img
                        src={img}
                        alt={`${destination.title} ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        style={{ minHeight: i === 0 ? '250px' : '150px' }}
                        loading="lazy"
                    />
                  </div>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section className="w-full px-6 md:px-16 pb-16">
            <div className="text-center mb-12">
              <p className="text-cyan-500 tracking-widest font-semibold text-sm uppercase mb-2">
                {t('destinationDetails.whyVisit')}
              </p>
              <h2 className="text-3xl font-bold text-gray-800">
                {destination.title === 'Thailand'
                    ? t('destinationDetails.whyVisitTitle')
                    : 'De ce Indonezia ar trebui să fie următoarea ta destinație'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.highlights.map((item) => (
                  <div
                      key={item.title}
                      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors">
                      <FontAwesomeIcon
                          icon={item.icon}
                          className="text-cyan-500 text-xl group-hover:text-white transition-colors"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
              ))}
            </div>
          </section>

          {/* Tours */}
          <section className="w-full px-6 md:px-16 pb-16">
            <div className="text-center mb-12">
              <p className="text-cyan-500 tracking-widest font-semibold text-sm uppercase mb-2">
                {t('destinationDetails.tourPackages')}
              </p>
              <h2 className="text-3xl font-bold text-gray-800">
                {t('destinationDetails.availableTours')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinationTours.map((tour) => (
                  <div
                      key={tour.id}
                      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <div className="overflow-hidden">
                      <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-cyan-500 text-sm mb-2">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{tour.location}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {tour.name}
                      </h3>

                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {tour.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} className="text-cyan-400" />
                        {tour.days} {t('table.days')}
                      </span>
                        </div>

                        <p className="text-xl font-bold text-cyan-600">{tour.price}</p>
                      </div>

                      <div className="flex gap-3">
                        <Link
                            to={ROUTES.TOUR_DETAILS.replace(':id', tour.id)}
                            className="flex-1 text-center bg-cyan-500 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-cyan-600 transition-colors"
                        >
                          {t('tourDetails.bookNow')}
                        </Link>

                        <Link
                            to={ROUTES.TOUR_DETAILS.replace(':id', tour.id)}
                            className="flex-1 text-center border-2 border-cyan-500 text-cyan-500 px-4 py-2.5 rounded-xl font-semibold hover:bg-cyan-500 hover:text-white transition-colors"
                        >
                          {t('actions.view')}
                        </Link>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            {destinationTours.length === 0 && (
                <p className="text-center text-gray-500 mt-10 text-lg">
                  {t('destinations.noResults')}
                </p>
            )}
          </section>

          {/* CTA */}
          <section className="w-full px-6 md:px-16 pb-16">
            <div
                className="relative rounded-3xl overflow-hidden bg-cover bg-center py-20 px-8"
                style={{ backgroundImage: `url(${destination.hero})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/90 to-blue-600/80" />
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
                  {destination.title === 'Thailand'
                      ? t('destinationDetails.ctaTitle')
                      : 'Pregătit să explorezi Indonezia?'}
                </h2>

                <p className="text-white/90 text-lg mb-8">
                  {destination.title === 'Thailand'
                      ? t('destinationDetails.ctaDesc')
                      : 'Rezervă aventura ta de vis în Indonezia și descoperă mixul perfect dintre natură, cultură și relaxare.'}
                </p>
                <button
                    onClick={() => navigate(ROUTES.BOOKING)}
                    className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {t('destinationDetails.planTrip')}
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
  );
}