import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs, { type Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { MOCK_DESTINATIONS } from '../data/destinations.data';
import { tourService } from '../services/tour.service';
import { TourStatus } from '../types';
import type { Destination, Tour } from '../types';
import type { BookingData, AvailableTour, DayItinerary } from '../types/booking';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidemenu from '../components/layout/Sidemenu';
import GuestCountInput from '../components/booking/GuestCountInput';
import TourReview from '../components/booking/TourReview';
import PreferencesForm from '../components/booking/PreferencesForm';
import RequiredDocuments from '../components/booking/RequiredDocuments';
import PaymentMock from '../components/booking/PaymentMock';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import PersonalInfoForm from '../components/booking/PersonalInfoForm';

// ──────────────────────────────────────────────
// Helper functions
// ──────────────────────────────────────────────

function generateItineraryForTour(tour: Tour, days: number): DayItinerary[] {
    const itinerary: DayItinerary[] = [];
    for (let i = 1; i <= days; i++) {
        itinerary.push({
            day: i,
            title: i === 1 ? 'Ziua sosirii' : i === days ? 'Ziua plecării' : `Ziua ${i} - ${tour.name}`,
            description: i === 1
                ? `Sosire în ${tour.location}. Transfer aeroport-hotel, cazare și timp liber.`
                : i === days
                    ? 'Micul dejun la hotel, cumpărături de ultim moment, transfer aeroport.'
                    : `Explorarea obiectivelor din ${tour.location}. ${tour.description.slice(0, 100)}`,
            meals: ['Mic dejun'],
            accommodation: i < days ? `Hotel 4* în ${tour.location}` : 'N/A',
            activities: i > 1 && i < days
                ? ['Tur ghidat', `Vizitarea obiectivelor din ${tour.location}`, 'Timp liber']
                : i === 1 ? ['Transfer aeroport', 'Check-in hotel'] : ['Check-out', 'Transfer aeroport']
        });
    }
    return itinerary;
}

function generateHighlights(tour: Tour): string[] {
    const map: Record<string, string[]> = {
        'Indonesia': ['Temple hinduse antice', 'Terase de orez', 'Plaje tropicale', 'Păduri de maimuțe'],
        'Japan': ['Temple budiste', 'Grădini japoneze', 'Bucătărie autentică', 'Cultura samurai'],
        'Thailand': ['Temple aurite', 'Plaje de vis', 'Street food', 'Piețe plutitoare'],
        'China': ['Marele Zid', 'Orașul Interzis', 'Armata de teracotă', 'Grădini clasice'],
        'Philippines': ['Plaje nealterate', 'Lagune turcoaz', 'Recife de corali', 'Jungle tropicale'],
        'South Korea': ['Palate regale', 'Cultura K-Pop', 'Bucătărie coreeană', 'Temple budiste'],
    };
    return map[tour.location] || ['Atracții turistice locale', 'Experiență culturală autentică'];
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
    return ['Taxe de intrare', 'Prânz și cină', 'Cheltuieli personale', 'Bacșiș'];
}

function buildAvailableTour(tour: Tour, date: Date): AvailableTour {
    const days = parseInt(tour.days, 10);
    const priceNum = parseFloat(tour.price.replace(/[$,]/g, ''));
    const endDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    return {
        id: `${tour.id}-${date.getTime()}`,
        tourId: tour.id,
        tourName: tour.name,
        destinationName: tour.location,
        startDate: date,
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
}

// ──────────────────────────────────────────────
// Search Results item component
// ──────────────────────────────────────────────

interface SearchResultItemProps {
    tour: AvailableTour;
    travelers: { adults: number; children: number };
    onSelect: () => void;
}

function SearchResultItem({ tour, travelers, onSelect }: SearchResultItemProps) {
    const totalPrice = tour.price * (travelers.adults + travelers.children * 0.7);
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-lg">{tour.tourName}</h4>
                <p className="text-sm text-gray-500 mb-2">{tour.destinationName}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span>📅 {tour.startDate.toLocaleDateString('ro-RO')} → {tour.endDate.toLocaleDateString('ro-RO')}</span>
                    <span>🕐 {tour.days} zile</span>
                    <span className="text-green-600 font-medium">✓ {tour.availableSpots} locuri</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {tour.highlights.slice(0, 3).map((h, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{h}</span>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-end gap-2 min-w-[140px]">
                <div className="text-right">
                    <p className="text-xs text-gray-500">Preț total</p>
                    <p className="text-2xl font-bold text-green-600">${totalPrice.toFixed(0)}</p>
                    <p className="text-xs text-gray-400">${tour.price}/pers. adult</p>
                </div>
                <button
                    onClick={onSelect}
                    className="w-full bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 font-semibold text-sm transition-colors"
                >
                    Selectează →
                </button>
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────
// Price Summary sidebar
// ──────────────────────────────────────────────

interface PriceSummaryProps {
    bookingData: BookingData;
    selectedTour: AvailableTour | null;
}

function PriceSummary({ bookingData, selectedTour }: PriceSummaryProps) {
    if (!selectedTour) return null;

    const baseAdults = selectedTour.price * bookingData.travelers.adults;
    const baseChildren = selectedTour.price * 0.7 * bookingData.travelers.children;
    const baseTotal = baseAdults + baseChildren;
    const prefs = bookingData.preferences;
    let accommodationExtra = 0;
    let mealExtra = 0;
    let insuranceExtra = 0;

    if (prefs) {
        if (prefs.accommodation === 'luxury') accommodationExtra = baseTotal * 0.3;
        if (prefs.accommodation === 'budget') accommodationExtra = -baseTotal * 0.1;
        const totalPersons = bookingData.travelers.adults + bookingData.travelers.children;
        if (prefs.mealPlan === 'half-board') mealExtra = 20 * selectedTour.days * totalPersons;
        if (prefs.mealPlan === 'full-board') mealExtra = 40 * selectedTour.days * totalPersons;
        if (prefs.mealPlan === 'all-inclusive') mealExtra = 60 * selectedTour.days * totalPersons;
        if (prefs.insuranceRequired) insuranceExtra = 29 * totalPersons;
    }

    const total = baseTotal + accommodationExtra + mealExtra + insuranceExtra;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4 text-base">💰 Sumar preț</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">{bookingData.travelers.adults}× adult × ${selectedTour.price}</span>
                    <span className="font-medium">${baseAdults.toFixed(0)}</span>
                </div>
                {bookingData.travelers.children > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">{bookingData.travelers.children}× copil × ${(selectedTour.price * 0.7).toFixed(0)}</span>
                        <span className="font-medium">${baseChildren.toFixed(0)}</span>
                    </div>
                )}
                {accommodationExtra !== 0 && (
                    <div className={`flex justify-between ${accommodationExtra > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                        <span>Cazare ({prefs?.accommodation})</span>
                        <span>{accommodationExtra > 0 ? '+' : ''}${accommodationExtra.toFixed(0)}</span>
                    </div>
                )}
                {mealExtra > 0 && (
                    <div className="flex justify-between text-orange-600">
                        <span>Plan masă</span>
                        <span>+${mealExtra.toFixed(0)}</span>
                    </div>
                )}
                {insuranceExtra > 0 && (
                    <div className="flex justify-between text-blue-600">
                        <span>Asigurare călătorie</span>
                        <span>+${insuranceExtra.toFixed(0)}</span>
                    </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span className="text-green-600">${total.toFixed(0)}</span>
                </div>
            </div>
            <div className="mt-3 text-xs text-gray-400">{selectedTour.tourName} · {selectedTour.days} zile</div>
        </div>
    );
}

// ──────────────────────────────────────────────
// Main Booking page
// ──────────────────────────────────────────────

const STEPS_PRESELECTED = [
    { number: 1, title: 'Detalii tur' },
    { number: 2, title: 'Pasageri' },
    { number: 3, title: 'Preferințe' },
    { number: 4, title: 'Documente' },
    { number: 5, title: 'Plată' },
    { number: 6, title: 'Confirmare' },
];

const STEPS_SEARCH = [
    { number: 1, title: 'Rezultate' },
    { number: 2, title: 'Detalii tur' },
    { number: 3, title: 'Pasageri' },
    { number: 4, title: 'Preferințe' },
    { number: 5, title: 'Documente' },
    { number: 6, title: 'Plată' },
    { number: 7, title: 'Confirmare' },
];

export default function Booking() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isAdmin = user?.role === 'admin';

    // Search panel state
    const [searchDestId, setSearchDestId] = useState('');
    const [searchDate, setSearchDate] = useState<Dayjs | null>(dayjs().add(14, 'day'));
    const [searchAdults, setSearchAdults] = useState(1);
    const [searchChildren, setSearchChildren] = useState(0);

    // Booking state
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({
        duration: 7,
        travelers: { adults: 1, children: 0 }
    });
    const [selectedTour, setSelectedTour] = useState<AvailableTour | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

    // Search
    const [searchResults, setSearchResults] = useState<AvailableTour[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [allTours, setAllTours] = useState<Tour[]>([]);

    const hasPreselectedTour = !!searchParams.get('tour_id');
    const steps = hasPreselectedTour ? STEPS_PRESELECTED : STEPS_SEARCH;

    useEffect(() => {
        if (!user) navigate(`${ROUTES.LOGIN}?redirect=booking`);
    }, [user, navigate]);

    useEffect(() => {
        tourService.getAll().then(setAllTours);
    }, []);

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    // Handle pre-selected tour from URL
    useEffect(() => {
        const tourId = searchParams.get('tour_id');
        const startingDate = searchParams.get('starting_date');
        const destId = searchParams.get('destination_id');

        if (tourId && allTours.length > 0) {
            const rawTour = allTours.find(t => t.id === tourId);
            if (rawTour) {
                const date = startingDate ? new Date(startingDate) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
                const built = buildAvailableTour(rawTour, date);
                setSelectedTour(built);
                const destIdNum = destId ? parseInt(destId, 10) : rawTour.destination_id;
                const dest = MOCK_DESTINATIONS.find(d => d.id === destIdNum) || null;
                setSelectedDestination(dest);
                setBookingData(prev => ({
                    ...prev,
                    destinationId: destIdNum,
                    destinationName: dest?.name || rawTour.location,
                    startDate: built.startDate,
                    endDate: built.endDate,
                    duration: built.days,
                    totalPrice: built.price * (prev.travelers.adults + prev.travelers.children * 0.7)
                }));
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTours]);

    const handleSearch = useCallback(() => {
        const destIdNum = parseInt(searchDestId, 10);
        const dest = MOCK_DESTINATIONS.find(d => d.id === destIdNum) || null;
        setSelectedDestination(dest);
        const travelers = { adults: searchAdults, children: searchChildren };
        setBookingData(prev => ({ ...prev, travelers, destinationId: destIdNum || undefined, destinationName: dest?.name }));
        const date = searchDate ? searchDate.toDate() : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        const toursPool = searchDestId
            ? allTours.filter(t => t.destination_id === destIdNum && t.status === TourStatus.Active)
            : allTours.filter(t => t.status === TourStatus.Active);
        const totalNeeded = searchAdults + searchChildren;
        const results = toursPool.map(t => buildAvailableTour(t, date)).filter(r => r.availableSpots >= totalNeeded);
        setSearchResults(results);
        setHasSearched(true);
        if (!hasPreselectedTour) setCurrentStep(1);
    }, [searchDestId, searchDate, searchAdults, searchChildren, allTours, hasPreselectedTour]);

    if (!user) return null;

    const handleSelectTour = (tour: AvailableTour) => {
        setSelectedTour(tour);
        setBookingData(prev => ({
            ...prev,
            startDate: tour.startDate,
            endDate: tour.endDate,
            duration: tour.days,
            totalPrice: tour.price * (prev.travelers.adults + prev.travelers.children * 0.7)
        }));
        setCurrentStep(hasPreselectedTour ? 1 : 2);
    };

    const goNext = () => setCurrentStep(s => s + 1);
    const goBack = () => setCurrentStep(s => Math.max(1, s - 1));

    // Map currentStep to component to render
    const getStepContent = () => {
        if (hasPreselectedTour) {
            // Steps: 1=TourReview, 2=Passengers, 3=Preferences, 4=Documents, 5=Payment, 6=Confirmation
            switch (currentStep) {
                case 1: return <TourReview bookingData={bookingData} selectedTour={selectedTour} selectedDestination={selectedDestination} onNext={goNext} onBack={() => navigate(-1)} />;
                case 2: return <PersonalInfoForm bookingData={bookingData} setBookingData={setBookingData} onNext={goNext} onBack={goBack} />;
                case 3: return <PreferencesForm bookingData={bookingData} setBookingData={setBookingData} selectedTour={selectedTour} onNext={goNext} onBack={goBack} />;
                case 4: return <RequiredDocuments selectedDestination={selectedDestination} onNext={goNext} onBack={goBack} />;
                case 5: return <PaymentMock bookingData={bookingData} setBookingData={setBookingData} selectedTour={selectedTour} onNext={goNext} onBack={goBack} />;
                case 6: return <BookingConfirmation bookingData={bookingData} selectedTour={selectedTour} user={user} />;
                default: return null;
            }
        } else {
            // Steps: 1=SearchResults, 2=TourReview, 3=Passengers, 4=Preferences, 5=Documents, 6=Payment, 7=Confirmation
            switch (currentStep) {
                case 1:
                    return (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {hasSearched ? `${searchResults.length} pachete găsite` : 'Caută un pachet turistic'}
                            </h2>
                            {!hasSearched && (
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center text-blue-700">
                                    <Search size={40} className="mx-auto mb-3 opacity-50" />
                                    <p className="font-semibold text-lg">Caută pachete turistice</p>
                                    <p className="text-sm mt-1 opacity-75">Folosește filtrul de mai sus pentru a găsi tururi disponibile</p>
                                </div>
                            )}
                            {hasSearched && searchResults.length === 0 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center text-yellow-700">
                                    <p className="font-medium">Nu s-au găsit pachete pentru criteriile selectate.</p>
                                    <p className="text-sm mt-1">Încearcă altă destinație sau altă dată.</p>
                                </div>
                            )}
                            {searchResults.map(tour => (
                                <SearchResultItem key={tour.id} tour={tour} travelers={bookingData.travelers} onSelect={() => handleSelectTour(tour)} />
                            ))}
                        </div>
                    );
                case 2: return <TourReview bookingData={bookingData} selectedTour={selectedTour} selectedDestination={selectedDestination} onNext={goNext} onBack={goBack} />;
                case 3: return <PersonalInfoForm bookingData={bookingData} setBookingData={setBookingData} onNext={goNext} onBack={goBack} />;
                case 4: return <PreferencesForm bookingData={bookingData} setBookingData={setBookingData} selectedTour={selectedTour} onNext={goNext} onBack={goBack} />;
                case 5: return <RequiredDocuments selectedDestination={selectedDestination} onNext={goNext} onBack={goBack} />;
                case 6: return <PaymentMock bookingData={bookingData} setBookingData={setBookingData} selectedTour={selectedTour} onNext={goNext} onBack={goBack} />;
                case 7: return <BookingConfirmation bookingData={bookingData} selectedTour={selectedTour} user={user} />;
                default: return null;
            }
        }
    };

    const isConfirmation = currentStep === steps.length;

    return (
        <>
            <Header />
            <div className="flex pt-20 min-h-screen bg-gray-50">
                {isAdmin && <Sidemenu />}
                <main className="flex-1">
                    {/* Search Panel */}
                    {!isConfirmation && (
                        <div className="bg-white border-b border-gray-200 shadow-sm">
                            <div className="max-w-7xl mx-auto px-4 py-4">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end' }}>
                                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                                <InputLabel>Destinație</InputLabel>
                                                <Select
                                                    value={searchDestId}
                                                    label="Destinație"
                                                    onChange={(e: SelectChangeEvent) => setSearchDestId(e.target.value)}
                                                >
                                                    <MenuItem value="">Toate destinațiile</MenuItem>
                                                    {MOCK_DESTINATIONS.map(d => (
                                                        <MenuItem key={d.id} value={String(d.id)}>{d.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <DatePicker
                                                label="Data plecării"
                                                value={searchDate}
                                                onChange={setSearchDate}
                                                minDate={dayjs().add(7, 'day')}
                                                maxDate={dayjs().add(365, 'day')}
                                                slotProps={{ textField: { size: 'small' } }}
                                            />

                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 200 }}>
                                                <GuestCountInput label="Adulți" value={searchAdults} min={1} max={10} onChange={setSearchAdults} />
                                                <GuestCountInput label="Copii" subtitle="2-12 ani" value={searchChildren} min={0} max={8} onChange={setSearchChildren} />
                                            </Box>

                                            <button
                                                onClick={handleSearch}
                                                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 font-semibold transition-colors"
                                                style={{ height: '40px' }}
                                            >
                                                <Search size={16} />
                                                Caută pachete
                                            </button>
                                        </Box>
                                    </Paper>
                                </LocalizationProvider>
                            </div>
                        </div>
                    )}

                    <div className="max-w-7xl mx-auto px-4 py-6">
                        {/* Step indicator */}
                        {!isConfirmation && (
                            <div className="mb-6">
                                <div className="hidden sm:flex justify-between items-center gap-1 mb-2">
                                    {steps.map((step, index) => (
                                        <div key={step.number} className="flex items-center flex-1">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm ${
                                                currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                            }`}>
                                                {currentStep > step.number ? '✓' : step.number}
                                            </div>
                                            <span className="ml-1 text-xs font-medium whitespace-nowrap text-gray-600">{step.title}</span>
                                            {index < steps.length - 1 && (
                                                <div className={`flex-1 h-1 mx-2 rounded ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}`} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex sm:hidden items-center gap-2 mb-2">
                                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">{currentStep}</div>
                                    <span className="text-sm font-medium">{steps.find(s => s.number === currentStep)?.title}</span>
                                    <span className="text-xs text-gray-400">({currentStep}/{steps.length})</span>
                                </div>
                                <div className="sm:hidden w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${(currentStep / steps.length) * 100}%` }} />
                                </div>
                            </div>
                        )}

                        {/* Content + Price sidebar */}
                        <div className={`grid gap-6 ${selectedTour && !isConfirmation ? 'grid-cols-1 xl:grid-cols-[1fr_280px]' : 'grid-cols-1'}`}>
                            <div>{getStepContent()}</div>
                            {selectedTour && !isConfirmation && (
                                <aside className="hidden xl:block">
                                    <PriceSummary bookingData={bookingData} selectedTour={selectedTour} />
                                </aside>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}