import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Calendar } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import type { User } from '../../types';
import type { BookingData, AvailableTour } from '../../types/booking';

interface Props {
    bookingData: BookingData;
    selectedTour: AvailableTour | null;
    user: User | null;
}

export default function BookingConfirmation({ bookingData, selectedTour, user }: Props) {
    const navigate = useNavigate();
    const handleDownloadVoucher = () => {
        alert('Downloading voucher...');
    };

    const handleAddToCalendar = () => {
        alert('Event added to calendar!');
    };

    if (!selectedTour) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8">
                <p className="text-yellow-800">No tour selected.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600">Payment was processed successfully</p>
            </div>

            {/* Booking details */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-4 text-center">Booking Details</h3>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Booking code:</span>
                        <span className="font-mono font-bold text-blue-600">{bookingData.bookingReference}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tour:</span>
                        <span className="font-semibold">{selectedTour.tourName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Destination:</span>
                        <span className="font-semibold">{selectedTour.destinationName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Period:</span>
                        <span>{selectedTour.startDate.toLocaleDateString('en-US')} - {selectedTour.endDate.toLocaleDateString('en-US')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span>{selectedTour.days} days</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Travelers:</span>
                        <span>{bookingData.travelers.adults} adults, {bookingData.travelers.children} children</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Total paid:</span>
                        <span className="font-bold text-lg">${(bookingData.totalPrice || 0).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* User details */}
            {user && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-semibold mb-4 text-center">Traveler Information</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-semibold">{user.username}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-semibold">{user.email}</span>
                        </div>
                        {user.phone && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-semibold">{user.phone}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Preferences summary */}
            {bookingData.preferences && (
                <div className="bg-purple-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-semibold mb-4 text-center">Selected Preferences</h3>
                    <div className="space-y-2 text-sm">
                        {bookingData.preferences.accommodation && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Accommodation:</span>
                                <span className="font-semibold">{bookingData.preferences.accommodation}</span>
                            </div>
                        )}
                        {bookingData.preferences.mealPlan && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Meal plan:</span>
                                <span className="font-semibold">{bookingData.preferences.mealPlan}</span>
                            </div>
                        )}
                        {bookingData.preferences.roomType && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Room type:</span>
                                <span className="font-semibold">{bookingData.preferences.roomType}</span>
                            </div>
                        )}
                        {bookingData.preferences.dietaryRestrictions && bookingData.preferences.dietaryRestrictions.length > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Dietary restrictions:</span>
                                <span className="font-semibold">{bookingData.preferences.dietaryRestrictions.join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <button
                    onClick={handleDownloadVoucher}
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                    <Download size={20} />
                    Download voucher
                </button>

                <button
                    onClick={handleAddToCalendar}
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                    <Calendar size={20} />
                    Add to calendar
                </button>

                <button
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                    <Mail size={20} />
                    Send by email
                </button>
            </div>

            {/* Next steps */}
            <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-4">Next Steps</h3>
                <ol className="space-y-3 text-sm">
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600">1.</span>
                        <span>You will receive a confirmation email with all booking details within 5 minutes</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600">2.</span>
                        <span>We will contact you by phone within 24 hours for final confirmation</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600">3.</span>
                        <span>You will receive the final voucher and detailed instructions 7 days before departure</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600">4.</span>
                        <span>We will send a reminder and transfer details 48 hours before departure</span>
                    </li>
                </ol>
            </div>

            {/* Emergency contact */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm">
                <p className="font-semibold text-red-800 mb-2">Emergency Contact (24/7)</p>
                <p className="text-gray-700">
                    Phone: +40 21 XXX XXXX | Email: emergency@voyago.com
                </p>
            </div>

            <button
                onClick={() => navigate(ROUTES.HOME)}
                className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
                Back to Home Page
            </button>
        </div>
    );
}
