import React, { useState, useEffect } from 'react';
import { 
  Settings, Briefcase, Code, Share2,
  Layers, Home, FileText, Heart, Navigation 
} from 'lucide-react';
import { useAdmin } from '../lib/adminContext';
import { AdminLayout } from './admin/AdminLayout';
import { AdminSidebar, TabItem } from './admin/AdminSidebar';
import { AdminLogin } from './admin/AdminLogin';
import { GeneralTab, HeroTab } from './admin/tabs';

export const AdminPanel: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [editLang, setEditLang] = useState<'EN' | 'TR'>('EN');
  const { isLoggedIn, login, logout, primaryColor, setPrimaryColor } = useAdmin();
  
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
      case 'general':
        return (
          <GeneralTab 
            editLang={editLang}
            tempColor={tempColor}
            setTempColor={setTempColor}
            onApplyColor={handleApplyColor}
          />
        );
      case 'hero':
        return <HeroTab editLang={editLang} />;
      case 'about':
        return <div className="text-white p-6">About & Stats Tab (Coming soon...)</div>;
      case 'hobbies':
        return <div className="text-white p-6">Hobbies Tab (Coming soon...)</div>;
      case 'tech':
        return <div className="text-white p-6">Tech Stack Tab (Coming soon...)</div>;
      case 'projects':
        return <div className="text-white p-6">Projects Tab (Coming soon...)</div>;
      case 'experience':
        return <div className="text-white p-6">Experience Tab (Coming soon...)</div>;
      case 'socials':
        return <div className="text-white p-6">Contact & Socials Tab (Coming soon...)</div>;
      case 'navbar':
        return <div className="text-white p-6">Navbar Tab (Coming soon...)</div>;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Floating Admin Button */}
      {visible && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-primary to-secondary rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce-slow"
        >
          <Settings className="w-6 h-6 text-black" />
        </button>
      )}

      {/* Admin Panel */}
      {isOpen && !isLoggedIn && (
        <AdminLayout
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          editLang={editLang}
          onLangChange={setEditLang}
        >
          <AdminLogin onLogin={login} />
        </AdminLayout>
      )}

      {isOpen && isLoggedIn && (
        <AdminLayout
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          editLang={editLang}
          onLangChange={setEditLang}
        >
          <div className="flex h-full">
            <AdminSidebar
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onLogout={() => {
                logout();
                setIsOpen(false);
              }}
            />
            <div className="flex-1 overflow-y-auto p-8 bg-[#0a0a0a]">
              {renderTabContent()}
            </div>
          </div>
        </AdminLayout>
      )}
    </>
  );
};
