import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Mail, Truck, QrCode, Lock, Shield, RefreshCw, Headphones, ArrowRight, Loader2, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const CheckoutPage = ({ onNavigate }: { onNavigate: (path: string, id?: any) => void }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    houseNumber: '',
    roadName: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi',
    utrNumber: ''
  });

  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setFormData(prev => ({ 
          ...prev, 
          email: session.user.email || '',
          firstName: session.user.user_metadata?.full_name?.split(' ')[0] || '',
          lastName: session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || ''
        }));
      }
    };
    checkUser();
  }, [onNavigate]);

  const subtotal = cartTotal;
  const shipping = 0; 
  const tax = subtotal * 0.18; 
  const upiDiscount = formData.paymentMethod === 'upi' ? (subtotal + tax) * 0.15 : 0;
  const total = subtotal + shipping + tax - upiDiscount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompletePurchase = async () => {
    if (cart.length === 0) return;

    const requiredFields = [
      { key: 'email', label: 'Email Address' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'houseNumber', label: 'House/Flat Number' },
      { key: 'roadName', label: 'Road/Area Name' },
      { key: 'city', label: 'City' },
      { key: 'pincode', label: 'Pincode' }
    ];

    for (const field of requiredFields) {
      if (!formData[field.key as keyof typeof formData].toString().trim()) {
        alert(`Please enter your ${field.label}.`);
        return;
      }
    }

    if (formData.paymentMethod === 'upi') {
      const utr = formData.utrNumber.trim();
      if (!utr) {
        alert('Transaction ID (UTR) is required for UPI payments. Please enter it after making the payment.');
        return;
      }
      if (utr.length !== 12 || !/^\d+$/.test(utr)) {
        alert('Please enter a valid 12-digit numeric Transaction ID (UTR).');
        return;
      }
    }
    
    try {
      setIsSubmitting(true);
      const shippingAddress = `${formData.firstName} ${formData.lastName}, ${formData.houseNumber}, ${formData.roadName}, ${formData.city}, ${formData.pincode}. Phone: ${formData.phone}`;
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: session?.user?.id || null,
          total_amount: total,
          status: 'Order Placed',
          payment_status: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Pending Verification',
          payment_method: formData.paymentMethod,
          utr_number: formData.paymentMethod === 'upi' ? formData.utrNumber : null,
          shipping_address: shippingAddress
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      onNavigate('order-confirmation', order.id);
      
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div {...fadeInUpProps} className="max-w-7xl mx-auto px-4 pt-4 pb-0 md:py-12 bg-white">
      {/* Progress Indicator - Mirrored from CartPage */}
      <div className="mb-6 md:mb-12 pt-0 md:pt-4">
        <div className="flex items-center justify-between mb-2 md:mb-4 max-w-2xl mx-auto relative px-4">
          <div className="absolute top-[1.25rem] left-0 w-full h-[1px] md:h-[2px] bg-slate-100 z-0"></div>
          <div className="absolute top-[1.25rem] left-0 w-1/2 h-[1px] md:h-[2px] bg-[#e31c3d] z-0 transition-all duration-700"></div>
          
          <div className="z-10 flex flex-col items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 rounded-full bg-[#151515] text-white flex items-center justify-center font-black text-[10px] md:text-sm shadow-lg shadow-black/20 ring-4 ring-white">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            </div>
            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cart</span>
          </div>
          
          <div className="z-10 flex flex-col items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 rounded-full bg-[#e31c3d] text-white flex items-center justify-center font-black text-[10px] md:text-sm shadow-lg shadow-[#e31c3d]/20 ring-4 ring-white">2</div>
            <span className="text-[8px] md:text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Review</span>
          </div>
          
          <div className="z-10 flex flex-col items-center gap-2 md:gap-3">
            <div className="size-8 md:size-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black text-[10px] md:text-sm ring-4 ring-white">3</div>
            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Checkout</span>
          </div>
        </div>
      </div>

      {/* Mini Summary Mobile Header - Sticky */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-100 -mx-4 px-4 py-3 flex items-center justify-between mb-6 shadow-sm">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total to Pay</span>
          <span className="text-lg font-black text-[#e31c3d] tracking-tight">₹{total.toLocaleString()}</span>
        </div>
        <button 
          onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
          className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-md border border-slate-100 active:scale-95 transition-all outline-none"
        >
          <span className="text-xs font-black uppercase tracking-widest text-slate-600">Review Items</span>
          {isSummaryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded Summary Overlay for Mobile */}
      <AnimatePresence>
        {isSummaryExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-slate-50 -mx-4 px-4 pb-6 mb-6 border-b border-slate-200"
          >
            <div className="pt-4 space-y-4">
               {cart.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 bg-white p-3 rounded-md border border-slate-100 shadow-sm">
                  <div className="relative size-14 bg-slate-100 rounded-md overflow-hidden border border-slate-100 shrink-0">
                    <img className="w-full h-full object-cover mix-blend-multiply" alt={item.name} src={item.image} />
                    <span className="absolute -top-1 -right-1 size-5 bg-black text-white text-[10px] flex items-center justify-center rounded-full font-black">{item.quantity}</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-xs font-black text-slate-900 leading-tight uppercase tracking-tight">{item.name}</h4>
                    <span className="text-xs font-bold text-[#e31c3d] mt-1">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
              <div className="p-4 bg-white rounded-md border border-slate-100 space-y-2">
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>GST (18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm font-black text-slate-900 uppercase tracking-widest pt-2 border-t border-slate-50">
                    <span>Total Amount</span>
                    <span className="text-[#e31c3d]">₹{total.toLocaleString()}</span>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-6 md:space-y-12">
          
          <div className="bg-transparent md:bg-slate-50 rounded-lg p-0 md:p-10 border-0 md:border border-slate-100 shadow-none md:shadow-sm">
            <section className="bg-slate-50 md:bg-transparent p-6 md:p-0 rounded-lg border md:border-0 border-slate-100">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="bg-[#e31c3d] p-2 md:p-2.5 rounded-md shadow-lg shadow-[#e31c3d]/20">
                  <Truck className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Checkout Details</h2>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Almost there! Just a few details to complete your order.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div className="col-span-2 group">
                  <label className="block text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-2 ml-4 transition-colors group-focus-within:text-[#e31c3d]">Email Address*</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#e31c3d] transition-colors" />
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 md:h-14 pl-12 pr-4 rounded-md border-slate-200 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 bg-white font-bold text-sm md:text-base transition-all outline-none" 
                      placeholder="email@example.com" 
                      type="email" 
                    />
                  </div>
                </div>
                
                <div className="col-span-2 group">
                  <label className="block text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-2 ml-4 transition-colors group-focus-within:text-[#e31c3d]">Phone Number*</label>
                  <div className="relative">
                    <Headphones className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#e31c3d] transition-colors" />
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 md:h-14 pl-12 pr-4 rounded-md border-slate-200 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 bg-white font-bold text-sm md:text-base transition-all outline-none" 
                      placeholder="e.g. 9876543210" 
                      type="tel" 
                    />
                  </div>
                </div>

                <div className="col-span-1 group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2 ml-4">First Name*</label>
                  <input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full h-11 md:h-14 px-4 rounded-md border-slate-200 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 bg-white font-bold text-sm md:text-base transition-all outline-none" 
                    placeholder="John" 
                    type="text" 
                  />
                </div>
                <div className="col-span-1 group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2 ml-4">Last Name*</label>
                  <input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full h-11 md:h-14 px-4 rounded-md border-slate-200 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 bg-white font-bold text-sm md:text-base transition-all outline-none" 
                    placeholder="Doe" 
                    type="text" 
                  />
                </div>
                <div className="col-span-2 group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2 ml-4">House No. / Building*</label>
                  <input 
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleInputChange}
                    className="w-full h-11 md:h-14 px-4 rounded-md border-slate-200 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 bg-white font-bold text-sm md:text-base transition-all outline-none" 
                    placeholder="e.g. Flat 402, Echo Enclave" 
                    type="text" 
                  />
                </div>
                <div className="col-span-2 group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2 ml-4">Area / Road Name*</label>
                  <input 
                    name="roadName"
                    value={formData.roadName}
                    onChange={handleInputChange}
                    className="w-full h-11 md:h-14 px-4 rounded-md border-slate-200 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 bg-white font-bold text-sm md:text-base transition-all outline-none" 
                    placeholder="e.g. MG Road, Near City Center" 
                    type="text" 
                  />
                </div>
                <div className="col-span-1 group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2 ml-4">City*</label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full h-11 md:h-14 px-4 rounded-md border-slate-200 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 bg-white font-bold text-sm md:text-base transition-all outline-none" 
                    placeholder="New Delhi" 
                    type="text" 
                  />
                </div>
                <div className="col-span-1 group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2 ml-4">Pincode*</label>
                  <input 
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full h-11 md:h-14 px-4 rounded-md border-slate-200 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 bg-white font-bold text-sm md:text-base transition-all outline-none" 
                    placeholder="110001" 
                    type="text" 
                  />
                </div>
              </div>
            </section>
          </div>

          <section className="bg-white border-2 md:border-4 border-slate-50 rounded-lg p-6 md:p-10 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="bg-[#e31c3d] p-2 md:p-2.5 rounded-md shadow-lg shadow-[#e31c3d]/20">
                <QrCode className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h2 className="text-lg md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Choose Payment</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                className={`relative flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border-2 transition-all duration-300 group ${
                  formData.paymentMethod === 'upi' 
                    ? 'border-[#e31c3d] bg-red-50/30' 
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg mb-2 transition-colors ${formData.paymentMethod === 'upi' ? 'bg-[#e31c3d] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  <QrCode size={24} />
                </div>
                <span className={`text-xs md:text-sm font-black uppercase tracking-widest ${formData.paymentMethod === 'upi' ? 'text-[#e31c3d]' : 'text-slate-500'}`}>Pay via UPI</span>
                <span className="text-[8px] md:text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-2 uppercase tracking-tight">Save 15% Extra</span>
                {formData.paymentMethod === 'upi' && (
                  <div className="absolute -top-2 -right-2 bg-[#e31c3d] text-white p-1 rounded-full"><Check size={12} /></div>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                className={`relative flex flex-col items-center justify-center p-4 md:p-6 rounded-xl border-2 transition-all duration-300 group ${
                  formData.paymentMethod === 'cod' 
                    ? 'border-slate-900 bg-slate-100' 
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg mb-2 transition-colors ${formData.paymentMethod === 'cod' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  <Truck size={24} />
                </div>
                <span className={`text-xs md:text-sm font-black uppercase tracking-widest ${formData.paymentMethod === 'cod' ? 'text-slate-900' : 'text-slate-500'}`}>Cash on Delivery</span>
                <span className="text-[8px] md:text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight">Standard Price</span>
                {formData.paymentMethod === 'cod' && (
                  <div className="absolute -top-2 -right-2 bg-slate-900 text-white p-1 rounded-full"><Check size={12} /></div>
                )}
              </button>
            </div>

            <AnimatePresence>
              {formData.paymentMethod === 'cod' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8"
                >
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex gap-3 items-center">
                    <div className="size-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                      <RefreshCw size={16} className="animate-spin-slow" />
                    </div>
                    <div>
                      <h4 className="text-[11px] md:text-xs font-black text-orange-900 uppercase">Wait! You're paying more.</h4>
                      <p className="text-[10px] md:text-[11px] text-orange-800 font-bold">Switch to UPI now to claim your <span className="text-[#e31c3d] underline">15% Instant Discount</span> (Save ₹{((subtotal+tax)*0.15).toLocaleString()}).</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {formData.paymentMethod === 'upi' ? (
                <motion.div 
                  key="upi-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col items-center justify-center p-4 md:p-10 bg-[#fef2f2] rounded-lg border border-red-50 gap-4 md:gap-6">
                    <div className="size-40 md:size-64 bg-white p-3 md:p-5 rounded-lg shadow-2xl shadow-[#e31c3d]/10 flex items-center justify-center relative group overflow-hidden border border-red-50/50">
                       <img 
                         src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=store@upi%26pn=EchoKart%26am=${total}%26cu=INR`} 
                         alt="Payment QR"
                         className="relative z-10 w-full h-full mix-blend-multiply transition-transform group-hover:scale-110 duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-tr from-[#e31c3d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs md:text-xl font-black text-slate-800 tracking-tight mb-2 md:mb-3">VPA ID: <span className="text-[#e31c3d]">store@upi</span></p>
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('store@upi');
                          alert('UPI ID copied to clipboard!');
                        }}
                        className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#e31c3d] py-2 md:py-3 px-4 md:px-6 rounded-full bg-white border border-red-100 shadow-sm hover:shadow-md transition-all flex items-center gap-2 mx-auto active:scale-90"
                      >
                        <Copy size={10} /> Copy ID
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3 md:gap-4 bg-black text-white p-4 md:p-5 rounded-lg shadow-xl shadow-black/10">
                      <Shield size={20} className="shrink-0 text-[#00c853]" />
                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-relaxed">Safety Note: Enter 12-digit UTR after payment</p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-6 mb-2 md:mb-3">Transaction ID (UTR)*</label>
                      <input 
                        name="utrNumber"
                        value={formData.utrNumber}
                        onChange={handleInputChange}
                        className="w-full h-11 md:h-20 rounded-lg border-slate-100 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 p-4 md:p-6 bg-slate-50 font-black tracking-[0.2em] text-lg md:text-3xl text-center text-slate-900 placeholder:text-slate-200 outline-none transition-all" 
                        placeholder="0000 0000 0000" 
                        type="text" 
                        maxLength={12}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="cod-tab"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center p-10 md:p-16 text-center"
                >
                  <div className="size-24 md:size-32 bg-[#e31c3d]/5 rounded-lg flex items-center justify-center text-[#e31c3d] mb-8 relative">
                    <Truck size={48} md-size={70} />
                    <div className="absolute inset-0 border-4 border-dashed border-[#e31c3d]/20 rounded-lg animate-[spin_10s_linear_infinite]"></div>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 tracking-tighter uppercase italic">Pay on Delivery</h3>
                  <p className="text-slate-400 font-bold text-sm md:text-base max-w-xs mx-auto mb-10 leading-relaxed uppercase tracking-tight">Pay securely at your doorstep when your order arrives.</p>
                  <div className="px-8 py-3 bg-green-50 rounded-full text-[#00c853] text-[10px] font-black uppercase tracking-[0.2em] border border-green-100">
                    Trusted Choice
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Right Column: Order Summary - Mirrored Layout from CartPage */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white rounded-lg p-5 sm:p-8 pb-4 md:pb-8 sticky top-28 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-6 sm:mb-8 uppercase tracking-tight">Order Review</h2>
            
            <div className="space-y-4 md:space-y-6 mb-4 md:mb-8 border-b pb-4 md:pb-8 border-slate-100">
              {cart.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="relative size-14 md:size-16 bg-slate-50 rounded-md overflow-hidden border border-slate-100 shrink-0 shadow-sm transition-all group-hover:scale-105">
                    <img className="w-full h-full object-cover mix-blend-multiply" alt={item.name} src={item.image} />
                    <span className="absolute -top-1 -right-1 size-5 bg-black text-white text-[10px] flex items-center justify-center rounded-full font-black">{item.quantity}</span>
                  </div>
                  <div className="flex-1 py-1">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-0.5 md:mb-1 line-clamp-1">{item.name}</h4>
                    <p className="text-sm font-black text-[#e31c3d]">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex justify-between text-slate-500 font-medium text-xs md:text-sm">
                <span>Subtotal</span>
                <span className="text-slate-900 font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium text-xs md:text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-extrabold uppercase text-[9px] md:text-[10px] tracking-widest bg-green-50 px-2 py-0.5 md:py-1 rounded">Free</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium text-xs md:text-sm">
                <span>GST (18%)</span>
                <span className="text-slate-900 font-bold">₹{tax.toLocaleString()}</span>
              </div>
              {upiDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-bold text-xs md:text-sm bg-green-50/50 p-2 rounded-lg border border-green-100">
                  <span>UPI Discount (15%)</span>
                  <span>-₹{upiDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-slate-100 mt-2 md:mt-4">
                <span className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight">Total to Pay</span>
                <span className="text-xl md:text-2xl font-black text-[#e31c3d]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleCompletePurchase}
              disabled={isSubmitting || cart.length === 0}
              className="w-full bg-[#e31c3d] hover:bg-[#c81935] text-white font-black py-4 rounded-md flex items-center justify-center gap-3 transition-all transform hover:shadow-lg active:scale-[0.98] uppercase tracking-widest text-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Order
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            <div className="mt-12 flex justify-center gap-8 border-t border-slate-50 pt-10">
               <div className="flex flex-col items-center gap-2">
                 <Shield className="text-slate-200 w-8 h-8" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secure</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <RefreshCw className="text-slate-200 w-8 h-8" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Exchanges</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <Headphones className="text-slate-200 w-8 h-8" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Support</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer Purchase Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
          <button 
            onClick={handleCompletePurchase}
            disabled={isSubmitting || cart.length === 0}
            className="w-full bg-[#e31c3d] text-white font-black py-4 rounded-md shadow-xl shadow-[#e31c3d]/20 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Purchase"}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
      </div>
      <div className="h-16 lg:hidden"></div> {/* Spacer for fixed footer */}
    </motion.div>
  );
};
