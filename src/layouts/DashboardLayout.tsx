import React, { useState } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';

export const DashboardLayout = ({ children, currentPath, onNavigate }: { children: React.ReactNode, currentPath: string, onNavigate: (path: string) => void }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentPath={currentPath}
        onNavigate={(path) => {
          onNavigate(path);
          setIsSidebarOpen(false); // Close on mobile navigation
        }}
      />
      
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 transition-all duration-300">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
