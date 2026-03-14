import React from 'react';
import { 
  MessageCircle, Package, CornerUpLeft, DollarSign, ArrowRight, ShieldCheck, 
  CreditCard, Award, Facebook, Mail
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BrandTitle } from './BrandTitle';

export const Footer = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  return (
    <footer className="w-full">
      {/* Top Banner - Redesigned for 2x2 grid on mobile */}
      <div className="hidden md:block bg-[#ff5a00] text-white py-6 md:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 md:gap-4 group">
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10 font-light opacity-90 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[13px] md:text-[15px] leading-tight tracking-wide">Support Center</h4>
              <p className="text-[11px] md:text-[14px] text-white/90">Expert help & advice</p>
            </div>
          </div>
          <div 
            onClick={() => onNavigate('track')}
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 md:gap-4 cursor-pointer group hover:bg-white/10 p-2 -m-2 rounded-md transition-all"
          >
            <Package className="w-8 h-8 md:w-10 md:h-10 font-light opacity-90 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[13px] md:text-[15px] leading-tight tracking-wide">Order Status</h4>
              <p className="text-[11px] md:text-[14px] text-white/90">Updates & tracking</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 md:gap-4 group">
            <CornerUpLeft className="w-8 h-8 md:w-10 md:h-10 font-light opacity-90 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[13px] md:text-[15px] leading-tight tracking-wide">Refund Policy</h4>
              <p className="text-[11px] md:text-[14px] text-white/90">Easy returns</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 md:gap-4 group">
            <DollarSign className="w-8 h-8 md:w-10 md:h-10 font-light opacity-90 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[13px] md:text-[15px] leading-tight tracking-wide">Price Guarantee</h4>
              <p className="text-[11px] md:text-[14px] text-white/90">Best deal promised</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Background */}
      <div className="bg-[#151515] text-white pt-8 md:pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 mb-8 md:mb-12">
            
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-6 pr-0 lg:pr-12 flex flex-col items-center md:items-start text-center md:text-left">
              <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center space-x-2 group mb-4 md:mb-6 inline-flex">
                <BrandLogo className="w-14 h-14 md:w-20 md:h-20" />
                <BrandTitle className="h-10 md:h-16 transition-all duration-500 group-hover:brightness-110 italic font-black tracking-widest" />
              </a>
              <p className="text-gray-400 text-[13px] leading-[1.6] mb-6 md:mb-8 font-medium max-w-lg">
                Your ultimate destination for trending, high-quality products. We handpick top-tier items from trusted global suppliers to bring you unbeatable deals, direct to your doorstep.
              </p>
              <div className="flex space-x-5 text-white">
                <a href="#" className="hover:text-[#e31c3d] hover:scale-110 transition-all"><Facebook className="w-6 h-6" /></a>
                <a href="mailto:support@echokart.in" className="hover:text-[#e31c3d] hover:scale-110 transition-all"><Mail className="w-6 h-6" /></a>
              </div>
            </div>

            {/* Column 2: Delivery & returns */}
            <div className="lg:col-span-3 text-center md:text-left">
              <h4 className="font-bold text-[15px] mb-3 md:mb-6 uppercase tracking-wider text-white/50">Delivery & returns</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-400 text-[13.5px] font-medium">
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('shipping-policy'); }} className="hover:text-white transition-colors">Shipping policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('return-policy'); }} className="hover:text-white transition-colors">Return policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('refund-cancellation'); }} className="hover:text-white transition-colors">Refund policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('track'); }} className="hover:text-white transition-colors">Track your order</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help'); }} className="hover:text-white transition-colors">Help & FAQs</a></li>
              </ul>
            </div>

            {/* Column 3: About Us */}
            <div className="lg:col-span-3 text-center md:text-left mt-6 md:mt-0">
              <h4 className="font-bold text-[15px] mb-3 md:mb-6 uppercase tracking-wider text-white/50">About Us</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-400 text-[13.5px] font-medium">
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:text-white transition-colors">Contact us</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('privacy-policy'); }} className="hover:text-white transition-colors">Privacy policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('terms-conditions'); }} className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

          </div>

          {/* Trust Badges - Optimized for Mobile */}
          <div className="border border-white/[0.08] mb-8 md:mb-12 py-4 md:py-6 px-4 md:px-6 bg-[#1a1a1a] rounded-md grid grid-cols-3 gap-3 md:flex flex-wrap items-center justify-center lg:justify-between md:gap-6">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left md:space-x-3 group">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-[#00c853] mb-2 md:mb-0" />
              <div>
                <p className="font-bold text-white text-[9px] md:text-[11px] uppercase tracking-[0.1em]">SSL Secure</p>
                <p className="text-gray-500 text-[8px] md:text-[10px] mt-0.5 hidden xs:block">256-bit AES</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center text-center md:text-left md:space-x-3 group">
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-white mb-2 md:mb-0" />
              <div>
                <p className="font-bold text-white text-[9px] md:text-[11px] uppercase tracking-[0.1em]">Secure Pay</p>
                <p className="text-gray-500 text-[8px] md:text-[10px] mt-0.5 hidden xs:block">PCI-DSS Gateway</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center text-center md:text-left md:space-x-3 group">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-[#eab308] mb-2 md:mb-0" />
              <div>
                <p className="font-bold text-white text-[9px] md:text-[11px] uppercase tracking-[0.1em]">Quality</p>
                <p className="text-gray-500 text-[8px] md:text-[10px] mt-0.5 hidden xs:block">Handpicked</p>
              </div>
            </div>
          </div>

          {/* Options & Payment Icons */}
          <div className="flex flex-col lg:flex-row justify-between items-center pb-6 md:pb-8 border-b border-white/[0.08] gap-6 md:gap-8">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <div className="relative">
                <select 
                  defaultValue="India (INR ₹)"
                  className="appearance-none bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10 rounded-md pl-5 pr-10 py-2 text-[12px] md:text-[13px] focus:outline-none cursor-pointer transition-colors"
                >
                  <option className="bg-[#151515]">United States (USD $)</option>
                  <option className="bg-[#151515]">India (INR ₹)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10 rounded-md pl-5 pr-10 py-2 text-[12px] md:text-[13px] focus:outline-none cursor-pointer transition-colors">
                  <option className="bg-[#151515]">English</option>
                  <option className="bg-[#151515]">Hindi</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-[11px] md:text-[12px] font-medium text-center hidden lg:block tracking-wide">&copy; {new Date().getFullYear()} www.echokart.in. All rights reserved.</p>

            <div className="flex items-center flex-wrap justify-center gap-2">
              <div className="bg-white rounded-[4px] px-2 py-[4px] flex items-center justify-center text-[9px] font-black text-[#142c8e] min-w-[36px] h-6 cursor-pointer hover:scale-105 transition-transform">VISA</div>
              <div className="bg-white rounded-[4px] px-1 py-[4px] flex items-center justify-center min-w-[36px] h-6 overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <div className="w-[12px] h-[12px] rounded-full bg-[#eb001b] -mr-1.5 mix-blend-multiply opacity-95"></div>
                <div className="w-[12px] h-[12px] rounded-full bg-[#f79e1b] mix-blend-multiply opacity-95"></div>
              </div>
              <div className="bg-white rounded-[4px] px-2 py-[4px] flex items-center justify-center text-[9px] font-bold text-[#ea580c] min-w-[36px] h-6 cursor-pointer hover:scale-105 transition-transform tracking-wider">UPI</div>
              <div className="bg-white rounded-[4px] px-2 py-[4px] flex items-center justify-center text-[9px] font-bold text-[#5f6368] min-w-[36px] h-6 cursor-pointer hover:scale-105 transition-transform"><span className="text-[#4285f4] text-[10px] mr-[1px]">G</span>Pay</div>
            </div>
          </div>

          <p className="text-gray-500 text-[11px] font-medium text-center lg:hidden mt-6 pt-4 border-t border-white/[0.05]">&copy; {new Date().getFullYear()} www.echokart.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

