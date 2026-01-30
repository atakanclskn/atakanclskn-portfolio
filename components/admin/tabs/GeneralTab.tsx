import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';

interface GeneralTabProps {
  editLang: 'EN' | 'TR';
  tempColor: string;
  setTempColor: (color: string) => void;
  onApplyColor: () => void;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({
  editLang,
  tempColor,
  setTempColor,
  onApplyColor
}) => {
  const { primaryColor, siteSettings, setSiteSettings } = useAdmin();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '6 182 212';
  };

  const rgbToHex = (rgb: string) => {
    const [r, g, b] = rgb.split(' ').map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Theme Settings */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-lg font-bold text-white mb-4">Theme Settings</h3>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Primary Color</label>
          <div className="flex items-center gap-4">
            <input 
              type="color" 
              value={rgbToHex(tempColor)}
              onChange={(e) => setTempColor(hexToRgb(e.target.value))}
              className="w-16 h-12 bg-transparent cursor-pointer rounded overflow-hidden"
            />
            <div className="flex-1">
              <p className="text-white text-sm">Select the main accent color for the entire website.</p>
              <p className="text-gray-500 text-xs mt-1">Current RGB: {primaryColor}</p>
              {tempColor !== primaryColor && (
                <p className="text-primary text-xs mt-1">Preview RGB: {tempColor}</p>
              )}
            </div>
            {tempColor !== primaryColor && (
              <button
                onClick={onApplyColor}
                className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
              >
                Apply Color
              </button>
            )}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Default Theme</label>
          <select 
            value={siteSettings.defaultTheme}
            onChange={(e) => setSiteSettings({...siteSettings, defaultTheme: e.target.value as 'light' | 'dark' | 'system'})}
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Site Metadata */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-lg font-bold text-white mb-4">Site Metadata</h3>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Meta Title ({editLang})</label>
          <input 
            type="text" 
            value={typeof siteSettings.metaTitle === 'string' ? siteSettings.metaTitle : siteSettings.metaTitle[editLang]} 
            onChange={(e) => setSiteSettings({...siteSettings, metaTitle: updateMultiLangText(siteSettings.metaTitle, e.target.value, editLang)})}
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Meta Description ({editLang})</label>
          <textarea 
            rows={3}
            value={typeof siteSettings.metaDescription === 'string' ? siteSettings.metaDescription : siteSettings.metaDescription[editLang]} 
            onChange={(e) => setSiteSettings({...siteSettings, metaDescription: updateMultiLangText(siteSettings.metaDescription, e.target.value, editLang)})}
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
