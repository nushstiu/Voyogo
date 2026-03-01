import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faFileExport,
  faCheckDouble,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { bookingService } from '../../services/booking.service';
import { destinationService } from '../../services/destination.service';
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
import BookingModal from '../../components/admin/modals/BookingModal';
import BookingDetailModal from '../../components/admin/modals/BookingDetailModal';
import { BookingStatus } from '../../types';
import type { Booking, Destination } from '../../types';
import toast from 'react-hot-toast';

export default function AdminBookings() {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { filters, setFilter } = useFilters({
    keys: ['search', 'status', 'destination', 'fromDate', 'toDate'],
  });
  const debouncedSearch = useDebounce(filters.search, 300);

  const STATUS_OPTIONS = [
    { label: t('status.pending'), value: 'pending' },
    { label: t('status.confirmed'), value: 'confirmed' },
    { label: t('status.cancelled'), value: 'cancelled' },
  ];

  const createModal = useModal<undefined>();
  const editModal = useModal<Booking>();
  const viewModal = useModal<Booking>();
  const deleteConfirm = useModal<Booking>();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const [allBookings, allDests] = await Promise.all([
        bookingService.getAll(),
        destinationService.getAll(),
      ]);
      let filtered = allBookings;
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        filtered = filtered.filter(b =>
          `${b.name} ${b.surname}`.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.destination.toLowerCase().includes(q)
        );
      }
      if (filters.status) filtered = filtered.filter(b => b.status === filters.status);
      if (filters.destination) filtered = filtered.filter(b => b.destination === filters.destination);
      if (filters.fromDate) filtered = filtered.filter(b => b.booking_date >= filters.fromDate);
      if (filters.toDate) filtered = filtered.filter(b => b.booking_date <= filters.toDate);
      setBookings(filtered);
      setDestinations(allDests);
    } catch {
      setBookings([]);
      setDestinations([]);
    }
    setSelectedIds(new Set());
    setLoading(false);
  }, [debouncedSearch, filters.status, filters.destination, filters.fromDate, filters.toDate]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const { page, totalPages, paginated, total, goTo, perPage } = usePagination(bookings, 8);

  const destOptions = destinations.map((d) => ({ label: d.name, value: d.name }));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === paginated.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginated.map((b) => b.id)));
    }
  };

  const handleBulkUpdate = async (status: BookingStatus) => {
    if (selectedIds.size === 0) return;
    await Promise.all(
      Array.from(selectedIds).map(id => bookingService.update(id, { status }))
    );
    toast.success(t('success.statusChanged'));
    fetchBookings();
  };

  const handleDelete = async (booking: Booking) => {
    await bookingService.delete(booking.id);
    toast.success(t('success.bookingUpdated'));
    fetchBookings();
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Destination', 'Tour', 'Date', 'Duration', 'Status'];
    const rows = bookings.map((b) => [
      `${b.name} ${b.surname}`,
      b.email,
      b.destination,
      b.tour_name || '',
      b.booking_date,
      b.duration,
      b.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-text-primary">{t('nav.bookings')}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faFileExport} />
            {t('actions.exportCsv')}
          </button>
          <button
            onClick={() => createModal.open()}
            className="btn-primary flex items-center gap-2 px-4 py-2.5 text-sm"
          >
            <FontAwesomeIcon icon={faPlus} />
            {t('actions.createBooking')}
          </button>
        </div>
      </div>

      <div className="card-default overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
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
            <FilterDropdown
              value={filters.destination || 'all'}
              onChange={(v) => setFilter('destination', v)}
              options={destOptions}
              allLabel={t('filters.filterByDestination')}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm text-text-secondary">{t('dateFilter.from')}</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilter('fromDate', e.target.value)}
                className="input-default py-2 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-text-secondary">{t('dateFilter.to')}</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilter('toDate', e.target.value)}
                className="input-default py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="px-4 py-3 bg-primary-light flex items-center justify-between">
            <span className="text-sm text-primary font-medium">
              {selectedIds.size} {t('dateFilter.selected')}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkUpdate(BookingStatus.Confirmed)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
              >
                <FontAwesomeIcon icon={faCheckDouble} />
                {t('actions.bulkConfirm')}
              </button>
              <button
                onClick={() => handleBulkUpdate(BookingStatus.Cancelled)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-danger text-white rounded-lg hover:bg-danger-hover transition-colors"
              >
                <FontAwesomeIcon icon={faBan} />
                {t('actions.bulkCancel')}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
          </div>
        ) : paginated.length === 0 ? (
          <EmptyState title={t('empty.noBookings')} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    <th className="px-6 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === paginated.length && paginated.length > 0}
                        onChange={toggleAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3">{t('table.guest')}</th>
                    <th className="px-6 py-3">{t('table.destination')}</th>
                    <th className="px-6 py-3">{t('table.tour')}</th>
                    <th className="px-6 py-3">{t('table.date')}</th>
                    <th className="px-6 py-3">{t('table.duration')}</th>
                    <th className="px-6 py-3">{t('table.status')}</th>
                    <th className="px-6 py-3 text-right">{t('table.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginated.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(b.id)}
                          onChange={() => toggleSelect(b.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-text-primary text-sm">
                            {b.name} {b.surname}
                          </p>
                          <p className="text-xs text-text-secondary">{b.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{b.destination}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{b.tour_name || '—'}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{b.booking_date}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">{b.duration}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => viewModal.open(b)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-text-secondary"
                            title={t('actions.view')}
                          >
                            <FontAwesomeIcon icon={faEye} className="text-sm" />
                          </button>
                          <button
                            onClick={() => editModal.open(b)}
                            className="p-2 hover:bg-primary-light rounded-lg transition-colors text-primary"
                            title={t('actions.edit')}
                          >
                            <FontAwesomeIcon icon={faEdit} className="text-sm" />
                          </button>
                          <button
                            onClick={() => deleteConfirm.open(b)}
                            className="p-2 hover:bg-danger-light rounded-lg transition-colors text-danger"
                            title={t('actions.delete')}
                          >
                            <FontAwesomeIcon icon={faTrash} className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              perPage={perPage}
              onPageChange={goTo}
            />
          </>
        )}
      </div>

      <BookingModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSaved={fetchBookings}
      />

      <BookingModal
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
        isOpen={deleteConfirm.isOpen}
        onClose={deleteConfirm.close}
        onConfirm={() => deleteConfirm.data && handleDelete(deleteConfirm.data)}
        title={t('actions.delete')}
        message={t('confirm.delete')}
      />
    </div>
  );
}
