import type { PassengerInfo } from '../../types/booking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
    passenger: PassengerInfo;
    index: number;
    passengerLabel: string;
    onChange: (updated: PassengerInfo) => void;
    errors?: Record<string, string>;
}

const GENDER_OPTIONS: PassengerInfo['gender'][] = ['Mr.', 'Ms.', 'None'];

const PassengerForm = ({ passenger, passengerLabel, onChange, errors = {} }: Props) => {
    const update = (field: keyof PassengerInfo, value: string) => {
        onChange({ ...passenger, [field]: value });
    };

    const inputClass = (field: string) =>
        `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            errors[field] ? 'border-red-500' : 'border-gray-300'
        }`;

    return (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <h4 className="font-semibold text-gray-800">{passengerLabel}</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
                    <div className="relative">
                        <select
                            value={passenger.gender}
                            onChange={(e) => update('gender', e.target.value)}
                            className={`appearance-none pr-8 ${inputClass('gender')}`}
                        >
                            {GENDER_OPTIONS.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                        </div>
                    </div>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prenume</label>
                    <input
                        type="text"
                        value={passenger.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                        className={inputClass('firstName')}
                        placeholder="Prenume"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nume</label>
                    <input
                        type="text"
                        value={passenger.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                        className={inputClass('lastName')}
                        placeholder="Nume"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data nașterii</label>
                    <input
                        type="date"
                        value={passenger.dateOfBirth}
                        onChange={(e) => update('dateOfBirth', e.target.value)}
                        className={inputClass('dateOfBirth')}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Naționalitate</label>
                    <input
                        type="text"
                        value={passenger.nationality}
                        onChange={(e) => update('nationality', e.target.value)}
                        className={inputClass('nationality')}
                        placeholder="Naționalitate"
                    />
                    {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Număr pașaport</label>
                    <input
                        type="text"
                        value={passenger.passportNumber}
                        onChange={(e) => update('passportNumber', e.target.value)}
                        className={inputClass('passportNumber')}
                        placeholder="Număr pașaport"
                    />
                    {errors.passportNumber && <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expirare pașaport</label>
                    <input
                        type="date"
                        value={passenger.passportExpiry}
                        onChange={(e) => update('passportExpiry', e.target.value)}
                        className={inputClass('passportExpiry')}
                    />
                    {errors.passportExpiry && <p className="text-red-500 text-xs mt-1">{errors.passportExpiry}</p>}
                </div>
            </div>
        </div>
    );
};

export default PassengerForm;