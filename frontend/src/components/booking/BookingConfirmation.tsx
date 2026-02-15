import { CheckCircle, Download, Mail, Calendar } from 'lucide-react';
import type { User } from '../../types';
import type { BookingData, AvailableTour } from '../../types/booking';

interface Props {
    bookingData: BookingData;
    selectedTour: AvailableTour | null;
    user: User | null;
}

export default function BookingConfirmation({ bookingData, selectedTour, user }: Props) {
    const handleDownloadVoucher = () => {
        alert('Se descarca voucherul...');
    };

    const handleAddToCalendar = () => {
        alert('Eveniment adaugat in calendar!');
    };

    if (!selectedTour) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8">
                <p className="text-yellow-800">Nu a fost selectat niciun tur.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-green-600 mb-2">Rezervare confirmata!</h2>
                <p className="text-gray-600">Plata a fost procesata cu succes</p>
            </div>

            {/* Booking details */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-4 text-center">Detalii rezervare</h3>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Cod rezervare:</span>
                        <span className="font-mono font-bold text-blue-600">{bookingData.bookingReference}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tur:</span>
                        <span className="font-semibold">{selectedTour.tourName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Destinatie:</span>
                        <span className="font-semibold">{selectedTour.destinationName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Perioada:</span>
                        <span>{selectedTour.startDate.toLocaleDateString('ro-RO')} - {selectedTour.endDate.toLocaleDateString('ro-RO')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Durata:</span>
                        <span>{selectedTour.days} zile</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Calatori:</span>
                        <span>{bookingData.travelers.adults} adulti, {bookingData.travelers.children} copii</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Total platit:</span>
                        <span className="font-bold text-lg">${(bookingData.totalPrice || 0).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* User details */}
            {user && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-semibold mb-4 text-center">Datele calatorului</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Nume:</span>
                            <span className="font-semibold">{user.username}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-semibold">{user.email}</span>
                        </div>
                        {user.phone && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Telefon:</span>
                                <span className="font-semibold">{user.phone}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Preferences summary */}
            {bookingData.preferences && (
                <div className="bg-purple-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-semibold mb-4 text-center">Preferintele selectate</h3>
                    <div className="space-y-2 text-sm">
                        {bookingData.preferences.accommodation && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Cazare:</span>
                                <span className="font-semibold">{bookingData.preferences.accommodation}</span>
                            </div>
                        )}
                        {bookingData.preferences.mealPlan && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Plan masa:</span>
                                <span className="font-semibold">{bookingData.preferences.mealPlan}</span>
                            </div>
                        )}
                        {bookingData.preferences.roomType && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tip camera:</span>
                                <span className="font-semibold">{bookingData.preferences.roomType}</span>
                            </div>
                        )}
                        {bookingData.preferences.dietaryRestrictions && bookingData.preferences.dietaryRestrictions.length > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Restrictii dietetice:</span>
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
                    Descarca voucher
                </button>

                <button
                    onClick={handleAddToCalendar}
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                    <Calendar size={20} />
                    Adauga in calendar
                </button>

                <button
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                    <Mail size={20} />
                    Trimite pe email
                </button>
            </div>

            {/* Next steps */}
            <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-4">Pasii urmatori</h3>
                <ol className="space-y-3 text-sm">
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600">1.</span>
                        <span>Veti primi un email de confirmare cu toate detaliile rezervarii in max 5 minute</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600">2.</span>
                        <span>Va vom contacta telefonic in urmatoarele 24h pentru confirmarea finala</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600">3.</span>
                        <span>Cu 7 zile inainte de plecare veti primi voucherul final si instructiuni detaliate</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold text-blue-600">4.</span>
                        <span>Cu 48h inainte va vom trimite reminder si detalii despre transfer</span>
                    </li>
                </ol>
            </div>

            {/* Emergency contact */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm">
                <p className="font-semibold text-red-800 mb-2">Contact pentru urgente (24/7)</p>
                <p className="text-gray-700">
                    Telefon: +40 21 XXX XXXX | Email: urgente@voyago.com
                </p>
            </div>

            <button
                onClick={() => window.location.href = '/'}
                className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
                Inapoi la pagina principala
            </button>
        </div>
    );
}
