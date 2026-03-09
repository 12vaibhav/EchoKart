import React from 'react';
import { motion } from 'motion/react';

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
