import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { BrandTitle } from './BrandTitle';
import { AnnouncementBar } from './AnnouncementBar';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';

export const Header = ({ products = [], onNavigate }: { products?: any[], onNavigate: (path: string, id?: any, categoryName?: string | null, searchQuery?: string | null) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTemp, setSearchTemp] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const suggestions = React.useMemo(() => {
    if (!searchTemp.trim() || searchTemp.length < 2) return [];
    const q = searchTemp.toLowerCase();
    return products.filter(p => 
      (p.name || '').toLowerCase().includes(q) || 
      (p.category || '').toLowerCase().includes(q) ||
      (p.tags || []).some((t: string) => t.toLowerCase().includes(q))
    ).slice(0, 5); // Limit to 5 suggestions
  }, [searchTemp, products]);

  const handleSearch = () => {
    if (!searchTemp.trim()) return;
    onNavigate('category-products', null, null, searchTemp.trim());
    setSearchTemp('');
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Moving Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navigation Bar */}
      <div 
        className={`w-full transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-xl border-white/10' 
            : 'bg-black border-transparent'
        } py-3 md:py-2.5`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full gap-2 md:gap-8">
            
            {/* 1. Branding Section */}
            <div className="flex items-center min-w-0 flex-shrink-1">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
                className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 group relative"
              >
                <div className="relative flex items-center">
                  <div className="absolute inset-0 bg-[#e31c3d] blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                  <BrandLogo className="h-10 md:h-14 lg:h-18 w-auto transition-transform duration-500 group-hover:scale-105" />
                </div>
                <BrandTitle className="h-10 md:h-14 lg:h-18 transition-all duration-500 group-hover:brightness-110" />
              </a>
            </div>

            {/* 2. Navigation Section (Dynamic Visibility) */}
            <nav className="hidden xl:flex items-center justify-center gap-8 lg:gap-12 flex-1">
              {['Shop', 'Track Order'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === 'Shop') {
                      onNavigate('category', 0);
                    } else if (item === 'Track Order') {
                      onNavigate('track');
                    } else {
                      onNavigate(item.toLowerCase());
                    }
                  }}
                  className="relative text-[15px] lg:text-[16px] font-medium tracking-[0.2em] uppercase text-white hover:text-[#e31c3d] transition-colors group drop-shadow-md whitespace-nowrap"
                >
                  {item}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#e31c3d] shadow-[0_0_15px_#e31c3d] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* 3. Actions Section (Search & Icons) */}
            <div className="flex items-center gap-2 lg:gap-6 ml-auto">
              {/* Refined Integrated Search Bar - Better Spacing */}
              <div className="hidden md:flex items-center relative group">
                <div className="relative flex items-center">
                  <input 
                    type="text"
                    value={searchTemp}
                    onChange={(e) => {
                      setSearchTemp(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search premium..."
                    className="w-32 lg:w-48 xl:w-56 bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-[11px] lg:text-[12px] font-medium tracking-wide text-white placeholder:text-white/30 focus:w-48 lg:focus:w-64 focus:bg-white/10 focus:border-[#e31c3d]/60 focus:ring-4 focus:ring-[#e31c3d]/5 outline-none backdrop-blur-md transition-all duration-500"
                  />
                  <button 
                    onClick={handleSearch}
                    className="absolute right-1 p-1.5 text-white/40 group-focus-within:text-[#e31c3d] hover:text-[#e31c3d] transition-colors duration-300"
                  >
                    <Search className="w-4 h-4" />
                  </button>

                  {/* Desktop Suggestions */}
                  <AnimatePresence>
                    {showSuggestions && suggestions.length > 0 && (
                      <>
                        <div className="fixed inset-0 z-[-1]" onClick={() => setShowSuggestions(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl overflow-hidden min-w-[320px] z-[100]"
                        >
                          <div className="p-2">
                            <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Suggested Products</p>
                            {suggestions.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => {
                                  onNavigate('product', p.id);
                                  setShowSuggestions(false);
                                  setSearchTemp('');
                                }}
                                className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all group text-left"
                              >
                                <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-slate-900 text-xs font-bold truncate group-hover:text-[#e31c3d] transition-colors">{p.name}</p>
                                  <p className="text-slate-400 text-[10px] uppercase tracking-wider">{p.category}</p>
                                </div>
                                <Zap className="w-3 h-3 text-[#e31c3d] opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            ))}
                            <button
                              onClick={handleSearch}
                              className="w-full mt-1 p-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-[#e31c3d] hover:bg-slate-50 rounded-xl transition-all border-t border-slate-100"
                            >
                              See all results for "{searchTemp}"
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-0.5 md:gap-2 lg:gap-3">
                {user ? (
                  <button onClick={() => onNavigate('account')} className="hidden md:flex p-1.5 sm:p-2 text-white hover:text-[#e31c3d] hover:bg-white/5 rounded-full transition-all group drop-shadow-sm">
                    <User className="w-6 h-6 md:w-6.5 md:h-6.5 transition-colors" />
                  </button>
                ) : (
                  <button 
                    onClick={() => onNavigate('auth')} 
                    className="hidden md:flex p-1.5 sm:p-2 md:px-5 md:py-2 bg-white/10 md:bg-white/10 hover:bg-white text-white hover:text-black rounded-full items-center justify-center transition-all duration-300 backdrop-blur-md"
                  >
                    <User className="w-6 h-6 md:hidden" />
                    <span className="hidden md:block text-[10px] font-black tracking-widest uppercase">Sign In</span>
                  </button>
                )}
                <button onClick={() => onNavigate('wishlist')} className="p-1.5 sm:p-2 text-white hover:text-[#e31c3d] hover:bg-white/5 rounded-full transition-all relative group drop-shadow-sm">
                  <Heart className="w-6 h-6 md:w-6.5 md:h-6.5 transition-colors" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-0 right-0 sm:-top-0.5 sm:-right-0.5 bg-[#e31c3d] text-white text-[8px] sm:text-[9px] font-black h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full flex items-center justify-center border border-black animate-pulse shadow-xl">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => onNavigate('cart')} 
                  className="hidden md:flex p-1.5 sm:p-2 bg-[#e31c3d] hover:bg-white text-white hover:text-black rounded-full transition-all relative group hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(227,28,61,0.2)] md:shadow-[0_8px_20px_rgba(227,28,61,0.3)] drop-shadow-lg"
                >
                  <ShoppingCart className="w-6 h-6 md:w-6.5 md:h-6.5 transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] sm:text-[9px] font-black h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full flex items-center justify-center border-2 border-white shadow-md group-hover:border-black transition-colors">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Menu Trigger */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="xl:hidden p-1.5 sm:p-2 text-white bg-white/5 rounded-full hover:text-[#e31c3d] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 md:w-6 md:h-6" /> : <Menu className="w-6 h-6 md:w-6 md:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black border-l border-white/10 z-50 lg:hidden flex flex-col p-8 md:p-10"
            >
              <div className="flex justify-between items-center mb-8">
                <BrandLogo className="w-10 h-10" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Actions Grid (Profile & Cart) */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => { onNavigate(user ? 'account' : 'auth'); setIsMobileMenuOpen(false); }}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{user ? 'Account' : 'Sign In'}</span>
                </button>
                <button 
                  onClick={() => { onNavigate('cart'); setIsMobileMenuOpen(false); }}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-[#e31c3d]/10 border border-[#e31c3d]/20 rounded-2xl hover:bg-[#e31c3d]/20 transition-colors relative"
                >
                  <div className="w-10 h-10 bg-[#e31c3d] rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Bag</span>
                  {cartCount > 0 && (
                    <span className="absolute top-3 right-8 bg-black text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-white">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Search Bar */}
              <div className="relative mb-8">
                <input 
                  type="text"
                  value={searchTemp}
                  onChange={(e) => {
                    setSearchTemp(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  placeholder="Search products..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-5 pr-12 text-sm text-white focus:bg-white/10 focus:border-[#e31c3d] outline-none transition-all"
                />
                <button 
                  onClick={() => {
                    handleSearch();
                    setIsMobileMenuOpen(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Mobile Suggestions */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl"
                    >
                      <div className="p-2 space-y-1">
                        {suggestions.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              onNavigate('product', p.id);
                              setIsMobileMenuOpen(false);
                              setShowSuggestions(false);
                              setSearchTemp('');
                            }}
                            className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all"
                          >
                            <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <p className="text-slate-900 text-xs font-bold truncate">{p.name}</p>
                              <p className="text-slate-400 text-[10px] uppercase tracking-wider">{p.category}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-8 text-2xl font-light tracking-[0.2em] uppercase">
                {['Shop', 'Track Order'].map((item, i) => (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={item}
                    onClick={() => { 
                      if (item === 'Shop') {
                        onNavigate('category', 0);
                      } else if (item === 'Track Order') {
                        onNavigate('track');
                      } else {
                        onNavigate(item.toLowerCase());
                      }
                      setIsMobileMenuOpen(false); 
                    }}
                    className="text-left hover:text-[#e31c3d] transition-colors"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Customer Care</p>
                <div className="flex flex-col gap-4 text-xs text-white/70">
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('track'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between group">
                    Track My Order <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('return-policy'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between group">
                    Returns Policy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between group">
                    Contact Support <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
