import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User,
  ArrowLeft, 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail,
  ExternalLink,
  ChevronRight,
  Loader2,
  CreditCard
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

type OrderStatus = 'Order Placed' | 'Picked' | 'Shipped' | 'In-Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Pending';

export const OrderDetailsPage = ({ orderId, onBack }: { orderId: string, onBack: () => void }) => {
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const STATUS_STEPS: OrderStatus[] = ['Order Placed', 'Picked', 'Shipped', 'In-Transit', 'Out for Delivery', 'Delivered'];

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*, products(name, main_image_url, price)')
        .eq('order_id', orderId);

      if (itemsError) throw itemsError;
      setItems(itemsData);
    } catch (err) {
      console.error('Error fetching order details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const getStatusIndex = (s: OrderStatus) => {
    const idx = STATUS_STEPS.indexOf(s as any);
    return idx === -1 ? 0 : idx;
  };

  const handleStatusUpdate = async (newStatus: OrderStatus, newPaymentStatus?: string) => {
    try {
      setIsUpdating(true);
      const updates: any = { status: newStatus };
      if (newPaymentStatus) updates.payment_status = newPaymentStatus;
      
      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId);

      if (error) throw error;
      const updatedOrder = { ...order, ...updates };
      setOrder(updatedOrder);

      // Trigger email notification
      try {
        await supabase.functions.invoke('notify-order-status-v1', {
          body: { order: updatedOrder, status: newStatus }
        });
      } catch (emailErr) {
        console.error('Error sending status email notification:', emailErr);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#e31c3d] animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Order Details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <button onClick={onBack} className="text-[#e31c3d] font-bold">Back to Orders</button>
      </div>
    );
  }

  const subtotal = order.total_amount / 1.18;
  const tax = order.total_amount - subtotal;
  const currentStatus = order.status as OrderStatus;

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-100"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order #{orderId.split('-')[0].toUpperCase()}</h1>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                currentStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-[#e31c3d]/10 text-[#e31c3d]'
              }`}>
                {currentStatus}
              </span>
            </div>
            <p className="text-slate-500 font-medium">Placed on {new Date(order.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Order Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Status Update Feature */}
          <motion.section {...fadeInUpProps} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2">
              <Package size={20} className="text-[#e31c3d]" />
              Update Fulfillment Status
            </h3>
            
            <div className="relative flex justify-between mb-12">
              <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 z-0"></div>
              <div 
                className="absolute top-5 left-0 h-0.5 bg-[#e31c3d] z-0 transition-all duration-1000"
                style={{ width: `${(getStatusIndex(currentStatus) / (STATUS_STEPS.length - 1)) * 100}%` }}
              ></div>

              {STATUS_STEPS.map((step, idx) => {
                const isActive = getStatusIndex(currentStatus) >= idx;
                const isCurrent = currentStatus === step;
                
                return (
                  <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                    <button 
                      onClick={() => handleStatusUpdate(step as OrderStatus)}
                      disabled={isUpdating}
                      className={`size-10 rounded-full flex items-center justify-center transition-all duration-500 border-4 border-white shadow-md ${
                        isActive ? 'bg-[#e31c3d] text-white' : 'bg-slate-200 text-slate-400'
                      } ${isCurrent ? 'ring-4 ring-[#e31c3d]/20 scale-110' : ''} hover:scale-105`}
                    >
                      {isActive ? <CheckCircle size={18} /> : <span>{idx + 1}</span>}
                    </button>
                    <span className={`text-[10px] font-black uppercase tracking-widest text-center max-w-[80px] ${
                      isActive ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {isUpdating && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="size-8 text-[#e31c3d] animate-spin" />
                    <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Updating...</span>
                </div>
              </div>
            )}
          </motion.section>

          {/* Items Table */}
          <motion.section {...fadeInUpProps} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <Package size={20} className="text-[#e31c3d]" />
              Order Items
            </h3>
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <div className="size-20 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                    <img 
                      src={item.products?.main_image_url} 
                      alt={item.products?.name} 
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-slate-900">{item.products?.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">₹{item.price_at_purchase.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{order.payment_status}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-50 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold">Subtotal</span>
                <span className="text-slate-900 font-black">₹{subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold">Shipping</span>
                <span className="text-green-600 font-black">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold">Estimated Tax</span>
                <span className="text-slate-900 font-black">₹{tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-xl pt-4 border-t border-slate-50">
                <span className="font-black text-slate-900">Total</span>
                <span className="font-black text-[#e31c3d]">₹{order.total_amount.toLocaleString()}</span>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Column: Customer Details */}
        <div className="space-y-8">
          <motion.section {...fadeInUpProps} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-[#e31c3d]" />
              Shipping Details
            </h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#e31c3d] shadow-sm">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900">Guest Customer</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{order.payment_status === 'Paid' ? 'Premium Order' : 'Standard Order'}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex gap-3">
                <MapPin size={18} className="text-slate-400 shrink-0" />
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {order.shipping_address}
                </p>
              </div>
            </div>
          </motion.section>

          {order.payment_method === 'upi' && (
            <motion.section {...fadeInUpProps} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-[#e31c3d]" />
                Payment Verification
              </h3>
              
              <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                <div className="flex flex-col gap-1 mb-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Transaction ID (UTR)</span>
                  <span className="text-xl font-black text-slate-900 font-mono tracking-tighter">{order.utr_number || 'Not Provided'}</span>
                </div>
                
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  order.payment_status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {order.payment_status}
                </div>
              </div>

              {order.payment_status !== 'Paid' && (
                <button
                  onClick={() => handleStatusUpdate(order.status, 'Paid')}
                  disabled={isUpdating}
                  className="w-full bg-[#e31c3d] text-white font-black py-4 rounded-2xl shadow-xl shadow-red-100 hover:shadow-red-200 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                >
                  <CheckCircle size={18} />
                  Verify & Mark as Paid
                </button>
              )}
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
};
