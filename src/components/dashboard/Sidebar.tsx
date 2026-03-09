import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Wallet, 
  Tag, 
  Users, 
  MessageSquare, 
  Calendar, 
  RotateCcw, 
  Star, 
  Bug, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronDown, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { 
    icon: ShoppingBag, 
    label: 'Ecommerce', 
    path: '/dashboard/ecommerce',
    subItems: [
      { label: 'All Orders', path: '/dashboard/orders', badge: '2' },
      { label: 'All Products', path: '/dashboard/products' },
      { label: 'Categories', path: '/dashboard/categories' },
      { label: 'Suppliers', path: '/dashboard/suppliers' },
      { label: 'Inventory', path: '/dashboard/inventory' },
    ]
  },
  { 
    icon: Wallet, 
    label: 'Earnings', 
    path: '/dashboard/earnings',
    subItems: [
      { label: 'Overview', path: '/dashboard/earnings/overview' },
      { label: 'History', path: '/dashboard/earnings/history' },
      { label: 'Withdrawals', path: '/dashboard/earnings/withdrawals' },
    ]
  },
  { 
    icon: Tag, 
    label: 'Promotions', 
    path: '/dashboard/promotions',
    subItems: [
      { label: 'Discounts', path: '/dashboard/promotions/discounts' },
      { label: 'Coupons', path: '/dashboard/promotions/coupons' },
      { label: 'Flash Sales', path: '/dashboard/promotions/flash-sales' },
    ]
  },
  { 
    icon: Users, 
    label: 'Customers', 
    path: '/dashboard/customers',
    subItems: [
      { label: 'Customer List', path: '/dashboard/customers/list' },
      { label: 'Segments', path: '/dashboard/customers/segments' },
      { label: 'Reviews', path: '/dashboard/customers/reviews' },
    ]
  },
  { icon: MessageSquare, label: 'Message Center', path: '/dashboard/messages', badge: '5' },
  { 
    icon: Calendar, 
    label: 'Product & Event', 
    path: '/dashboard/events',
    subItems: [
      { label: 'Add Product', path: '/dashboard/products/add' },
      { label: 'Events/Calendar', path: '/dashboard/calendar' },
    ]
  },
  { icon: RotateCcw, label: 'Return Requests', path: '/dashboard/returns', badge: '1' },
  { icon: Star, label: 'Product Reviews', path: '/dashboard/reviews' },
  { icon: Bug, label: 'Bug Reports', path: '/dashboard/bugs' },
  { 
    icon: BarChart2, 
    label: 'Analytics', 
    path: '/dashboard/analytics',
    subItems: [
      { label: 'Sales Reports', path: '/dashboard/analytics/sales' },
      { label: 'Traffic', path: '/dashboard/analytics/traffic' },
      { label: 'Conversion', path: '/dashboard/analytics/conversion' },
    ]
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    path: '/dashboard/settings',
    subItems: [
      { label: 'Store Settings', path: '/dashboard/settings/store' },
      { label: 'Payments', path: '/dashboard/settings/payments' },
      { label: 'Shipping', path: '/dashboard/settings/shipping' },
      { label: 'Integrations', path: '/dashboard/settings/integrations' },
    ]
  },
  { icon: HelpCircle, label: 'Help & Support', path: '/dashboard/support' },
];

export const Sidebar = ({ isOpen, onClose, currentPath, onNavigate }: { isOpen: boolean, onClose: () => void, currentPath: string, onNavigate: (path: string) => void }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Ecommerce']);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={`fixed top-0 left-0 h-full bg-black text-white w-64 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto custom-scrollbar ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">trendvault</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">DROPSHIPPING DASHBOARD</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = currentPath === item.path || (item.subItems && item.subItems.some(sub => currentPath === sub.path));
            const isExpanded = expandedMenus.includes(item.label);
            const Icon = item.icon;

            return (
              <div key={item.label}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isActive ? 'text-white bg-gray-900' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={isActive ? 'text-[#e31c3d]' : ''} />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="bg-[#e31c3d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                            {item.badge}
                          </span>
                        )}
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-11 pr-4 py-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <button
                                key={subItem.path}
                                onClick={() => onNavigate(subItem.path)}
                                className={`w-full flex items-center justify-between py-2 text-sm transition-colors ${currentPath === subItem.path ? 'text-[#e31c3d] font-medium' : 'text-gray-500 hover:text-white'}`}
                              >
                                <span>{subItem.label}</span>
                                {subItem.badge && (
                                  <span className="bg-[#e31c3d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                    {subItem.badge}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigate(item.path)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${currentPath === item.path ? 'bg-[#e31c3d] text-white shadow-lg shadow-red-900/20' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-[#e31c3d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border border-black">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 mt-auto border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};
