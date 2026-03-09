import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const TestimonialSlider = () => {
  return (
    <motion.section {...fadeInUpProps} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="flex overflow-x-auto hide-scrollbar space-x-6 pb-8 snap-x">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[300px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 snap-start">
              <div className="flex text-[#e31c3d] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-600 mb-4">"Absolutely love the products! Great quality and fast shipping."</p>
              <p className="font-bold">- Customer {i}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
