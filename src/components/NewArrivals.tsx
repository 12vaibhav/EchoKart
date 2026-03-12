import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

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
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
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
      className="py-8 bg-slate-50 relative overflow-hidden"
    >
      {/* Noble Aesthetic Overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />

      <div className="max-w-[1700px] mx-auto px-8 sm:px-12 lg:px-24">
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

          <div className="flex items-center gap-4">
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
            className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
          >
            {displayProducts.map((item: any, idx) => {
              const title = item.title || item.name;
              const img = item.img || item.image;
              const isWishlisted = isInWishlist(item.id);
              
              return (
                <motion.div 
                  key={item.id || idx} 
                  variants={itemVariants}
                  onClick={() => onNavigate('product', item.id)} 
                  className="bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col cursor-pointer shrink-0 w-[260px] md:w-[320px] snap-start h-full relative overflow-hidden"
                >
                  <div className="relative aspect-square mb-6 rounded-2xl overflow-hidden group/img">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-md ${isWishlisted ? 'bg-[#e31c3d] text-white' : 'bg-white/80 text-slate-400 hover:text-[#e31c3d] hover:bg-white'}`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    
                    {/* Discount/Badge */}
                    {item.oldPrice && item.price && item.oldPrice > item.price && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-[#e31c3d] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">
                          -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                        </span>
                      </div>
                    )}

                    <img 
                      src={img} 
                      alt={title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" 
                      loading="lazy" 
                    />
                    
                    {/* Quick Add Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                        className="w-full bg-white text-black font-black py-3 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#e31c3d] hover:text-white transition-all shadow-xl"
                      >
                         <ShoppingBag size={14} /> Quick Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1">
                    <h3 className="font-black text-slate-900 text-lg mb-2 line-clamp-1 group-hover:text-[#e31c3d] transition-colors">
                      {title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-[#e31c3d] font-black text-xl">
                          ₹{Number(item.price || 0).toLocaleString('en-IN')}
                        </span>
                        {item.oldPrice && (
                          <span className="text-slate-400 text-xs line-through font-medium">
                            ₹{Number(item.oldPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-amber-900">
                          {Number(item.rating || 4.5).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-50 flex gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onNavigate('product', item.id); }}
                        className="flex-1 bg-slate-900 text-white font-black py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#e31c3d] transition-all shadow-lg active:scale-95"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
