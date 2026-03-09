import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';

export const PrivacyPolicy = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-10 px-4 leading-relaxed text-gray-800 space-y-6">

                <h1 className="text-4xl font-bold mb-6">Politica de Confidențialitate – Voyogo</h1>

                <section>
                    <p>
                        Protejarea datelor dumneavoastră este o prioritate. Această politică explică ce date colectăm,
                        de ce și cum le folosim, în conformitate cu Regulamentul GDPR (Regulamentul UE 2016/679).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">1. Tipuri de Date Colectate</h2>

                    <h3 className="text-xl font-semibold mt-4">1.1 Date personale furnizate direct</h3>
                    <ul className="list-disc list-inside">
                        <li>nume și prenume</li>
                        <li>adresa de e-mail</li>
                        <li>număr de telefon</li>
                        <li>date pașaport (doar pentru rezervări)</li>
                        <li>vârstă și data nașterii (unde este necesar)</li>
                        <li>informații necesare rezervărilor turistice</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">1.2 Date colectate automat</h3>
                    <ul className="list-disc list-inside">
                        <li>adresa IP</li>
                        <li>tipul dispozitivului</li>
                        <li>cookie-uri și identificatori online</li>
                        <li>istoricul de navigare pe platformă</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">1.3 Date legate de plăți</h3>
                    <p>
                        Voyogo NU colectează numerele cardurilor. Procesarea plăților este realizată prin procesatori
                        certificați PCI-DSS.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">2. Scopul Prelucrării Datelor</h2>
                    <p>Datele sunt folosite pentru:</p>
                    <ul className="list-disc list-inside">
                        <li>procesarea rezervărilor</li>
                        <li>crearea contului</li>
                        <li>asigurarea comunicării cu utilizatorul</li>
                        <li>personalizarea ofertelor</li>
                        <li>furnizarea serviciilor</li>
                        <li>respectarea obligațiilor legale</li>
                    </ul>
                    <p>Datele sunt folosite strict pentru scopurile declarate.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">3. Temeiul Legal</h2>
                    <p>Prelucrarea datelor se face conform:</p>
                    <ul className="list-disc list-inside">
                        <li>Art. 6 GDPR — executarea contractului</li>
                        <li>Art. 6 GDPR — consimțământul utilizatorului</li>
                        <li>Art. 6 GDPR — interes legitim</li>
                        <li>Art. 6 GDPR — obligații legale</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">4. Partajarea Datelor</h2>
                    <p>Datele pot fi transmise către:</p>
                    <ul className="list-disc list-inside">
                        <li>hoteluri</li>
                        <li>companii aeriene</li>
                        <li>ghizi turistici</li>
                        <li>procesatori de plăți</li>
                        <li>autorități vamale sau de securitate, dacă este necesar</li>
                    </ul>
                    <p>Voyogo NU vinde niciodată date personale.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">5. Perioada de Stocare</h2>
                    <ul className="list-disc list-inside">
                        <li>5 ani pentru rezervări</li>
                        <li>3 ani pentru reclamații</li>
                        <li>până la retragerea consimțământului pentru marketing</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">6. Drepturile Utilizatorului</h2>
                    <ul className="list-disc list-inside">
                        <li>dreptul de acces</li>
                        <li>dreptul la rectificare</li>
                        <li>dreptul la ștergere („dreptul de a fi uitat”)</li>
                        <li>dreptul la restricționarea prelucrării</li>
                        <li>dreptul la portabilitatea datelor</li>
                        <li>dreptul la opoziție</li>
                        <li>dreptul de a retrage consimțământul</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">7. Cookie-uri</h2>
                    <p>Voyogo folosește:</p>
                    <ul className="list-disc list-inside">
                        <li>cookie-uri strict necesare funcționării site-ului</li>
                        <li>cookie-uri de performanță</li>
                        <li>cookie-uri de marketing (Google Ads, Meta Ads)</li>
                    </ul>
                    <p>Puteți dezactiva cookie-urile din setările browserului.</p>
                </section>

            </div>
        </MainLayout>
    );
};
