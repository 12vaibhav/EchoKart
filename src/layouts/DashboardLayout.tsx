import React, { useState } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';

export const DashboardLayout = ({ children, currentPath, onNavigate }: { children: React.ReactNode, currentPath: string, onNavigate: (path: string) => void }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 font-display selection:bg-[#e31c3d] selection:text-white">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentPath={currentPath}
        onNavigate={(path) => {
          onNavigate(path);
          setIsSidebarOpen(false);
        }}
      />
      
      <main className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} onNavigate={onNavigate} />
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};
