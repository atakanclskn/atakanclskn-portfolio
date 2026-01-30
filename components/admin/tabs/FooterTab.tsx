import React from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { FooterLink } from '../../../types';

interface FooterTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const FooterTab: React.FC<FooterTabProps> = ({ editLang, theme }) => {
  const { footerSettings, setFooterSettings } = useAdmin();

  const t = {
    footerContent: { EN: 'Footer Content', TR: 'Footer İçeriği' },
    copyrightText: { EN: 'Copyright Text', TR: 'Telif Hakkı Metni' },
    copyrightHint: { EN: 'Use {year} for dynamic year', TR: 'Dinamik yıl için {year} kullanın' },
    showDesignCredit: { EN: 'Show Design Credit', TR: 'Tasarım Kredisi Göster' },
    designCreditText: { EN: 'Design Credit Text', TR: 'Tasarım Kredisi Metni' },
    showSocialLinks: { EN: 'Show Social Links in Footer', TR: 'Footer\'da Sosyal Linkler Göster' },
    additionalLinks: { EN: 'Additional Links', TR: 'Ek Linkler' },
    addLink: { EN: 'Add Link', TR: 'Link Ekle' },
    linkLabel: { EN: 'Link Label', TR: 'Link Etiketi' },
    linkUrl: { EN: 'URL', TR: 'URL' },
    externalLink: { EN: 'External Link', TR: 'Harici Link' },
    preview: { EN: 'Preview', TR: 'Önizleme' },
  };

  const getTranslation = (obj: { EN: string; TR: string }, lang: 'EN' | 'TR') => obj[lang];

  const addNewLink = () => {
    const newLink: FooterLink = {
      _id: `link_${Date.now()}`,
      label: { EN: 'New Link', TR: 'Yeni Link' },
      url: '#',
      isExternal: false
    };
    setFooterSettings({
      ...footerSettings,
      additionalLinks: [...footerSettings.additionalLinks, newLink]
    });
  };

  const updateLink = (id: string, field: keyof FooterLink, value: any) => {
    setFooterSettings({
      ...footerSettings,
      additionalLinks: footerSettings.additionalLinks.map(link =>
        link._id === id ? { ...link, [field]: value } : link
      )
    });
  };

  const deleteLink = (id: string) => {
    setFooterSettings({
      ...footerSettings,
      additionalLinks: footerSettings.additionalLinks.filter(link => link._id !== id)
    });
  };

  // Preview copyright with dynamic year
  const previewCopyright = footerSettings.copyrightText[editLang].replace('{year}', new Date().getFullYear().toString());

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Footer Content */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{getTranslation(t.footerContent, editLang)}</h3>
        
        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{getTranslation(t.copyrightText, editLang)} ({editLang})</label>
          <input 
            type="text" 
            value={footerSettings.copyrightText[editLang]} 
            onChange={(e) => setFooterSettings({
              ...footerSettings,
              copyrightText: updateMultiLangText(footerSettings.copyrightText, e.target.value, editLang)
            })}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            {getTranslation(t.copyrightHint, editLang)}
          </p>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
            {getTranslation(t.preview, editLang)}: {previewCopyright}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={footerSettings.showDesignCredit}
              onChange={(e) => setFooterSettings({...footerSettings, showDesignCredit: e.target.checked})}
              className="w-4 h-4 accent-primary"
            />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {getTranslation(t.showDesignCredit, editLang)}
            </span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={footerSettings.showSocialLinks}
              onChange={(e) => setFooterSettings({...footerSettings, showSocialLinks: e.target.checked})}
              className="w-4 h-4 accent-primary"
            />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {getTranslation(t.showSocialLinks, editLang)}
            </span>
          </label>
        </div>

        {footerSettings.showDesignCredit && (
          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{getTranslation(t.designCreditText, editLang)} ({editLang})</label>
            <input 
              type="text" 
              value={footerSettings.designCreditText[editLang]} 
              onChange={(e) => setFooterSettings({
                ...footerSettings,
                designCreditText: updateMultiLangText(footerSettings.designCreditText, e.target.value, editLang)
              })}
              className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
            />
          </div>
        )}
      </div>

      {/* Additional Links */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{getTranslation(t.additionalLinks, editLang)}</h3>
          <button
            onClick={addNewLink}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            {getTranslation(t.addLink, editLang)}
          </button>
        </div>

        {footerSettings.additionalLinks.length === 0 ? (
          <p className={`text-center py-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            {editLang === 'EN' ? 'No additional links yet' : 'Henüz ek link yok'}
          </p>
        ) : (
          <div className="space-y-3">
            {footerSettings.additionalLinks.map((link) => (
              <div 
                key={link._id}
                className={`p-4 rounded-xl border ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{getTranslation(t.linkLabel, editLang)} ({editLang})</label>
                    <input 
                      type="text" 
                      value={link.label[editLang]} 
                      onChange={(e) => updateLink(link._id, 'label', updateMultiLangText(link.label, e.target.value, editLang))}
                      className={`w-full border rounded-lg p-2 text-sm focus:border-primary focus:outline-none ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{getTranslation(t.linkUrl, editLang)}</label>
                    <input 
                      type="text" 
                      value={link.url} 
                      onChange={(e) => updateLink(link._id, 'url', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm focus:border-primary focus:outline-none ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div className="flex items-end gap-3">
                    <label className="flex items-center gap-2 pb-2">
                      <input
                        type="checkbox"
                        checked={link.isExternal}
                        onChange={(e) => updateLink(link._id, 'isExternal', e.target.checked)}
                        className="w-4 h-4 accent-primary"
                      />
                      <ExternalLink className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    </label>

                    <button
                      onClick={() => deleteLink(link._id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
