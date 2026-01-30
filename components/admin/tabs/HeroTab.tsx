import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';

interface HeroTabProps {
  editLang: 'EN' | 'TR';
}

export const HeroTab: React.FC<HeroTabProps> = ({ editLang }) => {
  const { heroContent, setHeroContent } = useAdmin();

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-lg font-bold text-white mb-4">Hero Section Content</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Greeting Text ({editLang})</label>
            <input 
              type="text" 
              value={typeof heroContent.greeting === 'string' ? heroContent.greeting : heroContent.greeting[editLang]} 
              onChange={(e) => setHeroContent({...heroContent, greeting: updateMultiLangText(heroContent.greeting, e.target.value, editLang)})}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
              placeholder="Hey, I'm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Name</label>
            <input 
              type="text" 
              value={heroContent.name} 
              onChange={(e) => setHeroContent({...heroContent, name: e.target.value})}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Role/Title ({editLang})</label>
            <input 
              type="text" 
              value={typeof heroContent.role === 'string' ? heroContent.role : heroContent.role[editLang]} 
              onChange={(e) => setHeroContent({...heroContent, role: updateMultiLangText(heroContent.role, e.target.value, editLang)})}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
              placeholder="Software Engineer & Designer"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Bio ({editLang})</label>
            <textarea 
              rows={3}
              value={typeof heroContent.bio === 'string' ? heroContent.bio : heroContent.bio[editLang]} 
              onChange={(e) => setHeroContent({...heroContent, bio: updateMultiLangText(heroContent.bio, e.target.value, editLang)})}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Status ({editLang})</label>
            <input 
              type="text" 
              value={typeof heroContent.status === 'string' ? heroContent.status : heroContent.status[editLang]} 
              onChange={(e) => setHeroContent({...heroContent, status: updateMultiLangText(heroContent.status, e.target.value, editLang)})}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
              placeholder="Available for new projects"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">CTA Button Text ({editLang})</label>
              <input 
                type="text" 
                value={typeof heroContent.ctaText === 'string' ? heroContent.ctaText : heroContent.ctaText[editLang]} 
                onChange={(e) => setHeroContent({...heroContent, ctaText: updateMultiLangText(heroContent.ctaText, e.target.value, editLang)})}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Resume Link</label>
              <input 
                type="text" 
                value={heroContent.resumeLink} 
                onChange={(e) => setHeroContent({...heroContent, resumeLink: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                placeholder="/resume.pdf"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
