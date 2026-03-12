
import React from 'react';
import { motion } from 'motion/react';
import { Truck, MapPin, Calendar, CheckSquare } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const ShippingPolicyPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
        <Truck className="text-blue-600 w-6 h-6" />
      </div>
      <h1 className="text-4xl font-bold">Shipping Policy</h1>
    </div>

    <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
      <p>
        We aim to deliver your products in the fastest and most reliable way possible.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Carrier Partners</h2>
      <p>
        Orders are shipped through registered domestic courier companies and/or speed post only.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Delivery Timeline</h2>
      <ul className="list-disc pl-6 space-y-4">
        <li>Orders are typically shipped within <strong>7 days</strong> from the date of the order/payment or as agreed at the time of order confirmation.</li>
        <li>Delivery is subject to courier company/post office norms.</li>
        <li>EchoKart (Platform Owner) shall not be liable for any delay in delivery by the courier company or postal authority.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Address and Updates</h2>
      <p>
        Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed via the email ID specified at registration.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8">Shipping Costs</h2>
      <p>
        If there are any shipping costs levied by the seller or the Platform Owner, the same is <strong>not refundable</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic">
          "We partner with India's most trusted logistics providers to ensure your package reaches you in perfect condition."
        </div>
        <div className="p-6 bg-[#e31c3d]/5 rounded-2xl border border-[#e31c3d]/10 flex flex-col justify-center">
          <div className="flex items-center gap-2 font-bold text-[#e31c3d] mb-2">
            <MapPin className="w-4 h-4" /> Nationwide Coverage
          </div>
          <p className="text-sm text-gray-700"> Delivering to over 19,000+ pin codes across India.</p>
        </div>
      </div>
    </div>
  </motion.div>
);
