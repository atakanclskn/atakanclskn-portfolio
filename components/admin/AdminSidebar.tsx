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
  theme: 'light' | 'dark';
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onLogout,
  theme
}) => {
  return (
    <div className={`w-72 border-r flex flex-col ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="p-4 space-y-1 flex-1 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full ${
              activeTab === tab.id 
                ? 'bg-primary text-black shadow-lg shadow-primary/20' 
                : theme === 'dark'
                  ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <tab.icon size={18} />
            <span className="flex-1 text-left">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={`p-4 border-t ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <button 
          onClick={onLogout} 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all ${
            theme === 'dark'
              ? 'text-red-400 hover:bg-red-500/10'
              : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <LogOut size={18} />
          <span className="flex-1 text-left">Logout</span>
        </button>
      </div>
    </div>
  );
};
