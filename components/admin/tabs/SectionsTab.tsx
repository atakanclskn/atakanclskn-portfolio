import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { 
  ChevronDown, ChevronUp, FolderKanban, Briefcase, 
  MessageSquare, Mail, Check, Users, Type, FileText,
  User, Activity, MousePointer, Link, Eye, Home, Repeat
} from 'lucide-react';
import { TagInput } from '../TagInput';

interface SectionsTabProps {
  editLang: 'EN' | 'TR';
}

export const SectionsTab: React.FC<SectionsTabProps> = ({ editLang }) => {
  const { sectionContent, setSectionContent, heroContent, setHeroContent, profile, updateProfile } = useAdmin();
  const t = adminTranslations.sections;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero', 'projects', 'experience', 'contact']));

  // Styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 bg-white/70 border-black/[0.08] text-gray-900 placeholder-gray-400 hover:border-black/15 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:hover:border-white/25`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 text-gray-600 dark:text-gray-400`;

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
      <div className={`rounded-2xl border overflow-hidden transition-all duration-300 bg-white/70 border-black/[0.08] hover:border-black/15 backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10 dark:hover:border-white/20`}>
        {/* Card Header */}
        <div 
          className={`p-4 flex items-center gap-4 cursor-pointer select-none hover:bg-black/[0.03] dark:hover:bg-white/[0.06]`}
          onClick={() => toggleSection(section)}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-900 dark:text-white`}>
              {getText(title)}
            </h3>
            <p className={`text-sm text-gray-500`}>
              {sectionContent[section].title[editLang].substring(0, 40)}...
            </p>
          </div>

          <div className={`p-2 rounded-xl text-gray-600 dark:text-gray-400`}>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className={`p-6 border-t space-y-4 border-black/[0.05] bg-black/[0.02] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
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

  const getValue = (field: any) => {
    return typeof field === 'string' ? field : field[editLang];
  };

  const heroT = adminTranslations.hero;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className={`p-6 rounded-2xl border bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`}>
        <h2 className={`text-xl font-display font-bold text-gray-900 dark:text-white`}>
          {getText(t.title)}
        </h2>
        <p className={`text-sm mt-1 text-gray-600 dark:text-gray-400`}>
          {getText(t.description)}
        </p>
      </div>

      {/* Section Cards */}
      <div className="space-y-3">
        {/* Hero Section */}
        <div className={`rounded-2xl border overflow-hidden transition-all duration-300 bg-white/70 border-black/[0.08] hover:border-black/15 backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10 dark:hover:border-white/20`}>
          <div 
            className={`p-4 flex items-center gap-4 cursor-pointer select-none hover:bg-black/[0.03] dark:hover:bg-white/[0.06]`}
            onClick={() => toggleSection('hero')}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-orange-100 dark:bg-orange-500/20`}>
              <Home size={20} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold text-gray-900 dark:text-white`}>
                {editLang === 'TR' ? 'Hero Bölümü' : 'Hero Section'}
              </h3>
              <p className={`text-sm text-gray-500`}>
                {heroContent.name} — {getValue(heroContent.role)}
              </p>
            </div>
            <div className={`p-2 rounded-xl text-gray-600 dark:text-gray-400`}>
              {expandedSections.has('hero') ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {expandedSections.has('hero') && (
            <div className={`p-6 border-t space-y-4 border-black/[0.05] bg-black/[0.02] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <Type size={14} />
                    {getText(heroT.greeting)} ({editLang})
                  </label>
                  <input 
                    type="text" 
                    value={getValue(heroContent.greeting)} 
                    onChange={(e) => setHeroContent({
                      ...heroContent, 
                      greeting: updateMultiLangText(heroContent.greeting, e.target.value, editLang)
                    })}
                    className={inputClass}
                    placeholder={editLang === 'TR' ? "Merhaba, ben" : "Hey, I'm"}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <User size={14} />
                    {getText(heroT.name)}
                  </label>
                  <input 
                    type="text" 
                    value={heroContent.name} 
                    onChange={(e) => setHeroContent({...heroContent, name: e.target.value})}
                    className={inputClass}
                    placeholder={editLang === 'TR' ? "Adınız Soyadınız" : "Your Name"}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <Briefcase size={14} />
                  {getText(heroT.role)} ({editLang})
                </label>
                <input 
                  type="text" 
                  value={getValue(heroContent.role)} 
                  onChange={(e) => setHeroContent({
                    ...heroContent, 
                    role: updateMultiLangText(heroContent.role, e.target.value, editLang)
                  })}
                  className={inputClass}
                  placeholder={editLang === 'TR' ? "Yazılım Mühendisi & Tasarımcı" : "Software Engineer & Designer"}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Repeat size={14} />
                  {editLang === 'TR' ? 'Dönen Unvanlar' : 'Rotating Titles'}
                </label>
                <TagInput
                  tags={profile.titles || []}
                  onChange={(titles) => updateProfile({ ...profile, titles })}
                  placeholder={editLang === 'TR' ? "Unvan yazıp Enter'a basın" : 'Type a title and press Enter'}
                  inputClass={inputClass}
                />
                <p className="text-xs mt-1.5 text-gray-500">
                  {editLang === 'TR'
                    ? "İki veya daha fazla unvan eklerseniz Hero'da sırayla döner ve yukarıdaki Rol alanının yerini alır."
                    : 'With two or more titles the Hero cycles through them instead of showing the Role above.'}
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  <FileText size={14} />
                  {getText(heroT.bio)} ({editLang})
                </label>
                <textarea 
                  rows={4}
                  value={getValue(heroContent.bio)} 
                  onChange={(e) => setHeroContent({
                    ...heroContent, 
                    bio: updateMultiLangText(heroContent.bio, e.target.value, editLang)
                  })}
                  className={inputClass}
                  placeholder={editLang === 'TR' ? "Kendiniz hakkında kısa bir açıklama..." : "A brief description about yourself..."}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Activity size={14} />
                  {getText(heroT.status)} ({editLang})
                </label>
                <input 
                  type="text" 
                  value={getValue(heroContent.status)} 
                  onChange={(e) => setHeroContent({
                    ...heroContent, 
                    status: updateMultiLangText(heroContent.status, e.target.value, editLang)
                  })}
                  className={inputClass}
                  placeholder={editLang === 'TR' ? "Yeni projeler için müsait" : "Available for new projects"}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <MousePointer size={14} />
                    {getText(heroT.ctaText)} ({editLang})
                  </label>
                  <input 
                    type="text" 
                    value={getValue(heroContent.ctaText)} 
                    onChange={(e) => setHeroContent({
                      ...heroContent, 
                      ctaText: updateMultiLangText(heroContent.ctaText, e.target.value, editLang)
                    })}
                    className={inputClass}
                    placeholder={editLang === 'TR' ? "CV'mi İndir" : "Download Resume"}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <Link size={14} />
                    {getText(heroT.resumeLink)}
                  </label>
                  <input 
                    type="text" 
                    value={heroContent.resumeLink} 
                    onChange={(e) => setHeroContent({...heroContent, resumeLink: e.target.value})}
                    className={inputClass}
                    placeholder="/resume.pdf"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {renderSectionCard(
          'projects',
          <FolderKanban size={20} className="text-blue-500" />,
          'bg-blue-100 dark:bg-blue-500/20',
          t.projectsSection
        )}
        
        {renderSectionCard(
          'experience',
          <Briefcase size={20} className="text-purple-500" />,
          'bg-purple-100 dark:bg-purple-500/20',
          t.experienceSection
        )}
        
        {renderSectionCard(
          'contact',
          <MessageSquare size={20} className="text-green-500" />,
          'bg-green-100 dark:bg-green-500/20',
          t.contactSection
        )}
      </div>
    </div>
  );
};
