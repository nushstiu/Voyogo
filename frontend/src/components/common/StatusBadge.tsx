import { UI_TEXT } from '../../constants/text';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const STYLES: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
  admin: 'bg-blue-100 text-blue-700',
  user: 'bg-cyan-100 text-cyan-700',
};

const LABELS: Record<string, string> = {
  confirmed: UI_TEXT.STATUS_CONFIRMED,
  pending: UI_TEXT.STATUS_PENDING,
  cancelled: UI_TEXT.STATUS_CANCELLED,
  active: 'Active',
  inactive: 'Inactive',
  admin: 'Admin',
  user: 'User',
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
        STYLES[status] || 'bg-gray-100 text-gray-600'
      } ${className}`}
    >
      {LABELS[status] || status}
    </span>
  );
}
