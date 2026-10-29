import React, { useState } from 'react';
import { 
  Plus, Trash2, ExternalLink, ChevronDown, ChevronUp, 
  GripVertical, FileText, Link, Eye, EyeOff, Share2, Copyright, Type
} from 'lucide-react';
import { Toggle, useConfirm } from '../ui';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { FooterLink } from '../../../types';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';

interface FooterTabProps {
  editLang: 'EN' | 'TR';
}

export const FooterTab: React.FC<FooterTabProps> = ({ editLang }) => {
  const confirm = useConfirm();
  const confirmRemove = (title: string) => confirm({
    title,
    message: editLang === 'TR' ? 'Kaydettiğinizde sitede de kaldırılır.' : 'It will also disappear from the site once you save.',
    confirmLabel: editLang === 'TR' ? 'Sil' : 'Delete',
  });
  const { footerSettings, setFooterSettings } = useAdmin();
  const t = adminTranslations.footer;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedLinks, setExpandedLinks] = useState<Set<string>>(new Set());
  const [showContentSection, setShowContentSection] = useState(true);
  const [showLinksSection, setShowLinksSection] = useState(true);

  // Styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 bg-white/70 border-black/[0.08] text-gray-900 placeholder-gray-400 hover:border-black/15 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:hover:border-white/25`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 text-gray-600 dark:text-gray-400`;

  const cardClass = `rounded-2xl border overflow-hidden transition-all duration-300 bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`;

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

  const deleteLink = async (id: string) => {
    if (await confirmRemove(getText(t.removeConfirm))) {
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
      <div className={`p-6 rounded-2xl border bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`}>
        <h2 className={`text-xl font-display font-bold text-gray-900 dark:text-white`}>
          {getText(t.title)}
        </h2>
        <p className={`text-sm mt-1 text-gray-600 dark:text-gray-400`}>
          {footerSettings.additionalLinks.length} {getText(t.linksCount)}
        </p>
      </div>

      {/* Footer Content Section */}
      <div className={cardClass}>
        <div 
          className={`p-4 flex items-center gap-4 cursor-pointer select-none hover:bg-black/[0.03] dark:hover:bg-white/[0.06]`}
          onClick={() => setShowContentSection(!showContentSection)}
        >
          
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-900 dark:text-white`}>
              {getText(t.footerContent)}
            </h3>
            <p className={`text-sm text-gray-500`}>
              {getText(t.copyrightText)}, {getText(t.designCreditText)}
            </p>
          </div>

          <div className={`p-2 rounded-xl text-gray-600 dark:text-gray-400`}>
            {showContentSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>

        {showContentSection && (
          <div className={`p-6 border-t space-y-5 border-black/[0.05] bg-black/[0.02] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
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
              <p className={`text-xs mt-1.5 text-gray-500`}>
                {getText(t.copyrightHint)}
              </p>
              <div className={`mt-2 p-3 rounded-xl text-sm bg-black/[0.04] text-primary dark:bg-white/[0.05]`}>
                <span className={'text-gray-500 dark:text-gray-400'}>{getText(t.preview)}: </span>
                {previewCopyright}
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border bg-white/60 border-black/[0.08] dark:bg-white/[0.03] dark:border-white/10`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${footerSettings.showDesignCredit ? 'bg-primary/20' : 'bg-black/[0.06] dark:bg-white/10'}`}>
                      {footerSettings.showDesignCredit ? <Eye size={18} className="text-primary" /> : <EyeOff size={18} className={'text-gray-400 dark:text-gray-500'} />}
                    </div>
                    <span className={`text-sm font-medium text-gray-700 dark:text-gray-300`}>
                      {getText(t.showDesignCredit)}
                    </span>
                  </div>
                  <Toggle checked={footerSettings.showDesignCredit} onChange={(checked) => setFooterSettings({...footerSettings, showDesignCredit: checked})} />
                </label>
              </div>

              <div className={`p-4 rounded-xl border bg-white/60 border-black/[0.08] dark:bg-white/[0.03] dark:border-white/10`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${footerSettings.showSocialLinks ? 'bg-primary/20' : 'bg-black/[0.06] dark:bg-white/10'}`}>
                      {footerSettings.showSocialLinks ? <Share2 size={18} className="text-primary" /> : <Share2 size={18} className={'text-gray-400 dark:text-gray-500'} />}
                    </div>
                    <span className={`text-sm font-medium text-gray-700 dark:text-gray-300`}>
                      {getText(t.showSocialLinks)}
                    </span>
                  </div>
                  <Toggle checked={footerSettings.showSocialLinks} onChange={(checked) => setFooterSettings({...footerSettings, showSocialLinks: checked})} />
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
          className={`p-4 flex items-center justify-between cursor-pointer select-none hover:bg-black/[0.03] dark:hover:bg-white/[0.06]`}
          onClick={() => setShowLinksSection(!showLinksSection)}
        >
          <div className="flex items-center gap-4">
            
            <div>
              <h3 className={`font-semibold text-gray-900 dark:text-white`}>
                {getText(t.additionalLinks)}
              </h3>
              <p className={`text-sm text-gray-500`}>
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
              className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus size={16} />
              {getText(t.addLink)}
            </button>
            <div className={`p-2 rounded-xl text-gray-600 dark:text-gray-400`}>
              {showLinksSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>
        </div>

        {showLinksSection && (
          <div className={`p-4 border-t border-black/[0.05] bg-black/[0.02] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
            {footerSettings.additionalLinks.length === 0 ? (
              <div className="p-8 text-center">
                <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-black/[0.06] dark:bg-white/[0.06]`}>
                  <Link size={24} className={'text-gray-400 dark:text-gray-500'} />
                </div>
                <p className={`font-medium text-gray-600 dark:text-gray-400`}>
                  {getText(t.noLinksAdded)}
                </p>
                <p className={`text-sm mt-1 text-gray-500`}>
                  {getText(t.clickToAddLink)}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {footerSettings.additionalLinks.map((link) => {
                  const isExpanded = expandedLinks.has(link._id);
                  return (
                    <div key={link._id} className={`rounded-xl border overflow-hidden bg-white/70 border-black/[0.08] dark:bg-white/[0.05] dark:border-white/10`}>
                      {/* Link Header */}
                      <div 
                        className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/10`}
                        onClick={() => toggleLinkExpand(link._id)}
                      >
                        <GripVertical size={16} className={`cursor-grab text-gray-400 dark:text-gray-500`} />
                        
                        <div className={`p-2 rounded-xl ${link.isExternal ? 'bg-primary/20' : 'bg-black/[0.04] dark:bg-white/10'}`}>
                          {link.isExternal 
                            ? <ExternalLink size={16} className="text-primary" />
                            : <Link size={16} className={'text-gray-500 dark:text-gray-400'} />
                          }
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate text-gray-900 dark:text-white`}>
                            {link.label[editLang]}
                          </p>
                          <p className={`text-xs truncate text-gray-500`}>
                            {link.url}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteLink(link._id);
                            }}
                            className={`p-1.5 rounded-xl text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10`}
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className={`p-1.5 text-gray-400 dark:text-gray-500`}>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className={`p-4 border-t space-y-3 border-black/[0.05] bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
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
                          <div className={`p-3 rounded-xl border bg-white/60 border-black/[0.08] dark:bg-white/[0.03] dark:border-white/10`}>
                            <label className="flex items-center justify-between cursor-pointer">
                              <div className="flex items-center gap-2">
                                <ExternalLink size={16} className={'text-gray-500 dark:text-gray-400'} />
                                <span className={`text-sm text-gray-700 dark:text-gray-300`}>
                                  {getText(t.externalLink)}
                                </span>
                              </div>
                              <Toggle checked={link.isExternal} onChange={(checked) => updateLink(link._id, 'isExternal', checked)} />
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
