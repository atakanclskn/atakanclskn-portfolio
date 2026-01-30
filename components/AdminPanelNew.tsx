import React, { useState, useEffect } from 'react';
import { 
  Settings, Briefcase, Code, Share2,
  Layers, Home, FileText, Heart, Navigation, Moon, Sun, X, Mail 
} from 'lucide-react';
import { useAdmin } from '../lib/adminContext';
import { AdminSidebar, TabItem } from './admin/AdminSidebar';
import { AdminLogin } from './admin/AdminLogin';
import { 
  GeneralTab, HeroTab, AboutTab, HobbiesTab, 
  TechTab, ProjectsTab, ExperienceTab, SocialsTab, NavbarTab 
} from './admin/tabs';
import { MessagesTab } from './admin/tabs/MessagesTab';

export const AdminPanel: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [editLang, setEditLang] = useState<'EN' | 'TR'>('EN');
  const [adminTheme, setAdminTheme] = useState<'light' | 'dark'>('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isLoggedIn, login, logout, primaryColor, setPrimaryColor, unreadCount } = useAdmin();
  
  const [tempColor, setTempColor] = useState<string>(primaryColor);

  // Sync tempColor when primaryColor changes or panel opens
  useEffect(() => {
    setTempColor(primaryColor);
  }, [primaryColor, isOpen]);

  // Disable body scroll when admin panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Scroll Detection to show button only at bottom
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      
      if (windowHeight + scrollY >= documentHeight - 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs: TabItem[] = [
    { id: 'messages', label: 'Messages', icon: Mail, badge: unreadCount },
    { id: 'general', label: 'General & Colors', icon: Settings },
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'about', label: 'About & Stats', icon: FileText },
    { id: 'hobbies', label: 'Hobbies', icon: Heart },
    { id: 'tech', label: 'Tech Stack', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'socials', label: 'Contact & Socials', icon: Share2 },
    { id: 'navbar', label: 'Navbar Settings', icon: Navigation },
  ];

  const handleApplyColor = () => {
    setPrimaryColor(tempColor);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'messages':
        return <MessagesTab theme={adminTheme} />;
      case 'general':
        return (
          <GeneralTab 
            editLang={editLang}
            tempColor={tempColor}
            setTempColor={setTempColor}
            onApplyColor={handleApplyColor}
            theme={adminTheme}
          />
        );
      case 'hero':
        return <HeroTab editLang={editLang} theme={adminTheme} />;
      case 'about':
        return <AboutTab editLang={editLang} theme={adminTheme} />;
      case 'hobbies':
        return <HobbiesTab editLang={editLang} theme={adminTheme} />;
      case 'tech':
        return <TechTab editLang={editLang} theme={adminTheme} />;
      case 'projects':
        return <ProjectsTab editLang={editLang} theme={adminTheme} />;
      case 'experience':
        return <ExperienceTab editLang={editLang} theme={adminTheme} />;
      case 'socials':
        return <SocialsTab editLang={editLang} theme={adminTheme} />;
      case 'navbar':
        return <NavbarTab editLang={editLang} theme={adminTheme} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hidden Admin Trigger - Almost Invisible Dot */}
      {visible && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 w-2 h-2 bg-white/5 hover:bg-white/20 rounded-full transition-all duration-500 hover:w-3 hover:h-3"
          title="Admin"
        />
      )}

      {/* Full Screen Admin Panel */}
      {isOpen && (
        <div className={`fixed inset-0 z-[9999] ${adminTheme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} transition-colors duration-300`}>
          {/* Top Header Bar */}
          <div className={`h-16 border-b ${
            adminTheme === 'dark' 
              ? 'bg-gray-900 border-gray-800' 
              : 'bg-white border-gray-200'
          } flex items-center justify-between px-6 shadow-lg`}>
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                adminTheme === 'dark' ? 'bg-primary/20' : 'bg-primary/10'
              }`}>
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className={`text-lg font-bold ${
                  adminTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Admin Panel
                </h1>
                <p className={`text-xs ${
                  adminTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Site Configuration & Content Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className={`flex items-center gap-1 rounded-lg p-1 ${
                adminTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <button 
                  onClick={() => setEditLang('EN')} 
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    editLang === 'EN' 
                      ? 'bg-primary text-black shadow-md' 
                      : adminTheme === 'dark'
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setEditLang('TR')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    editLang === 'TR' 
                      ? 'bg-primary text-black shadow-md' 
                      : adminTheme === 'dark'
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  TR
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setAdminTheme(adminTheme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg transition-colors ${
                  adminTheme === 'dark' 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {adminTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  adminTheme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Login Screen */}
            {!isLoggedIn ? (
              <div className="flex-1 flex items-center justify-center">
                <AdminLogin onLogin={login} theme={adminTheme} />
              </div>
            ) : (
              <>
                {/* Sidebar */}
                <AdminSidebar
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  onLogout={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  theme={adminTheme}
                  isCollapsed={sidebarCollapsed}
                  onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                />

                {/* Content Area */}
                <div className={`flex-1 overflow-y-auto ${
                  adminTheme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'
                }`}>
                  <div className="max-w-6xl mx-auto p-8">
                    {renderTabContent()}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
