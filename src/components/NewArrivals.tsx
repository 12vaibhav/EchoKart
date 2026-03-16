import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

export const NewArrivals = ({ products: propProducts, onNavigate }: { products?: any[], onNavigate: (path: string, id?: any, categoryName?: string | null) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  if (!propProducts || propProducts.length === 0) return null;
  const displayProducts = propProducts;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 260 : 340;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      {...fadeInUpProps} 
      className="py-6 md:py-8 bg-slate-50 relative overflow-hidden"
    >
      {/* Noble Aesthetic Overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />

      <div className="max-w-[1700px] mx-auto px-3 sm:px-8 lg:px-12">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="relative">
             <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#e31c3d]/10 rounded-xl">
                <Sparkles className="w-5 h-5 text-[#e31c3d]" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e31c3d]">Season Highlights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">
              New Arrivals
            </h2>
            <p className="text-slate-500 font-medium max-w-xl text-lg">
              The latest drops curated for your style. Experience innovation with our newest collection.
            </p>
            <div className="absolute -bottom-4 left-0 w-24 h-1.5 bg-[#e31c3d] rounded-full" />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => scroll('left')} 
              className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#e31c3d] hover:border-[#e31c3d] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#e31c3d]/10 active:scale-95 group"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="w-14 h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#e31c3d] hover:border-[#e31c3d] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#e31c3d]/10 active:scale-95 group"
            >
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <motion.div 
            ref={scrollRef} 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="flex overflow-x-auto -mx-3 px-3 md:mx-0 md:px-0 gap-3 md:gap-8 pb-12 md:pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth overscroll-x-contain"
          >
            {displayProducts.map((item: any, idx) => (
              <motion.div 
                key={item.id || idx} 
                variants={itemVariants} 
                className="shrink-0 w-[240px] md:w-[320px] snap-start h-full"
              >
                <ProductCard 
                  product={item} 
                  onNavigate={onNavigate} 
                  className="w-full h-full" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
