import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Download, 
  Calendar,
  ChevronDown,
  Clock,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-sm text-gray-500 mt-1">Get an overview of your current earning. You can easily withdraw balance.</p>
        </div>
        <button className="px-4 py-2 bg-[#e31c3d] text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2">
          <DollarSign size={18} /> Withdraw Balance
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">All Time Earnings</p>
              <h3 className="text-3xl font-bold text-gray-900">$124,592.00</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center font-bold px-2 py-0.5 rounded-full bg-green-100 text-[#00c853]">
              +12.5%
            </span>
            <span className="text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Available for Withdrawal</p>
              <h3 className="text-3xl font-bold text-[#00c853]">$4,250.50</h3>
            </div>
            <div className="p-3 rounded-xl bg-green-50 text-[#00c853]">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Minimum withdrawal amount: $50.00
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Pending Clearance</p>
              <h3 className="text-3xl font-bold text-gray-900">$845.00</h3>
            </div>
            <div className="p-3 rounded-xl bg-gray-100 text-gray-600">
              <Clock size={24} />
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Funds usually clear in 3-5 business days
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('history')}
              className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'history' ? 'border-[#e31c3d] text-[#e31c3d]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              Earning History
            </button>
            <button 
              onClick={() => setActiveTab('withdrawals')}
              className={`py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'withdrawals' ? 'border-[#e31c3d] text-[#e31c3d]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              Withdrawal History
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search transaction..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#e31c3d]"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 flex items-center gap-2">
                <Calendar size={16} /> Date Range
              </button>
              <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 flex items-center gap-2">
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Earning</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {EARNINGS_DATA.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#e31c3d]">${item.net.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Cleared' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
      </div>
    </div>
  );
};
