import React, { useState } from 'react';
import { 
  Store, 
  CreditCard, 
  Truck, 
  Globe, 
  Search,
  Save
} from 'lucide-react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('store');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store configuration and preferences.</p>
        </div>
        <button className="px-4 py-2 bg-[#e31c3d] text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4">
          <nav className="space-y-1">
            {[
              { id: 'store', label: 'Store Settings', icon: Store },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'shipping', label: 'Shipping', icon: Truck },
              { id: 'integrations', label: 'Integrations', icon: Globe },
              { id: 'seo', label: 'SEO', icon: Search },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-white text-[#e31c3d] shadow-sm ring-1 ring-gray-200' 
                      : 'text-gray-600 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          {activeTab === 'store' && (
            <div className="max-w-2xl space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Store Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input type="text" defaultValue="TrendVault" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#e31c3d] focus:border-[#e31c3d]" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
                  <input type="email" defaultValue="contact@trendvault.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#e31c3d] focus:border-[#e31c3d]" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#e31c3d] focus:border-[#e31c3d]">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>INR (₹)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'payments' && (
            <div className="max-w-2xl space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Payment Methods</h2>
              <p className="text-gray-500">Configure your payment gateways here.</p>
            </div>
          )}

          {/* Other tabs placeholders */}
          {['shipping', 'integrations', 'seo'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>Configuration for {activeTab} goes here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
