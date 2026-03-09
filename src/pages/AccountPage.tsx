import React from 'react';
import { motion } from 'motion/react';
import { User, Package, Heart, Settings } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const AccountPage = () => {
  return (
    <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <User className="w-12 h-12 text-[#e31c3d]" />
          <div>
            <h2 className="font-bold text-lg">Profile</h2>
            <p className="text-gray-600">Manage your profile information</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <Package className="w-12 h-12 text-[#e31c3d]" />
          <div>
            <h2 className="font-bold text-lg">Orders</h2>
            <p className="text-gray-600">View your order history</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <Heart className="w-12 h-12 text-[#e31c3d]" />
          <div>
            <h2 className="font-bold text-lg">Wishlist</h2>
            <p className="text-gray-600">View your saved items</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <Settings className="w-12 h-12 text-[#e31c3d]" />
          <div>
            <h2 className="font-bold text-lg">Settings</h2>
            <p className="text-gray-600">Manage your account settings</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
