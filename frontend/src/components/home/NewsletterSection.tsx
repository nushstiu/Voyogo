import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(t('home.thankYou'));
      setEmail('');
    }
  };

  return (
    <section
      className="relative h-[45vh] min-h-[300px] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920)',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          {t('home.startAdventure')}
        </h2>
        <p className="text-white/80 mt-4">
          {t('home.newsletterSubtitle')}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('home.emailPlaceholder')}
            className="bg-transparent border-b border-white text-white placeholder-white/60 px-4 py-2 outline-none flex-1 max-w-md"
            required
            aria-label="Email address"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-900 transition-colors"
          >
            {t('home.subscribe')}
          </button>
        </form>
      </div>
    </section>
  );
}