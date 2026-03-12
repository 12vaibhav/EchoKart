import React from 'react';
import { motion } from 'motion/react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const Newsletter = () => {
  return (
    <motion.section {...fadeInUpProps} className="py-20 bg-[#000000] text-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Sign Up for Updates</h2>
        <p className="text-gray-400 mb-8">Get exclusive offers, original stories, events and more.</p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow bg-white text-black px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e31c3d]"
            required
          />
          <button type="submit" className="bg-[#e31c3d] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>
    </motion.section>
  );
};
