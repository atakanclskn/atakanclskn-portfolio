import React from 'react';
import { Plus, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { NavLinkItem } from '../../../types';

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
    siteMetadata: { EN: 'SEO & Metadata', TR: 'SEO ve Meta Verileri' },
    metaTitle: { EN: 'Meta Title', TR: 'Meta Başlık' },
    metaDescription: { EN: 'Meta Description', TR: 'Meta Açıklama' },
    metaKeywords: { EN: 'Meta Keywords', TR: 'Anahtar Kelimeler' },
    ogImage: { EN: 'OG Image URL', TR: 'OG Görsel URL' },
    googleAnalytics: { EN: 'Google Analytics ID', TR: 'Google Analytics ID' },
    navbarSettings: { EN: 'Navbar Settings', TR: 'Navbar Ayarları' },
    logoText: { EN: 'Logo Text', TR: 'Logo Metni' },
    showLogo: { EN: 'Show Logo', TR: 'Logoyu Göster' },
    ctaButtonText: { EN: 'CTA Button Text', TR: 'CTA Buton Metni' },
    ctaLink: { EN: 'CTA Link', TR: 'CTA Linki' },
    navLinks: { EN: 'Navigation Links', TR: 'Navigasyon Linkleri' },
    addNavLink: { EN: 'Add Link', TR: 'Link Ekle' },
    linkLabel: { EN: 'Label', TR: 'Etiket' },
    linkHref: { EN: 'Link (href)', TR: 'Link (href)' },
    visible: { EN: 'Visible', TR: 'Görünür' },
  };

  // Nav Link functions
  const addNavLink = () => {
    const newLink: NavLinkItem = {
      _id: `nav_${Date.now()}`,
      label: { EN: 'New Link', TR: 'Yeni Link' },
      href: '#section',
      isVisible: true
    };
    setNavbarSettings({
      ...navbarSettings,
      navLinks: [...(navbarSettings.navLinks || []), newLink]
    });
  };

  const updateNavLink = (id: string, field: keyof NavLinkItem, value: any) => {
    setNavbarSettings({
      ...navbarSettings,
      navLinks: (navbarSettings.navLinks || []).map(link =>
        link._id === id ? { ...link, [field]: value } : link
      )
    });
  };

  const deleteNavLink = (id: string) => {
    setNavbarSettings({
      ...navbarSettings,
      navLinks: (navbarSettings.navLinks || []).filter(link => link._id !== id)
    });
  };

  const toggleNavLinkVisibility = (id: string) => {
    setNavbarSettings({
      ...navbarSettings,
      navLinks: (navbarSettings.navLinks || []).map(link =>
        link._id === id ? { ...link, isVisible: !link.isVisible } : link
      )
    });
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
              placeholder="#contact"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <label className={`text-xs font-bold uppercase ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{getTranslation(t.navLinks, editLang)}</label>
            <button
              onClick={addNavLink}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-bold hover:bg-primary/30 transition-colors"
            >
              <Plus className="w-3 h-3" />
              {getTranslation(t.addNavLink, editLang)}
            </button>
          </div>

          <div className="space-y-2">
            {(navbarSettings.navLinks || []).map((link) => (
              <div 
                key={link._id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700' 
                    : 'bg-gray-50 border-gray-200'
                } ${!link.isVisible ? 'opacity-50' : ''}`}
              >
                <GripVertical className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} cursor-grab`} />
                
                <input 
                  type="text" 
                  value={link.label[editLang]} 
                  onChange={(e) => updateNavLink(link._id, 'label', updateMultiLangText(link.label, e.target.value, editLang))}
                  className={`flex-1 border rounded-lg p-2 text-sm focus:border-primary focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder={getTranslation(t.linkLabel, editLang)}
                />

                <input 
                  type="text" 
                  value={link.href} 
                  onChange={(e) => updateNavLink(link._id, 'href', e.target.value)}
                  className={`w-32 border rounded-lg p-2 text-sm focus:border-primary focus:outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="#section"
                />

                <button
                  onClick={() => toggleNavLinkVisibility(link._id)}
                  className={`p-2 rounded-lg transition-colors ${
                    link.isVisible 
                      ? 'text-green-500 hover:bg-green-500/10' 
                      : 'text-gray-500 hover:bg-gray-500/10'
                  }`}
                >
                  {link.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => deleteNavLink(link._id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO & Metadata */}
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
            rows={2}
            value={typeof siteSettings.metaDescription === 'string' ? siteSettings.metaDescription : siteSettings.metaDescription[editLang]} 
            onChange={(e) => setSiteSettings({...siteSettings, metaDescription: updateMultiLangText(siteSettings.metaDescription, e.target.value, editLang)})}
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
          }`}>{getTranslation(t.metaKeywords, editLang)} ({editLang})</label>
          <input 
            type="text" 
            value={typeof siteSettings.metaKeywords === 'string' ? siteSettings.metaKeywords : (siteSettings.metaKeywords?.[editLang] || '')} 
            onChange={(e) => setSiteSettings({...siteSettings, metaKeywords: updateMultiLangText(siteSettings.metaKeywords || { EN: '', TR: '' }, e.target.value, editLang)})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{getTranslation(t.ogImage, editLang)}</label>
            <input 
              type="text" 
              value={siteSettings.ogImage || ''} 
              onChange={(e) => setSiteSettings({...siteSettings, ogImage: e.target.value})}
              className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
              placeholder="https://atakanclskn.me/og-image.png"
            />
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              {editLang === 'TR' ? '1200x630px görsel (sosyal medya paylaşımları için)' : '1200x630px image (for social media shares)'}
            </p>
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{getTranslation(t.googleAnalytics, editLang)}</label>
            <input 
              type="text" 
              value={siteSettings.googleAnalyticsId || ''} 
              onChange={(e) => setSiteSettings({...siteSettings, googleAnalyticsId: e.target.value})}
              className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
              placeholder="G-XXXXXXXXXX"
            />
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              {editLang === 'TR' 
                ? '📊 Ziyaretçi analizi için Google Analytics 4 ID (analytics.google.com)' 
                : '📊 Google Analytics 4 ID for visitor tracking (analytics.google.com)'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
