import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faFileExport,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { userService } from '../../services/user.service';
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
import UserModal from '../../components/admin/modals/UserModal';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import type { User } from '../../types';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { filters, setFilter } = useFilters({ keys: ['search', 'role'] });
  const debouncedSearch = useDebounce(filters.search, 300);

  const ROLE_OPTIONS = [
    { label: t('roles.admin'), value: 'admin' },
    { label: t('roles.user'), value: 'user' },
  ];

  const createModal = useModal<undefined>();
  const editModal = useModal<User>();
  const viewModal = useModal<User>();
  const deleteConfirm = useModal<User>();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      let data = await userService.getAll();
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        data = data.filter(u => u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
      }
      if (filters.role) {
        data = data.filter(u => u.role === filters.role);
      }
      setUsers(data);
    } catch {
      setUsers([]);
    }
    setLoading(false);
  }, [debouncedSearch, filters.role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const { page, totalPages, paginated, total, goTo, perPage } = usePagination(users, 8);

  const handleDelete = async (user: User) => {
    await userService.delete(user.id);
    toast.success(t('success.userDeleted'));
    fetchUsers();
  };

  const handleExportCSV = () => {
    const headers = ['Username', 'Email', 'Phone', 'Country', 'Role', 'Created'];
    const rows = users.map((u) => [
      u.username,
      u.email,
      u.phone || '',
      u.country || '',
      u.role,
      new Date(u.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="w-full px-6 md:px-16 py-12">
          <Breadcrumb />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{t('nav.users')}</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faFileExport} />
                {t('actions.exportCsv')}
              </button>
              <button
                onClick={() => createModal.open()}
                className="bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2 px-4 py-2.5 text-sm"
              >
                <FontAwesomeIcon icon={faPlus} />
                {t('actions.addUser')}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
              <SearchInput
                value={filters.search}
                onChange={(v) => setFilter('search', v)}
                className="flex-1"
              />
              <FilterDropdown
                value={filters.role || 'all'}
                onChange={(v) => setFilter('role', v)}
                options={ROLE_OPTIONS}
                allLabel={t('filters.filterByRole')}
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
              </div>
            ) : paginated.length === 0 ? (
              <EmptyState title={t('empty.noUsers')} />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3">{t('table.user')}</th>
                        <th className="px-6 py-3">{t('table.phone')}</th>
                        <th className="px-6 py-3">{t('table.country')}</th>
                        <th className="px-6 py-3">{t('table.role')}</th>
                        <th className="px-6 py-3">{t('table.joined')}</th>
                        <th className="px-6 py-3 text-right">{t('table.actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginated.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{u.username}</p>
                              <p className="text-xs text-gray-500">{u.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{u.phone || '\u2014'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{u.country || '\u2014'}</td>
                          <td className="px-6 py-4">
                            <StatusBadge status={u.role} />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => viewModal.open(u)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                                title={t('actions.view')}
                              >
                                <FontAwesomeIcon icon={faEye} className="text-sm" />
                              </button>
                              <button
                                onClick={() => editModal.open(u)}
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-500"
                                title={t('actions.edit')}
                              >
                                <FontAwesomeIcon icon={faEdit} className="text-sm" />
                              </button>
                              <button
                                onClick={() => deleteConfirm.open(u)}
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

          <UserModal
            isOpen={createModal.isOpen}
            onClose={createModal.close}
            onSaved={fetchUsers}
          />

          <UserModal
            isOpen={editModal.isOpen}
            onClose={editModal.close}
            user={editModal.data}
            onSaved={fetchUsers}
          />

          <UserModal
            isOpen={viewModal.isOpen}
            onClose={viewModal.close}
            user={viewModal.data}
            readOnly
            onSaved={fetchUsers}
          />

          <ConfirmDialog
            isOpen={deleteConfirm.isOpen}
            onClose={deleteConfirm.close}
            onConfirm={() => deleteConfirm.data && handleDelete(deleteConfirm.data)}
            title={t('actions.delete')}
            message={t('confirm.deleteUser')}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
