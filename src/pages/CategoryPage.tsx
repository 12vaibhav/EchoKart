import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const CategoryPage = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  return (
    <motion.div {...fadeInUpProps} className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Shop by Category</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {CATEGORIES.map((cat, idx) => (
          <div key={idx} onClick={() => onNavigate('category', idx)} className="flex flex-col items-center space-y-4 cursor-pointer group">
            <div className={`w-40 h-40 rounded-full flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shadow-sm ${cat.isSale ? 'bg-[#e31c3d] text-white' : 'bg-[#f8f9fb] border-2 border-transparent group-hover:border-[#e31c3d]'}`}>
              {cat.isSale ? (
                <span className="font-bold text-2xl">Sale</span>
              ) : (
                cat.image ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" /> : <span className="text-gray-400">No Image</span>
              )}
            </div>
            <span className="text-lg font-bold text-center group-hover:text-[#e31c3d] transition-colors">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
