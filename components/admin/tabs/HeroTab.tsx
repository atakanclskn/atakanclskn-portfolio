import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { 
  User, Type, Briefcase, FileText, Activity, MousePointer, 
  Link, Eye
} from 'lucide-react';

interface HeroTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const HeroTab: React.FC<HeroTabProps> = ({ editLang, theme }) => {
  const { heroContent, setHeroContent } = useAdmin();
  const t = adminTranslations.hero;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [showPreview, setShowPreview] = useState(false);

  // Input styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 hover:border-gray-600'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300'
  }`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  }`;

  const cardClass = `p-6 rounded-2xl border ${
    theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
  }`;

  // Get current value helper
  const getValue = (field: any) => {
    return typeof field === 'string' ? field : field[editLang];
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className={cardClass}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {getText(t.title)}
            </h2>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {editLang === 'TR' ? 'Ana sayfa hero bölümünün içeriğini düzenleyin' : 'Edit the main hero section content'}
            </p>
          </div>
          
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              showPreview
                ? 'bg-primary text-black'
                : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye size={18} />
            {editLang === 'TR' ? 'Önizleme' : 'Preview'}
          </button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className={`${cardClass} overflow-hidden`}>
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {getValue(heroContent.greeting)}
            </p>
            <h1 className={`text-4xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {heroContent.name}
            </h1>
            <p className="text-primary text-xl mt-2">{getValue(heroContent.role)}</p>
            <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {getValue(heroContent.bio)}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <span className={`px-3 py-1 rounded-full text-xs ${
                theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                {getValue(heroContent.status)}
              </span>
              <button className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-medium">
                {getValue(heroContent.ctaText)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={cardClass}>
        <div className="space-y-5">
          {/* Greeting & Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <Type size={14} />
                {getText(t.greeting)} ({editLang})
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
                {getText(t.name)}
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

          {/* Role */}
          <div>
            <label className={labelClass}>
              <Briefcase size={14} />
              {getText(t.role)} ({editLang})
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

          {/* Bio */}
          <div>
            <label className={labelClass}>
              <FileText size={14} />
              {getText(t.bio)} ({editLang})
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

          {/* Status */}
          <div>
            <label className={labelClass}>
              <Activity size={14} />
              {getText(t.status)} ({editLang})
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

          {/* CTA & Resume Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <MousePointer size={14} />
                {getText(t.ctaText)} ({editLang})
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
                {getText(t.resumeLink)}
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
      </div>
    </div>
  );
};
