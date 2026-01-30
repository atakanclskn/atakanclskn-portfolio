import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';

interface NavbarTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const NavbarTab: React.FC<NavbarTabProps> = ({ editLang, theme }) => {
  const { navbarSettings, setNavbarSettings } = useAdmin();

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Navbar Settings</h3>

        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Logo Text</label>
          <input 
            type="text" 
            value={navbarSettings.logoText} 
            onChange={(e) => setNavbarSettings({...navbarSettings, logoText: e.target.value})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
            placeholder="AC"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={navbarSettings.showLogo}
              onChange={(e) => setNavbarSettings({...navbarSettings, showLogo: e.target.checked})}
              className="w-4 h-4"
            />
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Show Logo</span>
          </label>
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>CTA Button Text ({editLang})</label>
          <input 
            type="text" 
            value={typeof navbarSettings.ctaText === 'string' ? navbarSettings.ctaText : navbarSettings.ctaText[editLang]} 
            onChange={(e) => setNavbarSettings({...navbarSettings, ctaText: updateMultiLangText(navbarSettings.ctaText, e.target.value, editLang)})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
            placeholder="Get in Touch"
          />
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>CTA Link</label>
          <input 
            type="text" 
            value={navbarSettings.ctaLink} 
            onChange={(e) => setNavbarSettings({...navbarSettings, ctaLink: e.target.value})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
            placeholder="#connect"
          />
        </div>
      </div>
    </div>
  );
};
