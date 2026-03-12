
import React from 'react';
import { motion } from 'motion/react';
import { RotateCw, Package, CheckCircle2, AlertTriangle } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const ReturnPolicyPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
        <RotateCw className="text-orange-600 w-6 h-6" />
      </div>
      <h1 className="text-4xl font-bold">Return Policy</h1>
    </div>

    <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
      <p>
        At EchoKart, we want you to be completely satisfied with your purchase. Our return policy is designed to be fair and transparent.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Eligibility for Returns</h2>
      <p>
        We offer refund/exchange within the first <strong>7 days</strong> from the date of your purchase. If 7 days have passed since your purchase, you will not be offered a return, exchange, or refund of any kind.
      </p>

      <h3 className="text-xl font-bold text-gray-800">Conditions for Return:</h3>
      <ul className="list-disc pl-6 space-y-4">
        <li>The purchased item must be unused and in the same condition as you received it.</li>
        <li>The item must have original packaging.</li>
        <li>Items purchased on sale may not be eligible for return or exchange.</li>
        <li>Only items found defective or damaged are eligible for replacement (based on an exchange request).</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Exempted Categories</h2>
      <p>
        Certain categories of products/items are exempted from returns or refunds. These categories will be identified to you at the time of purchase.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Process</h2>
      <p>
        Once your returned product is received and inspected by us, we will send you an email to notify you about the receipt of the returned/exchanged product. If approved after a quality check, your request will be processed in accordance with our policies.
      </p>

      <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl mt-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-orange-600 w-5 h-5 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-orange-900">Important Note</h4>
            <p className="text-orange-800 text-sm">
              Please ensure the item is securely packed to avoid damage during transit. The approval of your return/exchange is contingent upon the item passing our quality inspection.
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);
