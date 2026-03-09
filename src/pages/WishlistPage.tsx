import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <Heart className="w-8 h-8 text-[#e31c3d]" />
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-[#e31c3d]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <button 
              onClick={() => onNavigate('category', null)}
              className="inline-flex items-center space-x-2 bg-[#e31c3d] hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onNavigate={onNavigate} 
                className="w-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
