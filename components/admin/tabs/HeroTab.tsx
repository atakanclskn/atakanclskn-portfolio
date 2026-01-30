import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';

interface HeroTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const HeroTab: React.FC<HeroTabProps> = ({ editLang, theme }) => {
  const { heroContent, setHeroContent } = useAdmin();

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Hero Section Content</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Greeting Text ({editLang})</label>
            <input 
              type="text" 
              value={typeof heroContent.greeting === 'string' ? heroContent.greeting : heroContent.greeting[editLang]} 
              onChange={(e) => setHeroContent({...heroContent, greeting: updateMultiLangText(heroContent.greeting, e.target.value, editLang)})}
              className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
              placeholder="Hey, I'm"
            />
          </div>
          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Name</label>
            <input 
              type="text" 
              value={heroContent.name} 
              onChange={(e) => setHeroContent({...heroContent, name: e.target.value})}
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
            }`}>Role/Title ({editLang})</label>
            <input 
              type="text" 
              value={typeof heroContent.role === 'string' ? heroContent.role : heroContent.role[editLang]} 
              onChange={(e) => setHeroContent({...heroContent, role: updateMultiLangText(heroContent.role, e.target.value, editLang)})}
              className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
              placeholder="Software Engineer & Designer"
            />
          </div>
          <div>
            <label className={`block text-xs font-bold uppercase mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Bio ({editLang})</label>
            <textarea 
              rows={3}
              value={typeof heroContent.bio === 'string' ? heroContent.bio : heroContent.bio[editLang]} 
              onChange={(e) => setHeroContent({...heroContent, bio: updateMultiLangText(heroContent.bio, e.target.value, editLang)})}
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
            }`}>Status ({editLang})</label>
            <input 
              type="text" 
              value={typeof heroContent.status === 'string' ? heroContent.status : heroContent.status[editLang]} 
              onChange={(e) => setHeroContent({...heroContent, status: updateMultiLangText(heroContent.status, e.target.value, editLang)})}
              className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
              placeholder="Available for new projects"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-bold uppercase mb-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>CTA Button Text ({editLang})</label>
              <input 
                type="text" 
                value={typeof heroContent.ctaText === 'string' ? heroContent.ctaText : heroContent.ctaText[editLang]} 
                onChange={(e) => setHeroContent({...heroContent, ctaText: updateMultiLangText(heroContent.ctaText, e.target.value, editLang)})}
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
              }`}>Resume Link</label>
              <input 
                type="text" 
                value={heroContent.resumeLink} 
                onChange={(e) => setHeroContent({...heroContent, resumeLink: e.target.value})}
                className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                placeholder="/resume.pdf"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
