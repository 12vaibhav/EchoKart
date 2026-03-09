import React from 'react';
import { Search, Bell, Calendar, ChevronDown, Menu } from 'lucide-react';

export const TopBar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Search */}
        <div className="hidden sm:flex items-center max-w-md w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by ID, name, status..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e31c3d]/20 focus:border-[#e31c3d] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Date Picker (Mock) */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>Oct 24, 2023 - Nov 24, 2023</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-[#e31c3d] transition-colors group">
          <Bell className="w-6 h-6 group-hover:animate-pulse" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#e31c3d] rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-gray-900 group-hover:text-[#e31c3d] transition-colors">Alex Morgan</div>
            <div className="text-xs text-gray-500">Super Admin</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-transparent group-hover:border-[#e31c3d] transition-all">
            <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#e31c3d] transition-colors" />
        </div>
      </div>
    </header>
  );
};
