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
  'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400',
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

const INDONESIA_GALLERY = [
  'https://images.pexels.com/photos/3348363/pexels-photo-3348363.jpeg?auto=compress&cs=tinysrgb&w=800', 
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 
  'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800', // Dragon de Komodo în habitatul său natural
  'https://images.unsplash.com/photo-1558005530-a7958896ec60?w=800', // Dans tradițional balinez cu costume ornate
  'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800', // Vulcan activ cu craterul și nori de fum
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
  { icon: faLocationDot, label: 'Capitală', value: 'Jakarta' },
  { icon: faLanguage, label: 'Limbă', value: 'Indoneziană' },
  { icon: faCoins, label: 'Monedă', value: 'Rupiah indonezian (IDR)' },
  { icon: faCalendarDays, label: 'Perioada ideală', value: 'Apr - Oct' },
  { icon: faTemperatureHigh, label: 'Climat', value: 'Tropical, 24-32°C' },
  { icon: faGlobe, label: 'Fus orar', value: 'GMT+7 până la GMT+9' },
];

// ---------- JAPAN ----------

const JAPAN_GALLERY = [
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
  'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800',
  'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800',
  'https://images.unsplash.com/photo-1505069446780-4ef442b5207f?w=800',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
  'https://images.unsplash.com/photo-1504788363733-507549153474?w=800',
];

const JAPAN_HIGHLIGHTS = [
  {
    icon: faLandmark,
    title: 'Ancient Temples',
    desc: 'Explore historic temples and shrines such as Kyoto’s Fushimi Inari and Kinkaku-ji.',
  },
  {
    icon: faGlobe,
    title: 'Modern Cities',
    desc: 'Experience Tokyo and Osaka, cities where cutting-edge technology meets vibrant culture.',
  },
  {
    icon: faMountainSun,
    title: 'Mount Fuji',
    desc: 'Witness Japan’s iconic mountain and explore the beautiful landscapes around it.',
  },
  {
    icon: faUtensils,
    title: 'Japanese Cuisine',
    desc: 'Enjoy sushi, ramen, tempura and world-famous culinary traditions.',
  },
  {
    icon: faTree,
    title: 'Cherry Blossoms',
    desc: 'Experience the magical Sakura season when Japan turns pink with blooming cherry trees.',
  },
  {
    icon: faHeart,
    title: 'Rich Traditions',
    desc: 'From tea ceremonies to samurai heritage, Japan preserves centuries-old traditions.',
  },
    
];

const JAPAN_FACTS = [
  { icon: faLocationDot, label: 'Capital', value: 'Tokyo' },
  { icon: faLanguage, label: 'Language', value: 'Japanese' },
  { icon: faCoins, label: 'Currency', value: 'Japanese Yen (JPY)' },
  { icon: faCalendarDays, label: 'Best Time', value: 'Mar - May / Sep - Nov' },
  { icon: faTemperatureHigh, label: 'Climate', value: 'Temperate, 10-30°C' },
  { icon: faGlobe, label: 'Time Zone', value: 'GMT+9' },
];

// ---------- CHINA ----------

const CHINA_GALLERY = [
  'https://images.pexels.com/photos/3204950/pexels-photo-3204950.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4900977/pexels-photo-4900977.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/19872/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2187662/pexels-photo-2187662.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const CHINA_HIGHLIGHTS = [
  {
    icon: faLandmark,
    title: 'Great Wall',
    desc: 'Walk along the iconic Great Wall of China, one of the most impressive wonders in human history.',
  },
  {
    icon: faGlobe,
    title: 'Modern Megacities',
    desc: 'Explore Shanghai and Beijing where futuristic skylines meet ancient traditions.',
  },
  {
    icon: faUtensils,
    title: 'Chinese Cuisine',
    desc: 'Taste authentic regional dishes from Peking Duck to Sichuan specialties.',
  },
  {
    icon: faMountainSun,
    title: 'Epic Landscapes',
    desc: 'Discover dramatic mountains, rivers and scenic national parks.',
  },
  {
    icon: faTree,
    title: 'Ancient Culture',
    desc: 'Experience thousands of years of traditions, philosophy and art.',
  },
  {
    icon: faHeart,
    title: 'Cultural Heritage',
    desc: 'Visit temples, imperial palaces and historical monuments across China.',
  },
];

const CHINA_FACTS = [
  { icon: faLocationDot, label: 'Capital', value: 'Beijing' },
  { icon: faLanguage, label: 'Language', value: 'Chinese (Mandarin)' },
  { icon: faCoins, label: 'Currency', value: 'Chinese Yuan (CNY)' },
  { icon: faCalendarDays, label: 'Best Time', value: 'Apr - May / Sep - Oct' },
  { icon: faTemperatureHigh, label: 'Climate', value: 'Varies by region' },
  { icon: faGlobe, label: 'Time Zone', value: 'GMT+8' },
];
// ---------- PHILIPPINES ----------

