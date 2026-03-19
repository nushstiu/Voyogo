import { useState } from 'react';
import type { BookingData, PassengerInfo } from '../../types/booking';
import PassengerForm from './PassengerForm';

interface Props {
    bookingData: BookingData;
    setBookingData: (data: BookingData) => void;
    onNext: () => void;
    onBack: () => void;
}

const DEMO_ADULTS: Omit<PassengerInfo, 'id' | 'type'>[] = [
    { gender: 'Mr.', firstName: 'Ion', lastName: 'Popescu', dateOfBirth: '1985-06-15', nationality: 'Romanian', passportNumber: 'RO123456', passportExpiry: '2030-01-01' },
    { gender: 'Ms.', firstName: 'Maria', lastName: 'Ionescu', dateOfBirth: '1988-09-23', nationality: 'Romanian', passportNumber: 'RO654321', passportExpiry: '2031-05-10' },
    { gender: 'Mr.', firstName: 'Alexandru', lastName: 'Constantin', dateOfBirth: '1979-03-08', nationality: 'Romanian', passportNumber: 'RO789012', passportExpiry: '2029-12-15' },
];

const DEMO_CHILDREN: Omit<PassengerInfo, 'id' | 'type'>[] = [
    { gender: 'None', firstName: 'Andrei', lastName: 'Popescu', dateOfBirth: '2015-04-20', nationality: 'Romanian', passportNumber: 'RO345678', passportExpiry: '2028-04-20' },
    { gender: 'None', firstName: 'Elena', lastName: 'Popescu', dateOfBirth: '2017-11-03', nationality: 'Romanian', passportNumber: 'RO456789', passportExpiry: '2027-11-03' },
];

function buildInitialPassengers(travelers: { adults: number; children: number }): PassengerInfo[] {
    const passengers: PassengerInfo[] = [];
    for (let i = 0; i < travelers.adults; i++) {
        passengers.push({ id: `adult-${i}`, type: 'adult', gender: 'Mr.', firstName: '', lastName: '', dateOfBirth: '', nationality: '', passportNumber: '', passportExpiry: '' });
    }
    for (let i = 0; i < travelers.children; i++) {
        passengers.push({ id: `child-${i}`, type: 'child', gender: 'None', firstName: '', lastName: '', dateOfBirth: '', nationality: '', passportNumber: '', passportExpiry: '' });
    }
    return passengers;
}

function validatePassenger(p: PassengerInfo): Partial<Record<keyof PassengerInfo, string>> {
    const errors: Partial<Record<keyof PassengerInfo, string>> = {};
    if (!p.firstName.trim()) errors.firstName = 'Prenumele este obligatoriu';
    if (!p.lastName.trim()) errors.lastName = 'Numele este obligatoriu';
    if (!p.dateOfBirth) errors.dateOfBirth = 'Data nașterii este obligatorie';
    if (!p.nationality) errors.nationality = 'Naționalitatea este obligatorie';
    if (!p.passportNumber.trim()) errors.passportNumber = 'Nr. pașaport este obligatoriu';
    if (!p.passportExpiry) errors.passportExpiry = 'Data expirării este obligatorie';
    return errors;
}

export default function PersonalInfoForm({ bookingData, setBookingData, onNext, onBack }: Props) {
    const [passengers, setPassengers] = useState<PassengerInfo[]>(() => {
        if (bookingData.passengers && bookingData.passengers.length > 0) {
            return bookingData.passengers;
        }
        return buildInitialPassengers(bookingData.travelers);
    });
    const [errors, setErrors] = useState<Record<string, Partial<Record<keyof PassengerInfo, string>>>>({});
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const updatePassenger = (index: number, updated: PassengerInfo) => {
        const next = [...passengers];
        next[index] = updated;
        setPassengers(next);
        if (submitAttempted) {
            const newErrors = { ...errors };
            newErrors[updated.id] = validatePassenger(updated);
            setErrors(newErrors);
        }
    };

    const handleDemoFill = () => {
        const filled = passengers.map((p, i) => {
            if (p.type === 'adult') {
                const demo = DEMO_ADULTS[i % DEMO_ADULTS.length];
                return { ...p, ...demo };
            } else {
                const childIdx = passengers.filter((x, xi) => x.type === 'child' && xi <= i).length - 1;
                const demo = DEMO_CHILDREN[childIdx % DEMO_CHILDREN.length];
                return { ...p, ...demo };
            }
        });
        setPassengers(filled);
        setErrors({});
    };

    const handleSubmit = () => {
        setSubmitAttempted(true);
        const newErrors: Record<string, Partial<Record<keyof PassengerInfo, string>>> = {};
        let hasErrors = false;
        passengers.forEach(p => {
            const errs = validatePassenger(p);
            newErrors[p.id] = errs;
            if (Object.keys(errs).length > 0) hasErrors = true;
        });
        setErrors(newErrors);
        if (!hasErrors) {
            setBookingData({ ...bookingData, passengers });
            onNext();
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline flex items-center gap-1">
                ← Înapoi
            </button>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Date pasageri</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {bookingData.travelers.adults} adult{bookingData.travelers.adults !== 1 ? 'ți' : ''}
                        {bookingData.travelers.children > 0 && ` + ${bookingData.travelers.children} copil${bookingData.travelers.children !== 1 ? 'i' : ''}`}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleDemoFill}
                    className="text-sm bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors font-medium"
                >
                    Demo: completare automată
                </button>
            </div>

            <div className="space-y-4">
                {passengers.map((passenger, index) => {
                    const label = passenger.type === 'adult'
                        ? `Adult ${passengers.filter((p, i) => p.type === 'adult' && i <= index).length}`
                        : `Copil ${passengers.filter((p, i) => p.type === 'child' && i <= index).length}`;
                    return (
                        <PassengerForm
                            key={passenger.id}
                            passenger={passenger}
                            index={index}
                            passengerLabel={label}
                            onChange={(updated) => updatePassenger(index, updated)}
                            errors={errors[passenger.id]}
                        />
                    );
                })}
            </div>

            {submitAttempted && Object.values(errors).some(e => Object.keys(e).length > 0) && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    Te rugăm să completezi toate câmpurile obligatorii pentru fiecare pasager.
                </div>
            )}

            <div className="mt-8 text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-lg p-4">
                <strong>Informație:</strong> Datele pașaportului trebuie să corespundă exact cu documentul original.
                Pașaportul trebuie să fie valabil minimum 6 luni de la data întoarcerii.
            </div>

            <div className="flex gap-4 mt-6">
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
                    Continuă →
                </button>
            </div>
        </div>
    );
}
