import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  ArrowRight,
  MoreVertical,
  CheckCircle,
  UserPlus,
  AlertTriangle,
  Star,
  RefreshCw,
  RotateCcw,
  CreditCard,
  ShoppingCart
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const StatCard = ({ title, value, change, isPositive, icon: Icon, colorClass, iconBgClass, onClick }: any) => {
  return (
    <div onClick={onClick} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${iconBgClass} ${colorClass}`}>
          <Icon size={24} />
        </div>
        <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider text-[10px]">{title}</p>
      <h3 className="text-2xl font-black text-slate-900">{value}</h3>
    </div>
  );
};

const RecentOrderRow = ({ id, customer, amount, status, avatar, onClick }: any) => {
  const getStatusStyles = () => {
    switch(status) {
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <tr onClick={onClick} className="hover:bg-slate-50 transition-colors cursor-pointer group">
      <td className="px-6 py-4 font-mono text-sm text-slate-600">#{id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-slate-100 overflow-hidden border border-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs text-center uppercase tracking-tighter">
             {avatar ? <img src={avatar} alt={customer} className="w-full h-full object-cover" /> : customer.charAt(0)}
          </div>
          <span className="text-sm font-bold text-slate-900 group-hover:text-[#e31c3d] transition-colors">{customer}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-black text-slate-900">{amount}</td>
      <td className="px-6 py-4 text-right">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyles()}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <MoreVertical size={18} className="text-slate-400" />
        </button>
      </td>
    </tr>
  );
};

export const DashboardOverview = ({ onNavigate }: any) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    newOrders: 0,
    returns: 0,
    conversion: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch orders
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;

        if (data) {
          const mappedOrders = data.map(order => {
            const customerName = order.shipping_address ? order.shipping_address.split(',')[0].trim() : 'Guest';
            return {
              id: order.id.split('-')[0].toUpperCase(),
              fullId: order.id,
              customer: customerName,
              amount: `₹${parseFloat(order.total_amount || 0).toLocaleString('en-IN')}`,
              status: order.status || 'Pending',
              avatar: null
            };
          });
          setOrders(mappedOrders);

          // Calculate summary stats (Simple mock-up logic for change %)
          const totalSales = data.reduce((acc, curr) => acc + parseFloat(curr.total_amount || 0), 0);
          setStats({
            totalSales: totalSales,
            newOrders: data.length,
            returns: 0, // Placeholder
            conversion: 3.2 // Placeholder
          });
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-[#e31c3d] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Overview...</p>
      </div>
    );
  }

  return (
    <motion.div {...fadeInUpProps} className="space-y-8 pb-10">
      
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500 mt-1">Track your store's performance and recent activity in real-time.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales" 
          value={`₹${stats.totalSales.toLocaleString('en-IN')}`} 
          change="+12.5%" 
          isPositive={true} 
          icon={CreditCard} 
          colorClass="text-[#e31c3d]"
          iconBgClass="bg-[#e31c3d]/10"
          onClick={() => onNavigate && onNavigate('/dashboard/analytics')}
        />
        <StatCard 
          title="Recent Orders" 
          value={stats.newOrders.toString()} 
          change={`+${stats.newOrders}`} 
          isPositive={true} 
          icon={ShoppingCart} 
          colorClass="text-blue-500"
          iconBgClass="bg-blue-500/10"
          onClick={() => onNavigate && onNavigate('/dashboard/orders')}
        />
        <StatCard 
          title="Active Returns" 
          value={stats.returns.toString()} 
          change="-0.0%" 
          isPositive={false} 
          icon={RotateCcw} 
          colorClass="text-orange-500"
          iconBgClass="bg-orange-500/10"
          onClick={() => onNavigate && onNavigate('/dashboard/returns')}
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${stats.conversion}%`} 
          change="+0.4%" 
          isPositive={true} 
          icon={TrendingUp} 
          colorClass="text-purple-500"
          iconBgClass="bg-purple-500/10"
          onClick={() => onNavigate && onNavigate('/dashboard/analytics')}
        />
      </div>

      {/* Main Content Sections */}
      <div className="flex flex-col gap-8">
        
        {/* Orders Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight">Manage Incoming Orders</h3>
            <button onClick={() => onNavigate && onNavigate('/dashboard/orders')} className="text-[#e31c3d] text-xs font-black uppercase tracking-widest hover:underline">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No Recent Orders Found</td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <RecentOrderRow 
                      key={order.fullId}
                      id={order.id} 
                      customer={order.customer} 
                      amount={order.amount} 
                      status={order.status} 
                      avatar={order.avatar}
                      onClick={() => onNavigate && onNavigate('/dashboard/orders/detail', order.fullId)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
