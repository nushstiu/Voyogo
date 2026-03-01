import { useTranslation } from 'react-i18next';
import SearchForm from './SearchForm';

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1528164344705-47542687000d?w=1920&q=80)',
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center px-4">
        <p className="text-white text-l tracking-[8px] sm:tracking-[20px] mb-4 uppercase">
          {t('hero.tagline')}
        </p>
        <h1 className="text-white text-4xl sm:text-7xl md:text-9xl font-extrabold tracking-wider">
          {t('hero.title')}
        </h1>

        <div className="mt-6 sm:mt-12 w-full">
          <SearchForm />
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-10 hidden sm:flex justify-center items-center flex-wrap gap-6 md:gap-10 opacity-60 px-4">
        {['TravelCo', 'FlyAway', 'Explore', 'WanderLux', 'GlobeTrek'].map((name) => (
          <span key={name} className="text-white text-sm md:text-lg font-semibold tracking-wider">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}