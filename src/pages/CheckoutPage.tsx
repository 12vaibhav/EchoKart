import React from 'react';
import { motion } from 'motion/react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const CheckoutPage = () => {
  return (
    <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">Checkout</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="font-bold text-lg mb-6">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <input type="text" placeholder="First Name" className="border p-3 rounded-lg" />
          <input type="text" placeholder="Last Name" className="border p-3 rounded-lg" />
          <input type="text" placeholder="Address" className="border p-3 rounded-lg col-span-2" />
          <input type="text" placeholder="City" className="border p-3 rounded-lg" />
          <input type="text" placeholder="Zip Code" className="border p-3 rounded-lg" />
        </div>
        <h2 className="font-bold text-lg mb-6">Payment Method</h2>
        <div className="flex gap-4 mb-8">
          <button className="bg-[#e31c3d] text-white font-bold py-3 px-6 rounded-lg">Credit Card</button>
          <button className="border border-gray-300 font-bold py-3 px-6 rounded-lg">Cash on Delivery</button>
        </div>
        <button className="bg-[#e31c3d] text-white font-bold py-4 px-8 rounded-full w-full">Place Order</button>
      </div>
    </motion.div>
  );
};
