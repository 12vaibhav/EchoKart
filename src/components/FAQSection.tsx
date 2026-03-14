import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<string | null>('Shipping & Delivery-0');

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <motion.section {...fadeInUpProps} className="pt-6 pb-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Help & Advice</h2>
        
        <div className="space-y-6 md:space-y-8">
          {FAQS.map((section, sIdx) => (
            <div key={sIdx}>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{section.category}</h3>
              <div className="space-y-3 md:space-y-4">
                {section.items.map((item, iIdx) => {
                  const id = `${section.category}-${iIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={iIdx} className="bg-white border border-gray-100 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                      <button 
                        onClick={() => toggleFAQ(id)}
                        className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="shrink-0">{item.icon}</div>
                          <span className="font-bold text-sm md:text-base text-slate-800 leading-tight">{item.q}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div 
                        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4 md:pb-5' : 'max-h-0 opacity-0 overflow-hidden'}`}
                      >
                        <div className="px-4 md:px-5">
                          <div className="pl-8 md:pl-9 text-xs md:text-sm text-slate-500 leading-relaxed italic">{item.a}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
