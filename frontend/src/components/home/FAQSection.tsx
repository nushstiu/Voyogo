import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-16 lg:px-32">
      <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-20">
        <div className="lg:w-1/3">
          <p className="text-cyan-400 tracking-widest text-sm font-semibold uppercase">{t('faq.label')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mt-3 sm:mt-4 leading-tight">
            {t('faq.title')}
          </h2>
          <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="lg:w-2/3 space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 sm:p-5 text-left cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-800 pr-4 text-sm sm:text-base">{faq.question}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-cyan-400 transition-transform duration-300 shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}