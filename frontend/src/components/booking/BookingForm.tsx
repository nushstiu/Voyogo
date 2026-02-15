import { useState, useEffect } from 'react';
import type { BookingFormData } from '../../types/booking';
import PersonalInfoForm from './PersonalInfoForm';
import PackageSelector from './PackageSelector';

const initialFormData: BookingFormData = {
  gender: 'Mr.',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  startDate: { day: 0, month: 0, year: 0 },
  duration: '',
  destination: '',
  selectedPackages: [],
  insurance: false,
  termsAccepted: false,
};

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>(() => {
    const saved = localStorage.getItem('bookingForm');
    return saved ? JSON.parse(saved) as BookingFormData : initialFormData;
  });

  useEffect(() => {
    localStorage.setItem('bookingForm', JSON.stringify(formData));
  }, [formData]);

  const updateForm = (partial: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const togglePackage = (packageId: string) => {
    setFormData((prev) => {
      const exists = prev.selectedPackages.includes(packageId);
      return {
        ...prev,
        selectedPackages: exists
          ? prev.selectedPackages.filter((id) => id !== packageId)
          : [...prev.selectedPackages, packageId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.destination) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    alert('Booking submitted successfully! We will contact you shortly.');
    localStorage.removeItem('bookingForm');
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="py-16">
      <PersonalInfoForm formData={formData} onChange={updateForm} />

      <PackageSelector
        destination={formData.destination}
        selectedPackages={formData.selectedPackages}
        onToggle={togglePackage}
      />

      {/* Terms & Submit */}
      <div className="w-full px-6 md:px-16 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-3 text-gray-700">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.insurance}
                onChange={(e) => updateForm({ insurance: e.target.checked })}
                className="mt-1"
              />
              <span>
                Get me a travel insurance{' '}
                <a href="#" className="text-blue-500 underline">
                  (learn more)
                </a>
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => updateForm({ termsAccepted: e.target.checked })}
                className="mt-1"
                required
              />
              <span>
                I have read all{' '}
                <a href="#" className="text-blue-500 underline">
                  terms and conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-500 underline">
                  privacy policy
                </a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="h-[65px] w-[200px] bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors"
          >
            Book now
          </button>
        </div>
      </div>
    </form>
  );
}