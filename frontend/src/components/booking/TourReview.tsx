import type { Destination } from '../../types';
import type { BookingData, AvailableTour, DayItinerary } from '../../types/booking';

interface Props {
    bookingData: BookingData;
    selectedTour: AvailableTour | null;
    selectedDestination: Destination | null;
    onNext: () => void;
    onBack: () => void;
}

export default function TourReview({ bookingData, selectedTour, selectedDestination, onNext, onBack }: Props) {
    const calculateTotalPrice = () => {
        if (!selectedTour) return 0;
        return selectedTour.price * (bookingData.travelers.adults + bookingData.travelers.children * 0.7);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline flex items-center gap-2">
                &#8592; Inapoi
            </button>

            <h2 className="text-2xl font-bold mb-6">Detalii Tur</h2>

            {selectedTour ? (
                <div className="space-y-8">
                    {/* Main info */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-600">
                        <h3 className="text-2xl font-bold mb-1 text-blue-900">{selectedTour.tourName}</h3>
                        <p className="text-blue-700 mb-4">{selectedTour.destinationName}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Data de start</p>
                                <p className="font-semibold text-lg">{selectedTour.startDate.toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Data de final</p>
                                <p className="font-semibold text-lg">{selectedTour.endDate.toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Durata</p>
                                <p className="font-semibold text-lg">{selectedTour.days} zile</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Locuri disponibile</p>
                                <p className="font-semibold text-lg">{selectedTour.availableSpots} locuri</p>
                            </div>
                        </div>
                    </div>

                    {/* About destination */}
                    {selectedDestination && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-3 text-purple-800">Despre {selectedDestination.name}</h4>
                            <p className="text-gray-700">{selectedDestination.description}</p>
                        </div>
                    )}

                    {/* Tour description */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Descriere tur</h4>
                        <p className="text-gray-700">{selectedTour.description}</p>
                    </div>

                    {/* Includes */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="text-green-600">&#10003;</span> Ce include
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedTour.includes.map((item: string, i: number) => (
                                <div key={i} className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                                    <span className="text-green-600 font-bold mt-1">&#10003;</span>
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Excludes */}
                    {selectedTour.excludes.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="text-red-600">&#10007;</span> Ce nu include
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedTour.excludes.map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                                        <span className="text-red-600 font-bold mt-1">&#10007;</span>
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Highlights */}
                    {selectedTour.highlights.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Puncte de interes</h4>
                            <div className="space-y-2">
                                {selectedTour.highlights.map((highlight: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border-l-2 border-yellow-400">
                                        <span className="text-gray-700">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Full Itinerary */}
                    {selectedTour.itinerary.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Itinerariu complet</h4>
                            <div className="space-y-3">
                                {selectedTour.itinerary.map((day: DayItinerary) => (
                                    <div key={day.day} className="border-l-4 border-blue-600 pl-4 py-3 bg-blue-50 rounded-r-lg">
                                        <h5 className="font-semibold text-blue-900">Ziua {day.day}: {day.title}</h5>
                                        <p className="text-gray-600 text-sm mt-1">{day.description}</p>
                                        {day.activities.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {day.activities.map((activity: string, i: number) => (
                                                    <span key={i} className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                        {activity}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="mt-1 text-xs text-gray-500">
                                            Cazare: {day.accommodation} | Mese: {day.meals.join(', ')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price summary */}
                    <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                        <h4 className="font-semibold mb-4 text-lg">Rezumatul pretului:</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Adulti ({bookingData.travelers.adults}) x ${selectedTour.price}</span>
                                <span className="font-semibold">${(bookingData.travelers.adults * selectedTour.price).toFixed(0)}</span>
                            </div>
                            {bookingData.travelers.children > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Copii ({bookingData.travelers.children}) x ${Math.round(selectedTour.price * 0.7)} (30% reducere)</span>
                                    <span className="font-semibold">${(bookingData.travelers.children * Math.round(selectedTour.price * 0.7)).toFixed(0)}</span>
                                </div>
                            )}
                            <div className="border-t pt-3 flex justify-between text-lg">
                                <span className="font-bold">Pret total:</span>
                                <span className="font-bold text-green-600">${calculateTotalPrice().toFixed(0)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4 pt-6">
                        <button
                            onClick={onBack}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 text-gray-700 transition-colors"
                        >
                            &#8592; Inapoi
                        </button>
                        <button
                            onClick={onNext}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Continua catre Preferinte &#8594;
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                    <p className="text-yellow-800 font-semibold">Selecteaza un tur mai intai pentru a vedea detaliile</p>
                </div>
            )}
        </div>
    );
}
