import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';

export const TermsAndConditions = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-10 px-4 leading-relaxed text-gray-800 space-y-6">

                <h1 className="text-4xl font-bold mb-6">Termeni și Condiții</h1>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">Bine ați venit pe Voyogo Travel Agency</h2>
                    <p>
                        Vă rugăm să citiți cu atenție Termenii și Condițiile de utilizare
                        înainte de a naviga, crea cont sau efectua o rezervare. Accesarea site-ului constituie acceptarea
                        expresă a acestor termeni.
                    </p>
                </section>


                <section>
                    <h2 className="text-2xl font-semibold mb-2">1. Acceptarea Termenilor</h2>
                    <p>
                        Prin accesarea site-ului Voyogo, confirmați că aveți peste 18 ani și există posibilitatea legală de a încheia contract. Continuarea utilizării serviciilor reprezintă un acord tacit al tuturor termenilor prezentați în acest document.
                        Dacă nu sunteți de acord cu aceste condiții, vă rugăm să încetați să utilizați platforma.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">2. Servicii Oferite</h2>
                    <p>Voyogo oferă:</p>
                    <ul className="list-disc list-inside">
                        <li>rezervări online pentru pachete turistice</li>
                        <li>servicii de cămin</li>
                        <li>bilete de avion și transport</li>
                        <li>excursii și tururi ghidate</li>
                        <li>asistență și consultanță de călătorie</li>
                        <li>oferte personalizate pentru grupuri sau companii</li>
                    </ul>
                    <p>Voyogo acționează atât ca intermediar, cât și ca organizator, în funcție de pachetul ales.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">3. Utilizarea Platformei</h2>
                    <p>Utilizatorul este obligat să:</p>
                    <ul className="list-disc list-inside">
                        <li>furnizeze informații exacte și actualizate</li>
                        <li>nu creeze rezervări false sau speculative</li>
                        <li>nu folosească platforma în scopuri frauduloase</li>
                        <li>nu modifice, copieze sau distribuie conținutul fără permisiune</li>
                    </ul>
                    <p>Orice încălcare poate duce la blocarea contului.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">4. Rezervări și Plăți</h2>
                    <p>Toate rezervările efectuate prin Voyogo sunt supuse disponibilității.</p>

                    <h3 className="text-xl font-semibold mt-4">4.1 Conținutul Rezervării</h3>
                    <ul className="list-disc list-inside">
                        <li>data călătoriei</li>
                        <li>numele persoanelor participante</li>
                        <li>prețul final</li>
                        <li>servicii incluse (cazare, transport, activitate)</li>
                        <li>politica de anulare</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">4.2 Plăți</h3>
                    <ul className="list-disc list-inside">
                        <li>card bancar</li>
                        <li>transfer bancar</li>
                        <li>numerar (în anumite situații)</li>
                    </ul>
                    <p>Voyogo nu păstrează datele cardurilor.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">5. Politica de Anulare</h2>
                    <p>Anulările pot varia în funcție de furnizor. În general:</p>
                    <ul className="list-disc list-inside">
                        <li>anulările cu peste 30 zile → rambursare parțială sau totală</li>
                        <li>anulările cu 7–29 zile → penalizări între 30–70%</li>
                        <li>anulările sub 7 zile → penalizare 100%</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">6. Responsabilitatea Utilizatorului</h2>
                    <ul className="list-disc list-inside">
                        <li>verificarea valabilității documentelor de călătorie</li>
                        <li>obținerea vizelor</li>
                        <li>respectarea condițiilor sanitare (vaccinuri, teste)</li>
                        <li>comportament adecvat în timpul tururilor</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">7. Limitarea Răspunderii Voyogo</h2>
                    <ul className="list-disc list-inside">
                        <li>întârzieri sau anulări ale transportatorilor</li>
                        <li>condiții meteo nefavorabile</li>
                        <li>pierderi de bagaje</li>
                        <li>modificări logistice neprevăzute</li>
                        <li>acțiuni neconforme ale furnizorilor externi</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">8. Proprietate Intelectuală</h2>
                    <p>
                        Sigla, numele Voyogo, elementele grafice, textele și pozele sunt protejate prin drepturi de autor. Este interzisă copierea lor fără acord scris.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">9. Politica privind Evaluările și Comentariile</h2>
                    <ul className="list-disc list-inside">
                        <li>comentarii reale și bazate pe experiențe</li>
                        <li>fără limbaj obscen sau ofensator</li>
                        <li>fără promovare comercială</li>
                    </ul>
                    <p>Voyogo își rezervă dreptul de a șterge evaluările nepotrivite.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">10. Modificarea Termenilor</h2>
                    <p>
                        Voyogo poate actualiza oricând termenii. Utilizarea continuă a platformei implică acceptul modificărilor.
                    </p>
                </section>

            </div>
        </MainLayout>
    );
};
