import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<string | null>('Shipping & Delivery-0');

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <motion.section {...fadeInUpProps} className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Help & Advice</h2>
        
        <div className="space-y-8">
          {FAQS.map((section, sIdx) => (
            <div key={sIdx}>
              <h3 className="text-xl font-bold mb-4">{section.category}</h3>
              <div className="space-y-4">
                {section.items.map((item, iIdx) => {
                  const id = `${section.category}-${iIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={iIdx} className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
                      <button 
                        onClick={() => toggleFAQ(id)}
                        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                      >
                        <div className="flex items-center space-x-4">
                          {item.icon}
                          <span className="font-medium text-gray-900">{item.q}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div 
                        className={`px-5 pb-5 pt-0 text-gray-600 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden pb-0'}`}
                      >
                        <div className="pl-9">{item.a}</div>
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
