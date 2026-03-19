import { useState } from 'react';
import { FileText, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import type { Destination } from '../../types';
import { getRequiredDocuments, getTourSettings } from '../../data/bookingSettings.data';

interface Props {
    selectedDestination: Destination | null;
    onNext: () => void;
    onBack: () => void;
}

export default function RequiredDocuments({ selectedDestination, onNext, onBack }: Props) {
    const [confirmed, setConfirmed] = useState(false);
    const [showError, setShowError] = useState(false);

    const destName = selectedDestination?.name || 'destinația selectată';
    const documents = getRequiredDocuments();
    const tourSettings = getTourSettings();

    const handleNext = () => {
        if (!confirmed) {
            setShowError(true);
            return;
        }
        setShowError(false);
        onNext();
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline flex items-center gap-1">
                ← Înapoi
            </button>

            <h2 className="text-2xl font-bold mb-2">Documente necesare & Informații importante</h2>
            <p className="text-gray-500 text-sm mb-6">Informații specifice pentru călătoria în {destName}</p>

            {/* Documents */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Documente necesare
                </h3>
                <div className="space-y-4">
                    {documents.map(doc => (
                        <div key={doc.id} className="border rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{doc.icon}</span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold">{doc.title}</h4>
                                        {doc.required ? (
                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Obligatoriu</span>
                                        ) : (
                                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Opțional</span>
                                        )}
                                    </div>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {doc.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* What's included */}
            <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-800">
                    <CheckCircle size={20} />
                    Ce include pachetul
                </h3>
                <ul className="space-y-2">
                    {tourSettings.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                            <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* What's excluded */}
            <div className="mb-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-orange-800">
                    <AlertCircle size={20} />
                    Nu este inclus
                </h3>
                <ul className="space-y-2">
                    {tourSettings.excludes.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-orange-800">
                            <span className="text-orange-500 mt-0.5 flex-shrink-0">✗</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Important info */}
            <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-yellow-800">Informații importante</h3>
                <ul className="text-sm space-y-2 text-gray-700">
                    <li>• Check-in hotel: după ora 14:00 | Check-out: până la ora 12:00</li>
                    <li>• Prezentați-vă la aeroport cu 3 ore înainte de decolare</li>
                    <li>• Bagaj de cală inclus: 20kg | Bagaj de mână: 8kg</li>
                    <li>• Anulare gratuită până cu 30 de zile înainte de plecare</li>
                    <li>• Pentru anulări sub 30 de zile se percep penalități conform contractului</li>
                </ul>
            </div>

            {/* Confirmation checkbox */}
            <div className={`mb-6 p-4 rounded-xl border-2 transition-all ${
                showError && !confirmed ? 'border-red-400 bg-red-50' : confirmed ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}>
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) => {
                            setConfirmed(e.target.checked);
                            if (e.target.checked) setShowError(false);
                        }}
                        className="mt-0.5 h-4 w-4"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className={confirmed ? 'text-green-600' : 'text-gray-400'} />
                            <span className="font-semibold text-sm">Am citit și înțeles toate informațiile de mai sus</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Confirm că am documentele necesare în regulă și am luat la cunoștință condițiile călătoriei.
                        </p>
                    </div>
                </label>
            </div>

            {showError && !confirmed && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    Trebuie să confirmi că ai citit documentele necesare înainte de a continua.
                </div>
            )}

            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 text-gray-700 transition-colors"
                >
                    ← Înapoi
                </button>
                <button
                    onClick={handleNext}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                    Continuă → Plată
                </button>
            </div>
        </div>
    );
}
