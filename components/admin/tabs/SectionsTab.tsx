import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { 
  ChevronDown, ChevronUp, FolderKanban, Briefcase, 
  MessageSquare, Mail, Check, Users, Type, FileText
} from 'lucide-react';

interface SectionsTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const SectionsTab: React.FC<SectionsTabProps> = ({ editLang, theme }) => {
  const { sectionContent, setSectionContent } = useAdmin();
  const t = adminTranslations.sections;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['projects', 'experience', 'contact']));

  // Styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 hover:border-gray-600'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300'
  }`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  }`;

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const renderSectionCard = (
    section: 'projects' | 'experience' | 'contact',
    icon: React.ReactNode,
    color: string,
    title: { EN: string; TR: string }
  ) => {
    const isExpanded = expandedSections.has(section);
    
    return (
      <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}>
        {/* Card Header */}
        <div 
          className={`p-4 flex items-center gap-4 cursor-pointer select-none ${
            theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
          }`}
          onClick={() => toggleSection(section)}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {getText(title)}
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {sectionContent[section].title[editLang].substring(0, 40)}...
            </p>
          </div>

          <div className={`p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className={`p-6 border-t space-y-4 ${
            theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-100 bg-gray-50/50'
          }`}>
            {/* Title */}
            <div>
              <label className={labelClass}>
                <Type size={14} />
                {getText(t.sectionTitle)} ({editLang})
              </label>
              <input 
                type="text" 
                value={sectionContent[section].title[editLang]} 
                onChange={(e) => setSectionContent({
                  ...sectionContent, 
                  [section]: {
                    ...sectionContent[section],
                    title: updateMultiLangText(sectionContent[section].title, e.target.value, editLang)
                  }
                })}
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>
                <FileText size={14} />
                {getText(t.sectionDescription)} ({editLang})
              </label>
              <textarea 
                rows={2}
                value={sectionContent[section].description[editLang]} 
                onChange={(e) => setSectionContent({
                  ...sectionContent, 
                  [section]: {
                    ...sectionContent[section],
                    description: updateMultiLangText(sectionContent[section].description, e.target.value, editLang)
                  }
                })}
                className={inputClass}
              />
            </div>

            {/* Contact-specific fields */}
            {section === 'contact' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <Mail size={14} />
                      {getText(t.emailLabel)}
                    </label>
                    <input 
                      type="email" 
                      value={sectionContent.contact.emailLabel} 
                      onChange={(e) => setSectionContent({
                        ...sectionContent, 
                        contact: {
                          ...sectionContent.contact,
                          emailLabel: e.target.value
                        }
                      })}
                      className={inputClass}
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Users size={14} />
                      {getText(t.findMeText)} ({editLang})
                    </label>
                    <input 
                      type="text" 
                      value={sectionContent.contact.findMeText[editLang]} 
                      onChange={(e) => setSectionContent({
                        ...sectionContent, 
                        contact: {
                          ...sectionContent.contact,
                          findMeText: updateMultiLangText(sectionContent.contact.findMeText, e.target.value, editLang)
                        }
                      })}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>
                    <Check size={14} />
                    {getText(t.successMessage)} ({editLang})
                  </label>
                  <input 
                    type="text" 
                    value={sectionContent.contact.successMessage[editLang]} 
                    onChange={(e) => setSectionContent({
                      ...sectionContent, 
                      contact: {
                        ...sectionContent.contact,
                        successMessage: updateMultiLangText(sectionContent.contact.successMessage, e.target.value, editLang)
                      }
                    })}
                    className={inputClass}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

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
          {getText(t.description)}
        </p>
      </div>

      {/* Section Cards */}
      <div className="space-y-3">
        {renderSectionCard(
          'projects',
          <FolderKanban size={20} className="text-blue-500" />,
          theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100',
          t.projectsSection
        )}
        
        {renderSectionCard(
          'experience',
          <Briefcase size={20} className="text-purple-500" />,
          theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100',
          t.experienceSection
        )}
        
        {renderSectionCard(
          'contact',
          <MessageSquare size={20} className="text-green-500" />,
          theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100',
          t.contactSection
        )}
      </div>
    </div>
  );
};
