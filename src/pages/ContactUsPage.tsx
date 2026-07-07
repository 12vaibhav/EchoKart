import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, User, ArrowRight } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const ContactUsPage = () => (
  <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-16">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-black mb-6 flex items-center justify-center gap-4 text-slate-900">
        <Mail className="w-10 h-10 text-[#e31c3d]" /> 
        Contact Us
      </h1>
      <p className="text-lg text-slate-500 max-w-2xl mx-auto">
        Have questions about your order, products, or anything else? We're here to help! Reach out to the EchoKart team anytime—we love hearing from you.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Owner Details Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-full bg-[#e31c3d]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <User className="w-6 h-6 text-[#e31c3d]" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">Owner</h2>
        <p className="text-slate-800 font-semibold">Vaibhav Dhiman</p>
        <p className="text-slate-500 text-sm mt-1">Proprietor & Manager</p>
      </div>

      {/* Email Card */}
      <a 
        href="mailto:supportechokart@gmail.com"
        className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all hover:-translate-y-0.5"
      >
        <div className="w-12 h-12 rounded-full bg-[#e31c3d]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Mail className="w-6 h-6 text-[#e31c3d]" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">Email Us</h2>
        <p className="text-[#e31c3d] font-semibold break-all">supportechokart@gmail.com</p>
        <p className="text-slate-500 text-sm mt-1 flex items-center justify-center gap-1 group-hover:underline">
          Send a message <ArrowRight className="w-3.5 h-3.5" />
        </p>
      </a>

      {/* Address Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-full bg-[#e31c3d]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <MapPin className="w-6 h-6 text-[#e31c3d]" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">Address</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          34/11/1 South Civil Line, Prakash Chowk, Muzaffarnagar, UP 251002
        </p>
      </div>
    </div>
  </motion.div>
);

