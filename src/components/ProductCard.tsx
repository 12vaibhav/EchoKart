import React from 'react';
import { Heart, Star, ShoppingBag, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

export const ProductCard = ({ product, onNavigate, onQuickView, className }: { key?: React.Key, product: any, onNavigate: (path: string, id?: any, categoryName?: string | null) => void, onQuickView?: (product: any) => void, className?: string }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    onNavigate('checkout');
  };

  const itemPrice = Number(product.price || 0);
  const itemOldPrice = product.oldPrice ? Number(product.oldPrice) : null;

  return (
    <div 
      onClick={() => onNavigate('product', product.id)} 
      className={`bg-white rounded-[1.2rem] md:rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col cursor-pointer h-full relative overflow-hidden ${className || 'w-full'}`}
    >
      <div className="relative aspect-square bg-[#f8f9fb] overflow-hidden group/img">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-md ${isWishlisted ? 'bg-[#e31c3d] text-white' : 'bg-white/80 text-slate-400 hover:text-[#e31c3d] hover:bg-whiteScale-110'}`}
        >
          <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Tags/Badges */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1 z-20">
          {(product.badges || product.tags) ? (
            <>
              {product.badges && product.badges.slice(0, 1).map((badge: any, i: number) => (
                <span key={i} className={`bg-black text-white text-[7px] md:text-[8px] font-black uppercase tracking-wider px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded shadow-lg`}>
                  {badge.text}
                </span>
              ))}
              {product.tags && product.tags.slice(0, 1).map((tag: string, i: number) => (
                <span key={`tag-${i}`} className="bg-[#e31c3d] text-white text-[7px] md:text-[8px] font-black uppercase tracking-wider px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded shadow-lg">
                  {tag}
                </span>
              ))}
            </>
          ) : (
            product.sale && (
               <span className="bg-[#e31c3d] text-white text-[7px] md:text-[8px] font-black uppercase tracking-wider px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded shadow-lg">Sale</span>
            )
          )}
        </div>

        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
          loading="lazy"
        />

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-2 bottom-2 md:inset-x-3 md:bottom-3 z-20 md:translate-y-4 md:opacity-0 md:group-hover/img:translate-y-0 md:group-hover/img:opacity-100 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white/95 md:bg-white text-black font-black py-1.5 md:py-2.5 rounded md:rounded-lg text-[8px] md:text-[9px] uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-[#e31c3d] hover:text-white transition-all shadow-xl"
          >
             <ShoppingBag size={10} className="md:w-3 md:h-3" /> Quick Add
          </button>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-2.5 md:p-4">
        <h3 className="font-bold text-slate-800 text-[11px] md:text-base mb-1 md:mb-1.5 line-clamp-1 group-hover:text-[#e31c3d] transition-colors leading-tight">
          {product.title || product.name || 'Product'}
        </h3>
        
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex flex-col">
            <span className="text-[#e31c3d] font-black text-sm md:text-lg">
              ₹{itemPrice.toLocaleString('en-IN')}
            </span>
            {itemOldPrice && (
              <span className="text-slate-400 text-[8px] md:text-[10px] line-through font-medium">
                ₹{itemOldPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-0.5 md:gap-1 bg-amber-50/50 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-amber-100/50">
             <Star className="w-2 md:w-3 h-2 md:h-3 fill-amber-400 text-amber-400" />
             <span className="text-[8px] md:text-[10px] font-black text-slate-900">
                {Number(product.rating || 5).toFixed(1)}
             </span>
          </div>
        </div>
        <div className="mt-auto pt-2 md:pt-3 border-t border-slate-50">
          <button 
            onClick={handleBuyNow}
            className="w-full bg-slate-900 text-white font-black py-2 md:py-2.5 rounded md:rounded-lg text-[8px] md:text-[10px] uppercase tracking-widest hover:bg-[#e31c3d] transition-all shadow-md active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
