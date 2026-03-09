import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useWishlist } from '../contexts/WishlistContext';

export const Header = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wishlist } = useWishlist();

  return (
    <header className="bg-[#000000] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Section: Logo, Search, Shop */}
          <div className="flex items-center flex-1 gap-8">
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex-shrink-0 flex items-center space-x-3 group">
              <BrandLogo className="w-12 h-12 md:w-16 md:h-16" />
              <div className="flex flex-col justify-center">
                <span className="text-3xl md:text-4xl font-light tracking-wide lowercase leading-none text-white">
                  echokart
                </span>
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] text-gray-400 mt-1 font-light">
                  Trending & Helpful Finds
                </span>
              </div>
            </a>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for trending gadgets..."
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:border-[#e31c3d] transition-colors"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#e31c3d]">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Desktop Shop Link */}
            <nav className="hidden md:flex text-sm font-medium gap-6">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('category', null); }} className="hover:text-[#e31c3d] transition-colors">Categories</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="hover:text-[#e31c3d] transition-colors">About</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help'); }} className="hover:text-[#e31c3d] transition-colors">Help</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('/dashboard'); }} className="text-[#e31c3d] font-bold hover:text-white transition-colors">Dashboard</a>
            </nav>
          </div>

          {/* Right Section: Icons */}
          <div className="hidden md:flex items-center space-x-5 ml-8">
            <button onClick={() => onNavigate('account')} className="hover:text-[#e31c3d] transition-colors"><User className="w-6 h-6" /></button>
            <button onClick={() => onNavigate('wishlist')} className="hover:text-[#e31c3d] transition-colors relative">
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#e31c3d] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => onNavigate('cart')} className="hover:text-[#e31c3d] transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#e31c3d] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-[#e31c3d]"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <nav className="flex flex-col space-y-3 text-base font-medium">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('/dashboard'); setIsMobileMenuOpen(false); }} className="text-[#e31c3d] font-bold">Dashboard</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('category', null); setIsMobileMenuOpen(false); }} className="hover:text-[#e31c3d]">Categories</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('account'); setIsMobileMenuOpen(false); }} className="hover:text-[#e31c3d]">My Account</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('wishlist'); setIsMobileMenuOpen(false); }} className="hover:text-[#e31c3d]">Wishlist ({wishlist.length})</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('cart'); setIsMobileMenuOpen(false); }} className="hover:text-[#e31c3d]">Shopping Cart</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
