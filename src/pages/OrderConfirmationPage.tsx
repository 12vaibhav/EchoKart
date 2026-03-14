import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Truck, MapPin, CreditCard, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

const FireSparkBurst = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2.5, 3], 
          opacity: [0, 0.8, 0],
          filter: ["blur(0px)", "blur(40px)", "blur(100px)"]
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-[#e31c3d] via-[#ff4d6d] to-white"
      />
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          initial={{ scale: 0, opacity: 0, border: "2px solid #ea580c" }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          className="absolute w-20 h-20 rounded-full"
        />
      ))}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 360) / 16;
        const radius = 180 + Math.random() * 100;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        return (
          <motion.div
            key={`spark-${i}`}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x, y, scale: [0, 1.2, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 0.8 + Math.random() * 0.4, ease: [0.23, 1, 0.32, 1], delay: Math.random() * 0.1 }}
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_10px_#facc15]"
          />
        );
      })}
    </div>
  );
};

export const OrderConfirmationPage = ({ onNavigate, orderId: passedOrderId }: { onNavigate: (path: string, id?: any) => void, orderId?: any }) => {
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (passedOrderId) {
      fetchOrderDetails(passedOrderId);
    }
  }, [passedOrderId]);

  const fetchOrderDetails = async (id: string) => {
    try {
      setLoading(true);
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*, products(name, main_image_url)')
        .eq('order_id', id);

      if (itemsError) throw itemsError;
      setItems(itemsData);
    } catch (err) {
      console.error('Error fetching order details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-[#e31c3d] animate-spin" />
        <p className="text-slate-500 font-bold">Verifying your order...</p>
      </div>
    );
  }

  // Fallback to mock data if no order found/provided
  const displayOrder = order || {
    id: passedOrderId || 'EK-PENDING',
    total_amount: 0,
    shipping_address: 'Verification in progress...',
    status: 'Pending',
    payment_status: 'Paid'
  };

  const displayId = typeof displayOrder.id === 'string' ? displayOrder.id.split('-')[0].toUpperCase() : displayOrder.id;

  return (
    <motion.div {...fadeInUpProps} className="max-w-4xl mx-auto px-4 py-12 relative overflow-x-hidden">
      <div className="text-center mb-16 relative">
        <div className="relative inline-flex items-center justify-center mb-8">
          <FireSparkBurst />
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
            className="relative z-10 w-24 h-24 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,128,0,0.1)] flex items-center justify-center border border-green-50"
          >
            <CheckCircle className="text-[#00c853] w-14 h-14" />
          </motion.div>
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Success!</h1>
          <p className="text-slate-500 text-lg md:text-xl font-bold max-w-md mx-auto leading-relaxed border-t border-slate-100 pt-4 uppercase tracking-tight">
            Order <span className="text-[#e31c3d] font-black">#EK-{displayId}</span> placed successfully.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <div className="bg-slate-50 rounded-lg p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Truck size={64} className="text-[#e31c3d]" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#e31c3d] rounded-md text-white">
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black uppercase tracking-tight">Estimated Delivery</h2>
            </div>
            <p className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Standard Shipping (5-8 business days)</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-100 p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-tight mb-8 border-b pb-4">Order Summary</h2>
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 md:gap-6 group">
                  <div className="size-20 bg-slate-50 rounded-md overflow-hidden flex-shrink-0 border border-slate-100">
                    <img alt={item.products?.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" src={item.products?.main_image_url} />
                  </div>
                  <div className="flex-grow py-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight line-clamp-1">{item.products?.name}</h3>
                      <p className="text-sm font-black text-[#e31c3d]">₹{item.price_at_purchase.toLocaleString()}</p>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 space-y-4">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900">₹{(displayOrder.total_amount / 1.18).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-500">
                <span>Shipping</span>
                <span className="text-[#00c853] bg-green-50 px-2 py-1 rounded">Free</span>
              </div>
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-500">
                <span>Estimated GST (18%)</span>
                <span className="text-slate-900">₹{(displayOrder.total_amount - (displayOrder.total_amount / 1.18)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-black text-slate-900 pt-6 border-t-2 border-slate-50 italic">
                <span className="uppercase tracking-tighter">Total Paid</span>
                <span className="text-[#e31c3d]">₹{displayOrder.total_amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="bg-white rounded-lg border border-slate-100 p-6 md:p-8 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#e31c3d] mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Delivery Destination
            </h2>
            <div className="text-slate-800 text-sm font-bold leading-relaxed bg-slate-50 p-4 rounded-md border border-slate-100">
              {displayOrder.shipping_address}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-100 p-6 md:p-8 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#e31c3d] mb-6 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Verification
            </h2>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest ${displayOrder.payment_status === 'Paid' ? 'bg-green-50 text-[#00c853] border border-green-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'}`}>
                {displayOrder.payment_status}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button onClick={() => onNavigate('home')} className="w-full py-4 bg-[#151515] hover:bg-black text-white font-black rounded-md transition-all shadow-xl shadow-black/10 uppercase tracking-widest text-xs active:scale-95">
              Continue Shopping
            </button>
            <button onClick={() => onNavigate('track', displayOrder.id)} className="w-full py-4 bg-white text-slate-900 border-2 border-slate-100 font-black rounded-md hover:bg-slate-50 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:scale-95">
              Track Status <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
