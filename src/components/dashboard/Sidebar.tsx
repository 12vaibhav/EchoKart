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
  X,
  Eye,
  PlusSquare,
  Layers
} from 'lucide-react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { 
    icon: ShoppingBag, 
    label: 'Manage Orders', 
    path: '/dashboard/orders'
  },
  { 
    icon: Layers, 
    label: 'Manage Categories', 
    path: '/dashboard/categories'
  },
  { icon: PlusSquare, label: 'Add Product', path: '/dashboard/products' },

  { 
    icon: BarChart2, 
    label: 'Analytics', 
    path: '/dashboard/analytics'
  },
  { icon: Settings, label: 'Store Customizations', path: '/dashboard/settings' },
];

export const Sidebar = ({ isOpen, onClose, currentPath, onNavigate }: { isOpen: boolean, onClose: () => void, currentPath: string, onNavigate: (path: string) => void }) => {
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
        className={`fixed top-0 left-0 h-full bg-slate-950 text-white w-64 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto custom-scrollbar border-r border-slate-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#e31c3d] size-10 rounded-lg flex items-center justify-center">
            <ShoppingBag className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold tracking-tight">EchoKart</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admin Engine</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive ? 'bg-[#e31c3d] text-white font-bold' : 'text-slate-400 hover:bg-slate-900 hover:text-white font-medium'}`}
              >
                <Icon size={20} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* View Store Button at bottom */}
        <div className="p-4 border-t border-slate-800 mt-auto">
          <button onClick={() => window.open('/', '_blank')} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-2.5 rounded-lg font-bold text-sm transition-all text-white">
            <Eye size={18} />
            <span>View Store</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};
