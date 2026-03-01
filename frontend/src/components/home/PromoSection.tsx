import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function PromoSection() {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 md:gap-10 px-4 sm:px-6 md:px-16 my-6 sm:my-10">
      <div
        className="relative w-full md:w-1/2 h-64 sm:h-96 rounded-2xl overflow-hidden bg-cover bg-center flex items-end"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10 p-5 sm:p-8">
          <h3 className="text-2xl sm:text-4xl font-bold text-white">{t('home.escapeToParadise')}</h3>
          <p className="text-white/80 mt-1 sm:mt-2 text-sm sm:text-base">{t('home.escapeSubtitle')}</p>
          <Link
            to={ROUTES.BOOKING}
            className="inline-block mt-3 sm:mt-4 bg-white text-black px-5 sm:px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            {t('home.bookNow')}
          </Link>
        </div>
      </div>

      <div
        className="relative w-full md:w-1/3 h-64 sm:h-96 rounded-2xl overflow-hidden bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center p-5 sm:p-8">
          <h3 className="text-xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            {t('home.adventureAwaits')}
          </h3>
          <p className="text-white/80 mt-1 sm:mt-2 text-sm sm:text-base">{t('home.adventureSubtitle')}</p>
          <Link
            to={ROUTES.TOURS}
            className="inline-block mt-3 sm:mt-4 bg-black text-white px-5 sm:px-6 py-2 rounded font-semibold hover:bg-gray-900 transition-colors text-sm sm:text-base"
          >
            {t('home.bookNow')}
          </Link>
        </div>
      </div>
    </section>
  );
}