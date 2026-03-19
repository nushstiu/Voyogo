import { useState } from 'react';
import type { BookingData, AvailableTour } from '../../types/booking';

type AccommodationType = 'budget' | 'standard' | 'luxury';
type MealPlan = 'breakfast' | 'half-board' | 'full-board' | 'all-inclusive';
type RoomType = 'single' | 'double' | 'twin' | 'family';

interface LocalPreferences {
    accommodation: AccommodationType;
    mealPlan: MealPlan;
    roomType: RoomType;
    specialRequests: string[];
    insuranceRequired: boolean;
}

interface Props {
    bookingData: BookingData;
    setBookingData: (data: BookingData) => void;
    selectedTour: AvailableTour | null;
    onNext: () => void;
    onBack: () => void;
}

const ACCOMMODATION_OPTIONS: { value: AccommodationType; label: string; desc: string; delta: string; deltaPct: number }[] = [
    { value: 'budget', label: 'Budget', desc: 'Hotel 3*', delta: '-10%', deltaPct: -0.1 },
    { value: 'standard', label: 'Standard', desc: 'Hotel 4*', delta: 'Inclus', deltaPct: 0 },
    { value: 'luxury', label: 'Luxury', desc: 'Hotel 5*', delta: '+30%', deltaPct: 0.3 },
];

const MEAL_OPTIONS: { value: MealPlan; label: string; delta: string; perPersonPerDay: number }[] = [
    { value: 'breakfast', label: 'Doar mic dejun', delta: 'Inclus', perPersonPerDay: 0 },
    { value: 'half-board', label: 'Demipensiune (MD + cină)', delta: '+$20/pers/zi', perPersonPerDay: 20 },
    { value: 'full-board', label: 'Pensiune completă', delta: '+$40/pers/zi', perPersonPerDay: 40 },
    { value: 'all-inclusive', label: 'All Inclusive', delta: '+$60/pers/zi', perPersonPerDay: 60 },
];

const ROOM_OPTIONS: { value: RoomType; label: string; desc: string }[] = [
    { value: 'single', label: 'Single', desc: '1 persoană, pat single' },
    { value: 'double', label: 'Double', desc: '2 persoane, pat dublu' },
    { value: 'twin', label: 'Twin', desc: '2 persoane, 2 paturi' },
    { value: 'family', label: 'Family', desc: '3-4 persoane' },
];

function calcTotal(prefs: LocalPreferences, bookingData: BookingData, tour: AvailableTour | null): number {
    if (!tour) return bookingData.totalPrice || 0;
    const totalPersons = bookingData.travelers.adults + bookingData.travelers.children;
    const baseAdults = tour.price * bookingData.travelers.adults;
    const baseChildren = tour.price * 0.7 * bookingData.travelers.children;
    const base = baseAdults + baseChildren;

    const accomExtra = ACCOMMODATION_OPTIONS.find(o => o.value === prefs.accommodation)?.deltaPct ?? 0;
    const mealExtra = MEAL_OPTIONS.find(o => o.value === prefs.mealPlan)?.perPersonPerDay ?? 0;
    const insurance = prefs.insuranceRequired ? 29 * totalPersons : 0;

    return base + base * accomExtra + mealExtra * totalPersons * tour.days + insurance;
}

