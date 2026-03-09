import React from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { TRENDING_PRODUCTS } from '../data';
import { useWishlist } from '../contexts/WishlistContext';

export const ProductCard = ({ product, onNavigate, onQuickView, className }: { key?: React.Key, product: typeof TRENDING_PRODUCTS[0], onNavigate: (path: string, id?: number | null) => void, onQuickView?: (product: typeof TRENDING_PRODUCTS[0]) => void, className?: string }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div onClick={() => onNavigate('product', product.id)} className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer h-full ${className || 'min-w-[280px] md:min-w-[300px] snap-start'}`}>
      <div className="relative aspect-square mb-4 bg-[#f8f9fb] rounded-xl overflow-hidden flex items-center justify-center p-6">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all z-10 ${isWishlisted ? 'text-[#e31c3d]' : 'text-gray-400 hover:text-[#e31c3d]'}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            <span className={`${product.badges[0].color} text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md`}>
              {product.badges[0].text}
            </span>
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-1">{product.title}</h3>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#e31c3d] font-semibold text-sm">₹{product.price.toLocaleString('en-IN')}</span>
        {product.oldPrice && (
          <span className="text-gray-400 text-xs line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
        )}
        {product.oldPrice && (
          <span className="text-[#e31c3d] text-xs">
            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 mb-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'fill-gray-200 text-gray-200'}`} />
          ))}
        </div>
        <span className="text-xs text-gray-900 font-medium">{product.rating.toFixed(1)}</span>
        <span className="text-xs text-gray-400">{product.reviews} Reviews</span>
      </div>

      <div className="flex gap-2 mt-auto">
        <button 
          onClick={(e) => { e.stopPropagation(); /* add to cart */ }} 
          className="flex-1 bg-white border border-gray-200 text-gray-600 font-medium py-2 rounded-lg text-xs hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> Add To Cart
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onNavigate('product', product.id); }}
          className="flex-1 bg-[#e31c3d] text-white font-medium py-2 rounded-lg text-xs hover:bg-red-700 transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};
