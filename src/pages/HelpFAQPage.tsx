import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const HelpFAQPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center justify-center gap-4 text-slate-900">
        <HelpCircle className="w-10 h-10 text-[#e31c3d]" /> 
        Help & FAQs
      </h1>
      <p className="text-lg text-slate-500 max-w-2xl mx-auto">
        Find quick answers to common questions about your EchoKart experience. 
        If you need further assistance, don't hesitate to reach out.
      </p>
    </div>

    <div className="space-y-16">
      {FAQS.map((section, sIdx) => (
        <section key={sIdx} className="space-y-8">
          <h2 className="text-2xl font-black text-slate-900 border-b-2 border-[#e31c3d]/10 pb-4 inline-block">
            {section.category}
          </h2>
          <div className="grid grid-cols-1 gap-10">
            {section.items.map((item, iIdx) => (
              <div key={iIdx} className="group">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                  <span className="text-[#e31c3d] font-black">Q.</span>
                  {item.q}
                </h3>
                <div className="pl-7 text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-400 mr-2">A.</span>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>

    <div className="mt-20 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
      <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
      <p className="text-slate-500 mb-8">We're here to help you 24/7 with any queries you might have.</p>
      <a 
        href="mailto:supportechokart@gmail.com" 
        className="inline-flex items-center justify-center px-8 py-4 bg-[#e31c3d] hover:bg-[#c81935] text-white font-black rounded-2xl shadow-lg shadow-[#e31c3d]/20 transition-all uppercase tracking-widest text-xs"
      >
        Contact Support
      </a>
    </div>
  </motion.div>
);
