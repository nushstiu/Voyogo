import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCalendarCheck,
  faDollarSign,
  faRoute,
  faMapMarkerAlt,
  faClock,
  faGlobe,
  faChartBar,
  faSignOutAlt,
  faShieldAlt,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { UI_TEXT } from '../../constants/text';
import { ROUTES } from '../../constants';
import { userService } from '../../services/user.service';
import { bookingService } from '../../services/booking.service';
import { tourService } from '../../services/tour.service';
import { destinationService } from '../../services/destination.service';
import StatusBadge from '../../components/common/StatusBadge';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import type { Booking } from '../../types';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeTours: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [counts, setCounts] = useState({ users: 0, destinations: 0, tours: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const [users, bookings, tours, destinations] = await Promise.all([
        userService.getAll(),
        bookingService.getAll(),
        tourService.getAll(),
        destinationService.getAll(),
      ]);
      setCounts({ users: users.length, destinations: destinations.length, tours: tours.length });
      const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');
      setStats({
        totalUsers: users.filter((u) => u.role === 'user').length,
        totalBookings: bookings.length,
        totalRevenue: confirmedBookings.length * 1200,
        activeTours: tours.filter((t) => t.status === 'active').length,
      });
      setRecentBookings(
        [...bookings]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
      );
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const destinationCounts = recentBookings.length > 0
    ? recentBookings.reduce((acc, b) => {
        acc[b.destination] = (acc[b.destination] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : {};

  const topDestinations = Object.entries(destinationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

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

  const statCards = [
    {
      icon: faUsers,
      value: stats.totalUsers,
      label: UI_TEXT.STAT_TOTAL_USERS,
      bg: 'bg-cyan-100',
      color: 'text-cyan-400',
      to: ROUTES.ADMIN_USERS,
    },
    {
      icon: faCalendarCheck,
      value: stats.totalBookings,
      label: UI_TEXT.STAT_TOTAL_BOOKINGS,
      bg: 'bg-blue-100',
      color: 'text-blue-500',
      to: ROUTES.ADMIN_BOOKINGS,
    },
    {
      icon: faDollarSign,
      value: `$${stats.totalRevenue.toLocaleString()}`,
      label: UI_TEXT.STAT_TOTAL_REVENUE,
      bg: 'bg-green-100',
      color: 'text-green-500',
      to: ROUTES.ADMIN_ANALYTICS,
    },
    {
      icon: faRoute,
      value: stats.activeTours,
      label: UI_TEXT.STAT_ACTIVE_TOURS,
      bg: 'bg-amber-100',
      color: 'text-amber-500',
      to: ROUTES.ADMIN_TOURS,
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="w-full px-6 md:px-16 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{UI_TEXT.ADMIN_WELCOME}</h1>
              <p className="text-gray-500 mt-1">Overview of your travel platform</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-lg">
                <FontAwesomeIcon icon={faShieldAlt} className="text-cyan-400 text-lg" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">{user?.username}</p>
                  <p className="text-gray-400 text-xs">Administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                {UI_TEXT.LOGOUT_BUTTON}
              </button>
            </div>
          </div>

          {/* Clickable Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statCards.map((card) => (
              <Link
                key={card.label}
                to={card.to}
                className="bg-white rounded-2xl shadow-lg p-6 group hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center`}>
                    <FontAwesomeIcon icon={card.icon} className={`${card.color} text-lg`} />
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                <p className="text-gray-500 text-sm mt-1">{card.label}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Recent Bookings */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">{UI_TEXT.RECENT_BOOKINGS}</h2>
                <Link
                  to={ROUTES.ADMIN_BOOKINGS}
                  className="text-sm text-blue-500 hover:underline font-medium"
                >
                  View all
                </Link>
              </div>

              <div className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 text-sm" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {booking.name} {booking.surname}
                        </p>
                        <p className="text-xs text-gray-500">{booking.destination}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-1.5 text-gray-500 text-xs">
                        <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                        {new Date(booking.booking_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Top Destinations</h2>
                <Link
                  to={ROUTES.ADMIN_DESTINATIONS}
                  className="text-sm text-blue-500 hover:underline font-medium"
                >
                  View all
                </Link>
              </div>

              <div className="divide-y divide-gray-100">
                {topDestinations.map(([name, count]) => (
                  <div key={name} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faGlobe} className="text-cyan-400 text-sm" />
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{name}</span>
                    </div>
                    <span className="text-gray-500 text-sm font-semibold">
                      {count} booking{count !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions - clickable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to={ROUTES.ADMIN_USERS} className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 group hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="text-cyan-400 text-sm" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Users</p>
                <p className="text-xs text-gray-500">{counts.users} total</p>
              </div>
            </Link>

            <Link to={ROUTES.ADMIN_DESTINATIONS} className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 group hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faGlobe} className="text-blue-500 text-sm" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Destinations</p>
                <p className="text-xs text-gray-500">{counts.destinations} total</p>
              </div>
            </Link>

            <Link to={ROUTES.ADMIN_TOURS} className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 group hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faRoute} className="text-amber-500 text-sm" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Tours</p>
                <p className="text-xs text-gray-500">{counts.tours} total</p>
              </div>
            </Link>

            <Link to={ROUTES.ADMIN_ANALYTICS} className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 group hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faChartBar} className="text-green-500 text-sm" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Analytics</p>
                <p className="text-xs text-gray-500">View reports</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
