import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import StatusBadge from '../common/StatusBadge';
import type { Booking } from '../../types';

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Booking | null;
}

export default function BookingDetailModal({ isOpen, onClose, booking }: BookingDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !booking) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{t('modals.viewBooking')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-lg">{booking.destination}</h3>
            <StatusBadge status={booking.status} />
          </div>

          {booking.tour_name && (
            <p className="text-sm text-blue-500 font-medium">{booking.tour_name}</p>
          )}

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">{t('table.date')}</p>
              <p className="text-sm text-gray-800">{booking.booking_date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">{t('table.duration')}</p>
              <p className="text-sm text-gray-800">{booking.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">{t('table.contact')}</p>
              <p className="text-sm text-gray-800">{booking.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">{t('table.bookedOn')}</p>
              <p className="text-sm text-gray-800">
                {new Date(booking.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {booking.notes && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                {t('bookingNotes.label')}
              </p>
              <p className="text-sm text-gray-600">{booking.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
