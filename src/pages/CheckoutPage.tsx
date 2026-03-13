import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Mail, Truck, QrCode, Lock, Shield, RefreshCw, Headphones, ArrowRight, Loader2, Copy } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const CheckoutPage = ({ onNavigate }: { onNavigate: (path: string, id?: any) => void }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  const shipping = 0; // Free shipping as per FAQS
  const tax = subtotal * 0.18; // 18% GST example
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompletePurchase = async () => {
    if (cart.length === 0) return;

    // 1. Validate mandatory information
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

    // 2. Validate UPI UTR specifically
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
      
      // 1. Create the order
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

      // 2. Create order items
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

      // 3. Success! Clear cart and navigate
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
    <motion.div {...fadeInUpProps} className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Progress Stepper */}
      <div className="mb-12 max-w-2xl mx-auto px-4 mt-4">
        <div className="flex items-center justify-between mb-4 relative">
          <div className="absolute top-[1.25rem] left-0 w-full h-[2px] bg-slate-100 z-0"></div>
          <div className="absolute top-[1.25rem] left-0 w-1/2 h-[2px] bg-[#e31c3d] z-0 transition-all duration-700"></div>
          
          <div className="z-10 flex flex-col items-center gap-3 cursor-pointer" onClick={() => onNavigate('cart')}>
            <div className="w-10 h-10 rounded-full bg-[#e31c3d] text-white flex items-center justify-center font-black text-sm shadow-md ring-4 ring-white">
              <Check className="w-5 h-5 stroke-[3px]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Cart</span>
          </div>
          
          <div className="z-10 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e31c3d] text-white flex items-center justify-center font-black text-sm shadow-lg shadow-[#e31c3d]/20 ring-4 ring-white">2</div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Review</span>
          </div>
          
          <div className="z-10 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black text-sm ring-4 ring-white transition-all">3</div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Checkout</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#e31c3d]/10 p-2 rounded-lg">
                <Mail className="text-[#e31c3d] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1.5">Email Address*</label>
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-slate-300 focus:border-[#e31c3d] focus:ring-[#e31c3d] p-3 border" 
                  placeholder="email@example.com" 
                  type="email" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1.5">Phone Number*</label>
                <input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-slate-300 focus:border-[#e31c3d] focus:ring-[#e31c3d] p-3 border" 
                  placeholder="e.g. +1 123 456 7890" 
                  type="tel" 
                />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#e31c3d]/10 p-2 rounded-lg">
                <Truck className="text-[#e31c3d] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Shipping Address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-semibold mb-1.5">First Name*</label>
                <input 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-slate-300 focus:border-[#e31c3d] focus:ring-[#e31c3d] p-3 border" 
                  placeholder="John" 
                  type="text" 
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-semibold mb-1.5">Last Name*</label>
                <input 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-slate-300 focus:border-[#e31c3d] focus:ring-[#e31c3d] p-3 border" 
                  placeholder="Doe" 
                  type="text" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1.5">House number/building name*</label>
                <input 
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-slate-300 focus:border-[#e31c3d] focus:ring-[#e31c3d] p-3 border" 
                  placeholder="e.g. Apartment 4B, Echo Heights" 
                  type="text" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1.5">Road name/Area/Colony*</label>
                <input 
                  name="roadName"
                  value={formData.roadName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-slate-300 focus:border-[#e31c3d] focus:ring-[#e31c3d] p-3 border" 
                  placeholder="e.g. Main Street, Sector 5" 
                  type="text" 
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-semibold mb-1.5">City*</label>
                <input 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-slate-300 focus:border-[#e31c3d] focus:ring-[#e31c3d] p-3 border" 
                  placeholder="New York" 
                  type="text" 
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-semibold mb-1.5">Pincode*</label>
                <input 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-slate-300 focus:border-[#e31c3d] focus:ring-[#e31c3d] p-3 border" 
                  placeholder="10001" 
                  type="text" 
                />
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#e31c3d]/10 p-2 rounded-lg">
                <QrCode className="text-[#e31c3d] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Payment Method</h2>
            </div>
            
            <div className="bg-white border-2 border-slate-100 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 shadow-sm overflow-hidden">
              {/* Premium Tabs */}
              <div className="flex flex-col sm:flex-row p-1.5 bg-slate-100 rounded-2xl mb-8 gap-1.5 sm:gap-0">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    formData.paymentMethod === 'upi' 
                      ? 'bg-white text-[#e31c3d] shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <QrCode size={16} />
                  UPI Payment
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    formData.paymentMethod === 'cod' 
                      ? 'bg-white text-[#e31c3d] shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Truck size={16} />
                  Cash on Delivery
                </button>
              </div>

              <AnimatePresence mode="wait">
                {formData.paymentMethod === 'upi' ? (
                  <motion.div 
                    key="upi-tab"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200 gap-6">
                      <div className="size-56 bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 flex items-center justify-center relative group overflow-hidden">
                         <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                            <QrCode className="w-12 h-12 text-[#e31c3d] opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scan QR to Pay ₹{total.toLocaleString()}</p>
                         </div>
                         <img 
                           src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=store@upi%26pn=EchoKart%26am=${total}%26cu=INR`} 
                           alt="Payment QR"
                           className="relative z-10 w-44 h-44 mix-blend-multiply transition-transform group-hover:scale-110 duration-500"
                         />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-black text-slate-900 tracking-tight">VPA: store@upi</p>
                        <button 
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('store@upi');
                            alert('UPI ID copied to clipboard!');
                          }}
                          className="text-[10px] font-black uppercase tracking-widest text-[#e31c3d] hover:underline mt-2 flex items-center gap-1.5 justify-center bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm"
                        >
                          <Copy size={12} /> Copy UPI ID
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-[#f59e0b] bg-[#fffbeb] p-4 rounded-2xl border border-[#fef3c7]">
                        <Shield size={20} className="shrink-0" />
                        <p className="text-xs font-black uppercase tracking-wider leading-relaxed">Safety Note: Please enter your 12-digit UTR below after transaction</p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-2">Transaction Ref (UTR)*</label>
                        <input 
                          name="utrNumber"
                          value={formData.utrNumber}
                          onChange={handleInputChange}
                          required={formData.paymentMethod === 'upi'}
                          className="w-full rounded-2xl border-slate-200 focus:border-[#e31c3d] focus:ring-[#e31c3d] p-5 border bg-white font-black tracking-widest text-xl placeholder:text-slate-200" 
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="size-20 bg-[#e31c3d]/10 rounded-3xl flex items-center justify-center text-[#e31c3d] mb-6">
                      <Truck size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Cash on Delivery</h3>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto">Pay with cash when your package arrives at your doorstep.</p>
                    <div className="mt-8 px-6 py-3 bg-green-50 rounded-full text-[#00c853] text-[10px] font-black uppercase tracking-widest border border-green-100">
                      Standard delivery charges apply
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-2 mt-6 text-[#00c853] font-black text-xs uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              End-to-end encrypted checkout
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 sticky top-28 shadow-xl shadow-slate-200/50">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            {/* Product List */}
            <div className="space-y-4 mb-8">
              {cart.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="relative size-16 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    <img className="w-full h-full object-cover mix-blend-multiply" alt={item.name || item.title} src={item.image || (item.images && item.images[0])} />
                    <span className="absolute -top-1 -right-1 size-5 bg-slate-800 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold">{item.name || item.title}</h4>
                    {item.variant && <p className="text-xs text-slate-500">{item.variant}</p>}
                  </div>
                  <span className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Discount Code */}
            <div className="flex gap-2 mb-8">
              <input className="flex-1 rounded-lg border-slate-300 text-sm focus:border-[#e31c3d] focus:ring-[#e31c3d] p-3 border" placeholder="Gift card or discount code" type="text" />
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors text-sm">Apply</button>
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t border-slate-100 pt-6 mb-8">
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Shipping</span>
                <span className="text-[#00c853] font-medium">Free</span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm">
                <span>Estimated Taxes (GST 18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-black pt-2 border-t border-slate-100 mt-2">
                <span>Total</span>
                <span className="text-[#e31c3d]">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Main Button */}
            <button 
              onClick={handleCompletePurchase}
              disabled={isSubmitting || cart.length === 0}
              className="w-full bg-[#e31c3d] hover:bg-[#c81935] text-white font-extrabold py-4 rounded-xl shadow-lg shadow-[#e31c3d]/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Purchase
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 pt-8">
              <div className="flex flex-col items-center gap-1 text-center">
                <Shield className="text-slate-400 w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <RefreshCw className="text-slate-400 w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">7 Day Return</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Headphones className="text-slate-400 w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
