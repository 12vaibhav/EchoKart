import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';

import { ChevronRight, ArrowRight } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const CategoryPage = ({ categories = [], onNavigate }: { categories: any[], onNavigate: (path: string, id?: any, categoryName?: string | null) => void }) => {
  const displayCategories = categories.filter(c => c.visible !== false);
  return (
    <motion.div {...fadeInUpProps} className="flex-1 px-6 py-8 md:px-16 lg:px-40 max-w-[1920px] mx-auto w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-[#e31c3d] transition-colors">Home</a>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Categories</span>
      </nav>

      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Shop by category</h1>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Discover our curated selection of premium products across top categories. Quality guaranteed from worldwide brands.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayCategories.map((cat, idx) => (
          <a 
            key={idx}
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('category-products', null, cat.title || cat.name); }}
            className="group relative block overflow-hidden rounded-xl bg-slate-200 aspect-square"
          >
            {cat.image ? (
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                loading="lazy"
              />
            ) : (
              <div className={`h-full w-full flex items-center justify-center ${cat.isSale ? 'bg-[#e31c3d]' : 'bg-[#f8f9fb]'}`}>
                 {cat.isSale && <span className="font-bold text-4xl text-white">Sale</span>}
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/50"></div>
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-xl font-bold text-white mb-1">{cat.title || cat.name}</h3>
              <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore {(cat.title || cat.name).toLowerCase()}
              </p>
            </div>
            
            <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-[#e31c3d] rounded-full p-2 text-white">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Promotion Banner */}
      <div className="mt-16 bg-[#e31c3d] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between text-white shadow-xl shadow-[#e31c3d]/20 relative">
        <div className="p-8 md:p-12 lg:w-1/2 z-10 relative">
          <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-4">
            Limited Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            Flash sale on all categories
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-md">
            Join our membership today and get up to 40% off on your first purchase across all categories.
          </p>
          <button 
            onClick={() => onNavigate('home')}
            className="bg-white text-[#e31c3d] font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition-all flex items-center gap-2 w-fit shadow-lg"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#e31c3d] before:to-transparent before:z-10">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80" 
            alt="Fashion store interior" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      </div>
    </motion.div>
  );
};
