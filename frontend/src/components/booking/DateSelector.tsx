import { useState, useEffect } from 'react';
import { MOCK_TOURS } from '../../data/tours.data';
import type { Destination } from '../../types';
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
                    <p>{tour.startDate.toLocaleDateString('ro-RO')}</p>
                </div>
                <div>
                    <span className="text-gray-600">End:</span>
                    <p>{tour.endDate.toLocaleDateString('ro-RO')}</p>
                </div>
                <div>
                    <span className="text-gray-600">Durata:</span>
                    <p>{tour.days} zile</p>
                </div>
                <div>
                    <span className="text-gray-600">Locuri disponibile:</span>
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
                    <span className="text-gray-600 text-sm">Pret total:</span>
                    <p className="text-lg font-bold text-green-600">${totalPrice.toFixed(0)}</p>
                </div>
                <button
                    onClick={onSelect}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Selecteaza tur
                </button>
            </div>
        </div>
    );
}

function generateItineraryForTour(tour: typeof MOCK_TOURS[0], days: number): DayItinerary[] {
    const itinerary: DayItinerary[] = [];
    for (let i = 1; i <= days; i++) {
        itinerary.push({
            day: i,
            title: i === 1 ? 'Ziua de sosire' : i === days ? 'Ziua de plecare' : `Ziua ${i} - ${tour.name}`,
            description:
                i === 1
                    ? `Sosire in ${tour.location}. Transfer de la aeroport la hotel, cazare si timp liber.`
                    : i === days
                        ? `Check-out din hotel, ultimele cumparaturi, transfer catre aeroport.`
                        : `Explorare ${tour.location}. ${tour.description.slice(0, 100)}`,
            meals: ['Micul dejun'],
            accommodation: i < days ? `Hotel 4* in ${tour.location}` : 'N/A',
            activities:
                i > 1 && i < days
                    ? ['Tur ghidat', `Vizita obiective in ${tour.location}`, 'Timp liber']
                    : i === 1 ? ['Transfer aeroport', 'Check-in hotel'] : ['Check-out', 'Transfer aeroport']
        });
    }
    return itinerary;
}

function generateHighlights(tour: typeof MOCK_TOURS[0]): string[] {
    const locationHighlights: Record<string, string[]> = {
        'Indonesia': ['Temple hinduse antice', 'Terase de orez Tegalalang', 'Plaje tropicale', 'Paduri de maimute'],
        'Japan': ['Temple budiste', 'Gradini japoneze traditionale', 'Gastronomie locala', 'Cultura samurai'],
        'Thailand': ['Temple aurite', 'Plaje de vis', 'Street food', 'Piete plutitoare'],
        'China': ['Marele Zid', 'Orasul Interzis', 'Armata de Teracota', 'Gradini clasice'],
        'Philippines': ['Plaje virgine', 'Lagune turcoaz', 'Recifuri de corali', 'Jungle tropicale'],
        'South Korea': ['Palate regale', 'Cultura K-Pop', 'Gastronomie coreeana', 'Temple budiste'],
    };
    return locationHighlights[tour.location] || ['Obiective turistice locale', 'Experienta culturala autentica', 'Gastronomie locala'];
}

function generateIncludes(tour: typeof MOCK_TOURS[0]): string[] {
    return [
        'Zbor dus-intors',
        `Cazare hotel 4* in ${tour.location}`,
        'Micul dejun inclus',
        'Transfer aeroport-hotel',
        'Ghid turistic',
        'Asigurare medicala de calatorie'
    ];
}

function generateExcludes(): string[] {
    return [
        'Taxe de intrare la muzee/obiective',
        'Pranz si cina',
        'Cheltuieli personale',
        'Bacsisuri'
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
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [tours, setTours] = useState<AvailableTour[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Get real tours for this destination
    const realTours = selectedDestination
        ? MOCK_TOURS.filter(t => t.destination_id === selectedDestination.id && t.status === 'active')
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
            const generated: AvailableTour[] = realTours.map(tour => {
                const days = parseInt(tour.days, 10);
                const priceNum = parseFloat(tour.price.replace(/[$,]/g, ''));
                const endDate = new Date(selectedDate.getTime() + days * 24 * 60 * 60 * 1000);

                return {
                    id: `${tour.id}-${selectedDate.getTime()}`,
                    tourId: tour.id,
                    tourName: tour.name,
                    destinationName: `${tour.location} - ${selectedDestination?.name || ''}`,
                    startDate: selectedDate,
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

    const isDateAvailable = (date: Date): boolean => {
        return availableDates.some(d => d.toDateString() === date.toDateString());
    };

    const getDaysInMonth = (date: Date): number => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date): number => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days: (Date | null)[] = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            days.push(date);
        }
        return days;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                &#8592; Inapoi
            </button>

            <h2 className="text-2xl font-bold mb-2">Selecteaza data de plecare</h2>
            <p className="text-gray-600 mb-6">
                {selectedDestination
                    ? `Tururi disponibile catre ${selectedDestination.name}`
                    : 'Alege o data de start'}
            </p>

            <div className="mb-8 p-6 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handlePrevMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                        &#8592;
                    </button>
                    <h3 className="text-lg font-semibold">
                        {currentMonth.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={handleNextMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                        &#8594;
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                        <div key={i} className="text-center font-semibold text-gray-600">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {renderCalendar().map((date, i) => (
                        <button
                            key={i}
                            onClick={() => date && setSelectedDate(date)}
                            disabled={!date || !isDateAvailable(date)}
                            className={`p-2 rounded text-sm ${
                                !date
                                    ? 'invisible'
                                    : isDateAvailable(date)
                                        ? 'bg-blue-100 hover:bg-blue-200 cursor-pointer'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            } ${selectedDate?.toDateString() === date?.toDateString() ? 'bg-blue-600 text-white' : ''}`}
                        >
                            {date?.getDate()}
                        </button>
                    ))}
                </div>
            </div>

            {selectedDate && tours.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Tururi disponibile pentru {selectedDate.toLocaleDateString('ro-RO')}</h3>
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
