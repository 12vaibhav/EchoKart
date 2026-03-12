import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Download, 
  Eye, 
  Trash2,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const OrdersManagement = ({ onNavigate }: { onNavigate: (path: string, id?: any) => void }) => {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedOrders = data.map(order => {
          let customerName = 'Guest Customer';
          if (order.shipping_address) {
            customerName = order.shipping_address.split(',')[0].trim();
          }
          
          return {
            id: order.id,
            displayId: order.id.split('-')[0].toUpperCase(), // Short visible ID
            customer: customerName,
            avatar: null,
            date: new Date(order.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            total: parseFloat(order.total_amount),
            status: order.status || 'Pending',
            paymentMethod: order.payment_method,
            utrNumber: order.utr_number
          };
        });
        setOrders(mappedOrders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;

    try {
      setLoading(true);
      // 1. Delete order items first (if cascade delete is not enabled in DB)
      const { error: itemsError } = await supabase
        .from('order_items')
        .delete()
        .eq('order_id', id);

      if (itemsError) throw itemsError;

      // 2. Delete the order
      const { error: orderError } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (orderError) throw orderError;

      // 3. Update local state
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Subscribe to new orders or status updates
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'Order Placed': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = activeTab === 'All Orders' || order.status === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || order.id.toLowerCase().includes(q) || order.customer.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <motion.div {...fadeInUpProps} className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
      
      {/* Header Area in Dashboard */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">Manage Orders</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID or customer name..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e31c3d]/50 focus:border-[#e31c3d] text-sm shadow-sm transition-all shadow-[#e31c3d]/5"
            />
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All Orders', 'Order Placed', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap border ${
                activeTab === tab 
                  ? 'bg-[#e31c3d]/10 text-[#e31c3d] border-[#e31c3d]/20' 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Total Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                         <div className="w-8 h-8 border-4 border-[#e31c3d] border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-sm font-bold text-slate-400">Loading orders...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Search className="w-10 h-10 text-slate-200" />
                        <p className="text-sm font-bold text-slate-400">No orders found</p>
                        <p className="text-xs text-slate-400">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => onNavigate('/dashboard/orders/detail', order.id)}
                    className="hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-[#e31c3d]">#{order.displayId}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
                          {order.avatar ? (
                            <img src={order.avatar} alt={order.customer} className="w-full h-full object-cover" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-xs bg-slate-100">{order.customer.charAt(0)}</div>
                          )}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{order.date}</td>
                    <td className="px-6 py-4">
                      {order.paymentMethod === 'upi' ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400">UPI Transaction</span>
                          <span className="text-xs font-black text-slate-900 tracking-wider font-mono bg-slate-100 px-2 py-0.5 rounded">{order.utrNumber || 'No UTR'}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-black uppercase text-slate-400">Cash on Delivery</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusStyles(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('/dashboard/orders/detail', order.id);
                          }}
                          className="p-2 text-slate-400 hover:bg-slate-100 hover:text-[#e31c3d] rounded-lg transition-all" 
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOrder(order.id);
                          }}
                          className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all" 
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Area */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{filteredOrders.length}</span> of <span className="font-bold text-slate-900">{orders.length}</span> orders
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
