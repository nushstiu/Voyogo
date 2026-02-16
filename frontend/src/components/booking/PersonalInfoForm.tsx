import type { BookingFormData } from '../../types/booking';
import destinations from '../../data/destinations.json';

interface PersonalInfoFormProps {
  formData: BookingFormData;
  onChange: (data: Partial<BookingFormData>) => void;
}

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

export default function PersonalInfoForm({ formData, onChange }: PersonalInfoFormProps) {
  return (
    <div className="w-full px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-10">Personal Identity</h2>

      {/* Row 1: Name */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            FIRST NAME <span className="text-blue-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              value={formData.gender}
              onChange={(e) => onChange({ gender: e.target.value as BookingFormData['gender'] })}
              className="p-4 rounded bg-gray-100 text-gray-600"
              aria-label="Title"
            >
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="None">None</option>
            </select>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              className="p-4 rounded flex-1 bg-gray-100 outline-none"
              placeholder="First name"
              required
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            LAST NAME <span className="text-blue-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className="p-4 rounded w-full bg-gray-100 outline-none"
            placeholder="Last name"
            required
          />
        </div>
      </div>

      {/* Row 2: Contact */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="p-4 rounded w-full bg-gray-100 outline-none"
            placeholder="your@email.com"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            PHONE NUMBER <span className="text-blue-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="p-4 rounded w-full bg-gray-100 outline-none"
            placeholder="+1 234 567 890"
            required
          />
        </div>
      </div>

      {/* Row 3: Trip Details */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            START DATE <span className="text-blue-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              value={formData.startDate.day}
              onChange={(e) =>
                onChange({
                  startDate: { ...formData.startDate, day: Number(e.target.value) },
                })
              }
              className="px-4 py-4 bg-gray-100 rounded flex-1"
              aria-label="Day"
            >
              <option value={0}>Day</option>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={formData.startDate.month}
              onChange={(e) =>
                onChange({
                  startDate: { ...formData.startDate, month: Number(e.target.value) },
                })
              }
              className="px-4 py-4 bg-gray-100 rounded flex-1"
              aria-label="Month"
            >
              <option value={0}>Month</option>
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={formData.startDate.year}
              onChange={(e) =>
                onChange({
                  startDate: { ...formData.startDate, year: Number(e.target.value) },
                })
              }
              className="px-4 py-4 bg-gray-100 rounded flex-1"
              aria-label="Year"
            >
              <option value={0}>Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            DURATION
          </label>
          <select
            value={formData.duration}
            onChange={(e) => onChange({ duration: e.target.value })}
            className="p-4 rounded w-full bg-gray-100"
            aria-label="Duration"
          >
            <option value="">Select duration</option>
            <option value="1-2">1-2 Days</option>
            <option value="5-7">5-7 Days</option>
            <option value="7-14">7-14 Days</option>
            <option value="14+">14+ Days</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            DESTINATION <span className="text-blue-500">*</span>
          </label>
          <select
            value={formData.destination}
            onChange={(e) => onChange({ destination: e.target.value })}
            className="p-4 rounded w-full bg-gray-100"
            required
            aria-label="Destination"
          >
            <option value="">Select destination</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}