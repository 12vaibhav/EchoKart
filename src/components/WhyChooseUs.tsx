import React from 'react';
import { motion } from 'motion/react';
import { Truck, Shield, CornerUpLeft, MessageCircle } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const WhyChooseUs = () => {
  const features = [
    { icon: <Truck className="w-8 h-8" />, title: 'Free Shipping', desc: 'On all orders.' },
    { icon: <Shield className="w-8 h-8" />, title: 'Secure Payment', desc: '100% secure checkout.' },
    { icon: <CornerUpLeft className="w-8 h-8" />, title: '7-Day Returns', desc: 'Hassle-free return policy.' },
    { icon: <MessageCircle className="w-8 h-8" />, title: '24/7 Support', desc: 'Dedicated customer service.' },
  ];

  return (
    <motion.section {...fadeInUpProps} className="py-8 md:py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8 md:mb-10 tracking-tight">Why Shop With Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-gray-50/50 md:bg-transparent hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="text-[#e31c3d] mb-3 md:mb-4 bg-red-50 p-3 md:p-4 rounded-full group-hover:scale-110 transition-transform">
                {React.cloneElement(f.icon as React.ReactElement, { className: "w-6 h-6 md:w-8 md:h-8" })}
              </div>
              <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 text-slate-800">{f.title}</h3>
              <p className="text-[10px] md:text-sm text-gray-500 leading-tight md:leading-normal">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
