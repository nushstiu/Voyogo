import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UI_TEXT } from '../../../constants';
import StatusBadge from '../../common/StatusBadge';
import type { Booking } from '../../../types';

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Booking | null;
}

export default function BookingDetailModal({ isOpen, onClose, booking }: BookingDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !booking) return null;

  const fields = [
    { label: UI_TEXT.LABEL_FIRST_NAME, value: booking.name },
    { label: UI_TEXT.LABEL_LAST_NAME, value: booking.surname },
    { label: UI_TEXT.LABEL_EMAIL, value: booking.email },
    { label: UI_TEXT.LABEL_PHONE, value: booking.phone },
    { label: 'Destination', value: booking.destination },
    { label: 'Tour', value: booking.tour_name || '—' },
    { label: 'Booking Date', value: booking.booking_date },
    { label: 'Duration', value: booking.duration },
    { label: 'Created', value: new Date(booking.created_at).toLocaleString() },
    { label: 'Updated', value: booking.updated_at ? new Date(booking.updated_at).toLocaleString() : '—' },
  ];

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{UI_TEXT.MODAL_VIEW_BOOKING}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div>
              <p className="font-bold text-gray-800 text-lg">
                {booking.name} {booking.surname}
              </p>
              <StatusBadge status={booking.status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {fields.map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-gray-500 font-semibold uppercase">{label}</p>
                <p className="text-sm text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {booking.notes && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                {UI_TEXT.BOOKING_NOTES_LABEL}
              </p>
              <p className="text-sm text-gray-600">{booking.notes}</p>
            </div>
          )}

          {booking.admin_notes && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Admin Notes</p>
              <p className="text-sm text-gray-600">{booking.admin_notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
