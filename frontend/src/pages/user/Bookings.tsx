import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faEye,
  faBan,
  faMapMarkerAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/booking.service';
import { useDebounce } from '../../hooks/useDebounce';
import { useFilters } from '../../hooks/useFilters';
import { usePagination } from '../../hooks/usePagination';
import { useModal } from '../../hooks/useModal';
import SearchInput from '../../components/common/SearchInput';
import FilterDropdown from '../../components/common/FilterDropdown';
import Pagination from '../../components/common/Pagination';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Breadcrumb from '../../components/common/Breadcrumb';
import BookingEditModal from '../../components/user/BookingEditModal';
import BookingDetailModal from '../../components/user/BookingDetailModal';
import { BookingStatus } from '../../types';
import type { Booking } from '../../types';
import toast from 'react-hot-toast';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function UserBookings() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { filters, setFilter } = useFilters({ keys: ['search', 'status'] });
  const debouncedSearch = useDebounce(filters.search, 300);

  const STATUS_OPTIONS = [
    { label: t('status.pending'), value: 'pending' },
    { label: t('status.confirmed'), value: 'confirmed' },
    { label: t('status.cancelled'), value: 'cancelled' },
  ];

  const editModal = useModal<Booking>();
  const viewModal = useModal<Booking>();
  const cancelConfirm = useModal<Booking>();

  const fetchBookings = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    let data = await bookingService.getByUserId(user.id);
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      data = data.filter(b =>
        b.destination.toLowerCase().includes(q) ||
        (b.tour_name || '').toLowerCase().includes(q)
      );
    }
    if (filters.status) {
      data = data.filter(b => b.status === filters.status);
    }
    setBookings(data);
    setLoading(false);
  }, [user, debouncedSearch, filters.status]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const { page, totalPages, paginated, total, goTo, perPage } = usePagination(bookings, 6);

  const handleCancel = async (booking: Booking) => {
    await bookingService.cancel(booking.id);
    toast.success(t('success.bookingCancelled'));
    fetchBookings();
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="w-full px-6 md:px-16 py-12">
          <Breadcrumb />

          <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('userBookings.title')}</h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <SearchInput
              value={filters.search}
              onChange={(v) => setFilter('search', v)}
              className="flex-1"
            />
            <FilterDropdown
              value={filters.status || 'all'}
              onChange={(v) => setFilter('status', v)}
              options={STATUS_OPTIONS}
              allLabel={t('filters.filterByStatus')}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
            </div>
          ) : paginated.length === 0 ? (
            <EmptyState title={t('empty.noBookings')} description={t('empty.bookTrip')} />
          ) : (
            <div className="space-y-4">
              {paginated.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{b.destination}</p>
                        <p className="text-sm text-gray-500">{b.tour_name || t('userDashboard.customTrip')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                        <span>{b.booking_date}</span>
                      </div>
                      <span className="text-sm text-gray-500">{b.duration}</span>
                      <StatusBadge status={b.status} />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => viewModal.open(b)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                        title={t('actions.view')}
                      >
                        <FontAwesomeIcon icon={faEye} className="text-sm" />
                      </button>
                      {b.status === BookingStatus.Pending && (
                        <>
                          <button
                            onClick={() => editModal.open(b)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-500"
                            title={t('actions.edit')}
                          >
                            <FontAwesomeIcon icon={faEdit} className="text-sm" />
                          </button>
                          <button
                            onClick={() => cancelConfirm.open(b)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-600"
                            title={t('actions.cancel')}
                          >
                            <FontAwesomeIcon icon={faBan} className="text-sm" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <Pagination
                page={page}
                totalPages={totalPages}
                total={total}
                perPage={perPage}
                onPageChange={goTo}
              />
            </div>
          )}
        </div>

        <BookingEditModal
          isOpen={editModal.isOpen}
          onClose={editModal.close}
          booking={editModal.data}
          onSaved={fetchBookings}
        />

        <BookingDetailModal
          isOpen={viewModal.isOpen}
          onClose={viewModal.close}
          booking={viewModal.data}
        />

        <ConfirmDialog
          isOpen={cancelConfirm.isOpen}
          onClose={cancelConfirm.close}
          onConfirm={() => cancelConfirm.data && handleCancel(cancelConfirm.data)}
          title={t('actions.cancel')}
          message={t('confirm.cancelBooking')}
          variant="warning"
        />
      </main>
      <Footer />
    </>
  );
}
