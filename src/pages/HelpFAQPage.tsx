import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const HelpFAQPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8 flex items-center gap-2"><HelpCircle /> Help & FAQs</h1>
    <p className="text-gray-600">Find answers to common questions about our products, shipping, and returns.</p>
  </motion.div>
);
