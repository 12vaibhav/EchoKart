import React from 'react';
import { MessageCircle, Package, CornerUpLeft, DollarSign, ArrowRight, ShieldCheck, CreditCard, Award } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  return (
    <footer className="bg-[#000000] text-white">
      {/* Top Support Bar */}
      <div className="bg-[#e31c3d] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-6 h-6" />
              <div>
                <p className="font-bold">Visit our support center</p>
                <p className="text-red-100">Expert help & advice</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="w-6 h-6" />
              <div>
                <p className="font-bold">Check your order status</p>
                <p className="text-red-100">Updates & tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CornerUpLeft className="w-6 h-6" />
              <div>
                <p className="font-bold">Returns & exchanges</p>
                <p className="text-red-100">All you need to know</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6" />
              <div>
                <p className="font-bold">Price-match guarantee</p>
                <p className="text-red-100">Our promise to you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <a href="/" className="flex items-center space-x-3 group mb-6 inline-flex">
              <BrandLogo className="w-10 h-10" />
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-light tracking-wide lowercase leading-none text-white">
                  echokart
                </span>
                <span className="text-[8px] uppercase tracking-[0.15em] text-gray-400 mt-1 font-light">
                  Trending & Helpful Finds
                </span>
              </div>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Curating the finest trending essentials for your modern lifestyle. Quality guaranteed, delivered directly to you.
            </p>
            {/* Socials placeholder */}
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#e31c3d] cursor-pointer transition-colors flex items-center justify-center text-sm font-bold">f</div>
              <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#e31c3d] cursor-pointer transition-colors flex items-center justify-center text-sm font-bold">in</div>
              <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#e31c3d] cursor-pointer transition-colors flex items-center justify-center text-sm font-bold">x</div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Delivery & Returns</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('delivery'); }} className="hover:text-white transition-colors">Shipping information</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('delivery'); }} className="hover:text-white transition-colors">Returns & refunds</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('track'); }} className="hover:text-white transition-colors">Track your order</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help'); }} className="hover:text-white transition-colors">Help & FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">About Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:text-white transition-colors">Contact us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('important'); }} className="hover:text-white transition-colors">Privacy policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('important'); }} className="hover:text-white transition-colors">Shipping policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('important'); }} className="hover:text-white transition-colors">Terms of service</a></li>
            </ul>
          </div>

          {/* Quick Newsletter */}
          <div>
             <h4 className="font-bold text-lg mb-6">Stay Connected</h4>
             <p className="text-gray-400 text-sm mb-4">Join our community for the latest trends.</p>
             <div className="relative">
               <input type="email" placeholder="Email address" className="w-full bg-gray-900 border border-gray-700 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#e31c3d]" />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#e31c3d]">
                 <ArrowRight className="w-5 h-5" />
               </button>
             </div>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="border-t border-white/5 mt-16 py-12 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#00c853]/50 transition-colors duration-500">
                  <ShieldCheck className="w-6 h-6 text-[#00c853]" />
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-[0.2em]">SSL Secure</p>
                  <p className="text-gray-500 text-[10px] mt-0.5 font-medium">256-bit AES Encryption</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-white/10" />

              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors duration-500">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-[0.2em]">Secure Pay</p>
                  <p className="text-gray-500 text-[10px] mt-0.5 font-medium">PCI-DSS Compliant Gateway</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-white/10" />

              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#eab308]/50 transition-colors duration-500">
                  <Award className="w-6 h-6 text-[#eab308]" />
                </div>
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-[0.2em]">Product Quality</p>
                  <p className="text-gray-500 text-[10px] mt-0.5 font-medium">Handpicked & Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <select className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-white focus:outline-none">
              <option>India (INR ₹)</option>
              <option>United States (USD $)</option>
            </select>
            <select className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-white focus:outline-none">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
          </div>

          <p>&copy; {new Date().getFullYear()} echokart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
