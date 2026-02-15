import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UI_TEXT, API_ENDPOINTS } from '../../../constants';
import type { Destination } from '../../../types';
import toast from 'react-hot-toast';

const destinationSchema = z.object({
  name: z.string().min(2, UI_TEXT.ERROR_REQUIRED),
  packages: z.coerce.number().min(0),
  price_range: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  image: z.string().min(1, UI_TEXT.ERROR_REQUIRED),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type DestinationFormData = z.infer<typeof destinationSchema>;

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: Destination;
  onSaved: () => void;
}

export default function DestinationModal({ isOpen, onClose, destination, onSaved }: DestinationModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DestinationFormData>({
    resolver: zodResolver(destinationSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        destination
          ? {
              name: destination.name,
              packages: destination.packages,
              price_range: destination.price_range,
              image: destination.image,
              description: destination.description,
            }
          : { name: '', packages: 0, price_range: '', image: '', description: '' }
      );
    }
  }, [isOpen, destination, reset]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data: DestinationFormData) => {
    if (destination) {
      await fetch(API_ENDPOINTS.DESTINATION_BY_ID(destination.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      toast.success(UI_TEXT.SUCCESS_DESTINATION_UPDATED);
    } else {
      await fetch(API_ENDPOINTS.DESTINATIONS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      toast.success(UI_TEXT.SUCCESS_DESTINATION_CREATED);
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
            {destination ? 'Edit Destination' : UI_TEXT.ACTION_ADD_DESTINATION}
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
              placeholder="Destination name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">Packages</label>
              <input
                type="number"
                {...register('packages')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Price Range <span className="text-blue-500">*</span>
              </label>
              <input
                {...register('price_range')}
                className="p-4 rounded bg-gray-100 outline-none w-full"
                placeholder="$500 - $1,000"
              />
              {errors.price_range && (
                <p className="text-red-500 text-sm mt-1">{errors.price_range.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Image URL <span className="text-blue-500">*</span>
            </label>
            <input
              {...register('image')}
              className="p-4 rounded bg-gray-100 outline-none w-full"
              placeholder="/assets/destination.jpg"
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
              placeholder="Describe the destination..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
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
                : destination
                  ? UI_TEXT.ACTION_SAVE
                  : UI_TEXT.ACTION_CREATE}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
