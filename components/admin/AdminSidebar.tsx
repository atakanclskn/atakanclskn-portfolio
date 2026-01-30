import React from 'react';
import { LucideIcon, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number; // Optional badge count
}

interface AdminSidebarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onLogout,
  theme,
  isCollapsed = false,
  onToggleCollapse
}) => {
  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-72'} border-r flex flex-col transition-all duration-300 relative ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Collapse Toggle Button */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className={`absolute -right-3 top-6 z-10 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700'
              : 'bg-white border-gray-300 text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
          title={isCollapsed ? 'Genişlet' : 'Daralt'}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}

      <div className={`${isCollapsed ? 'p-2' : 'p-4'} space-y-1 flex-1 overflow-y-auto`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-2' : 'px-4'} py-3 rounded-xl text-sm font-medium transition-all w-full ${
              activeTab === tab.id 
                ? 'bg-primary text-black shadow-lg shadow-primary/20' 
                : theme === 'dark'
                  ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={isCollapsed ? tab.label : undefined}
          >
            <tab.icon size={18} />
            {!isCollapsed && <span className="flex-1 text-left">{tab.label}</span>}
            {!isCollapsed && tab.badge !== undefined && tab.badge > 0 && (
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                activeTab === tab.id
                  ? 'bg-black/20 text-black'
                  : 'bg-primary text-black'
              }`}>
                {tab.badge > 99 ? '99+' : tab.badge}
              </span>
            )}
            {isCollapsed && tab.badge !== undefined && tab.badge > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <button 
          onClick={onLogout} 
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-2' : 'px-4'} py-3 rounded-xl text-sm font-medium w-full transition-all ${
            theme === 'dark'
              ? 'text-red-400 hover:bg-red-500/10'
              : 'text-red-600 hover:bg-red-50'
          }`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} />
          {!isCollapsed && <span className="flex-1 text-left">Logout</span>}
        </button>
      </div>
    </div>
  );
};
