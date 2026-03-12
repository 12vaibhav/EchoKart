import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Download, 
  Calendar,
  ChevronDown,
  Clock,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const EARNINGS_DATA = [
  { id: 'TXN-9821', date: 'Oct 24, 2023', product: 'Wireless Headphones', amount: 129.00, fee: 3.87, net: 125.13, status: 'Cleared' },
  { id: 'TXN-9822', date: 'Oct 24, 2023', product: 'Smart Watch Gen 5', amount: 249.00, fee: 7.47, net: 241.53, status: 'Pending' },
  { id: 'TXN-9823', date: 'Oct 23, 2023', product: 'Ergonomic Chair', amount: 499.00, fee: 14.97, net: 484.03, status: 'Cleared' },
  { id: 'TXN-9824', date: 'Oct 23, 2023', product: 'Gaming Mouse', amount: 59.00, fee: 1.77, net: 57.23, status: 'Cleared' },
  { id: 'TXN-9825', date: 'Oct 22, 2023', product: 'Mechanical Keyboard', amount: 149.00, fee: 4.47, net: 144.53, status: 'Cleared' },
];

export const Earnings = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'withdrawals'>('history');

  return (
    <motion.div {...fadeInUpProps} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Earnings</h2>
          <p className="text-slate-500 mt-1">Monitor your revenue and manage withdrawals</p>
        </div>
        <button className="px-6 py-2.5 bg-[#e31c3d] text-white font-bold rounded-lg hover:bg-[#c81935] transition-all shadow-lg shadow-[#e31c3d]/20 flex items-center gap-2 text-sm">
          <DollarSign size={18} /> Withdraw Balance
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp size={24} />
            </div>
            <span className="flex items-center gap-1 font-bold text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              +12.5% <ArrowUpRight size={12} />
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
            <h3 className="text-3xl font-black text-slate-900">$124,592.00</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-green-50 text-[#00c853]">
              <DollarSign size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
            <h3 className="text-3xl font-black text-[#00c853]">$4,250.50</h3>
            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tight">Withdrawal threshold: $50.00</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
              <Clock size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Clearance</p>
            <h3 className="text-3xl font-black text-slate-900">$845.00</h3>
            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tight">Est. completion: 3-5 business days</p>
          </div>
        </div>
      </div>

      {/* History Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50/50">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('history')}
              className={`py-5 text-sm font-black uppercase tracking-widest relative transition-colors ${activeTab === 'history' ? 'text-[#e31c3d]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Earning History
              {activeTab === 'history' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#e31c3d] rounded-t-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('withdrawals')}
              className={`py-5 text-sm font-black uppercase tracking-widest relative transition-colors ${activeTab === 'withdrawals' ? 'text-[#e31c3d]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Withdrawals
              {activeTab === 'withdrawals' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#e31c3d] rounded-t-full" />}
            </button>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Download size={20} /></button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search by txn ID or product..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#e31c3d]/20 transition-all"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
              <button className="px-4 py-2 bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-2 whitespace-nowrap">
                <Calendar size={14} /> Last 30 Days
              </button>
              <button className="px-4 py-2 bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-2 whitespace-nowrap">
                <ChevronDown size={14} /> All Status
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date/Time</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Source</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Gross</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Platform Fee</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Net Revenue</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EARNINGS_DATA.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">{item.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">${item.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-bold">-${item.fee.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-[#00c853]">${item.net.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'Cleared' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Page 1 of 12</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-slate-200 hover:bg-white text-slate-400 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="size-8 flex items-center justify-center rounded bg-[#e31c3d] text-white font-bold text-xs">1</button>
            <button className="size-8 flex items-center justify-center rounded hover:bg-white text-slate-600 font-bold text-xs border border-transparent hover:border-slate-200">2</button>
            <button className="p-2 rounded-lg border border-slate-200 hover:bg-white text-slate-400 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

