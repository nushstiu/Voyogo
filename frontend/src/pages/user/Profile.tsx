import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/common/Breadcrumb';
import toast from 'react-hot-toast';
import Header from '../../components/layout/Header';

export default function UserProfile() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const profileSchema = z.object({
    username: z.string().min(5, t('validation.usernameMin')).max(15, t('validation.usernameMax')),
    phone: z.string().optional(),
    country: z.string().optional(),
    date_of_birth: z.string().optional(),
    address: z.string().optional(),
    preferred_language: z.string().optional(),
    emergency_contact_name: z.string().optional(),
    emergency_contact_phone: z.string().optional(),
  });

  type ProfileFormData = z.infer<typeof profileSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        phone: user.phone || '',
        country: user.country || '',
        date_of_birth: user.date_of_birth || '',
        address: user.address || '',
        preferred_language: user.preferred_language || '',
        emergency_contact_name: user.emergency_contact_name || '',
        emergency_contact_phone: user.emergency_contact_phone || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    await new Promise((r) => setTimeout(r, 500));
    const updated = { ...user!, ...data, updated_at: new Date().toISOString() };
    localStorage.setItem('voyogo_user', JSON.stringify(updated));
    toast.success(t('success.profileUpdate'));
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="w-full px-6 md:px-16 py-12 max-w-4xl mx-auto">
          <Breadcrumb />

          <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('profile.title')}</h1>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.username')} <span className="text-blue-500">*</span>
                  </label>
                  <input
                    {...register('username')}
                    className="p-4 rounded bg-gray-100 outline-none w-full"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.email')}
                  </label>
                  <input
                    value={user?.email || ''}
                    disabled
                    className="p-4 rounded bg-gray-200 outline-none w-full cursor-not-allowed text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.phone')}
                  </label>
                  <input
                    {...register('phone')}
                    className="p-4 rounded bg-gray-100 outline-none w-full"
                    placeholder="+1 555 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.country')}
                  </label>
                  <input
                    {...register('country')}
                    className="p-4 rounded bg-gray-100 outline-none w-full"
                    placeholder={t('form.country')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.dateOfBirth')}
                  </label>
                  <input
                    type="date"
                    {...register('date_of_birth')}
                    className="p-4 rounded bg-gray-100 outline-none w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {t('form.preferredLanguage')}
                  </label>
                  <input
                    {...register('preferred_language')}
                    className="p-4 rounded bg-gray-100 outline-none w-full"
                    placeholder="English"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                  {t('form.address')}
                </label>
                <input
                  {...register('address')}
                  className="p-4 rounded bg-gray-100 outline-none w-full"
                  placeholder="Street, City, Country"
                />
              </div>

              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3">{t('form.emergencyContact')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                      {t('form.contactName')}
                    </label>
                    <input
                      {...register('emergency_contact_name')}
                      className="p-4 rounded bg-gray-100 outline-none w-full"
                      placeholder={t('form.contactName')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                      {t('form.contactPhone')}
                    </label>
                    <input
                      {...register('emergency_contact_phone')}
                      className="p-4 rounded bg-gray-100 outline-none w-full"
                      placeholder="+1 555 123 4567"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors px-8 py-3 disabled:opacity-50"
                >
                  {isSubmitting ? t('loading.default') : t('actions.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
