
import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, XCircle, AlertCircle, Clock } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const RefundCancellationPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
        <XCircle className="text-red-600 w-6 h-6" />
      </div>
      <h1 className="text-4xl font-bold">Refund and Cancellation Policy</h1>
    </div>

    <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
      <p>
        This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the EchoKart Platform.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Cancellations</h2>
      <ul className="list-disc pl-6 space-y-4">
        <li>Cancellations will only be considered if the request is made within <strong>7 days</strong> of placing the order.</li>
        <li>Cancellation requests may not be entertained if the orders have been communicated to sellers/merchants and they have initiated the process of shipping, or the product is out for delivery. In such cases, you may reject the product at the doorstep.</li>
        <li>EchoKart does not accept cancellation requests for perishable items like flowers, eatables, etc. However, a refund/replacement can be made if the quality is established to be poor.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Refunds</h2>
      <ul className="list-disc pl-6 space-y-4">
        <li>In case of damaged or defective items, please report to our customer service team within <strong>7 days</strong> of receipt of products. The request will be entertained after the seller/merchant has checked and determined the issue.</li>
        <li>If you feel the product received is not as shown on the site or as per your expectations, you must bring it to our notice within <strong>7 days</strong> of receiving the product.</li>
        <li>For products with a manufacturer's warranty, please refer the issue directly to them.</li>
        <li>In case of any approved refunds, it will take <strong>2 days</strong> for the refund to be processed to you.</li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8 rounded-r-lg">
        <div className="flex items-center gap-2 text-blue-800 font-bold mb-1">
          <Clock className="w-4 h-4" /> Refund Processing Time
        </div>
        <p className="text-blue-700 text-sm">
          Once approved, refunds typically take 2 business days to process and reflect in your original payment method.
        </p>
      </div>
    </div>
  </motion.div>
);
