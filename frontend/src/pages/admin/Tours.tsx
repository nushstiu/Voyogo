import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { tourService } from '../../services/tour.service';
import { destinationService } from '../../services/destination.service';
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
import TourModal from '../../components/admin/modals/TourModal';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import type { Tour, Destination } from '../../types';
import toast from 'react-hot-toast';

export default function AdminTours() {
  const { t } = useTranslation();
  const [tours, setTours] = useState<Tour[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [bookings, setBookings] = useState<{ tour_id?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const { filters, setFilter } = useFilters({ keys: ['search', 'status', 'destination_id'] });
  const debouncedSearch = useDebounce(filters.search, 300);

  const STATUS_OPTIONS = [
    { label: t('status.active'), value: 'active' },
    { label: t('status.inactive'), value: 'inactive' },
  ];

  const createModal = useModal<undefined>();
  const editModal = useModal<Tour>();
  const deleteConfirm = useModal<Tour>();

  const fetchTours = useCallback(async () => {
    setLoading(true);
    try {
      const [allTours, allDests, allBookings] = await Promise.all([
        tourService.getAll(),
        destinationService.getAll(),
        bookingService.getAll(),
      ]);
      let filtered = allTours;
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q));
      }
      if (filters.status) filtered = filtered.filter(t => t.status === filters.status);
      if (filters.destination_id) filtered = filtered.filter(t => String(t.destination_id) === filters.destination_id);
      setTours(filtered);
      setDestinations(allDests);
      setBookings(allBookings);
    } catch {
      setTours([]);
      setDestinations([]);
      setBookings([]);
    }
    setLoading(false);
  }, [debouncedSearch, filters.status, filters.destination_id]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const { page, totalPages, paginated, total, goTo, perPage } = usePagination(tours, 8);

  const destOptions = destinations.map((d) => ({ label: d.name, value: String(d.id) }));
  const destName = (id: number) => destinations.find((d) => d.id === id)?.name || '\u2014';
  const bookingCount = (tourId: string) => bookings.filter((b) => b.tour_id === tourId).length;

  const handleDelete = async (tour: Tour) => {
    await tourService.delete(tour.id);
    toast.success(t('success.tourDeleted'));
    fetchTours();
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="w-full px-6 md:px-16 py-12">
          <Breadcrumb />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{t('nav.tours')}</h1>
            <button
              onClick={() => createModal.open()}
              className="bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2 px-4 py-2.5 text-sm"
            >
              <FontAwesomeIcon icon={faPlus} />
              {t('actions.addTour')}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
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
                value={filters.destination_id || 'all'}
                onChange={(v) => setFilter('destination_id', v)}
                options={destOptions}
                allLabel={t('filters.filterByDestination')}
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
              </div>
            ) : paginated.length === 0 ? (
              <EmptyState title={t('empty.noTours')} />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3">{t('table.tour')}</th>
                        <th className="px-6 py-3">{t('table.destination')}</th>
                        <th className="px-6 py-3">{t('table.price')}</th>
                        <th className="px-6 py-3">{t('table.days')}</th>
                        <th className="px-6 py-3">{t('table.bookings')}</th>
                        <th className="px-6 py-3">{t('table.status')}</th>
                        <th className="px-6 py-3 text-right">{t('table.actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginated.map((tour) => (
                        <tr key={tour.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={tour.image}
                                alt={tour.name}
                                className="w-10 h-10 rounded-lg object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://placehold.co/40x40?text=' + encodeURIComponent(tour.name.charAt(0));
                                }}
                              />
                              <div>
                                <p className="font-semibold text-gray-800 text-sm">{tour.name}</p>
                                <p className="text-xs text-gray-500">{tour.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{destName(tour.destination_id)}</td>
                          <td className="px-6 py-4 text-sm text-blue-500 font-medium">{tour.price}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{tour.days}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{bookingCount(tour.id)}</td>
                          <td className="px-6 py-4">
                            <StatusBadge status={tour.status} />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => editModal.open(tour)}
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-500"
                                title={t('actions.edit')}
                              >
                                <FontAwesomeIcon icon={faEdit} className="text-sm" />
                              </button>
                              <button
                                onClick={() => deleteConfirm.open(tour)}
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500"
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

          <TourModal
            isOpen={createModal.isOpen}
            onClose={createModal.close}
            destinations={destinations}
            onSaved={fetchTours}
          />

          <TourModal
            isOpen={editModal.isOpen}
            onClose={editModal.close}
            tour={editModal.data}
            destinations={destinations}
            onSaved={fetchTours}
          />

          <ConfirmDialog
            isOpen={deleteConfirm.isOpen}
            onClose={deleteConfirm.close}
            onConfirm={() => deleteConfirm.data && handleDelete(deleteConfirm.data)}
            title={t('actions.delete')}
            message={
              deleteConfirm.data
                ? t('confirm.deleteTour', { count: bookingCount(deleteConfirm.data.id) })
                : ''
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
