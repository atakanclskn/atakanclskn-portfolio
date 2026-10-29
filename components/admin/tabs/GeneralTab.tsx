import React from 'react';
import { Plus, Trash2, GripVertical, Eye, EyeOff, Monitor, Sun, Moon } from 'lucide-react';
import { ColorPicker, Segmented, Toggle } from '../ui';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { NavLinkItem } from '../../../types';

interface GeneralTabProps {
  editLang: 'EN' | 'TR';
  part: 'appearance' | 'navigation' | 'seo';
}

// Accent presets as space-separated RGB, the format of the --primary CSS variable
const COLOR_PRESETS = [
  '229 62 62', '249 115 22', '234 179 8', '34 197 94',
  '6 182 212', '59 130 246', '139 92 246', '217 70 239',
];

export const GeneralTab: React.FC<GeneralTabProps> = ({ editLang, part }) => {
  const { primaryColor, setPrimaryColor, siteSettings, setSiteSettings, navbarSettings, setNavbarSettings } = useAdmin();



  const t = {
    themeSettings: { EN: 'Theme Settings', TR: 'Tema Ayarları' },
    primaryColor: { EN: 'Primary Color', TR: 'Ana Renk' },
    colorDesc: { EN: 'Accent color for the whole site. Changes preview instantly and go live when you save.', TR: 'Tüm sitenin vurgu rengi. Değişiklik anında önizlenir, kaydettiğinizde yayına alınır.' },
    customColor: { EN: 'Custom color', TR: 'Özel renk' },
    defaultTheme: { EN: 'Default Theme for Visitors', TR: 'Ziyaretçiler İçin Varsayılan Tema' },
    system: { EN: 'System', TR: 'Sistem' },
    light: { EN: 'Light', TR: 'Açık' },
    dark: { EN: 'Dark', TR: 'Koyu' },
    siteMetadata: { EN: 'SEO & Metadata', TR: 'SEO ve Meta Verileri' },
    metaTitle: { EN: 'Meta Title', TR: 'Meta Başlık' },
    metaDescription: { EN: 'Meta Description', TR: 'Meta Açıklama' },
    metaKeywords: { EN: 'Meta Keywords', TR: 'Anahtar Kelimeler' },
    ogImage: { EN: 'OG Image URL', TR: 'OG Görsel URL' },
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
      {part === 'appearance' && (
      <>
      {/* Theme Settings */}
      <div className={`p-6 rounded-2xl border space-y-4 bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`}>
        <h3 className={`text-lg font-display font-bold mb-4 text-gray-900 dark:text-white`}>{getTranslation(t.themeSettings, editLang)}</h3>
        <div>
          <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400`}>{getTranslation(t.primaryColor, editLang)}</label>
          <div className="flex flex-wrap items-center gap-3">
            {COLOR_PRESETS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setPrimaryColor(color)}
                className={`w-9 h-9 rounded-full transition-transform hover:scale-110 ${
                  primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white ring-offset-white dark:ring-offset-[#050505]' : ''
                }`}
                style={{ backgroundColor: `rgb(${color})` }}
                aria-label={`rgb(${color})`}
              />
            ))}
            <ColorPicker
              value={primaryColor}
              onChange={setPrimaryColor}
              lang={editLang}
              triggerClassName={`w-9 h-9 rounded-full border border-dashed flex items-center justify-center transition-colors ${
                COLOR_PRESETS.includes(primaryColor)
                  ? 'border-black/20 text-gray-500 hover:text-gray-900 dark:border-white/25 dark:hover:text-white'
                  : 'border-transparent ring-2 ring-offset-2 ring-gray-900 ring-offset-white dark:ring-white dark:ring-offset-[#050505]'
              }`}
              trigger={COLOR_PRESETS.includes(primaryColor)
                ? <Plus size={16} />
                : <span className="w-full h-full rounded-full" style={{ backgroundColor: `rgb(${primaryColor})` }} />}
            />
          </div>
          <p className="text-xs mt-3 text-gray-500">{getTranslation(t.colorDesc, editLang)}</p>
        </div>
        <div>
          <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400`}>{getTranslation(t.defaultTheme, editLang)}</label>
          <Segmented
            value={siteSettings.defaultTheme || 'dark'}
            onChange={(defaultTheme) => setSiteSettings({...siteSettings, defaultTheme})}
            options={[
              { value: 'system', label: getTranslation(t.system, editLang), icon: <Monitor size={15} /> },
              { value: 'light', label: getTranslation(t.light, editLang), icon: <Sun size={15} /> },
              { value: 'dark', label: getTranslation(t.dark, editLang), icon: <Moon size={15} /> },
            ]}
          />
          <p className="text-xs mt-2 text-gray-500">
            {editLang === 'TR'
              ? 'Ziyaretçi temayı kendisi değiştirdiyse onun seçimi geçerli olur.'
              : "A visitor's own theme choice always takes precedence."}
          </p>
        </div>
      </div>

      </>
      )}
      {part === 'navigation' && (
      <>
      {/* Navbar Settings */}
      <div className={`p-6 rounded-2xl border space-y-4 bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`}>
        <h3 className={`text-lg font-display font-bold mb-4 text-gray-900 dark:text-white`}>{getTranslation(t.navbarSettings, editLang)}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400`}>{getTranslation(t.logoText, editLang)}</label>
            <input 
              type="text" 
              value={navbarSettings.logoText} 
              onChange={(e) => setNavbarSettings({...navbarSettings, logoText: e.target.value})}
              className={`w-full border rounded-xl p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/60 border-black/10 text-gray-900 dark:bg-white/[0.06] dark:border-white/10 dark:text-white`}
              placeholder="AC"
            />
          </div>

          <div className="flex items-end pb-3">
            <Toggle
              checked={navbarSettings.showLogo}
              onChange={(showLogo) => setNavbarSettings({...navbarSettings, showLogo})}
              label={getTranslation(t.showLogo, editLang)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400`}>{getTranslation(t.ctaButtonText, editLang)} ({editLang})</label>
            <input 
              type="text" 
              value={typeof navbarSettings.ctaText === 'string' ? navbarSettings.ctaText : navbarSettings.ctaText[editLang]} 
              onChange={(e) => setNavbarSettings({...navbarSettings, ctaText: updateMultiLangText(navbarSettings.ctaText, e.target.value, editLang)})}
              className={`w-full border rounded-xl p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/60 border-black/10 text-gray-900 dark:bg-white/[0.06] dark:border-white/10 dark:text-white`}
              placeholder="Get in Touch"
            />
          </div>

          <div>
            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400`}>{getTranslation(t.ctaLink, editLang)}</label>
            <input 
              type="text" 
              value={navbarSettings.ctaLink} 
              onChange={(e) => setNavbarSettings({...navbarSettings, ctaLink: e.target.value})}
              className={`w-full border rounded-xl p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/60 border-black/10 text-gray-900 dark:bg-white/[0.06] dark:border-white/10 dark:text-white`}
              placeholder="#contact"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="pt-4 border-t border-black/[0.06] dark:border-white/10">
          <div className="flex items-center justify-between mb-3">
            <label className={`text-xs font-bold uppercase text-gray-600 dark:text-gray-400`}>{getTranslation(t.navLinks, editLang)}</label>
            <button
              onClick={addNavLink}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary/20 text-primary rounded-xl text-xs font-bold hover:bg-primary/30 transition-colors"
            >
              <Plus className="w-3 h-3" />
              {getTranslation(t.addNavLink, editLang)}
            </button>
          </div>

          <div className="space-y-2">
            {(navbarSettings.navLinks || []).map((link) => (
              <div 
                key={link._id}
                className={`flex items-center gap-3 p-3 rounded-xl border bg-white/60 border-black/[0.08] dark:bg-white/[0.05] dark:border-white/10 ${!link.isVisible ? 'opacity-50' : ''}`}
              >
                <GripVertical className={`w-4 h-4 text-gray-400 dark:text-gray-500 cursor-grab`} />
                
                <input 
                  type="text" 
                  value={link.label[editLang]} 
                  onChange={(e) => updateNavLink(link._id, 'label', updateMultiLangText(link.label, e.target.value, editLang))}
                  className={`flex-1 border rounded-xl p-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/70 border-black/10 text-gray-900 dark:bg-white/[0.06] dark:border-white/10 dark:text-white`}
                  placeholder={getTranslation(t.linkLabel, editLang)}
                />

                <input 
                  type="text" 
                  value={link.href} 
                  onChange={(e) => updateNavLink(link._id, 'href', e.target.value)}
                  className={`w-32 border rounded-xl p-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/70 border-black/10 text-gray-900 dark:bg-white/[0.06] dark:border-white/10 dark:text-white`}
                  placeholder="#section"
                />

                <button
                  onClick={() => toggleNavLinkVisibility(link._id)}
                  className={`p-2 rounded-xl transition-colors ${
                    link.isVisible 
                      ? 'text-green-500 hover:bg-green-500/10' 
                      : 'text-gray-500 hover:bg-gray-500/10'
                  }`}
                >
                  {link.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => deleteNavLink(link._id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      </>
      )}
      {part === 'seo' && (
      <>
      {/* SEO & Metadata */}
      <div className={`p-6 rounded-2xl border space-y-4 bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`}>
        <h3 className={`text-lg font-display font-bold mb-4 text-gray-900 dark:text-white`}>{getTranslation(t.siteMetadata, editLang)}</h3>
        
        <div>
          <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400`}>{getTranslation(t.metaTitle, editLang)} ({editLang})</label>
          <input 
            type="text" 
            value={typeof siteSettings.metaTitle === 'string' ? siteSettings.metaTitle : siteSettings.metaTitle[editLang]} 
            onChange={(e) => setSiteSettings({...siteSettings, metaTitle: updateMultiLangText(siteSettings.metaTitle, e.target.value, editLang)})}
            className={`w-full border rounded-xl p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/60 border-black/10 text-gray-900 dark:bg-white/[0.06] dark:border-white/10 dark:text-white`}
          />
        </div>

        <div>
          <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400`}>{getTranslation(t.metaDescription, editLang)} ({editLang})</label>
          <textarea 
            rows={2}
            value={typeof siteSettings.metaDescription === 'string' ? siteSettings.metaDescription : siteSettings.metaDescription[editLang]} 
            onChange={(e) => setSiteSettings({...siteSettings, metaDescription: updateMultiLangText(siteSettings.metaDescription, e.target.value, editLang)})}
            className={`w-full border rounded-xl p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/60 border-black/10 text-gray-900 dark:bg-white/[0.06] dark:border-white/10 dark:text-white`}
          />
        </div>

        <div>
          <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400`}>{getTranslation(t.metaKeywords, editLang)} ({editLang})</label>
          <input 
            type="text" 
            value={typeof siteSettings.metaKeywords === 'string' ? siteSettings.metaKeywords : (siteSettings.metaKeywords?.[editLang] || '')} 
            onChange={(e) => setSiteSettings({...siteSettings, metaKeywords: updateMultiLangText(siteSettings.metaKeywords || { EN: '', TR: '' }, e.target.value, editLang)})}
            className={`w-full border rounded-xl p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/60 border-black/10 text-gray-900 dark:bg-white/[0.06] dark:border-white/10 dark:text-white`}
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-600 dark:text-gray-400`}>{getTranslation(t.ogImage, editLang)}</label>
            <input 
              type="text" 
              value={siteSettings.ogImage || ''} 
              onChange={(e) => setSiteSettings({...siteSettings, ogImage: e.target.value})}
              className={`w-full border rounded-xl p-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/60 border-black/10 text-gray-900 dark:bg-white/[0.06] dark:border-white/10 dark:text-white`}
              placeholder="https://atakanclskn.me/og-image.png"
            />
            <p className={`text-xs mt-1 text-gray-600 dark:text-gray-500`}>
              {editLang === 'TR' ? '1200x630px görsel (sosyal medya paylaşımları için)' : '1200x630px image (for social media shares)'}
            </p>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};
