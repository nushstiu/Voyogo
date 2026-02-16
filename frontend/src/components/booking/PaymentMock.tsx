import { useState } from 'react';
import { CreditCard, Loader } from 'lucide-react';
import type { BookingData, AvailableTour } from '../../types/booking';

interface Props {
    bookingData: BookingData;
    setBookingData: (data: BookingData) => void;
    selectedTour: AvailableTour | null;
    onNext: () => void;
    onBack: () => void;
}

type PaymentMethod = 'card' | 'bank-transfer' | 'installments';

export default function PaymentMock({ bookingData, setBookingData, selectedTour, onNext, onBack }: Props) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState('');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const totalAmount = bookingData.totalPrice || 0;
    const deposit = totalAmount * 0.3;
    const remaining = totalAmount - deposit;
    const amountToPay = paymentMethod === 'installments' ? deposit : totalAmount;

    const handlePayment = async () => {
        setIsProcessing(true);

        // Step 1: Validate card
        setProcessingStep('Se verifica datele cardului...');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Step 2: Process payment
        setProcessingStep('Se proceseaza plata...');
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Step 3: Generate reference
        setProcessingStep('Se genereaza referinta...');
        await new Promise(resolve => setTimeout(resolve, 500));

        const bookingRef = `VYG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Fix: use setBookingData instead of direct mutation
        setBookingData({
            ...bookingData,
            bookingReference: bookingRef,
            paymentStatus: 'completed'
        });

        setIsProcessing(false);
        onNext();
    };

    if (!selectedTour) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8">
                <p className="text-yellow-800">Nu a fost selectat niciun tur.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                &#8592; Inapoi
            </button>

            <h2 className="text-2xl font-bold mb-6">Finalizare plata</h2>

            {/* Order summary */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Sumar Comanda</h3>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Tur:</span>
                        <span className="font-semibold">{selectedTour.tourName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Destinatie:</span>
                        <span className="font-semibold">{selectedTour.destinationName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Perioada:</span>
                        <span>{selectedTour.startDate.toLocaleDateString('ro-RO')} - {selectedTour.endDate.toLocaleDateString('ro-RO')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Adulti:</span>
                        <span>{bookingData.travelers.adults} x ${selectedTour.price}</span>
                    </div>
                    {bookingData.travelers.children > 0 && (
                        <div className="flex justify-between">
                            <span>Copii (reducere 30%):</span>
                            <span>{bookingData.travelers.children} x ${(selectedTour.price * 0.7).toFixed(0)}</span>
                        </div>
                    )}

                    {/* Preferences summary */}
                    {bookingData.preferences && (
                        <>
                            <div className="border-t pt-2 mt-2">
                                <span className="font-semibold text-gray-700">Preferinte:</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Cazare:</span>
                                <span>{bookingData.preferences.accommodation}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Plan masa:</span>
                                <span>{bookingData.preferences.mealPlan}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Camera:</span>
                                <span>{bookingData.preferences.roomType}</span>
                            </div>
                        </>
                    )}

                    <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment methods */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Metoda de plata</h3>

                <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                            className="mr-3"
                        />
                        <CreditCard className="mr-2" size={20} />
                        <span>Plata integrala cu cardul - ${totalAmount.toFixed(2)}</span>
                    </label>

                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="payment"
                            value="installments"
                            checked={paymentMethod === 'installments'}
                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                            className="mr-3"
                        />
                        <span>Plata in rate: Avans 30% (${deposit.toFixed(2)}) + Rest la sosire (${remaining.toFixed(2)})</span>
                    </label>

                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="radio"
                            name="payment"
                            value="bank-transfer"
                            checked={paymentMethod === 'bank-transfer'}
                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                            className="mr-3"
                        />
                        <span>Transfer bancar (procesare in 1-2 zile lucratoare)</span>
                    </label>
                </div>
            </div>

            {/* Card form */}
            {(paymentMethod === 'card' || paymentMethod === 'installments') && (
                <div className="mb-8 p-6 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Detalii card</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Numar card</label>
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                maxLength={19}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Nume titular</label>
                            <input
                                type="text"
                                placeholder="NUME PRENUME"
                                value={cardDetails.name}
                                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Data expirare</label>
                                <input
                                    type="text"
                                    placeholder="MM/AA"
                                    value={cardDetails.expiry}
                                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    maxLength={5}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">CVV</label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    value={cardDetails.cvv}
                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    maxLength={3}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {paymentMethod === 'bank-transfer' && (
                <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold mb-2">Instructiuni transfer bancar</h4>
                    <p className="text-sm mb-3">Va rugam sa efectuati transferul la urmatoarele coordonate:</p>
                    <div className="text-sm space-y-1 font-mono">
                        <div>IBAN: RO49AAAA1B31007593840000</div>
                        <div>Beneficiar: VOYAGO TRAVEL SRL</div>
                        <div>Banca: BCR</div>
                        <div>Suma: ${amountToPay.toFixed(2)}</div>
                        <div>Referinta: {bookingData.destinationName || 'Destinatie'}</div>
                    </div>
                </div>
            )}

            {/* Terms */}
            <div className="mb-6">
                <label className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span className="text-sm">
                        Accept <a href="/terms" className="text-blue-600 hover:underline">termenii si conditiile</a> si{' '}
                        <a href="/privacy" className="text-blue-600 hover:underline">politica de confidentialitate</a>
                    </span>
                </label>
            </div>

            {/* Pay button */}
            <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
                {isProcessing ? (
                    <>
                        <Loader className="animate-spin" size={20} />
                        {processingStep}
                    </>
                ) : (
                    <>Confirma si plateste ${amountToPay.toFixed(2)}</>
                )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
                Plata este securizata prin SSL. Datele dvs. sunt protejate.
            </p>
        </div>
    );
}
