import React from 'react';
import { motion } from 'motion/react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const ContactUsPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
    <p className="mb-4">Have questions about your order, products, or anything else? We're here to help! Reach out to the EchoKart team anytime—we love hearing from you.</p>
    <p className="font-bold">Email: vaibhavdhiman39@gmail.com</p>
  </motion.div>
);
