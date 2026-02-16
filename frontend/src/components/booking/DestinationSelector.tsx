import { useState } from 'react';
import { MOCK_DESTINATIONS } from '../../data/destinations.data';
import type { Destination, User } from '../../types';
import type { BookingData } from '../../types/booking';

interface Props {
    bookingData: BookingData;
    setBookingData: (data: BookingData) => void;
    user: User | null;
    selectedDestination: Destination | null;
    setSelectedDestination: (dest: Destination | null) => void;
    onNext: () => void;
}

export default function DestinationSelector({
    bookingData,
    setBookingData,
    user,
    selectedDestination,
    setSelectedDestination,
    onNext
}: Props) {
    const [adults, setAdults] = useState(bookingData.travelers.adults);
    const [children, setChildren] = useState(bookingData.travelers.children);
    const [chosen, setChosen] = useState<Destination | null>(selectedDestination);

    const handleSelectDestination = (dest: Destination) => {
        setChosen(dest);
    };

    const handleContinue = () => {
        if (!chosen) return;
        setSelectedDestination(chosen);
        setBookingData({
            ...bookingData,
            destinationId: chosen.id,
            destinationName: chosen.name,
            travelers: { adults, children }
        });
        onNext();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-2">Alege destinatia</h2>
            <p className="text-gray-600 mb-6">Selecteaza destinatia dorita si numarul de calatori</p>

            {/* User profile info */}
            {user && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">Datele tale de contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                            <span className="text-gray-600">Nume:</span>
                            <p className="font-semibold">{user.username}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Email:</span>
                            <p className="font-semibold">{user.email}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Telefon:</span>
                            <p className="font-semibold">{user.phone || 'Necompletat'}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Traveler count */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">Numar calatori</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Adulti</label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >-</button>
                            <span className="text-lg font-semibold w-8 text-center">{adults}</span>
                            <button
                                onClick={() => setAdults(Math.min(10, adults + 1))}
                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >+</button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Copii (2-12 ani)</label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >-</button>
                            <span className="text-lg font-semibold w-8 text-center">{children}</span>
                            <button
                                onClick={() => setChildren(Math.min(8, children + 1))}
                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >+</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Destination cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {MOCK_DESTINATIONS.map(dest => (
                    <button
                        key={dest.id}
                        onClick={() => handleSelectDestination(dest)}
                        className={`text-left border-2 rounded-lg overflow-hidden transition-all ${
                            chosen?.id === dest.id
                                ? 'border-blue-600 shadow-lg ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                        }`}
                    >
                        <div className="h-32 relative overflow-hidden">
                            <img
                                src={dest.image}
                                alt={dest.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold drop-shadow-lg">{dest.name}</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">{dest.packages} pachete</span>
                                <span className="text-sm font-semibold text-green-600">{dest.price_range}</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">{dest.description}</p>
                            {chosen?.id === dest.id && (
                                <div className="mt-2 text-blue-600 font-semibold text-sm">
                                    &#10003; Selectat
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Continue button */}
            <button
                onClick={handleContinue}
                disabled={!chosen}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                {chosen ? `Continua cu ${chosen.name}` : 'Selecteaza o destinatie'}
            </button>
        </div>
    );
}
