import { useState, useEffect } from 'react';
import { destinationService } from '../../services/destination.service';
import type { Destination } from '../../types';
import type { BookingData } from '../../types/booking';
import GuestCountInput from './GuestCountInput';

interface Props {
    bookingData: BookingData;
    setBookingData: (data: BookingData) => void;
    selectedDestination: Destination | null;
    setSelectedDestination: (dest: Destination | null) => void;
    preselectedDestination?: Destination | null;
    onNext: () => void;
}

export default function DestinationSelector({
    bookingData,
    setBookingData,
    selectedDestination,
    setSelectedDestination,
    preselectedDestination,
    onNext
}: Props) {
    const [adults, setAdults] = useState(bookingData.travelers.adults);
    const [children, setChildren] = useState(bookingData.travelers.children);
    const [chosen, setChosen] = useState<Destination | null>(selectedDestination);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        destinationService.getAll().then(setDestinations);
    }, []);

    useEffect(() => {
        if (preselectedDestination && !chosen) {
            setChosen(preselectedDestination);
        }
    }, [preselectedDestination]);

    const handleSelectDestination = (dest: Destination) => {
        setChosen(dest);
        setError('');
    };

    const handleContinue = () => {
        if (!chosen) {
            setError('Selectează o destinație pentru a continua.');
            return;
        }
        setSelectedDestination(chosen);
        setBookingData({
            ...bookingData,
            destinationId: chosen.id,
            destinationName: chosen.name,
            travelers: { adults, children }
        });
        onNext();
    };

    const totalTravelers = adults + children;

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-2">Alege destinația</h2>
            <p className="text-gray-600 mb-6">Selectează destinația și numărul de călători</p>

            {/* Traveler count with MUI GuestCountInput */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
                <h3 className="font-semibold mb-4 text-gray-700">Număr de călători</h3>
                <div className="space-y-4">
                    <GuestCountInput
                        label="Adulți"
                        subtitle="Vârsta 13+ ani"
                        value={adults}
                        min={1}
                        max={10}
                        onChange={setAdults}
                    />
                    <div className="border-t border-gray-200" />
                    <GuestCountInput
                        label="Copii"
                        subtitle="Vârsta 2-12 ani (reducere 30%)"
                        value={children}
                        min={0}
                        max={8}
                        onChange={setChildren}
                    />
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-sm">
                    <span className="text-gray-600">Total călători:</span>
                    <span className="font-bold text-blue-600">{totalTravelers} {totalTravelers === 1 ? 'persoană' : 'persoane'}</span>
                </div>
            </div>

            {/* Destination cards */}
            <h3 className="font-semibold mb-3 text-gray-700">Alege destinația</h3>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {destinations.map(dest => (
                    <button
                        key={dest.id}
                        onClick={() => handleSelectDestination(dest)}
                        className={`text-left border-2 rounded-xl overflow-hidden transition-all ${
                            chosen?.id === dest.id
                                ? 'border-blue-600 shadow-lg ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                        }`}
                    >
                        <div className="h-36 relative overflow-hidden">
                            <img
                                src={dest.image}
                                alt={dest.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/35 flex items-end p-3">
                                <span className="text-white text-xl font-bold drop-shadow-lg">{dest.name}</span>
                            </div>
                            {chosen?.id === dest.id && (
                                <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shadow">
                                    ✓
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-gray-500">{dest.packages} pachete</span>
                                <span className="text-sm font-semibold text-green-600">{dest.price_range}</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">{dest.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Continue button */}
            <button
                onClick={handleContinue}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                {chosen ? `Continuă cu ${chosen.name} →` : 'Selectează o destinație'}
            </button>
        </div>
    );
}
