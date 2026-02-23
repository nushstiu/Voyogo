import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { BookingData, AvailableTour } from '../types/booking';
import type { Destination } from '../types';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import DestinationSelector from '../components/booking/DestinationSelector';
import DurationSelector from '../components/booking/DurationSelector';
import DateSelector from '../components/booking/DateSelector';
import TourReview from '../components/booking/TourReview';
import PreferencesForm from '../components/booking/PreferencesForm';
import RequiredDocuments from '../components/booking/RequiredDocuments';
import PaymentMock from '../components/booking/PaymentMock';
import BookingConfirmation from '../components/booking/BookingConfirmation';

export default function Booking() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({
        duration: 7,
        travelers: {
            adults: 1,
            children: 0
        }
    });
    const [selectedTour, setSelectedTour] = useState<AvailableTour | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

    useEffect(() => {
        if (!user) {
            navigate(`${ROUTES.LOGIN}?redirect=booking`);
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    const steps = [
        { number: 1, title: t('booking.steps.destination') },
        { number: 2, title: t('booking.steps.duration') },
        { number: 3, title: t('booking.steps.dates') },
        { number: 4, title: t('booking.steps.tourDetails') },
        { number: 5, title: t('booking.steps.preferences') },
        { number: 6, title: t('booking.steps.documents') },
        { number: 7, title: t('booking.steps.payment') },
        { number: 8, title: t('booking.steps.confirmation') }
    ];

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <DestinationSelector
                        bookingData={bookingData}
                        setBookingData={setBookingData}
                        user={user}
                        selectedDestination={selectedDestination}
                        setSelectedDestination={setSelectedDestination}
                        onNext={() => setCurrentStep(2)}
                    />
                );
            case 2:
                return (
                    <DurationSelector
                        bookingData={bookingData}
                        setBookingData={setBookingData}
                        selectedDestination={selectedDestination}
                        onNext={() => setCurrentStep(3)}
                        onBack={() => setCurrentStep(1)}
                    />
                );
            case 3:
                return (
                    <DateSelector
                        bookingData={bookingData}
                        setBookingData={setBookingData}
                        selectedDestination={selectedDestination}
                        setSelectedTour={setSelectedTour}
                        onNext={() => setCurrentStep(4)}
                        onBack={() => setCurrentStep(2)}
                    />
                );
            case 4:
                return (
                    <TourReview
                        bookingData={bookingData}
                        selectedTour={selectedTour}
                        selectedDestination={selectedDestination}
                        onNext={() => setCurrentStep(5)}
                        onBack={() => setCurrentStep(3)}
                    />
                );
            case 5:
                return (
                    <PreferencesForm
                        bookingData={bookingData}
                        setBookingData={setBookingData}
                        onNext={() => setCurrentStep(6)}
                        onBack={() => setCurrentStep(4)}
                    />
                );
            case 6:
                return (
                    <RequiredDocuments
                        selectedDestination={selectedDestination}
                        onNext={() => setCurrentStep(7)}
                        onBack={() => setCurrentStep(5)}
                    />
                );
            case 7:
                return (
                    <PaymentMock
                        bookingData={bookingData}
                        setBookingData={setBookingData}
                        selectedTour={selectedTour}
                        onNext={() => setCurrentStep(8)}
                        onBack={() => setCurrentStep(6)}
                    />
                );
            case 8:
                return (
                    <BookingConfirmation
                        bookingData={bookingData}
                        selectedTour={selectedTour}
                        user={user}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* User info header */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        {t('booking.reservationFor')}: <span className="font-semibold text-gray-800">{user.username}</span>
                        {' | '}{user.email}
                        {user.phone && <> {' | '}{user.phone}</>}
                    </div>
                </div>

                {/* Step indicator */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex justify-between items-center gap-1 min-w-[600px]">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center flex-1">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm ${
                                        currentStep >= step.number
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                    }`}
                                >
                                    {currentStep > step.number ? '\u2713' : step.number}
                                </div>
                                <span className="ml-1 text-xs font-medium whitespace-nowrap">
                                    {step.title}
                                </span>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-1 mx-1 ${
                                            currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {renderStep()}
            </div>
        </div>
    );
}
