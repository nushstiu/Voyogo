import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../../constants';
import type { Booking } from '../../types';
import toast from 'react-hot-toast';

type EditFormData = {
  phone: string;
  booking_date: string;
  duration: string;
  notes?: string;
};

const DURATION_OPTIONS = ['1-2 Days', '3-5 Days', '5-7 Days', '7-14 Days', '14+ Days'];

interface BookingEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Booking | null;
  onSaved: () => void;
}

export default function BookingEditModal({ isOpen, onClose, booking, onSaved }: BookingEditModalProps) {
  const { t } = useTranslation();

  const editSchema = z.object({
    phone: z.string().min(1, t('validation.required')),
    booking_date: z.string().min(1, t('validation.required')),
    duration: z.string().min(1, t('validation.required')),
    notes: z.string().optional(),
  });
  const overlayRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
  });

  useEffect(() => {
    if (isOpen && booking) {
      reset({
        phone: booking.phone,
        booking_date: booking.booking_date,
        duration: booking.duration,
        notes: booking.notes || '',
      });
    }
  }, [isOpen, booking, reset]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !booking) return null;

  const onSubmit = async (data: EditFormData) => {
    await fetch(API_ENDPOINTS.BOOKING_BY_ID(booking.id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    toast.success(t('success.bookingUpdated'));
    onSaved();
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{t('modals.editBooking')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-3 bg-gray-50 text-sm">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">{booking.destination}</span>
            {booking.tour_name && ` - ${booking.tour_name}`}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              {t('form.phone')} <span className="text-blue-500">*</span>
            </label>
            <input
              {...register('phone')}
              className="p-4 rounded bg-gray-100 outline-none w-full"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              {t('bookingEdit.bookingDate')} <span className="text-blue-500">*</span>
            </label>
            <input
              type="date"
              {...register('booking_date')}
              className="p-4 rounded bg-gray-100 outline-none w-full"
            />
            {errors.booking_date && (
              <p className="text-red-500 text-sm mt-1">{errors.booking_date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              {t('bookingEdit.duration')} <span className="text-blue-500">*</span>
            </label>
            <select {...register('duration')} className="p-4 rounded bg-gray-100 outline-none w-full">
              {DURATION_OPTIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              {t('bookingNotes.label')}
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="p-4 rounded bg-gray-100 outline-none w-full resize-none"
              placeholder={t('bookingNotes.placeholder')}
            />
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3 -mx-6 -mb-6 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors px-6 py-3"
            >
              {t('actions.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors px-6 py-3 disabled:opacity-50"
            >
              {isSubmitting ? t('loading.default') : t('actions.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
