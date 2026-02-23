import { useTranslation } from 'react-i18next';
import { BookingStatus, TourStatus, UserRole } from '../../types';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const STYLES: Record<string, string> = {
  [BookingStatus.Confirmed]: 'bg-green-100 text-green-700',
  [BookingStatus.Pending]: 'bg-amber-100 text-amber-700',
  [BookingStatus.Cancelled]: 'bg-red-100 text-red-700',
  [TourStatus.Active]: 'bg-green-100 text-green-700',
  [TourStatus.Inactive]: 'bg-gray-100 text-gray-600',
  [UserRole.Admin]: 'bg-blue-100 text-blue-700',
  [UserRole.User]: 'bg-cyan-100 text-cyan-700',
};

const LABEL_KEYS: Record<string, string> = {
  confirmed: 'status.confirmed',
  pending: 'status.pending',
  cancelled: 'status.cancelled',
  active: 'status.active',
  inactive: 'status.inactive',
  admin: 'roles.admin',
  user: 'roles.user',
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const { t } = useTranslation();
  const label = LABEL_KEYS[status] ? t(LABEL_KEYS[status]) : status;

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
        STYLES[status] || 'bg-gray-100 text-gray-600'
      } ${className}`}
    >
      {label}
    </span>
  );
}
