import React from 'react';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { TRENDING_PRODUCTS } from '../data';

export const QuickViewModal = ({ product, onClose }: { product: typeof TRENDING_PRODUCTS[0], onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X className="w-6 h-6" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.brand}</p>
            <div className="text-2xl font-bold text-[#e31c3d] mb-4">₹{product.price.toLocaleString('en-IN')}</div>
            <button className="bg-[#e31c3d] text-white font-bold py-3 px-6 rounded-full w-full mb-4">Add to Cart</button>
            <button className="border border-gray-300 font-bold py-3 px-6 rounded-full w-full">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};
