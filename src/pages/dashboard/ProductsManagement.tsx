import React from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  RefreshCw,
  ChevronDown
} from 'lucide-react';

const PRODUCTS_DATA = [
  { id: 'SKU-001', name: 'Wireless Noise Cancelling Headphones', category: 'Electronics', price: 129.00, stock: 45, status: 'In Stock', sales: 124, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80' },
  { id: 'SKU-002', name: 'Smart Fitness Watch Gen 5', category: 'Wearables', price: 249.00, stock: 12, status: 'Low Stock', sales: 89, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80' },
  { id: 'SKU-003', name: 'Ergonomic Office Chair', category: 'Furniture', price: 499.00, stock: 0, status: 'Out of Stock', sales: 56, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=100&q=80' },
  { id: 'SKU-004', name: 'Mechanical Gaming Keyboard', category: 'Electronics', price: 149.00, stock: 156, status: 'In Stock', sales: 234, image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=100&q=80' },
  { id: 'SKU-005', name: '4K Action Camera', category: 'Cameras', price: 299.00, stock: 23, status: 'In Stock', sales: 67, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&q=80' },
];

export const ProductsManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your product inventory and listings.</p>
        </div>
        <button className="px-4 py-2 bg-[#e31c3d] text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2">
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search products by name, SKU..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e31c3d]/20 focus:border-[#e31c3d] transition-all"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <select className="w-full appearance-none pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#e31c3d] cursor-pointer">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Wearables</option>
              <option>Furniture</option>
              <option>Cameras</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          <div className="relative flex-1 sm:flex-none">
            <select className="w-full appearance-none pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#e31c3d] cursor-pointer">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {PRODUCTS_DATA.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden mr-4">
                        <img className="h-full w-full object-cover" src={product.image} alt="" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#e31c3d]">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
                      product.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status} ({product.stock})
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-[#e31c3d] transition-colors" title="Sync with Supplier">
                        <RefreshCw size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-[#e31c3d] transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-[#e31c3d] transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
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
