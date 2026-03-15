import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const CategoryPage = ({ categories = [], onNavigate }: { categories: any[], onNavigate: (path: string, id?: any, categoryName?: string | null) => void }) => {
  const displayCategories = categories.filter(c => c.visible !== false);
  
  return (
    <motion.div {...fadeInUpProps} className="flex-1 px-4 py-6 md:px-16 lg:px-40 max-w-[1920px] mx-auto w-full bg-white">
      {/* Breadcrumbs - Compact for mobile */}
      <nav className="flex items-center gap-1.5 mb-6 text-[11px] md:text-sm text-slate-400 uppercase tracking-widest font-bold">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-[#e31c3d] transition-colors">Home</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900">Categories</span>
      </nav>

      {/* Page Title - Optimized for mobile */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-3">
          SHOP BY <span className="text-[#e31c3d]">CATEGORY</span>
        </h1>
        <div className="h-1.5 w-20 bg-[#e31c3d] rounded-full mb-4"></div>
        <p className="text-slate-500 text-sm md:text-lg max-w-2xl leading-relaxed">
          Discover our curated selection of premium products across top categories. Quality guaranteed from worldwide brands.
        </p>
      </div>

      {/* Categories Grid - 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
        {displayCategories.map((cat, idx) => (
          <motion.a 
            key={idx}
            whileTap={{ scale: 0.98 }}
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('category-products', null, cat.title || cat.name); }}
            className="group relative block overflow-hidden rounded-lg bg-slate-100 aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {cat.image ? (
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-slate-50 border border-slate-100">
              </div>
            )}
            
            {/* Gradient Overlay - Optimized for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full z-10">
              <span className="text-[10px] md:text-xs font-black text-[#e31c3d] uppercase tracking-[0.2em] mb-1 block">Explore</span>
              <h3 className="text-lg md:text-2xl font-black text-white leading-tight uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                {cat.title || cat.name}
              </h3>
            </div>
            
            {/* Visual Indicator for Desktop/Tablet */}
            <div className="absolute top-4 right-4 hidden md:block translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-white rounded-full p-2.5 shadow-xl">
                <ArrowRight className="w-5 h-5 text-[#e31c3d]" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Promotion Banner - Re-engineered for mobile */}
      <div className="mt-12 md:mt-24 bg-[#e31c3d] rounded-xl overflow-hidden flex flex-col md:flex-row items-center justify-between text-white shadow-2xl shadow-[#e31c3d]/25 border border-white/10">
        <div className="p-8 md:p-16 lg:w-3/5 z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/10">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">Limited Season Offer</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-[0.9] tracking-tighter uppercase italic">
            FLASH SALE ON <br/> <span className="text-black/20">ALL</span> CATEGORIES
          </h2>
          <p className="text-white/80 text-base md:text-xl mb-10 leading-relaxed max-w-lg font-medium">
            Join our membership today and get up to <span className="text-white font-bold underline decoration-white/30 underline-offset-4">40% OFF</span> on your first purchase across all premium categories.
          </p>
          <button 
            onClick={() => onNavigate('home')}
            className="group bg-white text-[#e31c3d] font-black text-sm uppercase tracking-widest px-10 py-4 rounded-md hover:bg-black hover:text-white transition-all duration-500 flex items-center gap-3 w-full md:w-fit justify-center shadow-xl shadow-black/10"
          >
            Start Shopping <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </div>
        
        <div className="hidden lg:block relative w-2/5 h-[450px]">
          <div className="absolute inset-y-0 -left-px w-32 bg-gradient-to-r from-[#e31c3d] to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80" 
            alt="Fashion store interior" 
            className="w-full h-full object-cover grayscale brightness-75 mix-blend-multiply opacity-60"
          />
        </div>
      </div>

      {/* Customer Trust Badges for Mobile */}
      <div className="mt-12 md:hidden grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
        <div className="text-center">
            <h4 className="text-3xl font-black text-slate-200 leading-none mb-2">01</h4>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Payments</p>
        </div>
        <div className="text-center">
            <h4 className="text-3xl font-black text-slate-200 leading-none mb-2">02</h4>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fast Delivery</p>
        </div>
      </div>
    </motion.div>
  );
};
