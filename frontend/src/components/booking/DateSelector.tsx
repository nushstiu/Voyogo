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

interface TourCardProps {
    tour: AvailableTour;
    travelers: { adults: number; children: number };
    onSelect: () => void;
}

function TourCard({ tour, travelers, onSelect }: TourCardProps) {
    const totalPrice = tour.price * (travelers.adults + travelers.children * 0.7);

    return (
        <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">{tour.tourName}</h4>
                    <p className="text-sm text-gray-500">{tour.destinationName}</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    {tour.availableSpots} locuri
                </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-gray-500 text-xs">Plecare</span>
                    <p className="font-medium">{tour.startDate.toLocaleDateString('ro-RO')}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-gray-500 text-xs">Întoarcere</span>
                    <p className="font-medium">{tour.endDate.toLocaleDateString('ro-RO')}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-gray-500 text-xs">Durată</span>
                    <p className="font-medium">{tour.days} zile</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-gray-500 text-xs">Preț/adult</span>
                    <p className="font-medium text-green-600">${tour.price}</p>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{tour.description.slice(0, 120)}...</p>
            <div className="flex justify-between items-center border-t pt-4">
                <div>
                    <span className="text-gray-500 text-xs">Total ({travelers.adults}A + {travelers.children}C)</span>
                    <p className="text-xl font-bold text-green-600">${totalPrice.toFixed(0)}</p>
                </div>
                <button
                    onClick={onSelect}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 font-medium transition-colors"
                >
                    Selectează →
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
            title: i === 1 ? 'Ziua sosirii' : i === days ? 'Ziua plecării' : `Ziua ${i} - ${tour.name}`,
            description:
                i === 1
                    ? `Sosire în ${tour.location}. Transfer aeroport-hotel, cazare și timp liber.`
                    : i === days
                        ? `Micul dejun la hotel, cumpărături de ultim moment, transfer aeroport.`
                        : `Explorarea obiectivelor din ${tour.location}. ${tour.description.slice(0, 100)}`,
            meals: ['Mic dejun'],
            accommodation: i < days ? `Hotel 4* în ${tour.location}` : 'N/A',
            activities:
                i > 1 && i < days
                    ? ['Tur ghidat', `Vizitarea obiectivelor din ${tour.location}`, 'Timp liber']
                    : i === 1 ? ['Transfer aeroport', 'Check-in hotel'] : ['Check-out', 'Transfer aeroport']
        });
    }
    return itinerary;
}

function generateHighlights(tour: Tour): string[] {
    const locationHighlights: Record<string, string[]> = {
        'Indonesia': ['Temple hinduse antice', 'Terase de orez Tegalalang', 'Plaje tropicale', 'Păduri de maimuțe'],
        'Japan': ['Temple budiste', 'Grădini tradiționale japoneze', 'Bucătărie locală autentică', 'Cultura samurai'],
        'Thailand': ['Temple aurite', 'Plaje de vis', 'Street food autentic', 'Piețe plutitoare'],
        'China': ['Marele Zid Chinezesc', 'Orașul Interzis', 'Armata de teracotă', 'Grădini clasice'],
        'Philippines': ['Plaje nealterate', 'Lagune turcoaz', 'Recife de corali', 'Jungle tropicale'],
        'South Korea': ['Palate regale', 'Cultura K-Pop', 'Bucătărie coreeană', 'Temple budiste'],
    };
    return locationHighlights[tour.location] || ['Atracții turistice locale', 'Experiență culturală autentică', 'Bucătărie locală'];
}

function generateIncludes(tour: Tour): string[] {
    return [
        'Zbor dus-întors (clasa economică)',
        `Cazare hotel 4* în ${tour.location}`,
        'Mic dejun inclus',
        'Transfer aeroport-hotel-aeroport',
        'Ghid turistic local',
        'Asigurare medicală de călătorie'
    ];
}

function generateExcludes(): string[] {
    return [
        'Taxe de intrare muzee/atracții',
        'Prânz și cină',
        'Cheltuieli personale',
        'Bacșiș'
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
                    availableSpots: Math.floor(Math.random() * 30) + 20,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate, selectedDestination]);

    const shouldDisableDate = (date: Dayjs): boolean => {
        return !availableDates.some(d => d.toDateString() === date.toDate().toDateString());
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline flex items-center gap-1">
                ← Înapoi
            </button>

            <h2 className="text-2xl font-bold mb-2">Selectează data de plecare</h2>
            <p className="text-gray-600 mb-6">
                {selectedDestination
                    ? `Tururi disponibile spre ${selectedDestination.name}`
                    : 'Alege data de start'}
            </p>

            <div className="mb-8 flex justify-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        shouldDisableDate={shouldDisableDate}
                        minDate={dayjs().add(7, 'day')}
                        maxDate={dayjs().add(180, 'day')}
                        slotProps={{ actionBar: { actions: [] } }}
                    />
                </LocalizationProvider>
            </div>

            {selectedDate && tours.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p>Nu există tururi disponibile pentru această dată.</p>
                    <p className="text-sm mt-1">Încearcă o altă dată.</p>
                </div>
            )}

            {selectedDate && tours.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                        {tours.length} tururi disponibile pentru {selectedDate.format('D MMMM YYYY')}
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
