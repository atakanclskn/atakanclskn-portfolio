import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';

interface GeneralTabProps {
  editLang: 'EN' | 'TR';
  tempColor: string;
  setTempColor: (color: string) => void;
  onApplyColor: () => void;
  theme: 'light' | 'dark';
}

export const GeneralTab: React.FC<GeneralTabProps> = ({
  editLang,
  tempColor,
  setTempColor,
  onApplyColor,
  theme
}) => {
  const { primaryColor, siteSettings, setSiteSettings, navbarSettings, setNavbarSettings } = useAdmin();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '6 182 212';
  };

  const rgbToHex = (rgb: string) => {
    const [r, g, b] = rgb.split(' ').map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const t = {
    themeSettings: { EN: 'Theme Settings', TR: 'Tema Ayarları' },
    primaryColor: { EN: 'Primary Color', TR: 'Ana Renk' },
    colorDesc: { EN: 'Select the main accent color for the entire website.', TR: 'Web sitesi için ana vurgu rengini seçin.' },
    currentRgb: { EN: 'Current RGB', TR: 'Mevcut RGB' },
    previewRgb: { EN: 'Preview RGB', TR: 'Önizleme RGB' },
    applyColor: { EN: 'Apply Color', TR: 'Rengi Uygula' },
    defaultTheme: { EN: 'Default Theme', TR: 'Varsayılan Tema' },
    system: { EN: 'System', TR: 'Sistem' },
    light: { EN: 'Light', TR: 'Açık' },
    dark: { EN: 'Dark', TR: 'Koyu' },
    siteMetadata: { EN: 'Site Metadata', TR: 'Site Meta Verileri' },
    metaTitle: { EN: 'Meta Title', TR: 'Meta Başlık' },
    metaDescription: { EN: 'Meta Description', TR: 'Meta Açıklama' },
    navbarSettings: { EN: 'Navbar Settings', TR: 'Navbar Ayarları' },
    logoText: { EN: 'Logo Text', TR: 'Logo Metni' },
    showLogo: { EN: 'Show Logo', TR: 'Logoyu Göster' },
    ctaButtonText: { EN: 'CTA Button Text', TR: 'CTA Buton Metni' },
    ctaLink: { EN: 'CTA Link', TR: 'CTA Linki' },
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Theme Settings */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{getTranslation(t.themeSettings, editLang)}</h3>
        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{getTranslation(t.primaryColor, editLang)}</label>
          <div className="flex items-center gap-4">
            <input 
              type="color" 
              value={rgbToHex(tempColor)}
              onChange={(e) => setTempColor(hexToRgb(e.target.value))}
              className="w-16 h-12 bg-transparent cursor-pointer rounded overflow-hidden"
            />
            <div className="flex-1">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{getTranslation(t.colorDesc, editLang)}</p>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
              }`}>{getTranslation(t.currentRgb, editLang)}: {primaryColor}</p>
              {tempColor !== primaryColor && (
                <p className="text-primary text-xs mt-1">{getTranslation(t.previewRgb, editLang)}: {tempColor}</p>
              )}
            </div>
            {tempColor !== primaryColor && (
              <button
                onClick={onApplyColor}
                className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
              >
                {getTranslation(t.applyColor, editLang)}
              </button>
            )}
          </div>
        </div>
        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{getTranslation(t.defaultTheme, editLang)}</label>
          <select 
            value={siteSettings.defaultTheme}
            onChange={(e) => setSiteSettings({...siteSettings, defaultTheme: e.target.value as 'light' | 'dark' | 'system'})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          >
            <option value="system">{getTranslation(t.system, editLang)}</option>
            <option value="light">{getTranslation(t.light, editLang)}</option>
            <option value="dark">{getTranslation(t.dark, editLang)}</option>
          </select>
        </div>
      </div>

      {/* Navbar Settings */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{getTranslation(t.navbarSettings, editLang)}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{getTranslation(t.logoText, editLang)}</label>
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

          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={navbarSettings.showLogo}
                onChange={(e) => setNavbarSettings({...navbarSettings, showLogo: e.target.checked})}
                className="w-4 h-4 accent-primary"
              />
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>{getTranslation(t.showLogo, editLang)}</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{getTranslation(t.ctaButtonText, editLang)} ({editLang})</label>
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
            }`}>{getTranslation(t.ctaLink, editLang)}</label>
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

      {/* Site Metadata */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{getTranslation(t.siteMetadata, editLang)}</h3>
        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{getTranslation(t.metaTitle, editLang)} ({editLang})</label>
          <input 
            type="text" 
            value={typeof siteSettings.metaTitle === 'string' ? siteSettings.metaTitle : siteSettings.metaTitle[editLang]} 
            onChange={(e) => setSiteSettings({...siteSettings, metaTitle: updateMultiLangText(siteSettings.metaTitle, e.target.value, editLang)})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{getTranslation(t.metaDescription, editLang)} ({editLang})</label>
          <textarea 
            rows={3}
            value={typeof siteSettings.metaDescription === 'string' ? siteSettings.metaDescription : siteSettings.metaDescription[editLang]} 
            onChange={(e) => setSiteSettings({...siteSettings, metaDescription: updateMultiLangText(siteSettings.metaDescription, e.target.value, editLang)})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
