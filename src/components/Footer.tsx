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
      {/* Top Banner */}
      <div className="bg-[#ff5a00] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-4 flex-wrap lg:flex-nowrap">
          <div className="flex items-center space-x-4 flex-1">
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10 font-light opacity-90" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[15px] leading-tight tracking-wide">Visit our support center</h4>
              <p className="text-[14px] text-white/90">Expert help & advice</p>
            </div>
          </div>
          <div 
            onClick={() => onNavigate('track')}
            className="flex items-center space-x-4 flex-1 cursor-pointer group hover:bg-white/10 p-2 rounded-xl transition-all"
          >
            <Package className="w-8 h-8 md:w-10 md:h-10 font-light opacity-90 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[15px] leading-tight tracking-wide">Check your order status</h4>
              <p className="text-[14px] text-white/90">Updates & tracking</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 flex-1">
            <CornerUpLeft className="w-8 h-8 md:w-10 md:h-10 font-light opacity-90" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[15px] leading-tight tracking-wide">Returns & exchanges</h4>
              <p className="text-[14px] text-white/90">All you need to know</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 flex-1">
            <DollarSign className="w-8 h-8 md:w-10 md:h-10 font-light opacity-90" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-[15px] leading-tight tracking-wide">Price-match guarantee</h4>
              <p className="text-[14px] text-white/90">Our promise to you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Background */}
      <div className="bg-[#151515] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
            
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-6 pr-0 lg:pr-12">
              <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center space-x-2 group mb-6 inline-flex">
                <BrandLogo className="w-14 h-14 md:w-20 md:h-20" />
                <BrandTitle className="h-12 md:h-16 transition-all duration-500 group-hover:brightness-110 italic font-black tracking-widest" />
              </a>
              <p className="text-gray-300 text-[13px] leading-[1.6] mb-8 font-medium">
                Your ultimate destination for trending, high-quality products. We handpick top-tier items from trusted global suppliers to bring you unbeatable deals, direct to your doorstep. Enjoy seamless shopping, reliable shipping, and dedicated support every step of the way.
              </p>
              <div className="flex space-x-4 text-white">
                <a href="#" className="hover:text-gray-400 hover:scale-110 transition-all"><Facebook className="w-6 h-6" /></a>
                <a href="mailto:support@echokart.in" className="hover:text-gray-400 hover:scale-110 transition-all"><Mail className="w-6 h-6" /></a>
              </div>
            </div>

            {/* Column 2: Delivery & returns */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-[15px] mb-6">Delivery & returns</h4>
              <ul className="space-y-4 text-gray-300 text-[13.5px] font-medium">
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('delivery'); }} className="hover:opacity-80 transition-opacity">Shipping information</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('delivery'); }} className="hover:opacity-80 transition-opacity">Returns & refunds</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('track'); }} className="hover:opacity-80 transition-opacity">Track your order</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help'); }} className="hover:opacity-80 transition-opacity">Help & FAQs</a></li>
              </ul>
            </div>

            {/* Column 3: About Us */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-[15px] mb-6">About Us</h4>
              <ul className="space-y-4 text-gray-300 text-[13.5px] font-medium">
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="hover:opacity-80 transition-opacity">Our Story</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="hover:opacity-80 transition-opacity">Contact us</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('important'); }} className="hover:opacity-80 transition-opacity">Privacy policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('important'); }} className="hover:opacity-80 transition-opacity">Shipping policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('important'); }} className="hover:opacity-80 transition-opacity">Terms of service</a></li>
              </ul>
            </div>

          </div>

          {/* Trust Badges - Retained without removal */}
          <div className="border border-white/[0.08] mb-12 py-6 px-6 bg-[#1a1a1a] rounded-xl hidden md:flex flex-wrap items-center justify-center lg:justify-between gap-6">
            <div className="flex items-center space-x-3 group">
              <ShieldCheck className="w-6 h-6 text-[#00c853]" />
              <div>
                <p className="font-bold text-white text-[11px] uppercase tracking-[0.1em]">SSL Secure</p>
                <p className="text-gray-400 text-[10px] mt-0.5">256-bit AES Encryption</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 group">
              <CreditCard className="w-6 h-6 text-white" />
              <div>
                <p className="font-bold text-white text-[11px] uppercase tracking-[0.1em]">Secure Pay</p>
                <p className="text-gray-400 text-[10px] mt-0.5">PCI-DSS Compliant Gateway</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 group">
              <Award className="w-6 h-6 text-[#eab308]" />
              <div>
                <p className="font-bold text-white text-[11px] uppercase tracking-[0.1em]">Product Quality</p>
                <p className="text-gray-400 text-[10px] mt-0.5">Handpicked & Verified</p>
              </div>
            </div>
          </div>

          {/* Options & Payment Icons */}
          <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-white/[0.08] gap-6">
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select 
                  defaultValue="India (INR ₹)"
                  className="appearance-none bg-white text-black font-semibold border-none rounded-full pl-5 pr-10 py-2 text-[13px] focus:outline-none cursor-pointer"
                >
                  <option>United States (USD $)</option>
                  <option>India (INR ₹)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white text-black font-semibold border-none rounded-full pl-5 pr-10 py-2 text-[13px] focus:outline-none cursor-pointer">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-[12px] font-medium text-center hidden lg:block tracking-wide">&copy; {new Date().getFullYear()} www.echokart.in. All rights reserved.</p>

            <div className="flex items-center flex-wrap justify-center gap-2">
              <div className="bg-white rounded-[4px] px-1.5 py-[3px] flex items-center justify-center text-[10px] font-black text-[#142c8e] min-w-[36px] h-6 cursor-pointer hover:opacity-90">VISA</div>
              <div className="bg-white rounded-[4px] px-1 py-[3px] flex items-center justify-center min-w-[36px] h-6 overflow-hidden cursor-pointer hover:opacity-90">
                <div className="w-[14px] h-[14px] rounded-full bg-[#eb001b] -mr-1.5 mix-blend-multiply opacity-95"></div>
                <div className="w-[14px] h-[14px] rounded-full bg-[#f79e1b] mix-blend-multiply opacity-95"></div>
              </div>
              <div className="bg-white rounded-[4px] px-2 py-[3px] flex items-center justify-center text-[10px] font-bold text-[#ea580c] min-w-[36px] h-6 cursor-pointer hover:opacity-90 tracking-wider">UPI</div>
              <div className="bg-white rounded-[4px] px-2 py-[3px] flex items-center justify-center text-[10px] font-bold text-[#5f6368] min-w-[36px] h-6 cursor-pointer hover:opacity-90"><span className="text-[#4285f4] text-[11px] mr-[1px]">G</span>Pay</div>
            </div>
          </div>

          {/* Mobile copyright text */}
          <p className="text-gray-400 text-[12px] font-medium text-center lg:hidden mt-6 pt-4 border-t border-white/[0.08]">&copy; {new Date().getFullYear()} www.echokart.in. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
};

