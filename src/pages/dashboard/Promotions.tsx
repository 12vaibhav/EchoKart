import React from 'react';
import { 
  Tag, 
  Plus, 
  MoreHorizontal, 
  Copy, 
  Clock,
  CheckCircle
} from 'lucide-react';

const PROMOTIONS_DATA = [
  { id: 'PROMO-001', code: 'SUMMER25', type: 'Discount', value: '25% OFF', usage: '124/500', status: 'Active', expiry: 'Nov 30, 2023' },
  { id: 'PROMO-002', code: 'WELCOME10', type: 'Coupon', value: '$10 OFF', usage: '450/1000', status: 'Active', expiry: 'Dec 31, 2023' },
  { id: 'PROMO-003', code: 'FLASH50', type: 'Flash Sale', value: '50% OFF', usage: '50/50', status: 'Expired', expiry: 'Oct 20, 2023' },
];

export const Promotions = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage discounts, coupons, and flash sales.</p>
        </div>
        <button className="px-4 py-2 bg-[#e31c3d] text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2">
          <Plus size={18} /> Create Promotion
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {PROMOTIONS_DATA.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded border border-gray-200">{promo.code}</span>
                      <button className="text-gray-400 hover:text-[#e31c3d]" title="Copy Code">
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promo.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#e31c3d]">{promo.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promo.usage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promo.expiry}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      promo.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-[#e31c3d] transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
