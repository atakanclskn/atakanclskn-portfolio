import React, { ReactNode } from 'react';
import { X, Settings } from 'lucide-react';

interface AdminLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  editLang: 'EN' | 'TR';
  onLangChange: (lang: 'EN' | 'TR') => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  isOpen,
  onClose,
  children,
  editLang,
  onLangChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-7xl h-[90vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex animate-scale-in">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 bg-black/50 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Admin Panel</h2>
              <p className="text-xs text-gray-400">Site Configuration & Content Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
              <button 
                onClick={() => onLangChange('EN')} 
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                  editLang === 'EN' 
                    ? 'bg-primary text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => onLangChange('TR')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                  editLang === 'TR' 
                    ? 'bg-primary text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                TR
              </button>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full pt-24">
          {children}
        </div>
      </div>
    </div>
  );
};
