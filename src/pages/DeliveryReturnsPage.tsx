import React from 'react';
import { motion } from 'motion/react';
import { Truck, RotateCcw } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const DeliveryReturnsPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8">Delivery & Returns</h1>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Truck /> Shipping Information</h2>
    <p className="mb-8 text-gray-600">We offer free standard shipping on all orders across India. Delivery typically takes 3-7 business days.</p>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><RotateCcw /> Returns & Refunds</h2>
    <p className="text-gray-600">We offer a 7-day hassle-free return policy. If you're not satisfied, we'll make it right.</p>
  </motion.div>
);
