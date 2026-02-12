import React, { useState, useRef } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { uploadResume } from '../../../lib/firebase';
import { 
  ChevronDown, ChevronUp, FolderKanban, Briefcase, 
  MessageSquare, Mail, Check, Users, Type, FileText,
  User, Activity, MousePointer, Link, Eye, Home, Upload, Loader2
} from 'lucide-react';

interface SectionsTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

// Resume/CV Upload Button Component
const ResumeUploadButton: React.FC<{ theme: string; onUpload: (url: string) => void }> = ({ theme, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only accept PDF files
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadResume(file);
      onUpload(url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
          theme === 'dark'
            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-300'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Upload PDF"
      >
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        {uploading ? 'Uploading...' : 'PDF'}
      </button>
    </>
  );
};

export const SectionsTab: React.FC<SectionsTabProps> = ({ editLang, theme }) => {
  const { sectionContent, setSectionContent, heroContent, setHeroContent } = useAdmin();
  const t = adminTranslations.sections;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero', 'projects', 'experience', 'contact']));

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

  const getValue = (field: any) => {
    return typeof field === 'string' ? field : field[editLang];
  };

  const heroT = adminTranslations.hero;

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
        {/* Hero Section */}
        <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700' 
            : 'bg-white border-gray-200 hover:border-gray-300'
        }`}>
          <div 
            className={`p-4 flex items-center gap-4 cursor-pointer select-none ${
              theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
            }`}
            onClick={() => toggleSection('hero')}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-100'
            }`}>
              <Home size={20} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {editLang === 'TR' ? 'Hero Bölümü' : 'Hero Section'}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {heroContent.name} — {getValue(heroContent.role)}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {expandedSections.has('hero') ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {expandedSections.has('hero') && (
            <div className={`p-6 border-t space-y-4 ${
              theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-100 bg-gray-50/50'
            }`}>
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
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={heroContent.resumeLink} 
                      onChange={(e) => setHeroContent({...heroContent, resumeLink: e.target.value})}
                      className={`${inputClass} flex-1`}
                      placeholder="/resume.pdf"
                    />
                    <ResumeUploadButton 
                      theme={theme}
                      onUpload={(url) => setHeroContent({...heroContent, resumeLink: url})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

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
