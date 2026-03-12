import React from 'react';
import { X, Heart, ShoppingBag } from 'lucide-react';

import { useCart } from '../contexts/CartContext';

export const QuickViewModal = ({ product, onClose, onNavigate }: { product: any, onClose: () => void, onNavigate: (path: string, id?: number | null) => void }) => {
  const { addToCart } = useCart();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl border border-white/20">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-[#e31c3d] hover:bg-red-50 p-2 rounded-full transition-all">
          <X className="w-6 h-6" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-slate-50 rounded-2xl flex items-center justify-center p-6 border border-slate-100">
            <img src={product.image} alt={product.title} className="w-full aspect-square object-contain mix-blend-multiply drop-shadow-xl" />
          </div>
          <div className="flex flex-col">
            <div className="text-xs font-black text-[#e31c3d] uppercase tracking-[0.2em] mb-2">{product.brand}</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">{product.title}</h2>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.oldPrice && <span className="text-lg text-slate-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>}
            </div>
            
            <div className="mt-auto space-y-3">
              <button 
                onClick={() => { addToCart(product); onClose(); }}
                className="w-full bg-[#e31c3d] hover:bg-[#c81935] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#e31c3d]/20 uppercase tracking-widest text-sm"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
              <button 
                onClick={() => { onNavigate('product', product.id); onClose(); }}
                className="w-full bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-900 font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
