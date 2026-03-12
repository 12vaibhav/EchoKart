import { useEffect, useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Calendar,
  ChevronDown,
  Globe,
  Monitor,
  Smartphone
} from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const Analytics = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [chartType, setChartType] = useState<'Orders' | 'Revenue'>('Revenue');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    revenue: 0,
    orders: 0,
    aov: 0,
    conversion: 3.2
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        let query = supabase.from('orders').select('total_amount, created_at');

        // Apply date filter
        const now = new Date();
        if (dateRange === 'Today') {
          const startOfDay = new Date(now.setHours(0,0,0,0)).toISOString();
          query = query.gte('created_at', startOfDay);
        } else if (dateRange === 'Last 7 Days') {
          const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7)).toISOString();
          query = query.gte('created_at', sevenDaysAgo);
        } else if (dateRange === 'Last 30 Days') {
          const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30)).toISOString();
          query = query.gte('created_at', thirtyDaysAgo);
        }

        const { data: orders, error } = await query;
        if (error) throw error;

        if (orders) {
          const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0);
          setData({
            revenue: totalRevenue,
            orders: orders.length,
            aov: orders.length > 0 ? totalRevenue / orders.length : 0,
            conversion: 3.2 // Keep conversion as placeholder for now
          });
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange]);

  const metricsData = [
    { label: 'Total Revenue', value: `₹${data.revenue.toLocaleString('en-IN')}`, change: '+12%', positive: true, icon: TrendingUp, color: 'blue' },
    { label: 'Total Orders', value: data.orders.toString(), change: '+8%', positive: true, icon: ShoppingBag, color: 'purple' },
    { label: 'Avg. Order Value', value: `₹${data.aov.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, change: '-2%', positive: false, icon: BarChart2, color: 'orange' },
    { label: 'Conversion Rate', value: `${data.conversion.toFixed(1)}%`, change: '+0.4%', positive: true, icon: Users, color: 'green' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-[#e31c3d] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Calculating Metrics...</p>
      </div>
    );
  }

  return (
    <motion.div {...fadeInUpProps} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Analytics</h2>
          <p className="text-slate-500 mt-1">Deep dive into your store's performance metrics</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm shadow-sm"
            >
              <Calendar size={18} /> {dateRange} <ChevronDown size={14} />
            </button>
            {isDatePickerOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50">
                {['Today', 'Last 7 Days', 'Last 30 Days', 'This Year'].map(range => (
                  <button 
                    key={range}
                    onClick={() => { setDateRange(range); setIsDatePickerOpen(false); }}
                    className={`shrink-0 w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors ${dateRange === range ? 'text-[#e31c3d] font-bold' : 'text-slate-700'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="px-4 py-2 bg-[#e31c3d] text-white font-bold rounded-lg hover:bg-[#c81935] transition-all shadow-lg shadow-[#e31c3d]/20 flex items-center gap-2 text-sm">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-600">
                <item.icon size={20} />
              </div>
              <span className={`flex items-center gap-1 font-bold text-xs ${item.positive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-2 py-0.5 rounded-full`}>
                {item.change} {item.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
            <h3 className="text-2xl font-black text-slate-900">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight">Sales Over Time</h3>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setChartType('Orders')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${chartType === 'Orders' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Orders
              </button>
              <button 
                onClick={() => setChartType('Revenue')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${chartType === 'Revenue' ? 'bg-[#e31c3d] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Revenue
              </button>
            </div>
          </div>
          <div className="h-64 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
            <div className="text-center z-10">
              <BarChart2 size={48} className="text-slate-200 mb-4 mx-auto group-hover:scale-110 group-hover:text-[#e31c3d]/20 transition-all duration-500" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{chartType} Visualization Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Traffic Source Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-8">Traffic Sources</h3>
          <div className="flex-1 flex flex-col justify-between">
            <div className="relative size-48 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-[12px] border-slate-50" />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-black text-slate-900">1.2k</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Visitors</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Direct', value: '45%', color: '#e31c3d' },
                { label: 'Organic Search', value: '30%', color: '#8b5cf6' },
                { label: 'Social Media', value: '15%', color: '#fbbf24' },
                { label: 'Referral', value: '10%', color: '#10b981' },
              ].map((src, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full" style={{ backgroundColor: src.color }} />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{src.label}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">{src.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
