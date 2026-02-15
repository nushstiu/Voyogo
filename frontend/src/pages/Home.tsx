import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import PopularDestinations from '../components/home/PopularDestinations';
import PromoSection from '../components/home/PromoSection';
import FAQSection from '../components/home/FAQSection';
import NewsletterSection from '../components/home/NewsletterSection';

export default function Home() {
  return (
    <>
      <Header transparent />
      <main>
        <HeroSection />
        <PopularDestinations />
        <PromoSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}