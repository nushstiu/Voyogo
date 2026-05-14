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

interface FieldProps {
  label: string;
  value?: string | null;
}

function Field({ label, value }: FieldProps) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-800 mt-0.5">{value}</p>
    </div>
  );
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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">{t('modals.viewBooking')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Title + Status */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-gray-800 text-xl">{booking.destination}</h3>
              {booking.tourName && (
                <p className="text-sm text-blue-600 font-medium mt-0.5">{booking.tourName}</p>
              )}
            </div>
            <StatusBadge status={booking.status} />
          </div>

          {/* Trip Details */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-700 uppercase mb-3">Detalii Călătorie</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Data plecare" value={booking.bookingDate} />
              <Field label="Durată" value={booking.duration} />
              {booking.tourId && <Field label="ID Tur" value={booking.tourId} />}
              <Field label="Creat la" value={new Date(booking.createdAt).toLocaleDateString('ro-RO')} />
            </div>
          </div>

          {/* Passenger Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Date Pasager Principal</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nume" value={`${booking.name} ${booking.surname}`} />
              <Field label="Email" value={booking.email} />
              <Field label="Telefon" value={booking.phone} />
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-yellow-700 uppercase mb-2">Note personale</p>
              <p className="text-sm text-gray-700">{booking.notes}</p>
            </div>
          )}

          {/* Admin Notes */}
          {booking.adminNotes && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-purple-700 uppercase mb-2">Mesaj de la agenție</p>
              <p className="text-sm text-gray-700">{booking.adminNotes}</p>
            </div>
          )}

          {/* Footer info */}
          <div className="text-xs text-gray-400 border-t pt-3">
            ID rezervare: <span className="font-mono">{booking.id}</span>
            {booking.updatedAt && (
              <span className="ml-3">Actualizat: {new Date(booking.updatedAt).toLocaleDateString('ro-RO')}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
