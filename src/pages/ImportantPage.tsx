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
    <p className="mb-8 text-gray-600">At EchoKart, we deeply value your privacy and are dedicated to safeguarding your personal information with the utmost care. Our Privacy Policy clearly explains how we collect, use, and protect your data, ensuring transparency in every step—from browsing our trending products to completing your purchase. We only gather essential details to enhance your shopping experience, such as for order processing and personalized recommendations, while complying with all relevant data protection laws. Rest assured, we never share your information with third parties without your consent, and you can always access, update, or delete your data through your account. Trust EchoKart to handle your privacy as seriously as we do our commitment to delivering authentic, high-quality items right to your doorstep.</p>

    <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
    <p className="mb-8 text-gray-600">At EchoKart, we're all about making your shopping journey effortless and exciting, which is why our Shipping Policy includes free standard shipping on every single order across India—no hidden fees or minimum spends required. We partner with trusted logistics providers to ensure your packages arrive safely and swiftly, with most deliveries taking just 3 to 7 business days from the time your order is dispatched. Factors like your location or peak seasons may occasionally influence timelines, but we track every shipment closely and provide real-time updates via email or your account dashboard. Whether you're snagging the latest gadgets or wellness essentials, count on EchoKart for reliable, cost-free delivery that lets you focus on enjoying your new favorites without any worries.</p>

    <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
    <p className="text-gray-600">By accessing or using EchoKart's website, you agree to our comprehensive Terms & Conditions, which are designed to create a fair and enjoyable environment for everyone. These terms outline your rights and responsibilities, including how to place orders, handle returns, and interact with our platform, all while protecting both you and our community. We encourage you to review them thoroughly to understand important aspects like payment processes, intellectual property rights, and dispute resolution. EchoKart reserves the right to update these terms as needed, with notifications sent to your registered email, ensuring we're always aligned with best practices for a secure, trending-focused shopping experience. Your continued use of the site signifies acceptance, so shop confidently knowing we're here to support you every step of the way.</p>
  </motion.div>
);
