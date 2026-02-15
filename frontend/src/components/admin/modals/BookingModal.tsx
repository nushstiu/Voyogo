import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UI_TEXT, API_ENDPOINTS } from '../../../constants';
import { destinationService } from '../../../services/destination.service';
import { tourService } from '../../../services/tour.service';
import type { Destination, Tour } from '../../../types';
import type { Booking } from '../../../types';
import toast from 'react-hot-toast';

const bookingSchema = z.object({
  name: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  surname: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  email: z.email(UI_TEXT.ERROR_INVALID_EMAIL),
  phone: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  destination: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  tour_id: z.string().optional(),
  booking_date: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  duration: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  status: z.enum(['pending', 'confirmed', 'cancelled']),
  notes: z.string().optional(),
  admin_notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Booking;
  onSaved: () => void;
}

const DURATION_OPTIONS = ['1-2 Days', '3-5 Days', '5-7 Days', '7-14 Days', '14+ Days'];

export default function BookingModal({ isOpen, onClose, booking, onSaved }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [selectedDest, setSelectedDest] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const watchDest = watch('destination');

  useEffect(() => {
    const loadData = async () => {
      const [dests, tours] = await Promise.all([
        destinationService.getAll(),
        tourService.getAll(),
      ]);
      setDestinations(dests);
      setAllTours(tours);
    };
    if (isOpen) loadData();
  }, [isOpen]);

  useEffect(() => {
    setSelectedDest(watchDest || '');
  }, [watchDest]);

  const filteredTours = allTours.filter((t) => t.location === selectedDest);

  useEffect(() => {
    if (isOpen) {
      reset(
        booking
          ? {
              name: booking.name,
              surname: booking.surname,
              email: booking.email,
              phone: booking.phone,
              destination: booking.destination,
              tour_id: booking.tour_id || '',
              booking_date: booking.booking_date,
              duration: booking.duration,
              status: booking.status,
              notes: booking.notes || '',
              admin_notes: booking.admin_notes || '',
            }
          : {
              name: '',
              surname: '',
              email: '',
              phone: '',
              destination: '',
              tour_id: '',
              booking_date: '',
              duration: '',
              status: 'pending',
              notes: '',
              admin_notes: '',
            }
      );
    }
  }, [isOpen, booking, reset]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data: BookingFormData) => {
    if (booking) {
      await fetch(API_ENDPOINTS.BOOKING_BY_ID(booking.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      toast.success(UI_TEXT.SUCCESS_BOOKING_UPDATED);
    } else {
      await fetch(API_ENDPOINTS.BOOKINGS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, user_id: 'admin-created' }),
      });
      toast.success(UI_TEXT.SUCCESS_BOOKING_CREATED);
    }
    onSaved();
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {booking ? UI_TEXT.MODAL_EDIT_BOOKING : UI_TEXT.ACTION_CREATE_BOOKING}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                {UI_TEXT.LABEL_FIRST_NAME} <span className="text-blue-500">*</span>
              </label>
              <input
                {...register('name')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
                placeholder="First name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                {UI_TEXT.LABEL_LAST_NAME} <span className="text-blue-500">*</span>
              </label>
              <input
                {...register('surname')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
                placeholder="Last name"
              />
              {errors.surname && (
                <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                {UI_TEXT.LABEL_EMAIL} <span className="text-blue-500">*</span>
              </label>
              <input
                {...register('email')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
                placeholder="email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                {UI_TEXT.LABEL_PHONE} <span className="text-blue-500">*</span>
              </label>
              <input
                {...register('phone')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
                placeholder="+1 555 123 4567"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Destination <span className="text-blue-500">*</span>
              </label>
              <select
                {...register('destination')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
              >
                <option value="">Select destination</option>
                {MOCK_DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">Tour</label>
              <select
                {...register('tour_id')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
              >
                <option value="">No specific tour</option>
                {filteredTours.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Booking Date <span className="text-blue-500">*</span>
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
                Duration <span className="text-blue-500">*</span>
              </label>
              <select
                {...register('duration')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
              >
                <option value="">Select duration</option>
                {DURATION_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Status <span className="text-blue-500">*</span>
            </label>
            <select {...register('status')} className="p-4 rounded bg-gray-100 outline-none w-full">
              <option value="pending">{UI_TEXT.STATUS_PENDING}</option>
              <option value="confirmed">{UI_TEXT.STATUS_CONFIRMED}</option>
              <option value="cancelled">{UI_TEXT.STATUS_CANCELLED}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              {UI_TEXT.BOOKING_NOTES_LABEL}
            </label>
            <textarea
              {...register('notes')}
              rows={2}
              className="p-4 rounded bg-gray-100 outline-none w-full resize-none"
              placeholder={UI_TEXT.BOOKING_NOTES_PLACEHOLDER}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Admin Notes
            </label>
            <textarea
              {...register('admin_notes')}
              rows={2}
              className="p-4 rounded bg-gray-100 outline-none w-full resize-none"
              placeholder="Internal notes (not visible to user)..."
            />
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3 -mx-6 -mb-6 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors px-6 py-3"
            >
              {UI_TEXT.ACTION_CANCEL}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors px-6 py-3 disabled:opacity-50"
            >
              {isSubmitting
                ? UI_TEXT.LOADING
                : booking
                  ? UI_TEXT.ACTION_SAVE
                  : UI_TEXT.ACTION_CREATE}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
