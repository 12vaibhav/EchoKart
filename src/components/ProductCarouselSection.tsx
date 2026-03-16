import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
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
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const ProductCarouselSection = ({ title, products, onNavigate }: { title: string, products: any[], onNavigate: (path: string, id?: any, categoryName?: string | null) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 260 : 340;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <motion.section 
      {...fadeInUpProps} 
      className="py-6 md:py-8 bg-white relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial-gradient from-red-50 to-transparent opacity-40 pointer-events-none" />
      
      <div className="max-w-[1700px] mx-auto px-3 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="relative">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-[#e31c3d] mb-4 rounded-full"
            />
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-[#e31c3d] fill-current" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e31c3d]">Handpicked for you</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <button 
                aria-label="Scroll left" 
                onClick={() => scroll('left')} 
                className="w-12 h-12 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#e31c3d] hover:border-[#e31c3d] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-red-200 active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                aria-label="Scroll right" 
                onClick={() => scroll('right')} 
                className="w-12 h-12 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#e31c3d] hover:border-[#e31c3d] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-red-200 active:scale-90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('category', 0); }} 
              className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-900 hover:text-[#e31c3d] transition-colors"
            >
              Explore All 
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#e31c3d] group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          </div>
        </div>
        
        <div className="relative">
          <motion.div 
            ref={scrollRef}
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-rows-2 grid-flow-col overflow-x-auto -mx-3 px-3 gap-x-3 gap-y-3 pb-12 md:flex md:overflow-x-auto md:gap-8 md:pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth overscroll-x-contain pl-6 pr-4 md:pl-8 md:pr-0"
          >
            {products.map(product => (
              <motion.div 
                key={product.id} 
                variants={itemVariants} 
                className="shrink-0 w-[180px] md:w-[320px] snap-start h-full"
              >
                <ProductCard 
                  product={product} 
                  onNavigate={onNavigate} 
                  className="w-full h-full transition-transform duration-500 hover:-translate-y-2" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
