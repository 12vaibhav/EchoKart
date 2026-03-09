import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Download, 
  Calendar,
  ChevronDown
} from 'lucide-react';

export const Analytics = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Deep dive into your store's performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Last 30 Days</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-[#e31c3d] text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2">
            <Download size={18} /> Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</p>
              <h3 className="text-3xl font-bold text-[#e31c3d]">3.2%</h3>
            </div>
            <div className="p-3 rounded-xl bg-red-50 text-[#e31c3d]">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div className="bg-[#e31c3d] h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="text-xs text-gray-400">Top 10% of industry average</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Avg. Order Value</p>
              <h3 className="text-3xl font-bold text-gray-900">$85.40</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBag size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center font-bold px-2 py-0.5 rounded-full bg-green-100 text-[#00c853]">
              +5.4%
            </span>
            <span className="text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Bounce Rate</p>
              <h3 className="text-3xl font-bold text-gray-900">42%</h3>
            </div>
            <div className="p-3 rounded-xl bg-gray-100 text-gray-600">
              <Users size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center font-bold px-2 py-0.5 rounded-full bg-green-100 text-[#00c853]">
              -2.1%
            </span>
            <span className="text-gray-400">Improved vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Sales Overview</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 60, 45, 70, 50, 80, 65, 85, 75, 90, 60, 95].map((h, i) => (
              <div key={i} className="w-full bg-red-50 rounded-t-lg relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-[#e31c3d] rounded-t-lg transition-all duration-500 group-hover:bg-red-700"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {[
              { label: 'Organic Search', value: 45, color: 'bg-[#e31c3d]' },
              { label: 'Social Media', value: 25, color: 'bg-blue-500' },
              { label: 'Direct', value: 20, color: 'bg-green-500' },
              { label: 'Referral', value: 10, color: 'bg-yellow-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="text-gray-500">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
