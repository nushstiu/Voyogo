import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthContext';
import { UI_TEXT } from '../../constants/text';
import Breadcrumb from '../../components/common/Breadcrumb';
import toast from 'react-hot-toast';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const profileSchema = z.object({
  username: z.string().min(5, UI_TEXT.ERROR_USERNAME_MIN).max(15, UI_TEXT.ERROR_USERNAME_MAX),
  phone: z.string().optional(),
  country: z.string().optional(),
  date_of_birth: z.string().optional(),
  address: z.string().optional(),
  preferred_language: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function UserProfile() {
  const { user } = useAuth();

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
    toast.success(UI_TEXT.SUCCESS_PROFILE_UPDATE);
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="w-full px-6 md:px-16 py-12 max-w-4xl mx-auto">
          <Breadcrumb />

          <h1 className="text-3xl font-bold text-gray-800 mb-6">{UI_TEXT.USER_PROFILE}</h1>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {UI_TEXT.LABEL_USERNAME} <span className="text-blue-500">*</span>
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
                    {UI_TEXT.LABEL_EMAIL}
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
                    {UI_TEXT.LABEL_PHONE}
                  </label>
                  <input
                    {...register('phone')}
                    className="p-4 rounded bg-gray-100 outline-none w-full"
                    placeholder="+1 555 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    {UI_TEXT.LABEL_COUNTRY}
                  </label>
                  <input
                    {...register('country')}
                    className="p-4 rounded bg-gray-100 outline-none w-full"
                    placeholder="Country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register('date_of_birth')}
                    className="p-4 rounded bg-gray-100 outline-none w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Preferred Language
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
                  Address
                </label>
                <input
                  {...register('address')}
                  className="p-4 rounded bg-gray-100 outline-none w-full"
                  placeholder="Street, City, Country"
                />
              </div>

              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Emergency Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                      Contact Name
                    </label>
                    <input
                      {...register('emergency_contact_name')}
                      className="p-4 rounded bg-gray-100 outline-none w-full"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                      Contact Phone
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
                  {isSubmitting ? UI_TEXT.LOADING : UI_TEXT.ACTION_SAVE}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
