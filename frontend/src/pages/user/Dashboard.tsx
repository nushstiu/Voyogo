import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faPlane,
  faCheckCircle,
  faMapMarkerAlt,
  faClock,
  faSignOutAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants';
import { UI_TEXT } from '../../constants/text';
import { bookingService } from '../../services/booking.service';
import { tourService } from '../../services/tour.service';
import type { Booking } from '../../types';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allTours, setAllTours] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [allBookings, tours] = await Promise.all([
        bookingService.getAll(),
        tourService.getAll(),
      ]);
      setAllTours(tours.map(t => ({ id: t.id, name: t.name })));
      const userBookings = allBookings.filter((b) => b.user_id === user?.id);
      setBookings(userBookings.length > 0 ? userBookings : allBookings.slice(0, 3));
      setLoading(false);
    };
    fetchData();
  }, [user?.id]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const upcomingTrips = bookings.filter(
    (b) => b.status !== 'cancelled' && new Date(b.booking_date) > new Date()
  ).length;

  const completedTrips = bookings.filter(
    (b) => b.status === 'confirmed' && new Date(b.booking_date) <= new Date()
  ).length;

  const getTourName = (tourId?: string) => {
    if (!tourId) return 'Custom Trip';
    return allTours.find((t) => t.id === tourId)?.name || 'Unknown Tour';
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending':   return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default:          return 'bg-gray-100 text-gray-600';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return UI_TEXT.STATUS_CONFIRMED;
      case 'pending':   return UI_TEXT.STATUS_PENDING;
      case 'cancelled': return UI_TEXT.STATUS_CANCELLED;
      default:          return status;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="w-full px-6 md:px-16 py-12">
          {/* Header with user info + logout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {UI_TEXT.USER_WELCOME(user?.username || 'Traveler')}
              </h1>
              <p className="text-gray-500 mt-1">{UI_TEXT.USER_SUBTITLE}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-lg">
                <FontAwesomeIcon icon={faUserCircle} className="text-blue-500 text-lg" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">{user?.username}</p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                {UI_TEXT.LOGOUT_BUTTON}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-100 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
                <p className="text-gray-500 text-sm">{UI_TEXT.STAT_TOTAL_BOOKINGS}</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faPlane} className="text-cyan-400 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{upcomingTrips}</p>
                <p className="text-gray-500 text-sm">{UI_TEXT.STAT_UPCOMING_TRIPS}</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{completedTrips}</p>
                <p className="text-gray-500 text-sm">{UI_TEXT.STAT_COMPLETED_TRIPS}</p>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">{UI_TEXT.RECENT_BOOKINGS}</h2>
            </div>

            {bookings.length === 0 ? (
              <div className="p-12 text-center">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-gray-300 text-4xl mb-3" />
                <p className="text-gray-500">{UI_TEXT.NO_BOOKINGS}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{booking.destination}</p>
                        <p className="text-sm text-gray-500">{getTourName(booking.tour_id)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                        <span>{booking.duration}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(booking.booking_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(booking.status)}`}>
                        {statusLabel(booking.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
