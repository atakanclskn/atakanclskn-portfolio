import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';

interface SectionsTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const SectionsTab: React.FC<SectionsTabProps> = ({ editLang, theme }) => {
  const { sectionContent, setSectionContent } = useAdmin();

  const t = {
    projectsSection: { EN: 'Projects Section', TR: 'Projeler Bölümü' },
    contactSection: { EN: 'Contact Section', TR: 'İletişim Bölümü' },
    experienceSection: { EN: 'Experience Section', TR: 'Deneyim Bölümü' },
    sectionTitle: { EN: 'Section Title', TR: 'Bölüm Başlığı' },
    sectionDescription: { EN: 'Section Description', TR: 'Bölüm Açıklaması' },
    emailLabel: { EN: 'Contact Email', TR: 'İletişim E-postası' },
    successMessage: { EN: 'Success Message', TR: 'Başarı Mesajı' },
    findMeText: { EN: 'Find Me Text', TR: 'Beni Bul Metni' },
  };

  const getTranslation = (obj: { EN: string; TR: string }, lang: 'EN' | 'TR') => obj[lang];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Projects Section */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          {getTranslation(t.projectsSection, editLang)}
        </h3>
        
        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{getTranslation(t.sectionTitle, editLang)} ({editLang})</label>
          <input 
            type="text" 
            value={sectionContent.projects.title[editLang]} 
            onChange={(e) => setSectionContent({
              ...sectionContent, 
              projects: {
                ...sectionContent.projects,
                title: updateMultiLangText(sectionContent.projects.title, e.target.value, editLang)
              }
            })}
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
          }`}>{getTranslation(t.sectionDescription, editLang)} ({editLang})</label>
          <textarea 
            rows={2}
            value={sectionContent.projects.description[editLang]} 
            onChange={(e) => setSectionContent({
              ...sectionContent, 
              projects: {
                ...sectionContent.projects,
                description: updateMultiLangText(sectionContent.projects.description, e.target.value, editLang)
              }
            })}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Experience Section */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          {getTranslation(t.experienceSection, editLang)}
        </h3>
        
        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{getTranslation(t.sectionTitle, editLang)} ({editLang})</label>
          <input 
            type="text" 
            value={sectionContent.experience.title[editLang]} 
            onChange={(e) => setSectionContent({
              ...sectionContent, 
              experience: {
                ...sectionContent.experience,
                title: updateMultiLangText(sectionContent.experience.title, e.target.value, editLang)
              }
            })}
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
          }`}>{getTranslation(t.sectionDescription, editLang)} ({editLang})</label>
          <textarea 
            rows={2}
            value={sectionContent.experience.description[editLang]} 
            onChange={(e) => setSectionContent({
              ...sectionContent, 
              experience: {
                ...sectionContent.experience,
                description: updateMultiLangText(sectionContent.experience.description, e.target.value, editLang)
              }
            })}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {getTranslation(t.contactSection, editLang)}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{getTranslation(t.sectionTitle, editLang)} ({editLang})</label>
            <input 
              type="text" 
              value={sectionContent.contact.title[editLang]} 
              onChange={(e) => setSectionContent({
                ...sectionContent, 
                contact: {
                  ...sectionContent.contact,
                  title: updateMultiLangText(sectionContent.contact.title, e.target.value, editLang)
                }
              })}
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
            }`}>{getTranslation(t.emailLabel, editLang)}</label>
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
              className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
              placeholder="contact@example.com"
            />
          </div>
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{getTranslation(t.sectionDescription, editLang)} ({editLang})</label>
          <textarea 
            rows={2}
            value={sectionContent.contact.description[editLang]} 
            onChange={(e) => setSectionContent({
              ...sectionContent, 
              contact: {
                ...sectionContent.contact,
                description: updateMultiLangText(sectionContent.contact.description, e.target.value, editLang)
              }
            })}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>{getTranslation(t.successMessage, editLang)} ({editLang})</label>
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
            }`}>{getTranslation(t.findMeText, editLang)} ({editLang})</label>
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
              className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
