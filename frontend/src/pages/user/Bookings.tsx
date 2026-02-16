import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faEye,
  faBan,
  faMapMarkerAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { UI_TEXT, API_ENDPOINTS } from '../../constants';
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
import type { Booking } from '../../types';
import toast from 'react-hot-toast';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const STATUS_OPTIONS = [
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function UserBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { filters, setFilter } = useFilters({ keys: ['search', 'status'] });
  const debouncedSearch = useDebounce(filters.search, 300);

  const editModal = useModal<Booking>();
  const viewModal = useModal<Booking>();
  const cancelConfirm = useModal<Booking>();

  const fetchBookings = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const params = new URLSearchParams();
    params.set('user_id', user.id);
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (filters.status) params.set('status', filters.status);

    const res = await fetch(`${API_ENDPOINTS.BOOKINGS}?${params}`);
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  }, [user, debouncedSearch, filters.status]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const { page, totalPages, paginated, total, goTo, perPage } = usePagination(bookings, 6);

  const handleCancel = async (booking: Booking) => {
    await fetch(API_ENDPOINTS.BOOKING_CANCEL(booking.id), { method: 'PATCH' });
    toast.success(UI_TEXT.SUCCESS_BOOKING_CANCELLED);
    fetchBookings();
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="w-full px-6 md:px-16 py-12">
          <Breadcrumb />

          <h1 className="text-3xl font-bold text-gray-800 mb-6">{UI_TEXT.USER_MY_BOOKINGS}</h1>

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
              allLabel={UI_TEXT.FILTER_STATUS}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
            </div>
          ) : paginated.length === 0 ? (
            <EmptyState title={UI_TEXT.NO_BOOKINGS} description="Book a trip to see it here!" />
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
                        <p className="text-sm text-gray-500">{b.tour_name || 'Custom Trip'}</p>
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
                        title={UI_TEXT.ACTION_VIEW}
                      >
                        <FontAwesomeIcon icon={faEye} className="text-sm" />
                      </button>
                      {b.status === 'pending' && (
                        <>
                          <button
                            onClick={() => editModal.open(b)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-500"
                            title={UI_TEXT.ACTION_EDIT}
                          >
                            <FontAwesomeIcon icon={faEdit} className="text-sm" />
                          </button>
                          <button
                            onClick={() => cancelConfirm.open(b)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-600"
                            title={UI_TEXT.ACTION_CANCEL}
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
          title={UI_TEXT.ACTION_CANCEL}
          message={UI_TEXT.CONFIRM_CANCEL_BOOKING}
          variant="warning"
        />
      </main>
      <Footer />
    </>
  );
}
