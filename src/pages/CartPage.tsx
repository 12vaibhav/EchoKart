import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const CartPage = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const tax = cartTotal * 0.18; // 18% GST for consistency
  const finalTotal = cartTotal + tax;

  if (cart.length === 0) {
    return (
      <motion.div {...fadeInUpProps} className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-slate-300" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-10 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our premium collection and find something you love!</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-[#e31c3d] text-white font-bold py-4 px-10 rounded-md hover:bg-[#c81935] transition-all shadow-lg shadow-[#e31c3d]/20"
        >
          Start Shopping
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div {...fadeInUpProps} className="max-w-7xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-6 md:mb-12 pt-0 md:pt-4">
        <div className="flex items-center justify-between mb-2 md:mb-4 max-w-2xl mx-auto relative px-4">
          <div className="absolute top-[1.25rem] left-0 w-full h-[1px] md:h-[2px] bg-slate-100 z-0"></div>
          <div className="absolute top-[1.25rem] left-0 w-0 h-[1px] md:h-[2px] bg-[#e31c3d] z-0 transition-all duration-700"></div>
          
          <div className="z-10 flex flex-col items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 rounded-full bg-[#e31c3d] text-white flex items-center justify-center font-black text-[10px] md:text-sm shadow-lg shadow-[#e31c3d]/20 ring-4 ring-white">1</div>
            <span className="text-[8px] md:text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Cart</span>
          </div>
          
          <div className="z-10 flex flex-col items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black text-[10px] md:text-sm ring-4 ring-white transition-all">2</div>
            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Review</span>
          </div>
          
          <div className="z-10 flex flex-col items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black text-[10px] md:text-sm ring-4 ring-white">3</div>
            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Checkout</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Product List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between border-b pb-6 mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Shopping Cart ({cartCount} items)</h2>
            <button 
              onClick={() => onNavigate('home')}
              className="text-[#e31c3d] font-bold hover:underline flex items-center gap-1 text-sm bg-transparent border-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>
          </div>

          {cart.map((item) => (
            <div key={`${item.id}-${item.variant}`} className="flex flex-row gap-3 py-3 md:py-6 border-b last:border-b-0">
              {/* Thumbnail */}
              <div className="size-20 md:w-32 md:h-32 bg-slate-50 rounded-md overflow-hidden shrink-0 border border-slate-100 p-1.5 md:p-2">
                <img className="w-full h-full object-contain mix-blend-multiply" alt={item.title} src={item.image} />
              </div>
              
              {/* Details */}
              <div className="flex flex-col flex-1 min-w-0 justify-between">
                {/* Top: Name, brand, price */}
                <div className="flex justify-between items-start gap-1">
                  <div className="min-w-0">
                    <h3 className="text-xs md:text-lg font-bold text-slate-900 line-clamp-2 leading-tight">{item.title}</h3>
                    <p className="text-[9px] md:text-[10px] font-black text-[#e31c3d] uppercase tracking-widest mt-0.5">{item.brand}</p>
                    {item.variant && <p className="text-[9px] md:text-xs text-slate-400 mt-0.5">Variant: {item.variant}</p>}
                  </div>
                  <div className="text-right shrink-0 pl-1">
                    <p className="text-sm md:text-lg font-black text-slate-900">₹{item.price.toLocaleString('en-IN')}</p>
                    {item.oldPrice && <p className="text-[10px] md:text-sm text-slate-400 line-through">₹{item.oldPrice.toLocaleString('en-IN')}</p>}
                  </div>
                </div>
                
                {/* Bottom: Qty controls + Remove */}
                <div className="flex items-center justify-between mt-2 md:mt-6">
                  <div className="flex items-center bg-slate-50 border border-slate-100 rounded-md p-0.5 md:p-1 shadow-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-slate-500 hover:text-[#e31c3d] hover:bg-white transition-all rounded"
                    >
                      <Minus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </button>
                    <span className="w-6 md:w-8 text-center font-black text-slate-900 text-xs md:text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-slate-500 hover:text-[#e31c3d] hover:bg-white transition-all rounded"
                    >
                      <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-rose-600 transition-all flex items-center gap-1.5 text-[9px] md:text-[10px] uppercase font-black"
                  >
                    <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-5 sm:p-8 sticky top-28 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-6 sm:mb-8 uppercase tracking-tight">Order Summary</h2>
            
            <div className="space-y-4 mb-6 sm:mb-8 border-b pb-6 sm:pb-8 border-slate-100">
              <div className="flex justify-between text-slate-500 font-medium text-sm sm:text-base">
                <span>Subtotal</span>
                <span className="text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium text-sm sm:text-base">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest bg-green-50 px-2 py-1 rounded">Free</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium text-sm sm:text-base">
                <span>Estimated GST</span>
                <span className="text-slate-900">₹{tax.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4 md:mb-8">
              <span className="text-lg font-black text-slate-900 uppercase tracking-tight">Total</span>
              <span className="text-2xl md:text-3xl font-black text-[#e31c3d]">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
            
            <button 
              onClick={() => onNavigate('checkout')}
              className="w-full bg-[#e31c3d] hover:bg-[#c81935] text-white font-black py-4 rounded-md flex items-center justify-center gap-3 transition-all transform hover:shadow-lg hover:shadow-[#e31c3d]/25 active:scale-[0.98] mb-6 uppercase tracking-widest text-xs sm:text-sm"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="mt-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Promo Code</h3>
              <div className="flex gap-2">
                <input 
                  className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e31c3d]/20 focus:border-[#e31c3d] transition-all" 
                  placeholder="Enter code" 
                  type="text" 
                />
                <button className="bg-slate-900 text-white px-5 sm:px-6 py-3 rounded-md text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all shrink-0">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
