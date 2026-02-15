import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BookingForm from '../components/booking/BookingForm';

export default function Booking() {
  return (
    <>
      <Header transparent />
      <main>
        {/* Hero */}
        <section
          className="relative h-screen bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-3/4 flex flex-col items-center justify-center">
            <p className="text-white text-xl">Home | Tours | Booking</p>
            <h1 className="text-white text-7xl md:text-9xl font-extrabold tracking-wider mt-4">
              BOOKING FORM
            </h1>
          </div>
        </section>

        <BookingForm />
      </main>
      <Footer />
    </>
  );
}