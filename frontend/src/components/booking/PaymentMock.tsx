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

interface CardErrors {
    number?: string;
    name?: string;
    expiry?: string;
    cvv?: string;
    terms?: string;
}

function formatCardNumber(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
}

function validateCard(number: string, name: string, expiry: string, cvv: string, terms: boolean): CardErrors {
    const errors: CardErrors = {};
    const digits = number.replace(/\s/g, '');
    if (digits.length !== 16) errors.number = 'Numărul cardului trebuie să aibă 16 cifre';
    if (!name.trim() || name.trim().length < 3 || !/^[a-zA-Z\s]+$/.test(name.trim())) {
        errors.name = 'Introduceți numele titularului (minim 3 caractere, doar litere)';
    }
    const expiryMatch = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!expiryMatch) {
        errors.expiry = 'Format invalid. Exemplu: 12/28';
    } else {
        const month = parseInt(expiryMatch[1], 10);
        const year = parseInt(expiryMatch[2], 10) + 2000;
        const now = new Date();
        if (month < 1 || month > 12) {
            errors.expiry = 'Luna trebuie să fie între 01 și 12';
        } else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
            errors.expiry = 'Cardul a expirat';
        }
    }
    if (!/^\d{3,4}$/.test(cvv)) errors.cvv = 'CVV trebuie să aibă 3-4 cifre';
    if (!terms) errors.terms = 'Trebuie să accepți termenii și condițiile';
    return errors;
}

