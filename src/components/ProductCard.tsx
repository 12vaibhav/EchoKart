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
      className={`bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 group hover:shadow-[0_24px_48px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col cursor-pointer h-full relative overflow-hidden ${className || 'min-w-[280px] md:min-w-[320px]'}`}
    >
      <div className="relative aspect-square mb-6 bg-[#f8f9fb] rounded-2xl overflow-hidden group/img">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-md ${isWishlisted ? 'bg-[#e31c3d] text-white' : 'bg-white/80 text-slate-400 hover:text-[#e31c3d] hover:bg-whiteScale-110'}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Tags/Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {(product.badges || product.tags) ? (
            <>
              {product.badges && product.badges.map((badge: any, i: number) => (
                <span key={i} className={`bg-black text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg`}>
                  {badge.text}
                </span>
              ))}
              {product.tags && product.tags.map((tag: string, i: number) => (
                <span key={`tag-${i}`} className="bg-[#e31c3d] text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">
                  {tag}
                </span>
              ))}
            </>
          ) : (
            product.sale && (
               <span className="bg-[#e31c3d] text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">Sale</span>
            )
          )}
        </div>

        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
          loading="lazy"
        />

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 translate-y-4 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-black font-black py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#e31c3d] hover:text-white transition-all shadow-2xl"
          >
             <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="font-black text-slate-900 text-lg mb-2 line-clamp-1 group-hover:text-[#e31c3d] transition-colors">
          {product.title || product.name || 'Product'}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[#e31c3d] font-black text-xl">
              ₹{itemPrice.toLocaleString('en-IN')}
            </span>
            {itemOldPrice && (
              <span className="text-slate-400 text-xs line-through font-medium">
                ₹{itemOldPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
             <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
             <span className="text-xs font-black text-slate-900">
                {Number(product.rating || 5).toFixed(1)}
             </span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex gap-3">
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-slate-900 text-white font-black py-3.5 rounded-xl text-[11px] uppercase tracking-widest hover:bg-[#e31c3d] transition-all shadow-lg active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
