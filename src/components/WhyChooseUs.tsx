import React from 'react';
import { motion } from 'motion/react';
import { Truck, Shield, CornerUpLeft, MessageCircle } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const WhyChooseUs = () => {
  const features = [
    { icon: <Truck className="w-8 h-8" />, title: 'Free Shipping', desc: 'On all orders.' },
    { icon: <Shield className="w-8 h-8" />, title: 'Secure Payment', desc: '100% secure checkout.' },
    { icon: <CornerUpLeft className="w-8 h-8" />, title: '7-Day Returns', desc: 'Hassle-free return policy.' },
    { icon: <MessageCircle className="w-8 h-8" />, title: '24/7 Support', desc: 'Dedicated customer service.' },
  ];

  return (
    <motion.section {...fadeInUpProps} className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="text-[#e31c3d] mb-4 bg-red-50 p-4 rounded-full">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
