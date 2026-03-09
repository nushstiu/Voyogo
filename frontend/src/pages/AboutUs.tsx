import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';

export const AboutUs = () => {
    return (
        <MainLayout>
            <div className="about-container p-8 max-w-4xl mx-auto leading-relaxed text-gray-800 space-y-10">

                <h1 className="text-4xl font-bold mb-6">Despre Voyogo – Călătorii care Inspiră</h1>

                <section>
                    <p>
                        Voyogo este o agenție de turism modernă care îmbină tehnologia cu pasiunea pentru explorare.
                        Fondată din dorința de a transforma fiecare călătorie într-o experiență memorabilă, Voyogo
                        oferă pachete unice, tururi personalizate și consultanță premium.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">Misiunea Noastră</h2>
                    <p>
                        Să facem călătoriile accesibile, sigure și memorabile, indiferent de buget sau destinație.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">Viziunea Noastră</h2>
                    <p>
                        Să devenim cea mai inovatoare platformă de turism din Europa de Est, oferind experiențe digitale
                        intuitive și pachete autentice, gândite pentru fiecare tip de călător.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">Valorile Noastre</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Transparență</strong> – Fără costuri ascunse.</li>
                        <li><strong>Siguranță</strong> – Colaborăm doar cu furnizori autorizați.</li>
                        <li><strong>Inovație</strong> – Folosim cele mai noi tehnologii.</li>
                        <li><strong>Respect</strong> – Fiecare client contează.</li>
                        <li><strong>Calitate</strong> – Fiecare pachet este verificat manual.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">Echipa Voyogo</h2>
                    <p>Voyogo este construită dintr-o echipă pasionată:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>agenți de turism certificați</li>
                        <li>ghizi profesioniști</li>
                        <li>specialiști IT</li>
                        <li>creatori de conținut și fotografi</li>
                        <li>experți în relații cu clienții</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">Istoria Noastră</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Voyogo a început ca o idee între trei prieteni pasionați de călătorii și tehnologie.</li>
                        <li>În 2021, a fost lansată platforma în format beta.</li>
                        <li>În 2022, au fost încheiate parteneriate cu hoteluri și companii aeriene.</li>
                        <li>În 2023, Voyogo a fost nominalizată la „Digital Travel Award”.</li>
                    </ul>
                </section>

            </div>
        </MainLayout>
    );
};
