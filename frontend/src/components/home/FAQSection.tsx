import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const faqs = [
  {
    question: 'What type of travel packages does Voyago offer?',
    answer:
      'Voyago offers a wide range of travel packages including adventure tours, luxury retreats, city explorations, nature expeditions, and seasonal getaways. Each package is carefully curated to provide the best experience for our travelers.',
  },
  {
    question: 'How do I book a trip with Voyago?',
    answer:
      'Booking with Voyago is simple! Browse our destinations and tours, select your preferred package, fill in your personal details on our booking form, choose your travel dates and duration, and confirm your booking. You can also contact our support team for personalized assistance.',
  },
  {
    question: 'What is the payment process for Voyago?',
    answer:
      'We accept major credit cards, bank transfers, and digital payment methods. A 30% deposit is required to confirm your booking, with the remaining balance due 30 days before your trip. Full refunds are available for cancellations made 60+ days in advance.',
  },
  {
    question: 'How to cancel my booking in Voyago?',
    answer:
      'You can cancel your booking through your account dashboard or by contacting our customer service. Cancellation policies vary by package: free cancellation up to 60 days before departure, 50% refund for 30-60 days, and no refund within 30 days of departure.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-6 md:px-16 lg:px-32">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-1/3">
          <p className="text-cyan-400 tracking-widest text-sm font-semibold uppercase">Blog</p>
          <h2 className="text-4xl lg:text-6xl font-bold mt-4 leading-tight">
            Frequently Asked Question
          </h2>
          <p className="text-gray-600 mt-4">
            What our clients usually asked about our services and tours
          </p>
        </div>

        <div className="lg:w-2/3 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
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