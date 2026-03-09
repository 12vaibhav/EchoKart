import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package, 
  ArrowRight,
  MoreHorizontal,
  Clock,
  RotateCcw
} from 'lucide-react';

const StatCard = ({ title, value, change, isPositive, icon: Icon, subtext, color = "blue" }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color === 'red' ? 'bg-red-50 text-[#e31c3d]' : color === 'green' ? 'bg-green-50 text-[#00c853]' : 'bg-blue-50 text-blue-600'}`}>
        <Icon size={24} />
      </div>
    </div>
    
    <div className="flex items-center gap-2">
      <span className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-[#00c853]' : 'bg-red-100 text-[#e31c3d]'}`}>
        {isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
        {change}
      </span>
      <span className="text-xs text-gray-400">{subtext}</span>
    </div>

    {/* Decorative background element */}
    <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-110 transition-transform duration-500 ${color === 'red' ? 'bg-[#e31c3d]' : color === 'green' ? 'bg-[#00c853]' : 'bg-blue-600'}`} />
  </motion.div>
);

const RecentOrderRow = ({ id, customer, product, amount, status, date }: any) => (
  <tr className="hover:bg-gray-50 transition-colors group cursor-pointer">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">#{id}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 mr-3">
          {customer.charAt(0)}
        </div>
        <div className="text-sm font-medium text-gray-900">{customer}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <img className="h-8 w-8 rounded object-cover mr-3" src={product.image} alt="" />
        <span className="text-sm text-gray-600 truncate max-w-[150px]">{product.name}</span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#e31c3d]">${amount}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === 'Delivered' ? 'bg-green-100 text-green-800' : 
        status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
        status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
      <button className="text-gray-400 hover:text-[#e31c3d] transition-colors">
        <MoreHorizontal size={16} />
      </button>
    </td>
  </tr>
);

export const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Get a quick view of your store performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            View Reports
          </button>
          <button className="px-4 py-2 bg-[#e31c3d] text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2">
            <Package size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales" 
          value="$124,592" 
          change="+12.5%" 
          isPositive={true} 
          icon={DollarSign} 
          subtext="vs last week"
          color="red"
        />
        <StatCard 
          title="Active Orders" 
          value="482" 
          change="+8.2%" 
          isPositive={true} 
          icon={ShoppingBag} 
          subtext="vs last week"
          color="blue"
        />
        <StatCard 
          title="Total Customers" 
          value="15,234" 
          change="-2.4%" 
          isPositive={false} 
          icon={Users} 
          subtext="vs last week"
          color="green" // Using green for customers usually implies growth, but keeping consistent with request
        />
        <StatCard 
          title="Pending Returns" 
          value="12" 
          change="+4.1%" 
          isPositive={false} 
          icon={RotateCcw} 
          subtext="vs last week"
          color="red" // Warning color
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm font-medium text-[#e31c3d] hover:text-red-700 flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <RecentOrderRow 
                  id="8293" 
                  customer="Alex Morgan" 
                  product={{ name: "Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80" }} 
                  amount="129.00" 
                  status="Delivered" 
                />
                <RecentOrderRow 
                  id="8294" 
                  customer="Sarah Smith" 
                  product={{ name: "Smart Watch Gen 5", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80" }} 
                  amount="249.00" 
                  status="Pending" 
                />
                <RecentOrderRow 
                  id="8295" 
                  customer="John Doe" 
                  product={{ name: "Ergonomic Chair", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=100&q=80" }} 
                  amount="499.00" 
                  status="Shipped" 
                />
                <RecentOrderRow 
                  id="8296" 
                  customer="Emily Davis" 
                  product={{ name: "Gaming Mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&q=80" }} 
                  amount="59.00" 
                  status="Processing" 
                />
                <RecentOrderRow 
                  id="8297" 
                  customer="Michael Brown" 
                  product={{ name: "Mechanical Keyboard", image: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=100&q=80" }} 
                  amount="149.00" 
                  status="Delivered" 
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products & Activity */}
        <div className="space-y-8">
          
          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Top Products</h2>
            <div className="space-y-4">
              {[
                { name: "Smart Watch Gen 5", sales: 1240, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80" },
                { name: "Wireless Headphones", sales: 980, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80" },
                { name: "Gaming Mouse", sales: 850, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&q=80" },
              ].map((product, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.sales} Sales</p>
                  </div>
                  <div className="text-[#e31c3d] font-bold text-sm">#{idx + 1}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-gray-500 hover:text-[#e31c3d] transition-colors border border-dashed border-gray-300 rounded-lg hover:border-[#e31c3d]">
              View All Products
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="relative pl-4 border-l-2 border-gray-100 space-y-6">
              {[
                { title: "New Order #8293", time: "2 mins ago", type: "order" },
                { title: "Payment Received", time: "15 mins ago", type: "payment" },
                { title: "New Customer Registered", time: "1 hour ago", type: "user" },
                { title: "Product Stock Low", time: "3 hours ago", type: "alert" },
              ].map((activity, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                    activity.type === 'order' ? 'bg-blue-500' : 
                    activity.type === 'payment' ? 'bg-green-500' : 
                    activity.type === 'alert' ? 'bg-[#e31c3d]' : 'bg-gray-400'
                  }`} />
                  <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <Clock size={10} /> {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
