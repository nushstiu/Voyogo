import { FileText, AlertCircle, CheckCircle } from 'lucide-react';
import type { Destination } from '../../types';

interface Props {
    selectedDestination: Destination | null;
    onNext: () => void;
    onBack: () => void;
}

export default function RequiredDocuments({ selectedDestination, onNext, onBack }: Props) {
    const destName = selectedDestination?.name || 'destinatia selectata';

    // Visa required for Asian destinations
    const needsVisa = true; // All destinations in this app are Asian countries

    const documents = [
        {
            title: 'Pasaport',
            required: true,
            details: [
                'Valabil minimum 6 luni de la data intoarcerii',
                'Minim 2 pagini libere pentru vize/stampile',
                'In stare buna (fara pagini rupte sau deteriorate)'
            ],
            icon: '🛂' as const
        },
        {
            title: `Viza turistica - ${destName}`,
            required: needsVisa,
            details: [
                `Necesara pentru calatoria in ${destName}`,
                'Se poate obtine prin agentie (cost suplimentar $50)',
                'Procesare in 5-10 zile lucratoare',
                'Documentele necesare: pasaport, foto, formular completat'
            ],
            icon: '📋' as const
        },
        {
            title: 'Certificat de vaccinare',
            required: false,
            details: [
                'Vaccinare COVID-19 (recomandat)',
                `Alte vaccinari recomandate pentru ${destName}`,
                'Certificatul trebuie sa fie in limba engleza'
            ],
            icon: '💉' as const
        },
        {
            title: 'Asigurare medicala',
            required: true,
            details: [
                'Inclusa in pachetul turistic',
                'Acoperire minimum $30,000',
                `Valabila in ${destName}`
            ],
            icon: '🏥' as const
        }
    ];

    const agencyResponsibilities = [
        'Transfer aeroport - hotel - aeroport',
        'Cazare conform pachetului selectat',
        'Masa conform planului ales',
        'Ghid turistic',
        'Asistenta 24/7 pe toata durata sejurului',
        'Rezolvare situatii neprevazute',
        'Procesare reclamatii in max 48h'
    ];

    const clientResponsibilities = [
        'Documente de identitate valabile',
        'Respectarea programului stabilit',
        'Plata la timp a serviciilor suplimentare',
        'Respect fata de cultura locala',
        'Grija fata de bunurile hotelului',
        'Comunicarea oricaror probleme de sanatate'
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
                &#8592; Inapoi
            </button>

            <h2 className="text-2xl font-bold mb-6">Documente necesare & Informatii importante</h2>
            <p className="text-gray-600 mb-6">Informatii specifice pentru calatoria in {destName}</p>

            {/* Documents */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Documente necesare
                </h3>

                <div className="space-y-4">
                    {documents.map((doc, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{doc.icon}</span>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold">{doc.title}</h4>
                                        {doc.required ? (
                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Obligatoriu</span>
                                        ) : (
                                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Optional</span>
                                        )}
                                    </div>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {doc.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-blue-600 mt-1">&#8226;</span>
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

            {/* Agency responsibilities */}
            <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-800">
                    <CheckCircle size={20} />
                    Ce va oferim noi (agentia)
                </h3>
                <ul className="space-y-2">
                    {agencyResponsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-green-600 mt-1">&#10003;</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Client responsibilities */}
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                    <AlertCircle size={20} />
                    Ce asteptam de la dumneavoastra
                </h3>
                <ul className="space-y-2">
                    {clientResponsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-blue-600 mt-1">&#8226;</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Important info */}
            <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-800">Informatii importante</h3>
                <ul className="text-sm space-y-2 text-gray-700">
                    <li>&#8226; Check-in hotel: dupa ora 14:00 | Check-out: pana la ora 12:00</li>
                    <li>&#8226; Prezentati-va la aeroport cu 3 ore inainte de decolare</li>
                    <li>&#8226; Bagaj de cala inclus: 20kg | Bagaj de mana: 8kg</li>
                    <li>&#8226; Anulare gratuita pana cu 30 zile inainte de plecare</li>
                    <li>&#8226; Pentru anulari sub 30 zile se percep penalitati conform contractului</li>
                </ul>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 text-gray-700"
                >
                    &#8592; Inapoi
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                    Am inteles, continua catre plata &#8594;
                </button>
            </div>
        </div>
    );
}
