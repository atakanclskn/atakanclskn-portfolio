import React, { useState } from 'react';
import { 
  Plus, Trash2, ExternalLink, ChevronDown, ChevronUp, 
  GripVertical, FileText, Link, Eye, EyeOff, Share2, Copyright, Type
} from 'lucide-react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { FooterLink } from '../../../types';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';

interface FooterTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const FooterTab: React.FC<FooterTabProps> = ({ editLang, theme }) => {
  const { footerSettings, setFooterSettings } = useAdmin();
  const t = adminTranslations.footer;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedLinks, setExpandedLinks] = useState<Set<string>>(new Set());
  const [showContentSection, setShowContentSection] = useState(true);
  const [showLinksSection, setShowLinksSection] = useState(true);

  // Styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 hover:border-gray-600'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300'
  }`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  }`;

  const cardClass = `rounded-2xl border overflow-hidden transition-all duration-300 ${
    theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
  }`;

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
    setExpandedLinks(new Set([...expandedLinks, newLink._id]));
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
    if (window.confirm(getText(t.removeConfirm))) {
      setFooterSettings({
        ...footerSettings,
        additionalLinks: footerSettings.additionalLinks.filter(link => link._id !== id)
      });
    }
  };

  const toggleLinkExpand = (id: string) => {
    const newExpanded = new Set(expandedLinks);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedLinks(newExpanded);
  };

  // Preview copyright with dynamic year
  const previewCopyright = footerSettings.copyrightText[editLang].replace('{year}', new Date().getFullYear().toString());

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className={`p-6 rounded-2xl border ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {getText(t.title)}
        </h2>
        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {footerSettings.additionalLinks.length} {getText(t.linksCount)}
        </p>
      </div>

      {/* Footer Content Section */}
      <div className={cardClass}>
        <div 
          className={`p-4 flex items-center gap-4 cursor-pointer select-none ${
            theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
          }`}
          onClick={() => setShowContentSection(!showContentSection)}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <FileText size={20} className="text-blue-500" />
          </div>
          
          <div className="flex-1">
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {getText(t.footerContent)}
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {getText(t.copyrightText)}, {getText(t.designCreditText)}
            </p>
          </div>

          <div className={`p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {showContentSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>

        {showContentSection && (
          <div className={`p-6 border-t space-y-5 ${
            theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-100 bg-gray-50/50'
          }`}>
            {/* Copyright Text */}
            <div>
              <label className={labelClass}>
                <Copyright size={14} />
                {getText(t.copyrightText)} ({editLang})
              </label>
              <input 
                type="text" 
                value={footerSettings.copyrightText[editLang]} 
                onChange={(e) => setFooterSettings({
                  ...footerSettings,
                  copyrightText: updateMultiLangText(footerSettings.copyrightText, e.target.value, editLang)
                })}
                className={inputClass}
              />
              <p className={`text-xs mt-1.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {getText(t.copyrightHint)}
              </p>
              <div className={`mt-2 p-3 rounded-lg text-sm ${
                theme === 'dark' ? 'bg-gray-800/50 text-primary' : 'bg-gray-100 text-primary'
              }`}>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{getText(t.preview)}: </span>
                {previewCopyright}
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${footerSettings.showDesignCredit ? 'bg-primary/20' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      {footerSettings.showDesignCredit ? <Eye size={18} className="text-primary" /> : <EyeOff size={18} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />}
                    </div>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {getText(t.showDesignCredit)}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={footerSettings.showDesignCredit}
                    onChange={(e) => setFooterSettings({...footerSettings, showDesignCredit: e.target.checked})}
                    className="w-5 h-5 accent-primary rounded"
                  />
                </label>
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${footerSettings.showSocialLinks ? 'bg-primary/20' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      {footerSettings.showSocialLinks ? <Share2 size={18} className="text-primary" /> : <Share2 size={18} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />}
                    </div>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {getText(t.showSocialLinks)}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={footerSettings.showSocialLinks}
                    onChange={(e) => setFooterSettings({...footerSettings, showSocialLinks: e.target.checked})}
                    className="w-5 h-5 accent-primary rounded"
                  />
                </label>
              </div>
            </div>

            {/* Design Credit Text - only if enabled */}
            {footerSettings.showDesignCredit && (
              <div>
                <label className={labelClass}>
                  <Type size={14} />
                  {getText(t.designCreditText)} ({editLang})
                </label>
                <input 
                  type="text" 
                  value={footerSettings.designCreditText[editLang]} 
                  onChange={(e) => setFooterSettings({
                    ...footerSettings,
                    designCreditText: updateMultiLangText(footerSettings.designCreditText, e.target.value, editLang)
                  })}
                  className={inputClass}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Additional Links Section */}
      <div className={cardClass}>
        <div 
          className={`p-4 flex items-center justify-between cursor-pointer select-none ${
            theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
          }`}
          onClick={() => setShowLinksSection(!showLinksSection)}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <Link size={20} className="text-green-500" />
            </div>
            
            <div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {getText(t.additionalLinks)}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {footerSettings.additionalLinks.length} {getText(t.linksCount)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addNewLink();
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus size={16} />
              {getText(t.addLink)}
            </button>
            <div className={`p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {showLinksSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>
        </div>

        {showLinksSection && (
          <div className={`p-4 border-t ${
            theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-100 bg-gray-50/50'
          }`}>
            {footerSettings.additionalLinks.length === 0 ? (
              <div className="p-8 text-center">
                <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  <Link size={24} className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} />
                </div>
                <p className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {getText(t.noLinksAdded)}
                </p>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {getText(t.clickToAddLink)}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {footerSettings.additionalLinks.map((link) => {
                  const isExpanded = expandedLinks.has(link._id);
                  return (
                    <div key={link._id} className={`rounded-xl border overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                      {/* Link Header */}
                      <div 
                        className={`p-3 flex items-center gap-3 cursor-pointer ${
                          theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => toggleLinkExpand(link._id)}
                      >
                        <GripVertical size={16} className={`cursor-grab ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                        
                        <div className={`p-2 rounded-lg ${link.isExternal ? 'bg-primary/20' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          {link.isExternal 
                            ? <ExternalLink size={16} className="text-primary" />
                            : <Link size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                          }
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {link.label[editLang]}
                          </p>
                          <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {link.url}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteLink(link._id);
                            }}
                            className={`p-1.5 rounded-lg text-red-500 transition-colors ${
                              theme === 'dark' ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
                            }`}
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className={`p-1.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className={`p-4 border-t space-y-3 ${
                          theme === 'dark' ? 'border-gray-700 bg-gray-900/30' : 'border-gray-100 bg-gray-50'
                        }`}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className={labelClass}>
                                <Type size={12} />
                                {getText(t.linkLabel)} ({editLang})
                              </label>
                              <input 
                                type="text" 
                                value={link.label[editLang]} 
                                onChange={(e) => updateLink(link._id, 'label', updateMultiLangText(link.label, e.target.value, editLang))}
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className={labelClass}>
                                <Link size={12} />
                                {getText(t.linkUrl)}
                              </label>
                              <input 
                                type="text" 
                                value={link.url} 
                                onChange={(e) => updateLink(link._id, 'url', e.target.value)}
                                className={inputClass}
                              />
                            </div>
                          </div>
                          <div className={`p-3 rounded-lg border ${
                            theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-200'
                          }`}>
                            <label className="flex items-center justify-between cursor-pointer">
                              <div className="flex items-center gap-2">
                                <ExternalLink size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {getText(t.externalLink)}
                                </span>
                              </div>
                              <input
                                type="checkbox"
                                checked={link.isExternal}
                                onChange={(e) => updateLink(link._id, 'isExternal', e.target.checked)}
                                className="w-4 h-4 accent-primary rounded"
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
