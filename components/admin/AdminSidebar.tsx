import React from 'react';
import { LucideIcon, LogOut, ExternalLink, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { adminTranslations, getTranslation } from '../../lib/adminTranslations';

export interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
  group: string;
  badge?: number; // Optional badge count
}

interface AdminSidebarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onLogout: () => void;
  onViewSite: () => void;
  editLang: 'EN' | 'TR';
  logoText: string;
  userEmail?: string | null;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onLogout,
  onViewSite,
  editLang,
  logoText,
  userEmail,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const groups = [...new Set(tabs.map(tab => tab.group))];
  const itemClass = `relative flex items-center w-full rounded-2xl text-sm font-medium transition-all duration-200 ${
    isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-2.5'
  }`;
  const idleClass = 'text-gray-600 hover:text-gray-900 hover:bg-black/[0.04] dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/[0.06]';

  return (
    <aside className={`${isCollapsed ? 'w-[76px]' : 'w-64'} hidden md:flex shrink-0 flex-col m-3 mr-0 rounded-3xl border border-black/[0.08] bg-white/60 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.03] transition-[width] duration-300`}>
      {/* Brand */}
      <div className={`flex items-center h-16 ${isCollapsed ? 'justify-center' : 'justify-between px-5'}`}>
        {!isCollapsed && (
          <div className="flex items-center min-w-0">
            <span className="font-display font-bold text-lg tracking-tighter text-gray-900 dark:text-white truncate">{logoText}</span>
            <span className="w-2 h-2 rounded-full bg-primary ml-1 shrink-0" />
            <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Admin</span>
          </div>
        )}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-black/[0.04] dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors"
            title={isCollapsed ? (editLang === 'TR' ? 'Genişlet' : 'Expand') : (editLang === 'TR' ? 'Daralt' : 'Collapse')}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-5">
        {groups.map(group => (
          <div key={group}>
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">{group}</p>
            )}
            <div className="space-y-1">
              {tabs.filter(tab => tab.group === group).map(tab => {
                const isActive = activeTab === tab.id;
                const hasBadge = tab.badge !== undefined && tab.badge > 0;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`${itemClass} ${isActive ? 'bg-black text-white shadow-lg dark:bg-white dark:text-black' : idleClass}`}
                    title={isCollapsed ? tab.label : undefined}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <tab.icon size={18} className="shrink-0" />
                    {!isCollapsed && <span className="flex-1 text-left truncate">{tab.label}</span>}
                    {!isCollapsed && hasBadge && (
                      <span className="min-w-5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-primary text-white text-center">
                        {tab.badge! > 99 ? '99+' : tab.badge}
                      </span>
                    )}
                    {isCollapsed && hasBadge && (
                      <span className="absolute top-2 right-3 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Account */}
      <div className="p-3 border-t border-black/[0.06] dark:border-white/10 space-y-1">
        {!isCollapsed && userEmail && (
          <p className="px-3 pb-2 text-xs text-gray-500 truncate" title={userEmail}>{userEmail}</p>
        )}
        <button onClick={onViewSite} className={`${itemClass} ${idleClass}`} title={isCollapsed ? (editLang === 'TR' ? 'Siteyi Gör' : 'View Site') : undefined}>
          <ExternalLink size={18} className="shrink-0" />
          {!isCollapsed && <span className="flex-1 text-left">{editLang === 'TR' ? 'Siteyi Gör' : 'View Site'}</span>}
        </button>
        <button
          onClick={onLogout}
          className={`${itemClass} text-red-500 hover:bg-red-500/10 dark:text-red-400`}
          title={isCollapsed ? getTranslation(adminTranslations.actions.logout, editLang) : undefined}
        >
          <LogOut size={18} className="shrink-0" />
          {!isCollapsed && <span className="flex-1 text-left">{getTranslation(adminTranslations.actions.logout, editLang)}</span>}
        </button>
      </div>
    </aside>
  );
};
