import { useState, useEffect } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { tourService } from '../../services/tour.service';
import { TourStatus } from '../../types';
import type { Destination, Tour } from '../../types';
import type { BookingData, AvailableTour, DayItinerary } from '../../types/booking';

interface Props {
    bookingData: BookingData;
    setBookingData: (data: BookingData) => void;
    selectedDestination: Destination | null;
    setSelectedTour: (tour: AvailableTour) => void;
    onNext: () => void;
    onBack: () => void;
}

function TourCard({
    tour,
    travelers,
    onSelect
}: {
    tour: AvailableTour;
    travelers: { adults: number; children: number };
    onSelect: () => void;
}) {
    const totalPrice = tour.price * (travelers.adults + travelers.children * 0.7);

    return (
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-1">{tour.tourName}</h4>
            <p className="text-sm text-gray-500 mb-3">{tour.destinationName}</p>
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                    <span className="text-gray-600">Start:</span>
                    <p>{tour.startDate.toLocaleDateString('en-US')}</p>
                </div>
                <div>
                    <span className="text-gray-600">End:</span>
                    <p>{tour.endDate.toLocaleDateString('en-US')}</p>
                </div>
                <div>
                    <span className="text-gray-600">Duration:</span>
                    <p>{tour.days} days</p>
                </div>
                <div>
                    <span className="text-gray-600">Available spots:</span>
                    <p>{tour.availableSpots}</p>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{tour.description.slice(0, 120)}...</p>
            <div className="mb-4">
                <h5 className="font-semibold mb-2">Highlights:</h5>
                <ul className="text-sm space-y-1">
                    {tour.highlights.map((highlight, i) => (
                        <li key={i}>&#8226; {highlight}</li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between items-center border-t pt-3">
                <div>
                    <span className="text-gray-600 text-sm">Total price:</span>
                    <p className="text-lg font-bold text-green-600">${totalPrice.toFixed(0)}</p>
                </div>
                <button
                    onClick={onSelect}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Select tour
                </button>
            </div>
        </div>
    );
}

function generateItineraryForTour(tour: Tour, days: number): DayItinerary[] {
    const itinerary: DayItinerary[] = [];
    for (let i = 1; i <= days; i++) {
        itinerary.push({
            day: i,
            title: i === 1 ? 'Arrival Day' : i === days ? 'Departure Day' : `Day ${i} - ${tour.name}`,
            description:
                i === 1
                    ? `Arrival in ${tour.location}. Airport transfer to hotel, check-in and free time.`
                    : i === days
                        ? `Hotel check-out, last-minute shopping, airport transfer.`
                        : `Exploring ${tour.location}. ${tour.description.slice(0, 100)}`,
            meals: ['Breakfast'],
            accommodation: i < days ? `4* Hotel in ${tour.location}` : 'N/A',
            activities:
                i > 1 && i < days
                    ? ['Guided tour', `Visit landmarks in ${tour.location}`, 'Free time']
                    : i === 1 ? ['Airport transfer', 'Hotel check-in'] : ['Check-out', 'Airport transfer']
        });
    }
    return itinerary;
}

function generateHighlights(tour: Tour): string[] {
    const locationHighlights: Record<string, string[]> = {
        'Indonesia': ['Ancient Hindu temples', 'Tegalalang rice terraces', 'Tropical beaches', 'Monkey forests'],
        'Japan': ['Buddhist temples', 'Traditional Japanese gardens', 'Local cuisine', 'Samurai culture'],
        'Thailand': ['Golden temples', 'Dream beaches', 'Street food', 'Floating markets'],
        'China': ['The Great Wall', 'Forbidden City', 'Terracotta Army', 'Classical gardens'],
        'Philippines': ['Pristine beaches', 'Turquoise lagoons', 'Coral reefs', 'Tropical jungles'],
        'South Korea': ['Royal palaces', 'K-Pop culture', 'Korean cuisine', 'Buddhist temples'],
    };
    return locationHighlights[tour.location] || ['Local tourist attractions', 'Authentic cultural experience', 'Local cuisine'];
}

function generateIncludes(tour: Tour): string[] {
    return [
        'Round-trip flights',
        `4* Hotel accommodation in ${tour.location}`,
        'Breakfast included',
        'Airport-hotel transfer',
        'Tour guide',
        'Travel medical insurance'
    ];
}

function generateExcludes(): string[] {
    return [
        'Museum/attraction entry fees',
        'Lunch and dinner',
        'Personal expenses',
        'Tips'
    ];
}

export default function DateSelector({
    bookingData,
    setBookingData,
    selectedDestination,
    setSelectedTour,
    onNext,
    onBack
}: Props) {
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [tours, setTours] = useState<AvailableTour[]>([]);
    const [allTours, setAllTours] = useState<Tour[]>([]);

    useEffect(() => {
        tourService.getAll().then(setAllTours);
    }, []);

    const realTours = selectedDestination
        ? allTours.filter(t => t.destination_id === selectedDestination.id && t.status === TourStatus.Active)
        : [];

    useEffect(() => {
        const dates: Date[] = [];
        const today = new Date();
        for (let i = 7; i < 180; i += 7) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        setAvailableDates(dates);
    }, []);

    useEffect(() => {
        if (selectedDate && realTours.length > 0) {
            const jsDate = selectedDate.toDate();
            const generated: AvailableTour[] = realTours.map(tour => {
                const days = parseInt(tour.days, 10);
                const priceNum = parseFloat(tour.price.replace(/[$,]/g, ''));
                const endDate = new Date(jsDate.getTime() + days * 24 * 60 * 60 * 1000);

                return {
                    id: `${tour.id}-${jsDate.getTime()}`,
                    tourId: tour.id,
                    tourName: tour.name,
                    destinationName: `${tour.location} - ${selectedDestination?.name || ''}`,
                    startDate: jsDate,
                    endDate,
                    availableSpots: Math.floor(Math.random() * 15) + 3,
                    price: priceNum,
                    days,
                    description: tour.description,
                    includes: generateIncludes(tour),
                    excludes: generateExcludes(),
                    highlights: generateHighlights(tour),
                    itinerary: generateItineraryForTour(tour, days)
                };
            });
            setTours(generated);
        }
    }, [selectedDate, selectedDestination]);

    const shouldDisableDate = (date: Dayjs): boolean => {
        return !availableDates.some(d => d.toDateString() === date.toDate().toDateString());
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                &#8592; Back
            </button>

            <h2 className="text-2xl font-bold mb-2">Select Departure Date</h2>
            <p className="text-gray-600 mb-6">
                {selectedDestination
                    ? `Available tours to ${selectedDestination.name}`
                    : 'Choose a start date'}
            </p>

            <div className="mb-8 flex justify-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        shouldDisableDate={shouldDisableDate}
                        minDate={dayjs().add(7, 'day')}
                        maxDate={dayjs().add(180, 'day')}
                        slotProps={{
                            actionBar: { actions: [] },
                        }}
                    />
                </LocalizationProvider>
            </div>

            {selectedDate && tours.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                        Tours available for {selectedDate.format('MMMM D, YYYY')}
                    </h3>
                    {tours.map(tour => (
                        <TourCard
                            key={tour.id}
                            tour={tour}
                            travelers={bookingData.travelers}
                            onSelect={() => {
                                setSelectedTour(tour);
                                setBookingData({
                                    ...bookingData,
                                    startDate: tour.startDate,
                                    endDate: tour.endDate,
                                    duration: tour.days,
                                    totalPrice: tour.price * (bookingData.travelers.adults + bookingData.travelers.children * 0.7)
                                });
                                onNext();
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
