import { useState } from 'react';
import type { BookingData } from '../../types/booking';

type AccommodationType = 'budget' | 'standard' | 'luxury';
type MealPlan = 'breakfast' | 'half-board' | 'full-board' | 'all-inclusive';
type RoomType = 'single' | 'double' | 'twin' | 'family';

interface LocalPreferences {
    accommodation: AccommodationType;
    mealPlan: MealPlan;
    roomType: RoomType;
    specialRequests: string[];
    dietaryRestrictions: string[];
    insuranceRequired: boolean;
    medicalConditions: string;
}

interface Props {
    bookingData: BookingData;
    setBookingData: (data: BookingData) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function PreferencesForm({ bookingData, setBookingData, onNext, onBack }: Props) {
    const [preferences, setPreferences] = useState<LocalPreferences>({
        accommodation: 'standard',
        mealPlan: 'breakfast',
        roomType: 'double',
        specialRequests: [],
        dietaryRestrictions: [],
        insuranceRequired: true,
        medicalConditions: '',
    });

    const handleSubmit = () => {
        setBookingData({
            ...bookingData,
            preferences: {
                accommodation: preferences.accommodation,
                mealPlan: preferences.mealPlan,
                roomType: preferences.roomType,
                dietaryRestrictions: preferences.dietaryRestrictions,
                specialRequests: preferences.specialRequests.join(', '),
                mobility: preferences.medicalConditions || undefined,
            }
        });
        onNext();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                &#8592; Inapoi
            </button>

            <h2 className="text-2xl font-bold mb-6">Preferinte calatorie</h2>

            <div className="space-y-6">
                {/* Accommodation type */}
                <div>
                    <label className="block text-sm font-medium mb-3">Tip cazare</label>
                    <div className="grid grid-cols-3 gap-3">
                        {([
                            { value: 'budget' as const, label: 'Budget', desc: 'Hotel 3*' },
                            { value: 'standard' as const, label: 'Standard', desc: 'Hotel 4*' },
                            { value: 'luxury' as const, label: 'Luxury', desc: 'Hotel 5*' }
                        ]).map(option => (
                            <button
                                key={option.value}
                                onClick={() => setPreferences({ ...preferences, accommodation: option.value })}
                                className={`p-4 border-2 rounded-lg text-center ${
                                    preferences.accommodation === option.value
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200'
                                }`}
                            >
                                <div className="font-semibold">{option.label}</div>
                                <div className="text-xs text-gray-600">{option.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Meal plan */}
                <div>
                    <label className="block text-sm font-medium mb-3">Plan masa</label>
                    <select
                        value={preferences.mealPlan}
                        onChange={(e) => setPreferences({ ...preferences, mealPlan: e.target.value as MealPlan })}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="breakfast">Doar micul dejun</option>
                        <option value="half-board">Demipensiune (mic dejun + cina)</option>
                        <option value="full-board">Pensiune completa (mic dejun + pranz + cina)</option>
                        <option value="all-inclusive">All Inclusive</option>
                    </select>
                </div>

                {/* Room type */}
                <div>
                    <label className="block text-sm font-medium mb-3">Tip camera</label>
                    <select
                        value={preferences.roomType}
                        onChange={(e) => setPreferences({ ...preferences, roomType: e.target.value as RoomType })}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="single">Single (1 persoana, pat single)</option>
                        <option value="double">Double (2 persoane, pat dublu)</option>
                        <option value="twin">Twin (2 persoane, 2 paturi separate)</option>
                        <option value="family">Family (3-4 persoane)</option>
                    </select>
                </div>

                {/* Dietary restrictions */}
                <div>
                    <label className="block text-sm font-medium mb-3">Restrictii dietetice</label>
                    <div className="space-y-2">
                        {['Vegetarian', 'Vegan', 'Fara gluten', 'Fara lactate', 'Halal', 'Kosher'].map(diet => (
                            <label key={diet} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={preferences.dietaryRestrictions.includes(diet)}
                                    onChange={(e) => {
                                        const newRestrictions = e.target.checked
                                            ? [...preferences.dietaryRestrictions, diet]
                                            : preferences.dietaryRestrictions.filter(d => d !== diet);
                                        setPreferences({ ...preferences, dietaryRestrictions: newRestrictions });
                                    }}
                                    className="mr-2"
                                />
                                {diet}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Special requests */}
                <div>
                    <label className="block text-sm font-medium mb-3">Cerinte speciale</label>
                    <div className="space-y-2">
                        {[
                            'Camera la etaj inalt',
                            'Camera cu vedere',
                            'Pat suplimentar pentru copil',
                            'Camera alaturata',
                            'Check-in devreme',
                            'Check-out tarziu'
                        ].map(request => (
                            <label key={request} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={preferences.specialRequests.includes(request)}
                                    onChange={(e) => {
                                        const newRequests = e.target.checked
                                            ? [...preferences.specialRequests, request]
                                            : preferences.specialRequests.filter(r => r !== request);
                                        setPreferences({ ...preferences, specialRequests: newRequests });
                                    }}
                                    className="mr-2"
                                />
                                {request}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Medical conditions */}
                <div>
                    <label className="block text-sm font-medium mb-2">Conditii medicale (optional)</label>
                    <textarea
                        value={preferences.medicalConditions}
                        onChange={(e) => setPreferences({ ...preferences, medicalConditions: e.target.value })}
                        placeholder="Va rugam sa mentionati orice conditii medicale relevante"
                        className="w-full px-4 py-2 border rounded-lg"
                        rows={3}
                    />
                </div>

                {/* Insurance */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="flex items-start">
                        <input
                            type="checkbox"
                            checked={preferences.insuranceRequired}
                            onChange={(e) => setPreferences({ ...preferences, insuranceRequired: e.target.checked })}
                            className="mt-1 mr-3"
                        />
                        <div>
                            <div className="font-semibold">Asigurare de calatorie (+29 $/persoana)</div>
                            <div className="text-sm text-gray-600">
                                Acopera: Cheltuieli medicale, Anulare calatorie, Bagaje pierdute, Repatriere
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <button
                    onClick={onBack}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 text-gray-700"
                >
                    &#8592; Inapoi
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                    Continua catre documente necesare &#8594;
                </button>
            </div>
        </div>
    );
}