export default function PreferencesForm({ bookingData, setBookingData, selectedTour, onNext, onBack }: Props) {
    const [preferences, setPreferences] = useState<LocalPreferences>({
        accommodation: (bookingData.preferences?.accommodation as AccommodationType) || 'standard',
        mealPlan: (bookingData.preferences?.mealPlan as MealPlan) || 'breakfast',
        roomType: (bookingData.preferences?.roomType as RoomType) || 'double',
        specialRequests: bookingData.preferences?.specialRequests ? bookingData.preferences.specialRequests.split(', ').filter(Boolean) : [],
        insuranceRequired: bookingData.preferences?.insuranceRequired ?? true,
    });

    const totalPersons = bookingData.travelers.adults + bookingData.travelers.children;
    const currentTotal = calcTotal(preferences, bookingData, selectedTour);

    const handleSubmit = () => {
        setBookingData({
            ...bookingData,
            totalPrice: currentTotal,
            preferences: {
                accommodation: preferences.accommodation,
                mealPlan: preferences.mealPlan,
                roomType: preferences.roomType,
                specialRequests: preferences.specialRequests.join(', '),
                insuranceRequired: preferences.insuranceRequired,
            }
        });
        onNext();
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline flex items-center gap-1">
                ← Înapoi
            </button>

            <h2 className="text-2xl font-bold mb-2">Preferințe călătorie</h2>
            <p className="text-gray-500 text-sm mb-6">Personalizează-ți pachetul (prețurile se actualizează în timp real)</p>

            <div className="space-y-8">
                {/* Accommodation */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tip cazare</label>
                    <div className="grid grid-cols-3 gap-3">
                        {ACCOMMODATION_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setPreferences({ ...preferences, accommodation: opt.value })}
                                className={`p-4 border-2 rounded-xl text-center transition-all ${
                                    preferences.accommodation === opt.value
                                        ? 'border-blue-600 bg-blue-50 shadow-sm'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="font-semibold text-sm">{opt.label}</div>
                                <div className="text-xs text-gray-500 mt-1">{opt.desc}</div>
                                <div className={`text-xs font-bold mt-2 ${
                                    opt.deltaPct < 0 ? 'text-green-600' : opt.deltaPct > 0 ? 'text-orange-500' : 'text-gray-400'
                                }`}>{opt.delta}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Meal plan */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Plan masă</label>
                    <div className="space-y-2">
                        {MEAL_OPTIONS.map(opt => (
                            <label key={opt.value} className={`flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer transition-all ${
                                preferences.mealPlan === opt.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                            }`}>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="mealPlan"
                                        value={opt.value}
                                        checked={preferences.mealPlan === opt.value}
                                        onChange={() => setPreferences({ ...preferences, mealPlan: opt.value })}
                                        className="text-blue-600"
                                    />
                                    <span className="text-sm font-medium">{opt.label}</span>
                                </div>
                                <span className={`text-xs font-bold ${opt.perPersonPerDay > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
                                    {opt.delta}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Room type */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tip cameră</label>
                    <div className="grid grid-cols-2 gap-3">
                        {ROOM_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setPreferences({ ...preferences, roomType: opt.value })}
                                className={`p-3 border-2 rounded-xl text-left transition-all ${
                                    preferences.roomType === opt.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="font-semibold text-sm">{opt.label}</div>
                                <div className="text-xs text-gray-500">{opt.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Special requests */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Cereri speciale (opțional)</label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            'Cameră la etaj înalt',
                            'Cameră cu vedere',
                            'Pat suplimentar pentru copil',
                            'Camere alăturate',
                            'Check-in devreme',
                            'Check-out târziu'
                        ].map(req => (
                            <label key={req} className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={preferences.specialRequests.includes(req)}
                                    onChange={(e) => {
                                        const updated = e.target.checked
                                            ? [...preferences.specialRequests, req]
                                            : preferences.specialRequests.filter(r => r !== req);
                                        setPreferences({ ...preferences, specialRequests: updated });
                                    }}
                                    className="rounded"
                                />
                                {req}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Insurance */}
                <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    preferences.insuranceRequired ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={preferences.insuranceRequired}
                            onChange={(e) => setPreferences({ ...preferences, insuranceRequired: e.target.checked })}
                            className="mt-1"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm">Asigurare de călătorie</span>
                                <span className="text-sm font-bold text-blue-600">
                                    +${29 * totalPersons} ({totalPersons} pers. × $29)
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Acoperire: cheltuieli medicale, anulare călătorie, bagaje pierdute, repatriere
                            </p>
                        </div>
                    </label>
                </div>

                {/* Price summary */}
                {selectedTour && (
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-3">Sumar preț estimat</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Bază ({bookingData.travelers.adults}A + {bookingData.travelers.children}C)</span>
                                <span>${(selectedTour.price * bookingData.travelers.adults + selectedTour.price * 0.7 * bookingData.travelers.children).toFixed(0)}</span>
                            </div>
                            {preferences.accommodation !== 'standard' && (
                                <div className={`flex justify-between ${preferences.accommodation === 'luxury' ? 'text-orange-600' : 'text-green-600'}`}>
                                    <span>Cazare {preferences.accommodation}</span>
                                    <span>{ACCOMMODATION_OPTIONS.find(o => o.value === preferences.accommodation)?.delta}</span>
                                </div>
                            )}
                            {preferences.mealPlan !== 'breakfast' && (
                                <div className="flex justify-between text-orange-600">
                                    <span>Plan masă</span>
                                    <span>+${(MEAL_OPTIONS.find(o => o.value === preferences.mealPlan)?.perPersonPerDay ?? 0) * totalPersons * selectedTour.days}</span>
                                </div>
                            )}
                            {preferences.insuranceRequired && (
                                <div className="flex justify-between text-blue-600">
                                    <span>Asigurare</span>
                                    <span>+${29 * totalPersons}</span>
                                </div>
                            )}
                            <div className="border-t pt-2 flex justify-between font-bold text-base">
                                <span>Total estimat</span>
                                <span className="text-green-600">${currentTotal.toFixed(0)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-4 mt-8">
                <button
                    onClick={onBack}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 text-gray-700 transition-colors"
                >
                    ← Înapoi
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                    Continuă → Documente necesare
                </button>
            </div>
        </div>
    );
}
