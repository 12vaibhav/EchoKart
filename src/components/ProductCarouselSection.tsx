import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { TRENDING_PRODUCTS } from '../data';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const ProductCarouselSection = ({ title, products, onNavigate }: { title: string, products: typeof TRENDING_PRODUCTS, onNavigate: (path: string, id?: number | null) => void }) => {
  return (
    <motion.section {...fadeInUpProps} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-black">{title}</h2>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('category', null); }} className="text-[#e31c3d] font-medium hover:underline flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar space-x-6 pb-8 snap-x">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
