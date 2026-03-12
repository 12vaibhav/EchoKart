import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, User, Settings, LogOut, HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TopBar = ({ onMenuClick, onNavigate }: { onMenuClick: () => void, onNavigate: (path: string) => void }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  const NOTIFICATIONS = [
    { id: 1, title: 'New Order Received', time: '2 mins ago', unread: true },
    { id: 2, title: 'Low Stock Alert: Echo Pods', time: '15 mins ago', unread: true },
    { id: 3, title: 'Monthly Revenue Report Ready', time: '1 hour ago', unread: false },
    { id: 4, title: 'Customer Refund Request', time: '3 hours ago', unread: true },
    { id: 5, title: 'System Update Completed', time: '5 hours ago', unread: false },
    { id: 6, title: 'New Review on Echo Pro', time: '1 day ago', unread: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    onNavigate(path);
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Search */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search analytics, orders, or products..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-[#e31c3d]/50 text-sm outline-none transition-shadow"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={bellRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`p-2 rounded-lg transition-all relative group ${isNotificationsOpen ? 'bg-slate-100 text-[#e31c3d]' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell size={24} />
            <span className="absolute top-2 right-2 size-2 bg-[#e31c3d] rounded-full border-2 border-white"></span>
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 origin-top-right"
              >
                <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Recent Alerts</p>
                  <button className="text-[10px] font-bold text-[#e31c3d] hover:underline">Mark all read</button>
                </div>
                
                <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className={`p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 cursor-pointer group`}>
                      <div className="flex gap-3">
                        <div className={`size-2 mt-1.5 rounded-full shrink-0 ${n.unread ? 'bg-[#e31c3d]' : 'bg-transparent'}`} />
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-[#e31c3d] transition-colors">{n.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 rounded-xl transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 group-hover:text-[#e31c3d] transition-colors leading-none">Alex Rivera</p>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-1">Store Manager</p>
            </div>
            <div className="size-10 rounded-full bg-slate-100 overflow-hidden border-2 border-slate-200 group-hover:border-[#e31c3d] transition-all relative">
              <img 
                alt="User profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2quoNL_tLzNe9Z_Dh7FvNXv-c7qbKhnU1O_hCSoW9-PsI1sN19ygCRqbX4I_pQG7btubE8kV3rUg2eaZIcdupN5ey_5k_3PZal1mcc2cDPZU7nK43ns3G685n5Lnpv-STrH1uCAgUyflFzG2tkqHnC1IpIQPi_OrqlQ1K-wpqWp054TKr9G8jMhdG3oOYVCdXePFXJFH5HHFO6mbl8CGzZuOzRjG6Axzx1_JZOjDBxIrE8HYe0D4BYBum6jeUJr8DcQgqgPvY5ZmI"
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2 z-50 origin-top-right"
              >
                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Settings</p>
                </div>
                
                <button 
                  onClick={() => handleNavigate('/dashboard/profile')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#e31c3d] transition-all text-left"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/settings')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#e31c3d] transition-all text-left"
                >
                  <Settings className="w-4 h-4" />
                  Store settings
                </button>
                
                <div className="h-px bg-slate-50 my-1 mx-4"></div>
                
                <button 
                  onClick={() => handleNavigate('home')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all text-left mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
