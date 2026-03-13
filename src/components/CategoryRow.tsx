import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { ChevronRight } from 'lucide-react';


const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Sub-component for individual card - Simplified to only handle navigation
const CategoryCard = ({ 
  cat, 
  onNavigate,
  scrollX
}: { 
  cat: any, 
  onNavigate: any,
  scrollX: any
}) => {
  const name = cat.name || cat.title;

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={() => {
        // Only navigate if not a heavy drag
        if (Math.abs(scrollX.getVelocity()) < 10) {
          onNavigate('category-products', null, name);
        }
      }} 
      className="flex flex-col items-center gap-3 shrink-0 
                 w-24 md:w-28 lg:w-32 
                 cursor-pointer group/card py-2"
    >
      <div className="relative">
        <div className="absolute -inset-1.5 rounded-full border border-slate-200 opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
        
        <div className={`size-14 md:size-16 lg:size-20 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 ${cat.isSale && !(cat.image || cat.image_url) ? 'bg-[#e31c3d] shadow-rose-200' : 'bg-white shadow-slate-200'} shadow-md group-hover/card:shadow-lg relative`}>
          { (cat.image || cat.image_url) ? (
            <>
              <img 
                src={cat.image || cat.image_url} 
                alt={name} 
                className="w-full h-full object-cover transition-all duration-700" 
                draggable={false}
              />
              {cat.isSale && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="bg-[#e31c3d] text-white px-1.5 py-0.5 rounded-full shadow-lg">
                    <span className="text-[8px] font-black uppercase tracking-tighter">Sale</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            cat.isSale ? (
              <div className="flex flex-col items-center justify-center text-white">
                <span className="font-black text-sm lg:text-base uppercase tracking-tighter leading-none">HOT</span>
                <span className="text-[9px] font-bold opacity-80 uppercase transition-all group-hover/card:tracking-widest">Sale</span>
              </div>
            ) : (
              cat.isViewAll ? (
                <div className="flex items-center justify-center w-full h-full bg-slate-50 border-2 border-dashed border-slate-200 group-hover/card:bg-white group-hover/card:border-[#e31c3d] transition-all duration-500">
                   <ChevronRight size={24} className="text-slate-300 group-hover/card:text-[#e31c3d] transition-colors" />
                </div>
              ) : null
            )
          )}
        </div>
      </div>
      
      <div className="flex flex-col items-center w-full px-1">
        <span className="text-xs md:text-[13px] font-extrabold text-center tracking-tight text-slate-800 group-hover/card:text-[#e31c3d] transition-colors duration-300 leading-tight">
          {name}
        </span>
        <div className="h-0.5 bg-[#e31c3d] mt-2 w-0 group-hover/card:w-8 transition-all duration-300 rounded-full" />
      </div>
    </motion.div>
  );
};

export const CategoryRow = ({ categories = [], onNavigate }: { categories: any[], onNavigate: (path: string, id?: any, categoryName?: string | null) => void }) => {
  const displayCategories = categories.filter(cat => cat.visible !== false);
  if (displayCategories.length === 0) return null;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const x = useMotionValue(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && innerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const innerWidth = innerRef.current.scrollWidth;
        setConstraints({
          left: -(innerWidth - containerWidth),
          right: 0
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [displayCategories.length]);

  return (
    <motion.section {...fadeInUpProps} className="w-full bg-white pt-1 md:pt-3 pb-0 select-none overflow-x-hidden">
      <div 
        className="max-w-[1400px] mx-auto px-4 md:px-8 relative" 
        ref={containerRef}
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
        }}
      >
        <div className="relative overflow-visible">
          {/* Optimized Drag Container */}
          <motion.div 
            ref={innerRef}
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.1}
            dragMomentum={true}
            dragTransition={{ power: 0.3, timeConstant: 200 }}
            style={{ x }}
            className="flex items-start gap-2.5 md:gap-8 lg:gap-10 py-1 md:py-4 cursor-grab active:cursor-grabbing will-change-transform"
          >
            {displayCategories.map((cat, idx) => (
              <CategoryCard 
                key={cat.id || idx} 
                cat={cat} 
                onNavigate={onNavigate} 
                scrollX={x} 
              />
            ))}
            {/* Minimal physical spacer to ensure visibility with minimal padding */}
            <div className="w-8 md:w-10 lg:w-12 shrink-0 h-1" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
