import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Receipt, Check, Truck, MapPin, Verified, Search, ArrowRight, Package, Calendar, Loader2, RefreshCw } from 'lucide-react';
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full bg-slate-50 rounded-lg p-6 md:p-12 border border-slate-100 shadow-sm text-center"
        >
          <div className="w-16 h-16 bg-[#e31c3d] rounded-md flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#e31c3d]/20">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Track Order</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Enter your order ID from confirmation email</p>
          
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#e31c3d] transition-colors" />
              <input 
                type="text" 
                placeholder="Order ID (e.g. xxxxxxxx-xxxx-...)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-md py-4 pl-14 pr-6 focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 outline-none transition-all font-bold text-sm md:text-base placeholder:text-slate-300"
                required
              />
            </div>
            {error && <p className="text-xs text-[#e31c3d] font-black uppercase tracking-tight">{error}</p>}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#151515] hover:bg-black text-white font-black py-4 rounded-md transition-all shadow-lg flex items-center justify-center gap-3 group tracking-widest text-xs uppercase disabled:opacity-50 active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Locate Shipment
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
    const steps = ['Order Placed', 'Picked', 'Shipped', 'In-Transit', 'Out for Delivery', 'Delivered'];
    const idx = steps.indexOf(status === 'Pending' ? 'Order Placed' : status);
    if (idx === -1) return '0%';
    return `${(idx / (steps.length - 1)) * 100}%`;
  };

  const statusIdx = (status: string) => {
    const steps = ['Order Placed', 'Picked', 'Shipped', 'In-Transit', 'Out for Delivery', 'Delivered'];
    const idx = steps.indexOf(status === 'Pending' ? 'Order Placed' : status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <motion.div {...fadeInUpProps} className="max-w-7xl mx-auto px-4 py-8 md:py-16 bg-white">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-slate-100 pb-8">
        <div>
          <nav className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
             <span>Account</span>
            <span className="text-slate-200">/</span>
             <span>Orders</span>
            <span className="text-slate-200">/</span>
            <span className="text-[#e31c3d]">#{order?.id.split('-')[0].toUpperCase()}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase italic">Track Shipment</h1>
          {order && (
            <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50 inline-block px-4 py-2 rounded">
              Order #{order.id} • Placed {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { setStage('search'); setOrder(null); }}
            className="flex items-center gap-2 rounded-md border-2 border-slate-100 px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            <Search className="w-4 h-4" />
            New Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div className="rounded-lg bg-slate-50 p-6 md:p-10 border border-slate-100 shadow-sm">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 italic">Delivery Timeline</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{order?.status === 'Delivered' ? 'Package successfully delivered' : 'Your package is on the way'}</p>
              </div>
              <span className="rounded-md bg-white border border-slate-200 px-4 py-2 text-[10px] font-black text-[#e31c3d] tracking-widest uppercase shadow-sm">{order?.status}</span>
            </div>

            <div className="relative mb-16 md:mb-20 px-2 sm:px-4">
              <div className="absolute left-0 top-5 h-1 w-full bg-slate-200 rounded-full -z-10"></div>
              <div 
                className="absolute left-0 top-5 h-1 bg-[#e31c3d] rounded-full -z-10 transition-all duration-1000 shadow-[0_0_10px_rgba(227,28,61,0.5)]"
                style={{ width: getStatusProgress(order?.status) }}
              ></div>
              
              <div className="relative flex justify-between">
                {[
                  { label: 'Placed', icon: Check, status: 'Order Placed' },
                  { label: 'Picked', icon: Package, status: 'Picked' },
                  { label: 'Shipped', icon: Truck, status: 'Shipped' },
                  { label: 'In-Transit', icon: RefreshCw, status: 'In-Transit' },
                  { label: 'On Way', icon: MapPin, status: 'Out for Delivery' },
                  { label: 'Delivered', icon: Verified, status: 'Delivered' }
                ].map((step, idx) => {
                  const isActive = statusIdx(order?.status) >= idx;
                  const isCurrent = statusIdx(order?.status) === idx;
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-md ring-4 md:ring-8 ring-slate-50 shadow-md transition-all ${isActive ? 'bg-[#e31c3d] text-white' : 'bg-white text-slate-200 border border-slate-100'} ${isCurrent ? 'scale-110 shadow-lg shadow-[#e31c3d]/20' : ''}`}>
                        <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <p className={`mt-4 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>{step.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 md:p-10 border border-slate-100 shadow-sm">
            <h3 className="mb-8 text-xl font-black uppercase tracking-tight text-slate-900 border-b pb-6 italic">Package Contents <span className="text-slate-300 not-italic ml-2">({items.length})</span></h3>
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 pb-6 border-b border-slate-50 last:border-0 last:pb-0 group">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-slate-50 border border-slate-100 p-2 group-hover:scale-105 transition-transform duration-500">
                    <img className="h-full w-full object-contain mix-blend-multiply" alt={item.products?.name} src={item.products?.main_image_url} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight leading-tight line-clamp-2">{item.products?.name}</h4>
                    <p className="text-[10px] font-black text-[#e31c3d] uppercase tracking-[0.2em] mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right font-black text-sm text-slate-900">₹{item.price_at_purchase.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg bg-white p-8 border border-slate-100 shadow-sm">
            <h3 className="mb-8 text-xs font-black uppercase tracking-widest text-[#e31c3d] border-b border-slate-50 pb-4 flex items-center gap-2">
              <MapPin size={14} /> Shipping Destination
            </h3>
            <div className="flex gap-5">
              <div className="text-xs font-bold text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-md border border-slate-100 w-full">
                {order?.shipping_address}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-[#151515] p-8 text-white shadow-xl shadow-black/10">
            <h3 className="mb-8 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-white/10 pb-4">Transaction Details</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Charged</span>
                <span className="text-3xl font-black text-white italic tracking-tighter">₹{order?.total_amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-md">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment</span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${order?.payment_status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{order?.payment_status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