export default function PaymentMock({ bookingData, setBookingData, selectedTour, onNext, onBack }: Props) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState('');
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [cardErrors, setCardErrors] = useState<CardErrors>({});
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const totalAmount = bookingData.totalPrice || 0;
    const deposit = totalAmount * 0.3;
    const remaining = totalAmount - deposit;
    const amountToPay = paymentMethod === 'installments' ? deposit : totalAmount;

    const handlePayment = async () => {
        setSubmitAttempted(true);

        if (paymentMethod === 'card' || paymentMethod === 'installments') {
            const errors = validateCard(cardDetails.number, cardDetails.name, cardDetails.expiry, cardDetails.cvv, termsAccepted);
            setCardErrors(errors);
            if (Object.keys(errors).length > 0) return;
        } else {
            if (!termsAccepted) {
                setCardErrors({ terms: 'Trebuie să accepți termenii și condițiile' });
                return;
            }
            setCardErrors({});
        }

        setIsProcessing(true);
        setProcessingStep('Se verifică datele cardului...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProcessingStep('Se procesează plata...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProcessingStep('Se generează referința...');
        await new Promise(resolve => setTimeout(resolve, 500));

        const bookingRef = `VYG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setBookingData({ ...bookingData, bookingReference: bookingRef, paymentStatus: 'completed' });
        setIsProcessing(false);
        onNext();
    };

    const handleCardNumberChange = (val: string) => {
        const formatted = formatCardNumber(val);
        setCardDetails({ ...cardDetails, number: formatted });
        if (submitAttempted) {
            const errs = validateCard(formatted, cardDetails.name, cardDetails.expiry, cardDetails.cvv, termsAccepted);
            setCardErrors(errs);
        }
    };

    const handleExpiryChange = (val: string) => {
        const formatted = formatExpiry(val);
        setCardDetails({ ...cardDetails, expiry: formatted });
        if (submitAttempted) {
            const errs = validateCard(cardDetails.number, cardDetails.name, formatted, cardDetails.cvv, termsAccepted);
            setCardErrors(errs);
        }
    };

    if (!selectedTour) {
        return (
            <div className="bg-white rounded-xl shadow-md p-8">
                <p className="text-yellow-800">Nu a fost selectat niciun tur.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline flex items-center gap-1">
                ← Înapoi
            </button>

            <h2 className="text-2xl font-bold mb-6">Finalizare plată</h2>

            {/* Order summary */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Sumar comandă</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tur:</span>
                        <span className="font-semibold">{selectedTour.tourName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Destinație:</span>
                        <span className="font-semibold">{selectedTour.destinationName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Perioadă:</span>
                        <span>{selectedTour.startDate.toLocaleDateString('ro-RO')} – {selectedTour.endDate.toLocaleDateString('ro-RO')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Adulți:</span>
                        <span>{bookingData.travelers.adults} × ${selectedTour.price}</span>
                    </div>
                    {bookingData.travelers.children > 0 && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Copii (reducere 30%):</span>
                            <span>{bookingData.travelers.children} × ${(selectedTour.price * 0.7).toFixed(0)}</span>
                        </div>
                    )}
                    {bookingData.preferences?.accommodation && bookingData.preferences.accommodation !== 'standard' && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Cazare:</span>
                            <span className="capitalize">{bookingData.preferences.accommodation}</span>
                        </div>
                    )}
                    {bookingData.preferences?.mealPlan && bookingData.preferences.mealPlan !== 'breakfast' && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Plan masă:</span>
                            <span>{bookingData.preferences.mealPlan}</span>
                        </div>
                    )}
                    {bookingData.preferences?.insuranceRequired && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Asigurare:</span>
                            <span>+${29 * (bookingData.travelers.adults + bookingData.travelers.children)}</span>
                        </div>
                    )}
                    <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-green-600">${totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Payment methods */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Metodă de plată</h3>
                <div className="space-y-3">
                    {([
                        { value: 'card' as const, label: `Plată integrală cu cardul – $${totalAmount.toFixed(2)}`, icon: <CreditCard size={18} /> },
                        { value: 'installments' as const, label: `Rate: avans 30% ($${deposit.toFixed(2)}) + rest la sosire ($${remaining.toFixed(2)})`, icon: null },
                        { value: 'bank-transfer' as const, label: 'Transfer bancar (procesare 1–2 zile lucrătoare)', icon: null },
                    ]).map(opt => (
                        <label key={opt.value} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === opt.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="radio" name="payment" value={opt.value} checked={paymentMethod === opt.value} onChange={() => setPaymentMethod(opt.value)} className="mr-3" />
                            {opt.icon && <span className="mr-2">{opt.icon}</span>}
                            <span className="text-sm">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Card form */}
            {(paymentMethod === 'card' || paymentMethod === 'installments') && (
                <div className="mb-8 p-6 border-2 border-gray-200 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Detalii card</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Număr card <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                value={cardDetails.number}
                                onChange={(e) => handleCardNumberChange(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary font-mono tracking-wider ${cardErrors.number ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                                maxLength={19}
                                inputMode="numeric"
                            />
                            {cardErrors.number && <p className="text-xs text-red-500 mt-1">{cardErrors.number}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Titular card <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="PRENUME NUME"
                                value={cardDetails.name}
                                onChange={(e) => {
                                    setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() });
                                    if (submitAttempted) {
                                        const errs = validateCard(cardDetails.number, e.target.value, cardDetails.expiry, cardDetails.cvv, termsAccepted);
                                        setCardErrors(errs);
                                    }
                                }}
                                className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary uppercase ${cardErrors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                            />
                            {cardErrors.name && <p className="text-xs text-red-500 mt-1">{cardErrors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Data expirare <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="MM/AA"
                                    value={cardDetails.expiry}
                                    onChange={(e) => handleExpiryChange(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary ${cardErrors.expiry ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                                    maxLength={5}
                                    inputMode="numeric"
                                />
                                {cardErrors.expiry && <p className="text-xs text-red-500 mt-1">{cardErrors.expiry}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    CVV <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    value={cardDetails.cvv}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                        setCardDetails({ ...cardDetails, cvv: val });
                                        if (submitAttempted) {
                                            const errs = validateCard(cardDetails.number, cardDetails.name, cardDetails.expiry, val, termsAccepted);
                                            setCardErrors(errs);
                                        }
                                    }}
                                    className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary ${cardErrors.cvv ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                                    maxLength={4}
                                    inputMode="numeric"
                                />
                                {cardErrors.cvv && <p className="text-xs text-red-500 mt-1">{cardErrors.cvv}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {paymentMethod === 'bank-transfer' && (
                <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <h4 className="font-semibold mb-3">Instrucțiuni transfer bancar</h4>
                    <div className="text-sm space-y-1 font-mono bg-white p-4 rounded-lg border">
                        <div>IBAN: RO49AAAA1B31007593840000</div>
                        <div>Beneficiar: VOYOGO TRAVEL SRL</div>
                        <div>Bancă: BCR</div>
                        <div>Sumă: ${amountToPay.toFixed(2)}</div>
                        <div>Referință: {bookingData.destinationName || 'Destinație'}</div>
                    </div>
                </div>
            )}

            {/* Terms */}
            <div className="mb-6">
                <label className={`flex items-start gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${cardErrors.terms ? 'border-red-300 bg-red-50' : termsAccepted ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => {
                            setTermsAccepted(e.target.checked);
                            if (submitAttempted) {
                                const errs = validateCard(cardDetails.number, cardDetails.name, cardDetails.expiry, cardDetails.cvv, e.target.checked);
                                setCardErrors(errs);
                            }
                        }}
                        className="mt-0.5"
                    />
                    <span className="text-sm">
                        Accept <a href="/terms" className="text-blue-600 hover:underline">termenii și condițiile</a> și{' '}
                        <a href="/privacy" className="text-blue-600 hover:underline">politica de confidențialitate</a>
                        <span className="text-red-500 ml-1">*</span>
                    </span>
                </label>
                {cardErrors.terms && <p className="text-xs text-red-500 mt-1">{cardErrors.terms}</p>}
            </div>

            <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors"
            >
                {isProcessing ? (
                    <>
                        <Loader className="animate-spin" size={20} />
                        {processingStep}
                    </>
                ) : (
                    <>Confirmă și plătește ${amountToPay.toFixed(2)}</>
                )}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
                🔒 Plata este securizată prin SSL. Datele dvs. sunt protejate.
            </p>
        </div>
    );
}
