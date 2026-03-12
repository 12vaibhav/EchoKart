import React from 'react';
import { 
  Tag as TagIcon, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit2, 
  MoreVertical,
  Calendar,
  Zap,
  Ticket,
  Percent
} from 'lucide-react';
import { motion } from 'motion/react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const PROMOTIONS_DATA = [
  { id: '1', name: 'Summer Sale 2023', code: 'SUMMER20', type: 'Percentage', value: '20%', usage: '450/1000', status: 'Active', expiry: 'Oct 30, 2023' },
  { id: '2', name: 'New User Welcome', code: 'WELCOME50', type: 'Fixed Amount', value: '$50.00', usage: '124', status: 'Active', expiry: 'Dec 31, 2023' },
  { id: '3', name: 'Black Friday Early Access', code: 'BFRIDAY', type: 'Percentage', value: '30%', usage: '0/500', status: 'Scheduled', expiry: 'Nov 25, 2023' },
  { id: '4', name: 'Clearance Event', code: 'CLEAR70', type: 'Percentage', value: '70%', usage: '890', status: 'Expired', expiry: 'Sep 30, 2023' },
];

export const Promotions = () => {
  return (
    <motion.div {...fadeInUpProps} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Promotions</h2>
          <p className="text-slate-500 mt-1">Create and manage discount codes and campaigns</p>
        </div>
        <button className="px-6 py-2.5 bg-[#e31c3d] text-white font-bold rounded-lg hover:bg-[#c81935] transition-all shadow-lg shadow-[#e31c3d]/20 flex items-center gap-2 text-sm">
          <Plus size={18} /> Create New Campaign
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl bg-green-50 text-green-600">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Campaigns</p>
            <p className="text-xl font-black text-slate-900">12</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <Ticket size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Redeemed</p>
            <p className="text-xl font-black text-slate-900">2,450</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
            <Percent size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg. Discount Value</p>
            <p className="text-xl font-black text-slate-900">22%</p>
          </div>
        </div>
      </div>

      {/* Campaign List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by campaign name or code..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#e31c3d]/20 transition-all outline-none"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2 justify-center flex-1 md:flex-none transition-colors">
              <Filter size={16} /> Filter Status
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Campaign Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Promo Code</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Discount Type</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Usage</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Expiry</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PROMOTIONS_DATA.map((promo) => (
                <tr key={promo.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-[#e31c3d] transition-colors">{promo.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 border border-dashed border-slate-300 rounded font-mono text-sm font-black text-slate-700 select-all">
                      {promo.code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">{promo.type}</span>
                      <span className="text-lg font-black text-[#e31c3d]">{promo.value}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        <span>Redeemed</span>
                        <span>{promo.usage.includes('/') ? Math.round((parseInt(promo.usage.split('/')[0]) / parseInt(promo.usage.split('/')[1])) * 100) : 100}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${promo.status === 'Active' ? 'bg-[#e31c3d]' : 'bg-slate-300'}`} 
                          style={{ width: promo.usage.includes('/') ? `${(parseInt(promo.usage.split('/')[0]) / parseInt(promo.usage.split('/')[1])) * 100}%` : '100%' }} 
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">{promo.usage} Claims</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Calendar size={14} /> {promo.expiry}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      promo.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      promo.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
