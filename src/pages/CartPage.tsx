import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Trash2 } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const CartPage = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  return (
    <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-4 mb-6">
          <ShoppingBag className="w-12 h-12 text-[#e31c3d]" />
          <div>
            <h2 className="font-bold text-lg">Your Cart</h2>
            <p className="text-gray-600">You have 2 items in your cart</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=100&q=80" alt="Product" className="w-16 h-16 rounded-lg" />
              <div>
                <h3 className="font-bold">Sunset Projection Lamp</h3>
                <p className="text-gray-600">₹1,999</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-[#e31c3d]"><Trash2 className="w-5 h-5" /></button>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&q=80" alt="Product" className="w-16 h-16 rounded-lg" />
              <div>
                <h3 className="font-bold">Smart Posture Corrector</h3>
                <p className="text-gray-600">₹1,499</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-[#e31c3d]"><Trash2 className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <p className="font-bold text-xl">Total: ₹3,498</p>
          <button onClick={() => onNavigate('checkout')} className="bg-[#e31c3d] text-white font-bold py-3 px-8 rounded-full">Checkout</button>
        </div>
      </div>
    </motion.div>
  );
};
