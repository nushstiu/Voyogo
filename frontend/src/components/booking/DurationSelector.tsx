import { useState, useEffect } from 'react';
import { tourService } from '../../services/tour.service';
import { TourStatus } from '../../types';
import type { Destination, Tour } from '../../types';
import type { BookingData } from '../../types/booking';

interface Props {
    bookingData: BookingData;
    setBookingData: (data: BookingData) => void;
    selectedDestination: Destination | null;
    onNext: () => void;
    onBack: () => void;
}

export default function DurationSelector({
    bookingData,
    setBookingData,
    selectedDestination,
    onNext,
    onBack
}: Props) {
    const [selectedDuration, setSelectedDuration] = useState<number>(bookingData.duration);
    const [allTours, setAllTours] = useState<Tour[]>([]);

    useEffect(() => {
        tourService.getAll().then(setAllTours);
    }, []);

    // Get tours available for the selected destination
    const destinationTours = selectedDestination
        ? allTours.filter(t => t.destination_id === selectedDestination.id && t.status === TourStatus.Active)
        : [];

    // Build duration options from real tour data
    const durationOptions = destinationTours.map(tour => {
        const priceNum = parseFloat(tour.price.replace(/[$,]/g, ''));
        const days = parseInt(tour.days, 10);
        return {
            days,
            title: `${days} days`,
            tourName: tour.name,
            description: tour.description.slice(0, 80) + '...',
            price: priceNum,
            tourId: tour.id,
        };
    });

    const handleSelectDuration = (days: number) => {
        setSelectedDuration(days);
        setBookingData({
            ...bookingData,
            duration: days
        });
    };

    const handleContinue = () => {
        setBookingData({
            ...bookingData,
            duration: selectedDuration
        });
        onNext();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                &#8592; Back
            </button>

            <h2 className="text-2xl font-bold mb-2">
                Available Tours in {selectedDestination?.name || 'Selected Destination'}
            </h2>
            <p className="text-gray-600 mb-8">Choose the duration that best fits your needs</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {durationOptions.map(option => (
                    <button
                        key={option.tourId}
                        onClick={() => handleSelectDuration(option.days)}
                        className={`p-6 border-2 rounded-lg transition-all text-left ${
                            selectedDuration === option.days
                                ? 'border-blue-600 bg-blue-50 shadow-lg'
                                : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                        }`}
                    >
                        <div className="mb-3">
                            <h3 className="text-xl font-semibold text-gray-800">{option.tourName}</h3>
                            <span className="text-sm text-blue-600 font-medium">{option.title}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{option.description}</p>

                        <div className="border-t pt-3 mt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">Price per person:</span>
                                <span className="text-lg font-bold text-green-600">${option.price.toLocaleString()}</span>
                            </div>
                        </div>

                        {selectedDuration === option.days && (
                            <div className="mt-3 text-blue-600 font-semibold text-sm">
                                &#10003; Selected
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Selection summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Selection Summary</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Destination:</span>
                        <span className="font-semibold">{selectedDestination?.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{selectedDuration} days</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Adults:</span>
                        <span className="font-semibold">{bookingData.travelers.adults}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Children:</span>
                        <span className="font-semibold">{bookingData.travelers.children}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 text-gray-700"
                >
                    &#8592; Back
                </button>
                <button
                    onClick={handleContinue}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Continue &#8594;
                </button>
            </div>
        </div>
    );
}