const PHILIPPINES_GALLERY = [
  'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2383840/pexels-photo-2383840.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6490680/pexels-photo-6490680.jpeg?auto=compress&cs=tinysrgb&w=800',

];

const PHILIPPINES_HIGHLIGHTS = [
  {
    icon: faUmbrellaBeach,
    title: 'Tropical Beaches',
    desc: 'Discover world-famous white sand beaches and crystal-clear waters in islands like Palawan and Boracay.',
  },
  {
    icon: faWater,
    title: 'Island Hopping',
    desc: 'Explore thousands of islands, hidden lagoons, and breathtaking coastal landscapes.',
  },
  {
    icon: faMountainSun,
    title: 'Natural Wonders',
    desc: 'Visit incredible places like Chocolate Hills and underground rivers.',
  },
  {
    icon: faTree,
    title: 'Rich Biodiversity',
    desc: 'Experience diverse marine life, coral reefs, and tropical jungles.',
  },
  {
    icon: faUtensils,
    title: 'Unique Cuisine',
    desc: 'Taste Filipino dishes that blend Asian, Spanish, and local flavors.',
  },
  {
    icon: faHeart,
    title: 'Warm Hospitality',
    desc: 'Filipino culture is known worldwide for its friendliness and welcoming spirit.',
  },
];

const PHILIPPINES_FACTS = [
  { icon: faLocationDot, label: 'Capital', value: 'Manila' },
  { icon: faLanguage, label: 'Language', value: 'Filipino & English' },
  { icon: faCoins, label: 'Currency', value: 'Philippine Peso (PHP)' },
  { icon: faCalendarDays, label: 'Best Time', value: 'Dec - May' },
  { icon: faTemperatureHigh, label: 'Climate', value: 'Tropical, 25-32°C' },
  { icon: faGlobe, label: 'Time Zone', value: 'GMT+8' },
];
// ---------- SOUTH KOREA ----------

const SOUTH_KOREA_GALLERY = [
  'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/301614/pexels-photo-301614.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/162240/seoul-south-korea-cityscape-162240.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const SOUTH_KOREA_HIGHLIGHTS = [
  {
    icon: faLandmark,
    title: 'Historic Palaces',
    desc: 'Visit iconic landmarks like Gyeongbokgung Palace and explore Korea’s royal history.',
  },
  {
    icon: faGlobe,
    title: 'Modern Cities',
    desc: 'Discover Seoul’s futuristic skyline, vibrant districts, and innovative architecture.',
  },
  {
    icon: faUtensils,
    title: 'Korean Cuisine',
    desc: 'Taste famous dishes such as kimchi, bibimbap, and Korean BBQ.',
  },
  {
    icon: faTree,
    title: 'Beautiful Nature',
    desc: 'Explore mountains, national parks, and scenic landscapes across the country.',
  },
  {
    icon: faHeart,
    title: 'K-Culture',
    desc: 'Experience the global influence of K-pop, Korean dramas, and fashion.',
  },
  {
    icon: faSpa,
    title: 'Wellness & Spas',
    desc: 'Relax in traditional Korean spas and wellness centers.',
  },
];

const SOUTH_KOREA_FACTS = [
  { icon: faLocationDot, label: 'Capital', value: 'Seoul' },
  { icon: faLanguage, label: 'Language', value: 'Korean' },
  { icon: faCoins, label: 'Currency', value: 'South Korean Won (KRW)' },
  { icon: faCalendarDays, label: 'Best Time', value: 'Apr - Jun / Sep - Nov' },
  { icon: faTemperatureHigh, label: 'Climate', value: 'Temperate, 5-30°C' },
  { icon: faGlobe, label: 'Time Zone', value: 'GMT+9' },
];

type DestinationKey =
    | 'indonesia'
    | 'japan'
    | 'thailand'
    | 'china'
    | 'philippines'
    | 'south-korea'
    | 'cojusna';

type Highlight = { icon: any; title: string; desc: string };
type Fact = { icon: any; label: string; value: string };

const DESTINATION_CONFIG: Partial<Record<
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
      overviewTitle: string;
      highlightsTitle: string;
      ctaTitle: string;
      ctaDesc: string;
    }
