import React from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const ImportantPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8 flex items-center gap-2"><FileText /> Important Information</h1>
    
    <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
    <p className="mb-8 text-gray-600">We value your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.</p>
    
    <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
    <p className="mb-8 text-gray-600">We offer free standard shipping on all orders across India. Delivery typically takes 3-7 business days.</p>
    
    <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
    <p className="text-gray-600">By using our website, you agree to our terms and conditions. Please read them carefully to understand your rights and obligations.</p>
  </motion.div>
);
