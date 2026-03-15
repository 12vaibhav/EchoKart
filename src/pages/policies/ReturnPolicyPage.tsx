
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
      <h1 className="text-4xl font-bold">Exchange & Replacement Policy</h1>
    </div>

    <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
      <p>
        At EchoKart, we are committed to ensuring our customers receive products in perfect condition. Our policy focuses on hassle-free exchanges and replacements to maintain the highest quality standards.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Exchanges & Replacements</h2>
      <p>
        We offer exchanges or replacements within the first <strong>7 days</strong> from the date of delivery. Please note that EchoKart <strong>does not offer full returns or refunds</strong>. We only provide replacements for the same item or an exchange for a product of equal value.
      </p>

      <h3 className="text-xl font-bold text-gray-800">Eligibility for Exchange:</h3>
      <ul className="list-disc pl-6 space-y-4">
        <li>The item must be reported as defective, damaged, or significantly different from the product description.</li>
        <li>Requests must be made within 7 days of receiving the product.</li>
        <li>The item must be unused and in the same condition as you received it, with original packaging.</li>
        <li>Items purchased on sale are not eligible for exchange or replacement unless found damaged upon arrival.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Exempted Categories</h2>
      <p>
        Certain categories of products may be exempted from exchange (e.g., personal care, innerwear, or perishable items). These will be clearly marked at the time of purchase.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">The Process</h2>
      <p>
        To initiate an exchange, please contact our support team with photos/videos of the issue. Once the replacement request is approved, we will arrange for a pickup of the original item and dispatch your fresh replacement.
      </p>

      <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl mt-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-orange-600 w-5 h-5 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-orange-900">Important Note</h4>
            <p className="text-orange-800 text-sm">
              Please ensure the item is securely packed for the pickup. The replacement will be dispatched only after our quality team verifies the original product's condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);
