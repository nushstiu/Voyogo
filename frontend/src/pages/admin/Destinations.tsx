import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faThLarge,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { destinationService } from '../../services/destination.service';
import { tourService } from '../../services/tour.service';
import { useDebounce } from '../../hooks/useDebounce';
import { useFilters } from '../../hooks/useFilters';
import { useModal } from '../../hooks/useModal';
import SearchInput from '../../components/common/SearchInput';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Breadcrumb from '../../components/common/Breadcrumb';
import DestinationModal from '../../components/admin/modals/DestinationModal';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import type { Destination } from '../../types';
import toast from 'react-hot-toast';

export default function AdminDestinations() {
  const { t } = useTranslation();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [tours, setTours] = useState<{ destination_id: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { filters, setFilter } = useFilters({ keys: ['search'] });
  const debouncedSearch = useDebounce(filters.search, 300);

  const createModal = useModal<undefined>();
  const editModal = useModal<Destination>();
  const deleteConfirm = useModal<Destination>();

  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    try {
      const [allDests, allTours] = await Promise.all([
        destinationService.getAll(),
        tourService.getAll(),
      ]);
      let filtered = allDests;
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        filtered = filtered.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
      }
      setDestinations(filtered);
      setTours(allTours);
    } catch {
      setDestinations([]);
      setTours([]);
    }
    setLoading(false);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  const tourCount = (destId: number) =>
    tours.filter((t) => t.destination_id === destId).length;

  const handleDelete = async (dest: Destination) => {
    await destinationService.delete(dest.id);
    toast.success(t('success.destinationDeleted'));
    fetchDestinations();
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="w-full px-6 md:px-16 py-12">
          <Breadcrumb />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{t('nav.destinations')}</h1>
            <button
              onClick={() => createModal.open()}
              className="bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2 px-4 py-2.5 text-sm"
            >
              <FontAwesomeIcon icon={faPlus} />
              {t('actions.addDestination')}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <SearchInput
              value={filters.search}
              onChange={(v) => setFilter('search', v)}
              className="flex-1"
            />
            <div className="flex gap-1 bg-white rounded-2xl shadow-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <FontAwesomeIcon icon={faThLarge} className="text-sm" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <FontAwesomeIcon icon={faList} className="text-sm" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
            </div>
          ) : destinations.length === 0 ? (
            <EmptyState title={t('empty.noDestinations')} />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest) => (
                <div key={dest.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x200?text=' + encodeURIComponent(dest.name);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{dest.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{dest.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-400">{dest.packages} {t('destinations.packages')}</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-blue-500 font-medium">{dest.price_range}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => editModal.open(dest)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-500"
                        >
                          <FontAwesomeIcon icon={faEdit} className="text-sm" />
                        </button>
                        <button
                          onClick={() => deleteConfirm.open(dest)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500"
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-sm" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{tourCount(dest.id)} {t('destinations.toursLinked')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">{t('table.destination')}</th>
                      <th className="px-6 py-3">{t('table.packages')}</th>
                      <th className="px-6 py-3">{t('table.priceRange')}</th>
                      <th className="px-6 py-3">{t('table.tours')}</th>
                      <th className="px-6 py-3 text-right">{t('table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {destinations.map((dest) => (
                      <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={dest.image}
                              alt={dest.name}
                              className="w-10 h-10 rounded-lg object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/40x40?text=' + encodeURIComponent(dest.name.charAt(0));
                              }}
                            />
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{dest.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">{dest.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{dest.packages}</td>
                        <td className="px-6 py-4 text-sm text-blue-500 font-medium">{dest.price_range}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{tourCount(dest.id)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => editModal.open(dest)}
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-500"
                            >
                              <FontAwesomeIcon icon={faEdit} className="text-sm" />
                            </button>
                            <button
                              onClick={() => deleteConfirm.open(dest)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500"
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
            </div>
          )}

          <DestinationModal
            isOpen={createModal.isOpen}
            onClose={createModal.close}
            onSaved={fetchDestinations}
          />

          <DestinationModal
            isOpen={editModal.isOpen}
            onClose={editModal.close}
            destination={editModal.data}
            onSaved={fetchDestinations}
          />

          <ConfirmDialog
            isOpen={deleteConfirm.isOpen}
            onClose={deleteConfirm.close}
            onConfirm={() => deleteConfirm.data && handleDelete(deleteConfirm.data)}
            title={t('actions.delete')}
            message={
              deleteConfirm.data
                ? t('confirm.deleteDestination', { count: tourCount(deleteConfirm.data.id) })
                : ''
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
