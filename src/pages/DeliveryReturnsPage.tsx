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
    <p className="mb-8 text-gray-600">At EchoKart, we’re committed to making your shopping experience as seamless and enjoyable as possible. That’s why we proudly offer free standard shipping on every order, no minimum purchase required, anywhere across India. Our reliable delivery partners ensure your package reaches you safely, with most orders arriving within 3 to 7 business days, depending on your location and any occasional external factors. We continuously work to optimize our logistics so you can enjoy your trending finds sooner—without ever worrying about extra shipping costs. Shop with confidence knowing fast, free, and hassle-free delivery is always part of the EchoKart promise.</p>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><RotateCcw /> Returns & Refunds</h2>
    <p className="text-gray-600">At EchoKart, your satisfaction is our top priority, which is why we proudly stand behind every purchase with our 7-day hassle-free return policy. If for any reason you're not completely happy with your order—whether it's the fit, style, quality, or simply a change of mind—you can return it within 7 days of delivery. Our simple and customer-friendly process ensures a smooth experience: just initiate the return through your account, and we'll guide you every step of the way. Once we receive and inspect the item, we'll process your refund quickly or arrange an exchange, whichever you prefer. Shop with complete peace of mind knowing that EchoKart is committed to making things right for you—no stress, no hidden fees, just genuine care for your shopping journey.</p>
  </motion.div>
);