>> = {
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
    overviewTitle: 'Discover Thailand',
    highlightsTitle: 'Why Thailand should be your next destination',
    ctaTitle: 'Ready to explore Thailand?',
    ctaDesc: 'Book your dream trip to Thailand and experience tropical beaches, cultural treasures, and unforgettable adventures.',
  },
  indonesia: {
    title: 'Indonesia',
    hero:   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    gallery: INDONESIA_GALLERY,
    highlights: INDONESIA_HIGHLIGHTS,
    facts: INDONESIA_FACTS,
    toursDestinationId: 1,
    desc1:
        'Indonezia este un arhipelag spectaculos, unde vulcanii activi, plajele tropicale și terasele de orez creează peisaje de poveste.',
    desc2:
        'De la cultura și atmosfera spirituală din Bali, până la aventurile din Komodo, Indonezia este ideală pentru cei care vor și relaxare, și explorare.',
    overviewTitle: 'Discover Indonesia',
    highlightsTitle: 'Why Indonesia should be your next destination',
    ctaTitle: 'Ready to explore Indonesia?',
    ctaDesc: 'Book your dream adventure in Indonesia and discover the perfect mix of nature, culture, and relaxation.',
  },
  japan: {
    title: 'Japan',
    hero: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80',
    gallery: JAPAN_GALLERY,
    highlights: JAPAN_HIGHLIGHTS,
    facts: JAPAN_FACTS,
    toursDestinationId: 2,
    desc1:
        'Japan is a fascinating destination where ancient traditions blend seamlessly with modern innovation. From the neon-lit streets of Tokyo to the peaceful temples of Kyoto, every region offers a unique experience.',
    desc2:
        'Travelers can explore historic shrines, breathtaking landscapes, and world-renowned cuisine while discovering a culture deeply rooted in respect, harmony, and beauty.',
    overviewTitle: 'Discover Japan',
    highlightsTitle: 'Why Japan should be your next destination',
    ctaTitle: 'Ready to explore Japan?',
    ctaDesc: 'Book your dream adventure in Japan and discover the perfect mix of culture, tradition, nature, and innovation.',
  },
  china: {
    title: 'China',
    hero: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80',
    gallery: CHINA_GALLERY,
    highlights: CHINA_HIGHLIGHTS,
    facts: CHINA_FACTS,
    toursDestinationId: 4,
    desc1:
        'China is a vast and fascinating country where ancient civilization meets modern innovation. From imperial palaces and temples to futuristic skylines, the diversity of experiences is extraordinary.',
    desc2:
        'Travelers can walk along the Great Wall, explore vibrant cities like Shanghai and Beijing, and discover landscapes that have inspired poets and artists for centuries.',

    overviewTitle: 'Discover China',
    highlightsTitle: 'Why China should be your next destination',
    ctaTitle: 'Ready to explore China?',
    ctaDesc:
        'Book your dream adventure in China and discover the perfect mix of history, culture, nature, and modern innovation.',
  },
  philippines: {
    title: 'Philippines',
    hero: 'https://images.pexels.com/photos/161212/rio-de-janeiro-olympics-2016-niteroi-brazil-161212.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: PHILIPPINES_GALLERY,
    highlights: PHILIPPINES_HIGHLIGHTS,
    facts: PHILIPPINES_FACTS,
    toursDestinationId: 5,
    desc1:
        'The Philippines is a tropical paradise made up of more than 7,000 islands, famous for turquoise waters, white sand beaches, and breathtaking natural scenery.',
    desc2:
        'Travelers can enjoy island hopping, diving in coral reefs, exploring lush jungles, and experiencing a vibrant culture influenced by both Asian and Spanish traditions.',

    overviewTitle: 'Discover Philippines',
    highlightsTitle: 'Why Philippines should be your next destination',
    ctaTitle: 'Ready to explore the Philippines?',
    ctaDesc:
        'Plan your dream island adventure and discover tropical beaches, crystal-clear lagoons, and unforgettable island landscapes.',
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
                  {destination.overviewTitle}
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
          {/* Photo Gallery */}
          <section className="w-full px-6 md:px-16 pb-16">
            <p className="text-cyan-500 tracking-widest font-semibold text-sm uppercase mb-2">
              Galerie
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Explorează {destination.title} în imagini
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destination.gallery.map((img, i) => (
                  <div
                      key={i}
                      className={`overflow-hidden rounded-2xl shadow-md ${
                          i === 0
                              ? "md:col-span-2 md:row-span-2 h-[600px]"
                              : "h-[300px]"
                      }`}
                  >
                    <img
                        src={img}
                        alt={`${destination.title} ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
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
                {destination.highlightsTitle}
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
                  {destination.ctaTitle}
                </h2>

                <p className="text-white/90 text-lg mb-8">
                  {destination.ctaDesc}
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