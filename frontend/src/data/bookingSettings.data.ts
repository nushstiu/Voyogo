export interface RequiredDocument {
    id: string;
    title: string;
    icon: string;
    required: boolean;
    details: string[];
}

export interface TourSettings {
    includes: string[];
    excludes: string[];
}

export function getRequiredDocuments(): RequiredDocument[] {
    return [
        {
            id: 'passport',
            title: 'Pașaport valid',
            icon: '🛂',
            required: true,
            details: [
                'Pașaportul trebuie să fie valid cel puțin 6 luni după data întoarcerii',
                'Asigurați-vă că aveți cel puțin 2 pagini libere',
                'Copiii trebuie să aibă pașaport propriu',
            ],
        },
        {
            id: 'insurance',
            title: 'Asigurare de călătorie',
            icon: '🛡️',
            required: true,
            details: [
                'Asigurare medicală cu acoperire minimă de 30.000 EUR',
                'Acoperire pentru anulare călătorie recomandată',
                'Verificați dacă include sporturi și activități de aventură',
            ],
        },
        {
            id: 'visa',
            title: 'Viză de călătorie',
            icon: '📋',
            required: false,
            details: [
                'Verificați cerințele de viză pentru destinația aleasă',
                'Timpul de procesare poate fi de 2-4 săptămâni',
                'Cetățenii UE nu au nevoie de viză pentru majoritatea destinațiilor europene',
            ],
        },
        {
            id: 'vaccination',
            title: 'Certificat de vaccinare',
            icon: '💉',
            required: false,
            details: [
                'Unele destinații necesită vaccinări specifice',
                'Consultați medicul de familie cu cel puțin 6 săptămâni înainte de plecare',
                'Păstrați certificatul de vaccinare la îndemână',
            ],
        },
    ];
}

export function getTourSettings(): TourSettings {
    return {
        includes: [
            'Transport aerian dus-întors cu bagaj de cală inclus (20kg)',
            'Cazare la hotel conform pachetului ales',
            'Transfer aeroport – hotel – aeroport',
            'Asigurare medicală de bază',
            'Asistență turistică 24/7',
            'Mic dejun zilnic (pentru pachetele All Inclusive și Half Board)',
        ],
        excludes: [
            'Excursii opționale și activități suplimentare',
            'Mese neincluse în pachet',
            'Bacșișuri și cheltuieli personale',
            'Asigurare de anulare călătorie (opțională, se poate adăuga)',
            'Taxe de viză (dacă este cazul)',
        ],
    };
}