import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UI_TEXT, API_ENDPOINTS } from '../../../constants';
import type { User } from '../../../types';
import toast from 'react-hot-toast';

const userSchema = z.object({
  username: z.string().min(3, UI_TEXT.ERROR_USERNAME_MIN),
  email: z.email(UI_TEXT.ERROR_INVALID_EMAIL),
  phone: z.string().optional(),
  country: z.string().optional(),
  role: z.enum(['admin', 'user']),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  readOnly?: boolean;
  onSaved: () => void;
}

export default function UserModal({ isOpen, onClose, user, readOnly, onSaved }: UserModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        user
          ? { username: user.username, email: user.email, phone: user.phone || '', country: user.country || '', role: user.role }
          : { username: '', email: '', phone: '', country: '', role: 'user' }
      );
    }
  }, [isOpen, user, reset]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data: UserFormData) => {
    if (user) {
      await fetch(API_ENDPOINTS.USER_BY_ID(user.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      toast.success(UI_TEXT.SUCCESS_USER_UPDATED);
    } else {
      await fetch(API_ENDPOINTS.USERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      toast.success(UI_TEXT.SUCCESS_USER_CREATED);
    }
    onSaved();
    onClose();
  };

  const title = readOnly
    ? UI_TEXT.MODAL_VIEW_USER
    : user
      ? UI_TEXT.MODAL_EDIT_USER
      : UI_TEXT.ACTION_ADD_USER;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              {UI_TEXT.LABEL_USERNAME} <span className="text-blue-500">*</span>
            </label>
            <input
              {...register('username')}
              disabled={readOnly}
              className={readOnly ? "p-4 rounded bg-gray-200 cursor-not-allowed text-gray-500 outline-none w-full" : "p-4 rounded bg-gray-100 outline-none w-full"}
              placeholder={UI_TEXT.PLACEHOLDER_USERNAME}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              {UI_TEXT.LABEL_EMAIL} <span className="text-blue-500">*</span>
            </label>
            <input
              {...register('email')}
              disabled={readOnly}
              className={readOnly ? "p-4 rounded bg-gray-200 cursor-not-allowed text-gray-500 outline-none w-full" : "p-4 rounded bg-gray-100 outline-none w-full"}
              placeholder={UI_TEXT.PLACEHOLDER_EMAIL}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              {UI_TEXT.LABEL_PHONE}
            </label>
            <input
              {...register('phone')}
              disabled={readOnly}
              className={readOnly ? "p-4 rounded bg-gray-200 cursor-not-allowed text-gray-500 outline-none w-full" : "p-4 rounded bg-gray-100 outline-none w-full"}
              placeholder="+1 555 123 4567"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              {UI_TEXT.LABEL_COUNTRY}
            </label>
            <input
              {...register('country')}
              disabled={readOnly}
              className={readOnly ? "p-4 rounded bg-gray-200 cursor-not-allowed text-gray-500 outline-none w-full" : "p-4 rounded bg-gray-100 outline-none w-full"}
              placeholder="Country"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">Role <span className="text-blue-500">*</span></label>
            <select
              {...register('role')}
              disabled={readOnly}
              className={readOnly ? "p-4 rounded bg-gray-200 cursor-not-allowed text-gray-500 outline-none w-full" : "p-4 rounded bg-gray-100 outline-none w-full"}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {readOnly && user && (
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Joined: {new Date(user.created_at).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated: {new Date(user.updated_at).toLocaleDateString()}
              </p>
            </div>
          )}

          {!readOnly && (
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
                  : user
                    ? UI_TEXT.ACTION_SAVE
                    : UI_TEXT.ACTION_CREATE}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
