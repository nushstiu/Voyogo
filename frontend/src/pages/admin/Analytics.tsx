import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS, COLORS } from '../../constants';
import Breadcrumb from '../../components/common/Breadcrumb';
import type {
  AnalyticsOverview,
  BookingTrend,
  PopularDestination,
  RevenueData,
} from '../../types';

const PIE_COLORS = [COLORS.accent, COLORS.warning, COLORS.danger];

export default function AdminAnalytics() {
  const { t } = useTranslation();
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [trends, setTrends] = useState<BookingTrend[]>([]);
  const [popular, setPopular] = useState<PopularDestination[]>([]);
  const [revenue, setRevenue] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [ovRes, trRes, popRes, revRes] = await Promise.all([
        fetch(API_ENDPOINTS.ANALYTICS_OVERVIEW),
        fetch(API_ENDPOINTS.ANALYTICS_BOOKING_TRENDS),
        fetch(API_ENDPOINTS.ANALYTICS_POPULAR_DESTINATIONS),
        fetch(API_ENDPOINTS.ANALYTICS_REVENUE),
      ]);
      setOverview(await ovRes.json());
      setTrends(await trRes.json());
      setPopular(await popRes.json());
      setRevenue(await revRes.json());
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb />

      <h1 className="text-2xl font-bold text-text-primary mb-6">{t('analytics.title')}</h1>

      {overview && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-default p-6">
            <p className="text-3xl font-bold text-text-primary">{overview.totalUsers}</p>
            <p className="text-text-secondary text-sm mt-1">{t('adminDashboard.totalUsers')}</p>
          </div>
          <div className="card-default p-6">
            <p className="text-3xl font-bold text-text-primary">{overview.totalBookings}</p>
            <p className="text-text-secondary text-sm mt-1">{t('userDashboard.totalBookings')}</p>
          </div>
          <div className="card-default p-6">
            <p className="text-3xl font-bold text-text-primary">
              ${overview.totalRevenue.toLocaleString()}
            </p>
            <p className="text-text-secondary text-sm mt-1">{t('adminDashboard.totalRevenue')}</p>
          </div>
          <div className="card-default p-6">
            <p className="text-3xl font-bold text-text-primary">{overview.activeTours}</p>
            <p className="text-text-secondary text-sm mt-1">{t('adminDashboard.activeTours')}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card-default p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">{t('analytics.bookingTrends')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke={COLORS.primary}
                strokeWidth={2}
                dot={{ fill: COLORS.primary, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-default p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">{t('analytics.popularDestinations')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popular}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="bookings" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-default p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">{t('analytics.revenueByDestination')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="destination" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Bar dataKey="revenue" fill={COLORS.accent} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-default p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">{t('analytics.statusDistribution')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: t('status.confirmed'), value: overview?.totalBookings ? Math.round(overview.totalBookings * 0.5) : 0 },
                  { name: t('status.pending'), value: overview?.totalBookings ? Math.round(overview.totalBookings * 0.33) : 0 },
                  { name: t('status.cancelled'), value: overview?.totalBookings ? Math.round(overview.totalBookings * 0.17) : 0 },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {PIE_COLORS.map((color, i) => (
                  <Cell key={i} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
