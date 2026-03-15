
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
      <h1 className="text-4xl font-bold">Replacement and Cancellation Policy</h1>
    </div>

    <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
      <p>
        This policy outlines how you can cancel or seek a replacement for a product purchased through EchoKart. Please note: <strong>EchoKart does not provide refunds</strong>. Our commitment is to ensure you receive a high-quality product through our replacement guarantee.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Cancellations</h2>
      <ul className="list-disc pl-6 space-y-4">
        <li>Cancellations are only accepted if the request is made within <strong>24 hours</strong> of placing the order and the product has not been shipped.</li>
        <li>Once an order is shipped or out for delivery, it cannot be canceled. You may, however, request a replacement if the product arrives damaged or defective.</li>
        <li>EchoKart does not accept cancellation requests for perishable items. A replacement can be provided if the quality is found to be poor upon arrival.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Replacements (No Refunds)</h2>
      <ul className="list-disc pl-6 space-y-4">
        <li>In case of damaged or defective items, please report to our customer service team within <strong>7 days</strong> of receipt. We will provide a fresh replacement after verifying the issue.</li>
        <li>If the product received is not as shown on the site, you must notify us within <strong>7 days</strong>. We will arrange for an exchange with the correct product.</li>
        <li>All approvals are subject to a quality check by our team. Once approved, the replacement product will be dispatched within 2-3 business days.</li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8 rounded-r-lg">
        <div className="flex items-center gap-2 text-blue-800 font-bold mb-1">
          <Clock className="w-4 h-4" /> Replacement Timeline
        </div>
        <p className="text-blue-700 text-sm">
          Fresh replacements are typically dispatched within 48 hours after the quality check of the returned item is completed.
        </p>
      </div>
    </div>
  </motion.div>
);
