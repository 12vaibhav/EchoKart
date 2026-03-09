import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const CategoryRow = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  return (
    <motion.section {...fadeInUpProps} className="pt-8 pb-6 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto hide-scrollbar space-x-6 pb-4 snap-x">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} onClick={() => onNavigate('category', idx)} className="flex flex-col items-center space-y-3 min-w-[100px] snap-center group cursor-pointer">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shadow-sm ${cat.isSale ? 'bg-[#e31c3d] text-white' : 'bg-[#f8f9fb] border-2 border-transparent group-hover:border-[#e31c3d]'}`}>
                {cat.isSale ? (
                  <span className="font-bold text-lg">Sale</span>
                ) : (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
              <span className="text-sm font-bold text-center whitespace-nowrap group-hover:text-[#e31c3d] transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
