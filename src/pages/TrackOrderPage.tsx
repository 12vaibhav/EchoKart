import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Receipt, Check, Truck, MapPin, Verified, Search, ArrowRight, Package, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const TrackOrderPage = ({ initialOrderId = '' }: { initialOrderId?: string }) => {
  const [stage, setStage] = useState<'search' | 'results'>(initialOrderId ? 'results' : 'search');
  const [orderId, setOrderId] = useState(initialOrderId);
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
      handleTrack(initialOrderId);
    }
  }, [initialOrderId]);

  const handleTrack = async (id: string) => {
    const cleanId = id.replace('#', '').trim();
    if (!cleanId) return;

    try {
      setLoading(true);
      setError(null);
      
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanId);
      let data = null;

      if (isUUID) {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', cleanId)
          .maybeSingle();
        
        if (orderError) throw orderError;
        data = orderData;
      } else {
        // Support short ID / ID Prefix (e.g. EK-A1B2 or just A1B2)
        const prefix = cleanId.replace('EK-', '').toLowerCase();
        
        // Use a range-based search for short IDs (UUID friendly)
        if (prefix.length >= 4) {
          // Construct min and max UUID for the prefix range
          const base = prefix.padEnd(32, '0');
          const top = prefix.padEnd(32, 'f');
          
          const format = (s: string) => `${s.slice(0,8)}-${s.slice(8,12)}-${s.slice(12,16)}-${s.slice(16,20)}-${s.slice(20)}`;
          
          const { data: results, error: rangeError } = await supabase
            .from('orders')
            .select('*')
            .gte('id', format(base))
            .lte('id', format(top));
            
          if (!rangeError && results && results.length > 0) {
            data = results[0];
          }
        }
      }

      if (!data) {
        setError('Order not found. Please ensure you are using the full Order ID (e.g. xxxxxxxx-xxxx-...).');
        setStage('search');
        return;
      }

      setOrder(data);
      setOrderId(data.id);

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*, products(name, main_image_url)')
        .eq('order_id', data.id);

      if (itemsError) throw itemsError;
      setItems(itemsData);
      setStage('results');
    } catch (err) {
      console.error('Tracking error:', err);
      setError('An error occurred while tracking. Please try again.');
      setStage('search');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack(orderId);
  };

  if (stage === 'search') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-gray-50 to-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 text-center"
        >
          <div className="w-20 h-20 bg-[#e31c3d]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
            <Package className="w-10 h-10 text-[#e31c3d]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Track Your Order</h1>
          <p className="text-gray-500 mb-10 font-medium">Enter your Order ID (found in success page or email) to check real-time status.</p>
          
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#e31c3d] transition-colors" />
              <input 
                type="text" 
                placeholder="Full Order ID (e.g. xxxxxxxx-xxxx-...)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:bg-white focus:border-[#e31c3d] outline-none transition-all font-bold text-lg placeholder:font-medium"
                required
              />
            </div>
            {error && <p className="text-sm text-[#e31c3d] font-bold">{error}</p>}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#151515] hover:bg-black text-white font-black py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group tracking-widest text-sm uppercase disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Track Status
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'Pending': return '25%';
      case 'Shipped': return '50%';
      case 'Out for Delivery': return '75%';
      case 'Delivered': return '100%';
      default: return '25%';
    }
  };

  const statusIdx = (status: string) => {
    const steps = ['Pending', 'Shipped', 'Out for Delivery', 'Delivered'];
    const idx = steps.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <motion.div {...fadeInUpProps} className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <nav className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 font-sans">
             <span>Account</span>
            <span>›</span>
             <span>Orders</span>
            <span>›</span>
            <span className="text-[#e31c3d]">Order #{order?.id.split('-')[0].toUpperCase()}</span>
          </nav>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Track Your Order</h1>
          {order && (
            <p className="mt-2 text-lg text-slate-600 font-medium">Order #{order.id.split('-')[0].toUpperCase()} • Placed on {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          )}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { setStage('search'); setOrder(null); }}
            className="flex items-center gap-2 rounded-lg border-2 border-slate-200 px-5 py-2.5 font-bold hover:bg-slate-100 transition-all"
          >
            <Search className="w-5 h-5" />
            New Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 font-sans">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Shipping Status</h3>
                <p className="text-slate-500 font-medium">{order?.status === 'Delivered' ? 'Package Delivered' : 'Estimated arrival in 3-5 days'}</p>
              </div>
              <span className="rounded-full bg-[#e31c3d]/10 px-4 py-1.5 text-xs font-black text-[#e31c3d] tracking-widest uppercase">{order?.status}</span>
            </div>

            <div className="relative mb-8 md:mb-12">
              <div className="absolute left-0 top-5 h-1.5 w-full bg-slate-100 rounded-full -z-10 mt-[-3px]"></div>
              <div 
                className="absolute left-0 top-5 h-1.5 bg-[#e31c3d] rounded-full -z-10 mt-[-3px] transition-all duration-1000"
                style={{ width: getStatusProgress(order?.status) }}
              ></div>
              
              <div className="relative flex justify-between">
                {[
                  { label: 'Confirmed', icon: Check, status: 'Pending' },
                  { label: 'Shipped', icon: Truck, status: 'Shipped' },
                  { label: 'In Delivery', icon: MapPin, status: 'Out for Delivery' },
                  { label: 'Delivered', icon: Verified, status: 'Delivered' }
                ].map((step, idx) => {
                  const isActive = statusIdx(order?.status) >= idx;
                  return (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-8 ring-white shadow-lg transition-all ${isActive ? 'bg-[#e31c3d] text-white shadow-red-500/20' : 'bg-slate-100 text-slate-400'}`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <p className={`mt-4 text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
            <h3 className="mb-8 text-xl font-black uppercase tracking-tight">Order Items ({items.length})</h3>
            <div className="space-y-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 md:gap-8 pb-8 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-2">
                    <img className="h-full w-full object-contain mix-blend-multiply" alt={item.products?.name} src={item.products?.main_image_url} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-gray-900 leading-tight">{item.products?.name}</h4>
                    <p className="text-xs font-black text-[#e31c3d] uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right font-black text-lg text-gray-900">₹{item.price_at_purchase.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
            <h3 className="mb-8 text-lg font-black uppercase tracking-tight border-b border-slate-50 pb-4">Shipping Details</h3>
            <div className="space-y-10">
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                   <MapPin className="text-[#e31c3d] w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                  <p className="text-[13px] text-slate-600 font-bold leading-relaxed mt-1">
                    {order?.shipping_address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#151515] p-8 text-white shadow-2xl shadow-gray-900/20 relative overflow-hidden">
            <h3 className="mb-8 text-lg font-black uppercase tracking-tight border-b border-white/10 pb-4">Order Summary</h3>
            <div className="space-y-5">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-gray-400">Total Charged</span>
                <span className="text-3xl font-black text-white">₹{order?.total_amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-gray-400">Payment</span>
                <span className={`font-black ${order?.payment_status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>{order?.payment_status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
