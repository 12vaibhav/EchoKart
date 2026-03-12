import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const StickyBuyBar = ({ product }: { product: any }) => {
  return (
    <motion.div {...fadeInUpProps} className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
        <button className="flex-1 bg-[#e31c3d] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2">
          <ShoppingBag className="w-5 h-5" /> Buy Now
        </button>
      </div>
    </motion.div>
  );
};
