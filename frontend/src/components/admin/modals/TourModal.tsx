import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UI_TEXT } from '../../../constants';
import StyledSelect from '../../common/StyledSelect';
import type { Tour, Destination } from '../../../types';
import { tourService } from '../../../services/tour.service';
import toast from 'react-hot-toast';

const tourSchema = z.object({
  name: z.string().min(2, UI_TEXT.ERROR_REQUIRED),
  location: z.string().min(2, UI_TEXT.ERROR_REQUIRED),
  price: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  days: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  destinationId: z.coerce.number().min(1, UI_TEXT.ERROR_REQUIRED),
  status: z.enum(['active', 'inactive']),
});

type TourFormData = z.infer<typeof tourSchema>;

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour?: Tour;
  destinations: Destination[];
  onSaved: () => void;
}

export default function TourModal({ isOpen, onClose, tour, destinations, onSaved }: TourModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema) as any,
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        tour
          ? {
              name: tour.name,
              location: tour.location,
              price: tour.price,
              days: tour.days,
              description: tour.description,
              image: tour.image,
              destinationId: tour.destinationId,
              status: tour.status,
            }
          : {
              name: '',
              location: '',
              price: '',
              days: '',
              description: '',
              image: '',
              destinationId: 0,
              status: 'active',
            }
      );
    }
  }, [isOpen, tour, reset]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data: TourFormData) => {
    if (tour) {
      await tourService.update(tour.id, data);
      toast.success(UI_TEXT.SUCCESS_TOUR_UPDATED);
    } else {
      await tourService.create({ ...data, status: data.status as 'active' | 'inactive' });
      toast.success(UI_TEXT.SUCCESS_TOUR_CREATED);
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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {tour ? 'Edit Tour' : UI_TEXT.ACTION_ADD_TOUR}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Name <span className="text-blue-500">*</span>
            </label>
            <input
              {...register('name')}
              className="p-4 rounded bg-gray-100 outline-none w-full"
              placeholder="Tour name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Location <span className="text-blue-500">*</span>
              </label>
              <input
                {...register('location')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
                placeholder="Location"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Destination <span className="text-blue-500">*</span>
              </label>
              <StyledSelect {...register('destinationId')}>
                <option value={0}>Select destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </StyledSelect>
              {errors.destinationId && (
                <p className="text-red-500 text-sm mt-1">{errors.destinationId.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Price <span className="text-blue-500">*</span>
              </label>
              <input
                {...register('price')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
                placeholder="$680"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Days <span className="text-blue-500">*</span>
              </label>
              <input
                {...register('days')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
                placeholder="7"
              />
              {errors.days && <p className="text-red-500 text-sm mt-1">{errors.days.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Image URL <span className="text-blue-500">*</span>
            </label>
            <input
              {...register('image')}
              className="p-4 rounded bg-gray-100 outline-none w-full"
              placeholder="/assets/tours/tour.jpg"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Description <span className="text-blue-500">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="p-4 rounded bg-gray-100 outline-none w-full resize-none"
              placeholder="Describe the tour..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Status <span className="text-blue-500">*</span>
            </label>
            <StyledSelect {...register('status')}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </StyledSelect>
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
              className="bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors px-6 py-3 disabled:opacity-50"
            >
              {isSubmitting
                ? UI_TEXT.LOADING
                : tour
                  ? UI_TEXT.ACTION_SAVE
                  : UI_TEXT.ACTION_CREATE}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
