import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';

export const TermsAndConditions = () => {
    return (
        <MainLayout>
            <div className="terms-container p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Termeni și Condiții</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">1. Acceptarea Termenilor</h2>
                    <p className="mt-2 text-gray-700">
                        Prin utilizarea platformei Voyogo, confirmați că sunteți de acord cu toți termenii prezentați în acest document...
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">2. Servicii Oferite</h2>
                    <p className="mt-2 text-gray-700">
                        Voyogo oferă servicii turistice, rezervări, pachete de vacanță și informații despre destinații...
                    </p>
                </section>
            </div>
        </MainLayout>
    );
};
