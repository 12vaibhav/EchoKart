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
    <p className="mb-8 text-gray-600">EchoKart was born from a genuine passion for discovering the most helpful and trending products that genuinely simplify and enhance everyday life. We carefully curate the absolute best finds from around the world, bringing you innovative, high-quality items that spark joy and make every moment more enjoyable.</p>
    <h2 className="text-2xl font-bold mb-4">Brands</h2>
    <p className="mb-8 text-gray-600">At EchoKart, we proudly partner with top-tier, trusted brands to bring you only the highest-quality products. Every item in our collection is carefully selected for reliability, durability, and style, so you can shop with complete confidence knowing you're getting authentic, premium trending essentials every time.</p>
    <h2 className="text-2xl font-bold mb-4">Advice & Reviews</h2>
    <p className="text-gray-600">At EchoKart, our dedicated team of experts personally tests every trending product to deliver honest, unbiased advice and detailed reviews, empowering you to shop with complete confidence and make truly informed decisions.</p>
  </motion.div>
);
