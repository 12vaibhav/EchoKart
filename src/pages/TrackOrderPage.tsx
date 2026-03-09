import React from 'react';
import { motion } from 'motion/react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const TrackOrderPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8">Track Your Order</h1>
    <div className="flex gap-4">
      <input type="text" placeholder="Enter Order ID" className="border p-3 rounded-lg flex-grow" />
      <button className="bg-[#e31c3d] text-white px-6 py-3 rounded-lg font-bold">Track</button>
    </div>
  </motion.div>
);
