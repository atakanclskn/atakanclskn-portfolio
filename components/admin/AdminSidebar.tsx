import React from 'react';
import { LucideIcon, LogOut } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onLogout
}) => {
  return (
    <div className="w-64 bg-black/30 border-r border-white/10 flex flex-col p-4">
      <div className="space-y-2 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full ${
              activeTab === tab.id 
                ? 'bg-primary text-black shadow-lg shadow-primary/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-white/10">
        <button 
          onClick={onLogout} 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 w-full transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};
