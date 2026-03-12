import React from 'react';
import { motion } from 'motion/react';
import { Truck, RotateCcw, MessageCircle, MapPin, ShieldCheck, HelpCircle, FileText } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const AboutUsPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8">About Us</h1>
    <h2 className="text-2xl font-bold mb-4">Our Story</h2>
    <p className="mb-8 text-gray-600">Echokart was born out of a passion for finding the most helpful and trending products that make daily life easier and more enjoyable. We curate the best finds from around the world.</p>
    <h2 className="text-2xl font-bold mb-4">Brands</h2>
    <p className="mb-8 text-gray-600">We partner with top-tier brands to ensure quality and reliability in every product we offer.</p>
    <h2 className="text-2xl font-bold mb-4">Advice & Reviews</h2>
    <p className="text-gray-600">Our team of experts tests every product to provide honest advice and reviews, helping you make informed decisions.</p>
  </motion.div>
);

export const ContactUsPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
    <p className="mb-4">Have questions? Reach out to us!</p>
    <p className="font-bold">Email: vaibhavdhiman39@gmail.com</p>
  </motion.div>
);

export const DeliveryReturnsPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8">Delivery & Returns</h1>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Truck /> Shipping Information</h2>
    <p className="mb-8 text-gray-600">We offer free standard shipping on all orders across India. Delivery typically takes 3-7 business days.</p>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><RotateCcw /> Returns & Refunds</h2>
    <p className="text-gray-600">We offer a 7-day hassle-free return policy. If you're not satisfied, we'll make it right.</p>
  </motion.div>
);

export const TrackOrderPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8">Track Your Order</h1>
    <div className="flex gap-4">
      <input type="text" placeholder="Enter Order ID" className="border p-3 rounded-lg flex-grow" />
      <button className="bg-[#e31c3d] text-white px-6 py-3 rounded-lg font-bold">Track</button>
    </div>
  </motion.div>
);

export const HelpFAQPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8 flex items-center gap-2"><HelpCircle /> Help & FAQs</h1>
    <p className="text-gray-600">Find answers to common questions about our products, shipping, and returns.</p>
    {/* Add FAQ content here */}
  </motion.div>
);

export const ImportantPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8 flex items-center gap-2"><FileText /> Important Information</h1>
    
    <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
    <p className="mb-8 text-gray-600">We value your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.</p>
    
    <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
    <p className="mb-8 text-gray-600">We offer free standard shipping on all orders across India. Delivery typically takes 3-7 business days.</p>
    
    <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
    <p className="text-gray-600">By using our website, you agree to our terms and conditions. Please read them carefully to understand your rights and obligations.</p>
  </motion.div>
);
