import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Mail, 
  Ban,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const CUSTOMERS_DATA = [
  { id: 'CUST-001', name: 'Alex Morgan', email: 'alex@example.com', orders: 12, spent: 1450.00, lastActive: '2 mins ago', status: 'Active', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoCOLo01GRcXQs3uGUsjamvHElZ1W4_zHU6uJtx_1PM8RECb550nnFC6IZ6u5TFVYc1AqLq25pHunWtsgaaWcbCDvZoZI_onatMP25C8IZ7LMWTpl2McIv9mby6Yc5cBnzHO9-KVNklGksuy0YtokrQ9Fj2twOlB2F0NIAutPdGCntow2cq5AOEeORLH2HLw9895T0XV-c5YWdDjme2ZrA4DVWtxEciVxZuDt6l9-eYzOj5NqzByM0BF3N3_J_whCDJKRazUV_KrKQ' },
  { id: 'CUST-002', name: 'Sarah Smith', email: 'sarah@example.com', orders: 5, spent: 540.00, lastActive: '1 day ago', status: 'Active', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR7TzGSBjLYwh-_gRKY9izraZ3BgRUgIrulcpLvuDgLcybzTh38qBsAaGAMmdgGliEp9QKw4Mnqd2g-yzwsOVVasjGfYi91wka3VdDKjxAhMsmu5B8bMmwY_05ZmOcHuBoFbjn4LHK-L-VfU852XNSFmfJciWp3Q3Hpxx7lVuYZMDUZEOUClp9q9amcmS2XRAUrwl9rvopWP4fucxtKiXM9DN6AUS9STQkch2XHnIeuvmykHl_187NX3F3Wa-2m0bJk2UB_MgBDnes' },
  { id: 'CUST-003', name: 'John Doe', email: 'john@example.com', orders: 1, spent: 499.00, lastActive: '3 days ago', status: 'Inactive', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo_kDxWBz93-TAtRlx-v7TYIQXzmrvNoQeBfADPyfeS7eHTdqJc6KYGJMVsRSDqLu28-eABmoprNzgLkSIsTsD-4jh8_aCaKQmUE6LlRbpuzIekcFbU-pL3j91WakgOoJ9Ex0S1zmycM33nMPa-J4fIctFQBqIm-b0HKGfMhwssX41fuIHoqQ5pLK5iAhQc_EG-NMVAcVi-QPSzKfU0JWWIcyG2cIVxLw3p1-Y8ga3LJqVQHDQYUWoOvJnzsZe7fxRBz2L3Z_-0wcp' },
  { id: 'CUST-004', name: 'Emily Davis', email: 'emily@example.com', orders: 8, spent: 890.00, lastActive: '5 hours ago', status: 'Active', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG2TydWkI1FS8KzFHkaQknec6XEMvP3U20rs_0eYWXmKYuNGdVvAXiyqBv70cNxUuLT50SX9copDm6fb6e6ZcXAgu8aVwZdswQQ8wNqRukM_8SGgnaYJ6hpIyVvqq0yui38mLocaW_jb2v_NSVWoUH-T1h2lP8l9wJbvNGJaXesgXuqiFWVs94d-8nfUCf_Z0rot4Olwk_MWW0HZssrn1nbxRBbE67nKv2tbudc17cnDIBRz67UVKF5N41qLTTbI0T2pAhJToll-y_' },
  { id: 'CUST-005', name: 'Michael Brown', email: 'michael@example.com', orders: 3, spent: 250.00, lastActive: '1 week ago', status: 'Blocked', avatar: null },
];

export const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCustomers = useMemo(() => {
    return CUSTOMERS_DATA.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            customer.email.toLowerCase().includes(searchQuery.toLowerCase());
                            
      const matchesStatus = filterStatus === 'All' || 
                            (filterStatus === 'New' ? customer.orders <= 2 : customer.status === filterStatus);
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div {...fadeInUpProps} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Customers</h2>
          <p className="text-slate-500 mt-1">Manage your customer base and segments</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm">
            <Download size={18} /> Export List
          </button>
          <button className="px-6 py-2.5 bg-[#e31c3d] text-white font-bold rounded-lg hover:bg-[#c81935] transition-all shadow-lg shadow-[#e31c3d]/20 flex items-center gap-2 text-sm">
            <Plus size={18} /> Add Customer
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search customers by name or email..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-[#e31c3d]/20 text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex gap-2">
            {['All', 'Active', 'New', 'Inactive'].map(status => (
              <span 
                key={status}
                onClick={() => { setFilterStatus(status); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-colors ${
                  filterStatus === status 
                    ? 'bg-[#e31c3d]/10 text-[#e31c3d] border-[#e31c3d]/20' 
                    : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'
                }`}
              >
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center shrink-0">
                        {customer.avatar ? (
                          <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-bold text-slate-400">{customer.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-[#e31c3d] transition-colors">{customer.name}</div>
                        <div className="text-xs text-slate-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{customer.orders} orders</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">₹{customer.spent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{customer.lastActive}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      customer.status === 'Inactive' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-[#e31c3d] hover:bg-red-50 rounded-lg transition-all" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-[#e31c3d] hover:bg-red-50 rounded-lg transition-all" title="Email">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Showing {filteredCustomers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} Customers
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 hover:bg-white text-slate-400 transition-colors disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`size-8 flex items-center justify-center rounded font-bold text-xs border ${currentPage === idx + 1 ? 'bg-[#e31c3d] text-white border-transparent' : 'bg-transparent hover:bg-white text-slate-600 border-transparent hover:border-slate-200'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 hover:bg-white text-slate-400 transition-colors disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

